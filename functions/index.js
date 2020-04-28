const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const FieldValue = require('firebase-admin').firestore.FieldValue;


admin.initializeApp();

class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'UnauthenticatedError';
    }
}

class NotAnAdminError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'NotAnAdminError';
    }
}

class InvalidRoleError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'InvalidRoleError';
    }
}

function roleIsValid(role) {
    const validRoles = ['admin', 'teacher', 'student']; //To be adapted with your own list of roles
    return validRoles.includes(role);
}

function generatePassword() {
    let length = 16,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!+-_@",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

exports.changeClass = functions.firestore
    .document('users/{uid}')
    .onUpdate((snap, context) => {
        const { uid } = context.params
        if (snap.after.data().classe != snap.before.data().classe) {
            const classeRefBefore = admin.firestore().collection("classes").doc(snap.before.data().classe)
            classeRefBefore.update(
                {
                    "eleves":
                        FieldValue.arrayRemove(uid)
                }
            )
            const classeRefAfter = admin.firestore().collection("classes").doc(snap.after.data().classe)
            return classeRefAfter.get().then(function (doc) {
                if (doc.exists) {
                    classeRefAfter.set({
                        ...doc.data(),
                        eleves: [...doc.data().eleves, uid]
                    });
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    });
exports.removeFromClass = functions.firestore
    .document('users/{uid}')
    .onDelete((snap, context) => {
        const { uid } = context.params
        const classeRef = admin.firestore().collection("classes").doc(snap.data().classe)
        return classeRef.update(
            {
                "eleves":
                    FieldValue.arrayRemove(uid)
            }
        )

    });

exports.createUser = functions.https.onCall(async (data, context) => {
    try {
        const { firstName, lastName, email, classe, role, telephone } = data;
        const password = generatePassword();
        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can create new users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can create new users.');
        }

        //Checking that the new user role is valid
        if (!roleIsValid(role)) {
            throw new InvalidRoleError('The "' + role + '" role is not a valid role');
        }


        const userCreationRequest = {
            userDetails: data,
            status: 'Pending',
            password,
            createdBy: callerUid,
            createdOn: FieldValue.serverTimestamp()
        }

        const userCreationRequestRef = await admin.firestore().collection("userCreationRequests").add(userCreationRequest);


        const newUser = {
            email,
            emailVerified: false,
            password,
            displayName: firstName + ' ' + lastName,
            disabled: false
        }

        const userRecord = await admin
            .auth()
            .createUser(newUser);

        const userId = userRecord.uid;
        let userInfos = {
            email,
            nom: lastName,
            prenom: firstName,
            classe,
            status: ["absent",{}],
            absences: [],
            retards: [],
            profilepic: false,
            role,
            telephone,
            profilePicChanged: false,
        }
        if (role === "teacher") {
            userInfos.appointments = []
            userInfos.classe = ""
        }
        await admin.firestore().collection("users").doc(userId).set(userInfos);
        const classeRef = admin.firestore().collection("classes").doc(classe)
        await classeRef.get().then(function (doc) {
            if (doc.exists&&role!="teacher") {
                classeRef.set({
                    ...doc.data(),
                    eleves: [...doc.data().eleves, userId]
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        const claims = {};
        claims[role] = true;
        claims['PonctualUser'] = true;

        await admin.auth().setCustomUserClaims(userId, claims);

        await admin.firestore().collection("tempoSendEmail").doc(userId).set({
            email,
            lastName,
            firstName,
            password,
            role
        })


        await userCreationRequestRef.update({ status: 'Treated' });
        return { result: 'The new user has been successfully created.' };


    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }

});

exports.assignAdminClaim = functions.firestore
    .document('tempoAssignClaim/{tempoId}')
    .onCreate((snap, context) => {

        const claims = {};
        claims['admin'] = true;
        claims['PonctualUser'] = true;

        return admin.auth().setCustomUserClaims('eyYpIzknjsNXsWPUvVD18vMUABL2', claims);
    });

/**
* Here we're using Gmail to send 
*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.ponctual@gmail.com',
        pass: 't2)G96f<Rw%C5,Ky2'
    }
});


function sendEmailTrigger(emailData) {
    // 5. Send welcome email to new users

    const { email, password, firstName, lastName, role } = emailData;
    const mailOptions = {
        from: 'Ponctual <noreply.ponctual@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
        to: email,
        subject: 'Initialisation du mot de passe', // email subject
        html: `Bonjour, ${firstName} ${lastName} et bienvenue dans l'équipe en tant que ${role}
        Voici votre mot de passe : <b>${password}</b>`
    }
    // 6. Process the sending of this email via nodemailer
    return transporter.sendMail(mailOptions)
        .then(() => {
            console.log('Email sent ! ')
        })
        .catch(e => {
            console.log('Error sending email!')
        });
};


exports.sendMail = functions.firestore
    .document('tempoSendEmail/{tempoId}')
    .onCreate((snap, context) => {
        const user = snap.data()
        return sendEmailTrigger(user);
    });

exports.onDeleteUser = functions.firestore
    .document('users/{uid}')
    .onDelete((snap, context) => {
        const { uid } = context.params
        return admin.auth().deleteUser(uid)
            .then(function () {
                console.log('Successfully deleted user');
            })
            .catch(function (error) {
                console.log('Error deleting user:', error);
            });
    });