/* eslint-disable no-fallthrough */
import { HYDRATE } from "next-redux-wrapper";
import { catalog, thalis, options, subsOptions, mainMenu } from "../data/menus";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
} from "../actions/action-types/action-names";
import { getWithExpiry } from "../../utils/helpers";
import { loadState } from "../../utils/helpers";
import { roundTo2DecimalPoint } from "../../utils/helpers";

const localState = loadState();

console.log(localState);

const persistedState =
  localState && localState
    ? { ...localState, options: options, mainMenu: mainMenu }
    : {
        mainMenu: mainMenu,
        thalis: thalis,
        catalog: catalog,
        options: options,
        subsOptions: subsOptions,
        total: 0,
        shipping: 0,
        addedItems: [],
      };

const initialState = {
  thalis: thalis,
  catalog: catalog,
  options: options,
  subsOptions: subsOptions,
  total: 0,
  shipping: 0,
  addedItems: [],
};

const reducer = (state = persistedState, action) => {
  let addedItem = "";
  switch (action.type) {
    // case ADD_TO_LOCAL:
    //   console.log(action.name);
    //   let localItems = JSON.parse(getWithExpiry("addedItems")) && JSON.parse(getWithExpiry("addedItems")).length ? JSON.parse(getWithExpiry("addedItems")) : []

    //   setWithExpiry(action.name, JSON.stringify(state.addedItems))
    //   // window.localStorage.setItem(action.name, JSON.stringify(state.addedItems));
    // //   let localItems = JSON.parse(getWithExpiry("addedItems")) && JSON.parse(getWithExpiry("addedItems")).length ? JSON.parse(getWithExpiry("addedItems")) : []
    // //   const addedItems = localItems.concat(state.addedItems.filter(value => !localItems.includes(value)));
    // //  console.log(addedItems)
    // //   // let addItems = localItems && JSON.parse(getWithExpiry("addedItems")).length > 1 ? JSON.parse(getWithExpiry("addedItems")).concat(state.addedItems) : state.addedItems
    // //   setWithExpiry(action.name, JSON.stringify(addedItems))
    //   return { ...state};

    case HYDRATE:
      return { ...state, ...action.payload };

    case ADD_TO_CART:
      Object.entries(state.options).map((menu) => {
        return menu[1].forEach((item) => {
          if (item.id.toString().trim() === action.id.toString().trim()) {
            addedItem = item;
          }
        });
      });

      //check if the action id exists in the addedItems
      let existed_item = state.addedItems.find((item) => action.id === item.id);

      if (existed_item) {
        if (existed_item) {
          if (existed_item.quantity === 10) {
            addedItem.quantity = 10;
            let newTotal = existed_item.price * 10
            return {
              ...state,
              total: newTotal,
              addedItems: [...state.addedItems, addedItem],
            };
          } else {
            addedItem.quantity += 1;
            let newTotal = state.total + existed_item.price;
            return {
              ...state,
              total: newTotal,
              // addedItems: [...state.addedItems, addedItem],
            };
          }
        }
      } else {
        addedItem.quantity = 1;
        let newTotal = state.total + addedItem.price;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }

    case "REMOVE_ITEM":
      let itemToRemove = state.addedItems.find((item) => action.id === item.id);
      let new_items = state.addedItems.filter((item) => action.id !== item.id);
      let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;

      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    case "RESET_CART":
      return {
        ...state,
        addedItems: [],
        total: 0,
        shipping: 0,
      };

    // case "ADD_QUANTITY_WITH_NUMBER":
    //   Object.entries(options).map((menu) => {
    //     return menu[1].forEach((item) => {
    //       if (item.id.toString().trim() === action.id.toString().trim()) {
    //         addedItem = item;
    //       }
    //     });
    //   });

    //   let existed_item = state.addedItems.find((item) => action.id === item.id);

    //   if (existed_item) {
    //     console.log(existed_item);
    //     existed_item.quantity = existed_item.quantity + action.qty;

    //     if (existed_item.quantity >= 11) {
    //       existed_item.quantity = 11;
    //     }
    //     if (existed_item.quantity <= 1) {
    //       existed_item.quantity = 1;
    //     }

    //     return {
    //       // addedItems: [...state.addedItems],
    //       total: state.total + existed_item.price * action.qty,
    //     };
    //   } else if (state.total >= 0) {
    //     addedItem.quantity = action.qty;
    //     let newTotal = state.total + addedItem.price * action.qty;
    //     return {
    //       ...state,
    //       addedItems: [...state.addedItems, addedItem],
    //       total: newTotal,
    //     };
    //   };

    case SUB_QUANTITY:
      // Object.entries(state.options).map((menu) => {
      //   return menu[1].forEach((item) => {
      //     if (item.id.toString().trim() === action.id.toString().trim()) {
      //       addedItemId = item;
      //     }
      //   });
      // });

      let addedItemId = state.addedItems.find((item) => item.id === action.id);
      //if the qt == 0 then it should be removed
      if (addedItemId.quantity === 1) {
        let new_items = state.addedItems.filter(
          (item) => item.id !== action.id
        );
        let newTotal = state.total - addedItemId.price;
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
        };
      } else {
        addedItemId.quantity -= 1;
        let newTotal = state.total - addedItemId.price;
        return {
          ...state,
          total: newTotal,
        };
      }

    default:
      return state;
  }
};
export default reducer;
