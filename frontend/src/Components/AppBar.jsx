
import { usernameAtom } from "../store/Atoms/username";
import { isUserLoading } from "../store/Selectors/isLoading";
import  {isUserEmail}  from "../store/Selectors/isUserEmail";
import { useEffect, useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";





export function  AppBar ()  { 

    const  userEmail  = useRecoilValue(isUserEmail);
    const isLoading  = useRecoilValue(isUserLoading);
    const setUsername  = useSetRecoilState(usernameAtom)


    useEffect(()=>{
        try {
            axios.get("http://localhost:3000/api/v1/user/me", {
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(resp => 
                setUsername({username :  resp.data.username , isLoading : false}))
        } catch (error) {
            console.log(error)
        }
    },[userEmail])



    return (
        <div>
            {userEmail ? (
                <LoggedInComp/>                
            ) : (
                <LoggedOutCOmp />
            )}
        </div>
    )
        
        
    

}


function LoggedInComp() { 

    const navigate = useNavigate()
    const  [showMenu , setShowMenu ] = useState(false)
    const userEmail  = useRecoilValue(isUserEmail);
    const setUser  = useSetRecoilState(usernameAtom)

    const onclickMenu =() => { 
        return setShowMenu(!showMenu)
    }

    return (
        <div className="shadow h-14 flex justify-between">
        <div onClick={() => { 
            navigate("/dashboard");
        }} className="flex flex-col justify-center h-full cursor-pointer ml-4">
            PayTM
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <Button label={"Signout"} onClick={()=> { 
                    localStorage.removeItem("token")
                    setUser({username :null , isLoading : true});
                    navigate("/signin")
                }}/>
            </div>
            <div className="mt-1 mx-4">
                <Button label={"Balance"} onClick={()=> { 
                    navigate("/balance")
                }}  /> 
            </div>
            <button onClick={onclickMenu} className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <span className="flex flex-col justify-center h-full text-xl">
                {userEmail[0]} 
                </span>
            </button>
            {showMenu && (
                <div className="absolute mt-14 right-0 w-40 bg-slate-400 border border-gray-200 rounded-lg shadow-lg">
                    <button className="block w-full py-2 text-left px-4 hover:bg-gray-100" onClick={() => { navigate("/balance"); }}>Balance</button>
                    <button className="block w-full py-2 text-left px-4 hover:bg-gray-100 border-black" onClick={() => { localStorage.removeItem("token"); setUsername(null); navigate("/signin"); }}>Sign Out</button>    
                </div>
            )}
        </div>
    </div>
)
    
}

    function LoggedOutCOmp() { 

    const navigate = useNavigate("")

    return (
        <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <Button label={"Sign In"} onClick={() => { 
                    navigate("/signin");
                }}/>
            </div>
            <div>
                <div className="flex flex-col justify-center mr-2 h-full text-xl">
                 <Button label={"Sign Up"} onClick={() => { 
                    navigate("/signup")
                 }}/>
                </div>
            </div>
        </div>
    </div>
)
    
}