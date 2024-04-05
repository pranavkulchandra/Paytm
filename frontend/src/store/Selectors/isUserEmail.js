import { selector } from "recoil";
import { userEmailState } from "../Atoms/username";

export const isUserEmail = selector({ 
    key : "isUserEmail", 
    get : ({get}) => { 
        const state = get(userEmailState);
        return state.username
    }
})