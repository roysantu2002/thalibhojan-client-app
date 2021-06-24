import moment from "moment";

export function createTimeSlots(fromTime) {
  let startTime = moment(fromTime, "HH A");

  let endT = "22 PM";
  let endTime = moment(endT, "HH A");
  let arr = [];
  if (startTime.isSame(endTime) || startTime.isAfter(endTime)) {
    endTime.add(22, "hours");
    startTime.add(10, "hours");
  }

  while (startTime < endTime) {
    startTime.add(120, "minutes");
    arr.push(new moment(startTime).format("HH A"));
  }
  return arr;
}

export function find_duplicate_in_array(array) {
  const count = {};
  let unavailableDates = [];
  array.forEach((item) => {
    console.log(item)
    if (count[item]) {
      count[item] += 1;
      return;
    }
    count[item] = 1;
  });

  for (let prop in count) {
    console.log(parseInt(process.env.REACT_APP_BOOKING_ALLOWED));
    if (count[prop] >= parseInt(process.env.REACT_APP_BOOKING_ALLOWED)) {
      unavailableDates.push(prop);
    }
  }
  return unavailableDates;
}

//generate booking or order number

export function generateOrderNumber(val) {
  let addOn = val && val ? val : 2;
  var addGenerated = Math.floor(10000 + Math.random() * 90000);
  const _id = (addGenerated + addOn).toString();
  return _id;
}

//generate customer id

export function generateCustomerId(val) {
  const rdate = Date.now().toString().substring(0, 7);
  // const resultVar = rdate.substring(0, 7)
  var addGenerated = Math.floor(100 + Math.random() * parseInt(rdate));
  const custid = val + addGenerated.toString();
  return custid;
}

export const roundTo2DecimalPoint = (value) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

// setWithExpiry

export function setWithExpiry(key, value) {
  if (window.localStorage.getItem(key) && !window.localStorage.getItem(key)) {
    window.localStorage.removeItem(key);
  }

  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 604800000,
  };
  window.localStorage.setItem(key, JSON.stringify(item));
}

//getWithExpiry
export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    window.localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// program to merge and remove duplicate value from an array

export function getUniqueAfterMerge(arr1, arr2) {
  // merge two arrays

  let arr = [...arr1, ...arr2];

  // removing duplicate
  let uniqueArr = [...new Set(arr)];

  return uniqueArr;
}

export const removeState = () => {
  try {
    window.localStorage.clear()
    window.localStorage.removeItem("state");
  } catch (err) {
    return undefined;
  }
};
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

//----

export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');