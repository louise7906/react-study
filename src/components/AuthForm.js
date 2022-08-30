import { authService, firebaseInstance} from "fbase";
import { useState } from "react";


const AuthForm=()=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [newAccount, setNewAccount]=useState(true); 
    //newAccount 값에 따라 회원가입 또는 로그인 기능을 하도록
    const [error, setError]=useState("");

   //useState함수로 상태 만들고 onChange, onSubmit 함수로 이벤트 연결

    const onChange=(event)=>{
        //console.log(event.target.name); // 어떤 input엘리먼트에서 오는값이 구분하기위해
        const {
            target:{name,value},
        }=event;
        if(name==="email"){
            setEmail(value);
        }
        else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit=async(event)=>{
        event.preventDefault(); // submit시 새로고침 방지를 위해
        try{
            let data;

            if(newAccount){
                //create account
                //firebase에서 제공하는 인증기능 사용
                //await 서버로 값을 요청해서 받기까지 기다린다
                data=await authService.createUserWithEmailAndPassword(email,password);
            }else{
                //login
                data=await authService.signInWithEmailAndPassword(email,password);

            }
            console.log(data);
        }catch(error){
            //console.log(error)
            setError(error.message);
        }
       
    }
    //토글 버튼 : useState함수에 함수를 인자로 전달하면 인자로 전달한 함수의 1번째 인자에 이전의 상태가 넘어옴
    const toggleAccount=()=>setNewAccount((prev)=>!prev);
    //console.log(newAccount);

    return(
        <>
        <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required vlaue={password} onChange={onChange} className="authInput" />
                <input type="submit" value={newAccount?"Create Account":"Log In"} className="authInput authSubmit" />
                {error && <span className="authError"> {error} </span> }           

            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount? "Sign In": "Create Account"}
            </span>

        
        </>

    );



};

export default AuthForm;
