import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";

export function Dashboard () { 

    return <div>
        <div className="m-8" >
            <Balance />
            <Users />
        </div>
    </div>
}