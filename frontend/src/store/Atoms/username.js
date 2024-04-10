import { atom } from "recoil";

export const usernameAtom = atom({
    key : "usernameAtom", 
    default : { 
        username : null, 
        isLoading : true
    }
 }) 