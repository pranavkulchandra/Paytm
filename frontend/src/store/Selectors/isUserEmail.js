import { selector } from "recoil";
import { usernameAtom } from "../Atoms/username";

export const isUserEmail = selector({ 
    key : "isUserEmail", 
    get : ({get}) => { 
        const state = get(usernameAtom);
        return state.username;
        
    }
})