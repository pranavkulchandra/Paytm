import { useState } from "react";
import { Button } from "../Components/Button";
import { SendButton } from "../Components/SendButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InputBox } from "../Components/InputBox";
import axios from "axios";

export function SendMoney () { 

    const [ searchParams ] = useSearchParams();
    const toUserId = searchParams.get("toUserId");
    const name = searchParams.get("name");
    const [ amount , setAmount ]= useState(0);
    const navigate = useNavigate();



    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className=" h-full flex flex-col justify-center">
                <div className="border h-min max-w-md p-4 w-96 bg-white rounded-lg shadow-lg space-y-4">
                    <div className="flex flex-col space-y-1.5 p-6">
        <div className="text-center text-xl font-bold">Send Money</div>
        </div>
        <div className="p-6">
            <div className="flex items-center space-x-4">
                <div className="rounded-full w-12 h-12 bg-slate-400 hover:bg-slate-800 text-white font-bold focus:ring-slate-800 flex items-center justify-center">
        <div>FN</div>
        </div>
        <div>
        <h3 className="text-2xl font-bold ">Name</h3>
        </div>
        </div>
        </div>
        <div className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount (C$)</div>
        <InputBox label={"amount"} placeHolder={"Amount in CAD"} onChange={(e) => {setAmount(e.target.value)}}/>
        <div className="p-2">
        <SendButton label={"Send"} onClick={async() => { 
            console.log(toUserId, "Test ID")
            axios.post("http://localhost:3000/api/v1/account/transfer", { 
                amount, 
                toUserId
            }, { 
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("token"), 
                }
            })
            navigate("/balance")
        }} />
        </div>
        </div>
        </div>
        </div>
        
    )
}