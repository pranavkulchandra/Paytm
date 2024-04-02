import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "../Components/Button"
import { InputBox } from "../Components/InputBox"

export function Balance () { 

    const [ balance , setBalance ] = useState(0);
    const [ amount, setAmount ] = useState(0);
    const [ errorMessage , setErrorMessage ] = useState("");

    useEffect(() => { 
        try {
            axios.get("http://localhost:3000/api/v1/account/balance", { 
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            }).then((resp) => setBalance(resp.data.balance))
        } catch (error) {
            console.log(error)
        }
    } , [ balance]) 

    return (
        <div className="flex justify-center bg-slate-200 h-screen" >
            <div className="h-full flex flex-col justify-center space-y-2">
                <div className="border bg-white w-96 h-100 shadow-lg max-w-md space-y-4 rounded-xl">
                <div className="text-center font-semibold p-4">Balance</div>
                <div className={"font-bold text-center pb-4 " + (balance < 20 ? "text-red-400" : "text-slate-600")}>{balance ? balance : "Balance Loading"}</div>
                <div className="flex flex-col justify-center space-y-4">

                <div className="text-bold text-l font-sans text-center text-slate-500">Enter Amount to add Money</div>
                <InputBox onChange={(e) => { 
                    const value = e.target.value
                    const amountNumber = parseFloat(value);
                    if(!isNaN(amountNumber)) { 
                        setAmount(amountNumber)
                        setErrorMessage("")
                    } else { 
                        setErrorMessage("Input should be a number")

                    }
                }} placeHolder={"Amount in CAD$"}/>   
                <Button label={"Add Money"} onClick={()=> { 
                    try {

                        axios.post("http://localhost:3000/api/v1/account/addamount",{
                            amount
                        } , { 
                            headers : { 
                                "Authorization" : "Bearer " + localStorage.getItem("token")
                            }
                        }).then(resp => setBalance(resp.data.balance))
                        
                    } catch (error) {
                        console.log(error)
                    }
                }} /> 
                </div>
                {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
                </div>
                </div>
        </div>
    )
}