import { useEffect, useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { usernameAtom } from "../store/Atoms/username";


export function  AppBar ()  { 

    const [ username, setUsername ]= useRecoilState(usernameAtom);
    const navigate = useNavigate("")

    useEffect(()=>{
        try {
            axios.get("http://localhost:3000/api/v1/user/me", {
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then(resp => 
                setUsername(resp.data.username))
            console.log("/me called triggred")
        } catch (error) {
            console.log(error)
        }
    },[username])


    
    return (
        <div>
            {username ? (
                <LoggedInComp username={username} setUsername={setUsername}/>                
            ) : (
                <LoggedOutCOmp />
            )}
        </div>
    )
        
        
    

}


function LoggedInComp({username, setUsername}) { 

    const navigate = useNavigate()

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
                    setUsername(null);
                    navigate("/signin")
                }}/>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                {username[0]} 
                </div>
            </div>
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