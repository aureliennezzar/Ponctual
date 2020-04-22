import { db } from './services/firebase';
export const setUserRole = (userDoc, state, setState) => {
  const docRef = db.collection('users').doc(userDoc);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const { classe,  profilepic, status, role } = doc.data();
      const userInfo = {
        classe,
        profilepic,
        role,
        status
      }
      setState({
        ...state,
        userInfo,
        authenticated: true,
        loading: false,
        role
      })
    } else {
      setState({
        ...state,
        loading: false
      })
      console.log("No such document!");
    }
  }).catch(function (error) {
    setState({
      ...state,
      loading: false
    })
    console.log("Error getting document:", error);
  });
}