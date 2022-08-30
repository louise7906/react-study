import { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Tweet from "components/Tweet";
//import { v4 as uuidv4 } from 'uuid';
import TweetFactory from "components/TweetFactory";

const Home=({userObj})=>{
    //console.log(userObj);

    const [tweets, setTweets]=useState([]);


//get()함수를 쓰면 처음 화면을 렌더링할때만 실행됨.실시간이 안됨
    // const getTweets=async()=>{
    //     const dbTweets= await dbService.collection("tweets").get();
    //     //console.log(dbTweets); //스냅샷 보임
    //     //dbTweets.forEach((document)=>console.log(document.data())); //데이터 보임
    //    dbTweets.forEach((document)=>{
    //     const tweetObject={...document.data(), id: document.id}
    //     setTweets((prev)=>[tweetObject, ...prev])
    //     });
    
    // };  

//get대신 onSnapshot함수 사용하여 실시간으로 업데이트 가능/map함수는 배열 반환
    useEffect(()=>{
       // getTweets();

        dbService.collection("tweets").orderBy("createdAt","desc").onSnapshot((snapshot)=>{
            const newArray=snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    },[]);

   // console.log(tweets)


   
    return (
       <div className="container">
       <TweetFactory userObj={userObj}/>
        <div style={{marginTop:30}}>
            {tweets.map((tweet)=>(
                // <div key={tweet.id}>
                //     <h4>{tweet.text}</h4>
                // </div>

                <Tweet key={tweet.id} 
                tweetObj={tweet}
                isOwner={tweet.creatorId===userObj.uid}
                />
               
            ))}
        </div>
       </div>
    );

};

export default Home;