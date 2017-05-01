import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBrOC10smh9HeAkh9HtM-onT-nZbUZ9Ixo",
  authDomain: "freelancelist-991da.firebaseapp.com",
  databaseURL: "https://freelancelist-991da.firebaseio.com",
  projectId: "freelancelist-991da",
  storageBucket: "freelancelist-991da.appspot.com",
  messagingSenderId: "862028588209"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;