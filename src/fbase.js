// firebase/app에 포함된 모든 모듈을 firebase란 객체에 부여
//v9 firebase부터 경로명 바뀜
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

  //export default firebase.initializeApp(firebaseConfig)
  //firebase를 초기화해서 모듈로 내보낼수 있음

  firebase.initializeApp(firebaseConfig)

  export const firebaseInstance=firebase;
  export const authService=firebase.auth();  //다른 파일에서 참조하도록 내보냄
  export const dbService=firebase.firestore();
  export const storageService=firebase.storage(); // 사진 동영상 저장