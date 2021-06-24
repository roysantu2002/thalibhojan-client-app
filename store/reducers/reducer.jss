
import * as actionTypes from "../actions/action-types/action-names"

export default function foodmenus (state, action) {
switch(action.type){
  case actionTypes.ADD_TO_CART:
    let addedItem = state.menus.find(item => item.id === action.id) 
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id)
    if(existed_item){
        addedItem.quantity += 1 
        return {
            ...state,
            total: state.total + addedItem.price 
        }
    } else {
        addedItem.quantity = 1;
        //calculating the total
        let newTotal = state.total + addedItem.price 
        
        return {
            ...state,
            addedItems: [...state.addedItems, addedItem],
            total : newTotal
        }
        
    } 
    default:
    return state 
}

}