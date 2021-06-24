import {
  UPDATE_ADDESS,
  UPDATE_DATE,
  UPDATE_TIME,
} from "../actions/action-types/action-names";

export function updateAddress(
  address,
  landmark,
  distance,
  completeAddress,
  pin
) {
  return {
    type: UPDATE_ADDESS,
    address,
    landmark,
    distance,
    completeAddress,
    pin,
  };
}

export function updateDate(bookDate) {
  return {
    type: UPDATE_DATE,
    bookDate,
  };
}

export function updateTime(bookTime) {
  return {
    type: UPDATE_TIME,
    bookTime,
  };
}
