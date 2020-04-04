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
        status
      }
      app.setState({
        authenticated: true,
        loading: false,
        role,
        userInfo
        });
    } else {
      app.setState({
        loading: false,
        role: null
      });
      console.log("No such document!");
    }
  }).catch(function (error) {
    app.setState({
      loading: false,
      role: null
    });
    console.log("Error getting document:", error);
  });
}