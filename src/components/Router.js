import { HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth"; // 절대경로로 변경, jsconfig.json 수정후
import Home from "routes/Home";
//import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter =({isLoggedIn, userObj}) =>{

       return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route  path="/" element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <Route  path="/" element={<Auth />} />
                )
                }

            </Routes>
        </Router>
    );
};

export default AppRouter;