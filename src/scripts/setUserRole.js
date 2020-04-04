import { db } from '../services/firebase';
export const setUserRole = (userDoc, app) => {
  const docRef = db.collection('users').doc(userDoc);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const {nom, prenom, email, classe, telephone, profilepic, status, role} = doc.data();
      const userInfo = {
        nom,
        prenom,
        email,
        classe,
        telephone,
        profilepic,
        role,
        status
      }
      app.setState({
        authenticated: true,
        loading: false,
        userInfo
        });
    } else {
      app.setState({
        loading: false,
      });
      console.log("No such document!");
    }
  }).catch(function (error) {
    app.setState({
      loading: false,
    });
    console.log("Error getting document:", error);
  });
}