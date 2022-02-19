import {AsyncStorage} from "react-native";
// const value = AsyncStorage.getItem('SELECTED_THEME');
// const initialState = value
const initialState = true
export const themeReducer = (state = initialState, action)=>{
    console.log('state ' + state)
    console.log('action ' + JSON.stringify(action))
    if(action.type == 'change_theme'){
        return action.payload
    }
    return state
}
