import { selector } from "recoil"
import { usernameAtom } from "../Atoms/username"

export const isUserLoading = selector({
    key : "UserLoading", 
    get: ({get}) => { 
        const state = get(usernameAtom)
        console.log(state)
        return state.isLoading;
    }
})