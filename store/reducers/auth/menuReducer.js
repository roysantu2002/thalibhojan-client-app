import { ADD_TO_CART } from "../../actions/action-types/action-names";

export default function foodmenus(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let addedItem = state.menus.find((item) => item.id === action.id);
      let existed_item = state.addedItems.find((item) => action.id === item.id);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.price,
        };
      } else {
        addedItem.quantity = 1;
        let newTotal = state.total + addedItem.price;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }
    default:
      return state;
  }
}
