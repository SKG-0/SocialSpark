import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAhNrtSInbaoGN_H9j1Sgj-zKEVoO5Mm0g",
    authDomain: "socialspark-3dcd1.firebaseapp.com",
    databaseURL: "https://socialspark-3dcd1.firebaseio.com",
    projectId: "socialspark-3dcd1",
    storageBucket: "socialspark-3dcd1.appspot.com",
    messagingSenderId: "390050939532",
    appId: "1:390050939532:web:a2d366369ceafcc4fff1a9",
    measurementId: "G-MZSF423KGQ"
};
const Firebase=firebase.initializeApp(firebaseConfig)
export default Firebase;