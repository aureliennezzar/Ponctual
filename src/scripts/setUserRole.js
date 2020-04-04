import { db } from '../services/firebase';
export const setUserRole = (userDoc, oThis) => {
  const docRef = db.collection('users').doc(userDoc);

  docRef.get().then((doc) => {
    if (doc.exists) {
      let data = doc.data();
      // let userInfo = [data.nom,data.prenom,data.email,data.classe,data.telephone,data.profilepic,data.status]
      const {nom, prenom, email, classe, telephone, profilepic, status, role} = data
      let userInfo = {
        nom,
        prenom,
        email,
        classe,
        telephone,
        profilepic,
        status
      }
      oThis.setState({
        authenticated: true,
        loading: false,
        role,
        userInfo: {...userInfo}
        });
    } else {
      oThis.setState({
        loading: false,
        role: null
      });
      console.log("No such document!");
    }
  }).catch(function (error) {
    oThis.setState({
      loading: false,
      role: null
    });
    console.log("Error getting document:", error);
  });
}