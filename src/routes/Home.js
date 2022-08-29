import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";

const Home=({userObj})=>{
    //console.log(userObj);
    const [tweet, setTweet]=useState("");
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

        dbService.collection("tweets").onSnapshot((snapshot)=>{
            const newArray=snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    },[]);

   // console.log(tweets)

    const onSubmit=async (event)=>{
        event.preventDefault();
        await dbService.collection("tweets").add({
            text:tweet,
            createdAt:Date.now(),
            creatorId:userObj.uid,
        });
        setTweet("");
    };

    const onChange=(event)=>{
        event.preventDefault();
        const {
            target:{value},
        }=event;
        setTweet(value)
    }
   
    return (
        <>
        <form onSubmit={onSubmit}>
            <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={120}/>
            <input type="submit" value="Tweet" />
        </form>
        <div>
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
        </>
    );

};

export default Home;