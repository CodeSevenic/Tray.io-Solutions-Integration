const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  where,
  query,
} = require('firebase/firestore/lite');

// =========== CODE TO STORE THE USER ACCESS IN FIREBASE ========== //

const firebaseConfig = {
  apiKey: 'AIzaSyDo9FWRH0E-944bKboPoiKqEwdyQry3N0c',
  authDomain: 'tray-solution-db.firebaseapp.com',
  projectId: 'tray-solution-db',
  storageBucket: 'tray-solution-db.appspot.com',
  messagingSenderId: '923279392016',
  appId: '1:923279392016:web:4943ab72d4e11b3074f995',
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

// Store refreshToken
exports.insertUserToDB = async (token) => {
  try {
    let isExist = false;
    const q = query(collection(db, 'users'), where('token', '==', token));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists(token)) {
        const obj = doc.data();
        isExist = true;
      }
    });

    if (isExist) {
      return;
    }

    await setDoc(doc(db, 'users', 'tokens'), {
      token,
    });
  } catch (e) {
    console.log(e);
  }
};

// Fetch Refresh Token if exist in FireStore
exports.getTokenIfExist = async () => {
  let refreshToken;
  const docRef = doc(db, 'users', 'tokens');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const obj = docSnap.data();
    refreshToken = obj.token;
  } else {
    console.log('No such document!');
  }

  return refreshToken;
};
