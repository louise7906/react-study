//useState : [상태,상태관리함수이름]
//useEffect : 특정한 시점에 실행되는 함수
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";  // 모듈 단위로 import 패키지 전체는 무거워짐


function App() {
  const [init, setInit]=useState(false);
 
  const [isLoggedIn, SetIsLoggedIn]=useState(false);
 //console.log(authService.currentUser)
  //setInterval(() => console.log(authService.currentUser), 2000);
  //로그인 마치고 2초마다 실행해서 currentuser값을 출력
  const [userObj, setUserObj]=useState(null);
  //로그인 정보를 관리하기 위해 useState만듦

  //firebase로그인 정보를 받게 되면 useEffect 함수로 시점을 잡고(onAuthStateChanged) 보여줄 화면랜더링
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        SetIsLoggedIn(user);
        setUserObj(user); 
      }else{
        SetIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]  );


  return (
  <>
  {init ? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />) : ("initiallizing..")}

  <footer>&copy; {new Date().getFullYear()} SYtwitter </footer>
  </>
  );
}

export default App;
