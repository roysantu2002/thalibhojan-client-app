import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

let availbleDates = [];

// var unavailableDates = [
//   "2021-04-17",
//   "2021-04-16",
//   "2021-04-18",
//   "2021-04-21",
//   "2021-04-28",
// ];
// unavailableDates.push(moment(new Date()).format("YYYY-MM-DD"));
// unavailableDates.push(moment(new Date()).add(1, "d").format("YYYY-MM-DD"));



export default function DatePicker(props) {

  const {
    name,
    label,
    value,
    onChange,
    deliveryDate,
    shouldDisableDate,
  } = props;

  function filterWeekends(date) {
    var formattedDate = moment(date).format("YYYY-MM-DD");
    if (!shouldDisableDate.includes(formattedDate)) {
      if (!availbleDates.includes(date)) {
        availbleDates.push(date);
      }
      return false;
    } else {
      return true;
    }
  }
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });



  return (
   
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value || moment(deliveryDate).add(1, "d")}
        maxDate={moment(deliveryDate).add(30, "d")}
        shouldDisableDate={filterWeekends}
        disablePast
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>
  );
}
