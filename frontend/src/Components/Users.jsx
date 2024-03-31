import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Users() { 

    const [ users, setUsers ] = useState([]);
    const [ filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, { 
            headers : { 
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        } ).then(resp => { 
            setUsers(resp.data.user)
        }).catch(err => {console.log(err)})
    }, [filter])

    return <>
         <div>Users</div>
         <div>
            <input onChange={e => { setFilter(e.target.value)}} type="text" label={"Search Users"} className="rounded-lg w-full h-15 border border-slate-700 shadow-md" />
         </div>
         <div className="mt-4">{users.map(user => <User user={user}/>)}</div>
    </>
}


function User({user}) { 
    const navigate = useNavigate();


    return <div className="flex flex-row justify-between">
        <div className="flex">
            <div className="mr-2 rounded-full w-12 h-12 px-5 py-3 text-xl bg-slate-400">
                {user.firstname[0].toUpperCase()} 
            </div>
            <div className="px-1 py-3 sh-full font-semibold text-xl">
                {user.firstname} {user.lastname} 
            </div>
        </div>
        <div>
            <Button onClick={(e) => { 
                navigate("/send?toUserId=" + user._id + "&name=" + user.firstname)                
            }} label={"Send Money"}/>
        </div>
    </div>    

}