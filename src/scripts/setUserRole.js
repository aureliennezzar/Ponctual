import { db } from '../services/firebase';
export const setUserRole = (userDoc, oThis) => {
  const docRef = db.collection('users').doc(userDoc);

  docRef.get().then((doc) => {
    if (doc.exists) {
      let data = doc.data();
      // let userInfo = [data.nom,data.prenom,data.email,data.classe,data.telephone,data.profilepic,data.status]
      let userInfo = {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        classe: data.classe,
        telephone: data.telephone,
        profilepic: data.profilepic,
        status: data.status
      }
      oThis.setState({
        authenticated: true,
        loading: false,
        userRole: data.role,
        userInfo: {...userInfo}
        });
    } else {
      oThis.setState({
        loading: false,
        userRole: null
      });
      console.log("No such document!");
    }
  }).catch(function (error) {
    oThis.setState({
      loading: false,
      userRole: null
    });
    console.log("Error getting document:", error);
  });
}