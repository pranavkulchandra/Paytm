import { AppBar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";

export function Dashboard () { 

    return <div>
        <AppBar />
        <div className="m-8" >
            <Balance />
        </div>
    </div>
}