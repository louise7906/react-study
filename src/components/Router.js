import { HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth"; // 절대경로로 변경, jsconfig.json 수정후
import Home from "routes/Home";
//import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter =({isLoggedIn, userObj, refreshUser}) =>{

       return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >

            <Routes>
                {isLoggedIn ? (
                  
                   <>
                    <Route  path="/" element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                   
                    </>
                ) : (
                    <Route  path="/" element={<Auth />} />
                )
                }

            </Routes>


            </div>
        </Router>
    );
};

export default AppRouter;