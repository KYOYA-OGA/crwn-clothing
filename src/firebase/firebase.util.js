import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyD7frot6V1IV_xEztAfDDawKXSrX5Gi4vA',
  authDomain: 'crwn-db-cff6d.firebaseapp.com',
  projectId: 'crwn-db-cff6d',
  storageBucket: 'crwn-db-cff6d.appspot.com',
  messagingSenderId: '856331361085',
  appId: '1:856331361085:web:f94bf3f73ebd4f13a58354',
  measurementId: 'G-0J3FZ8P1HT',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  // console.log(firestore.doc('users/dsfgakd'))
  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
