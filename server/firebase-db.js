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
  addDoc,
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

// // Store refreshToken
// exports.insertUserToDB = async (token) => {
//   try {
//     // Check if user already exists in DB
//     let isExist = false;
//     const q = query(collection(db, 'users'), where('token', '==', token));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       if (doc.exists(token)) {
//         const obj = doc.data();
//         isExist = true;
//       }
//     });

//     if (isExist) {
//       return;
//     }

//     await setDoc(doc(db, 'users', 'tokens'), {
//       token,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

exports.addUserToBD = async (user) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      user,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// get users from DB
exports.getUserFromDB = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  let users = [];
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.get('user.body.name')}`);
    const user = {
      name: doc.get('user.body.name'),
      uuid: doc.get('user.uuid'),
      trayId: doc.get('user.trayId'),
      username: doc.get('user.body.username'),
      password: doc.get('user.body.password'),
    };

    users.push(user);
  });

  // console.log(users);
  return users;
};

// Fetch Refresh Token if exist in FireStore
// exports.getTokenIfExist = async () => {
//   let refreshToken;
//   const docRef = doc(db, 'users', 'tokens');
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     const obj = docSnap.data();
//     refreshToken = obj.token;
//   } else {
//     console.log('No such document!');
//   }

//   return refreshToken;
// };
