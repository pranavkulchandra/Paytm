import { useState } from "react";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/Subheading";
import { Button } from "../Components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../Components/BottomWarning";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usernameAtom } from "../store/Atoms/username";

export function SignIn() { 

    const [ username, setUsername] = useState("")
    const [ password , setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);
    const setUser = useSetRecoilState(usernameAtom)
    const [ errorMessage , setErrorMessage] = useState("")
    const [ emailError, setEmailError ] = useState("");
    const navigate = useNavigate();




    const callSignin = async() => { 
            try {
                if(!password) { 
                   return setErrorMessage("Password cannot be empty")
                }
                const resp = await axios.post("http://localhost:3000/api/v1/user/login", { 
                username, 
                password
            })
            localStorage.setItem("token", resp.data.token);
            setUser({username : username, isLoading : false})
            navigate("/dashboard")
                
            } catch (error) {
                if(error.response.status === 401) { 
                    setErrorMessage(error.response.data.message || "Incorrect inputs/email taken");
                } else if ( error.response.status === 402) { 
                    setErrorMessage(error.response.data.message || "Incorrect Password"); 

                } else { 
                    setErrorMessage("An Error has occured please try again later")
                }
            }
            
    }

    const toggleShowPassword = () => { 
        return setShowPassword(!showPassword)
    }

    return  <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className=" bg-white rounded-lg text-center h-max p-2 px-4">
                <Heading label={"Signin"}/>
                <SubHeading label={"Enter Details Here"}/>
                <div className="relative">
                <InputBox onFocus={()=> setEmailError("")} label={"Email"} placeHolder={"jpinto@gmail.com"} onChange={e=> { 
                    setUsername(e.target.value)
                }} onBlur={(e) => { 
                    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailpattern.test(e.target.value)) { 
                        setEmailError("Invalid email address")
                    } else { 
                        setEmailError("")
                    }
                    }} />
                <div>
                {emailError && <div className="inset-y-0 right-0 text-red-500 text-sm text-center">{emailError}</div>}
                </div>
                </div>
                <div className="relative">
                <InputBox onFocus={()=> setErrorMessage("")} type={showPassword ? "text" : "password"} label={"Password"} placeHolder={"****"} onChange={e=> { 
                    setPassword(e.target.value)
                }} />
                {errorMessage && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-10 pt-8 pointer-events-none">
                <div className="text-red-500 text-center text-sm">{errorMessage}</div></div>)}
                <div className="absolute inset-y right-1 bottom-1 cursor-pointer" onClick={toggleShowPassword}>{
                    showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                        </svg>

                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                    )
                }
                
                </div>

                </div>
                <div className="p-4">
                <Button label={"Signin"} onClick={callSignin}/>
                </div>
                <BottomWarning buttonText={"SignUp"} to={"/signup"} label={"Don't Have an account?"}/>
            </div>
        </div>
        
    </div>
}

