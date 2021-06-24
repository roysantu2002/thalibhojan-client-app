import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { generateOrderNumber } from "../../utils/helpers";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import OrderPlaced from "./OrderPlaced";
import CashPaymnet from "./CashPaymnet";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  removeItem,
  addToCart,
  subtractQuantity,
} from "../../store/actions/storeActions";

const orderNumber = generateOrderNumber(100);

const getFreshModelObject = () => ({
  uid: "",
  customerId: "",
  customerName: "",
  orderNumber: orderNumber,
  email: "",
  mobile: "",
  address: "",
  deliveryDate: moment(new Date()).add(1, "d").format("YYYY-MM-DD"),
  deliveryTime: "none",
  orderOption: "none",
  pin: "",
  distance: "",
  orderDetails: [],
  grandTotal: 0,
  paymentMethod: "none",
  paymentStatus: "",
  paymentId: "TB111",
  status: "Placed",
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: theme.palette.primary.dark,
    },
    "& .MuiSvgIcon-root.MuiStepIcon-completed": {
      color: theme.palette.success.dark,
    },
    "& .MuiStepLabel-active": {
      color: "#000000",
      fontSize: ".9rem",
      fontFamily: "Muli",
    },
    "& .MuiStepLabel-completed": {
      color: theme.palette.success.dark,
      fontSize: ".8rem",
      fontFamily: "Muli",
    },
    "&.Mui-disabled .MuiStepLabel-label": {
      color: theme.palette.secondary.dark,
    },
  },
  container: {
    height: "80px",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Order() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const steps = getSteps();

  const addedItems = useSelector((state) => state.storeItems.addedItems);
  const firebase = useSelector((state) => state.firebase);

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function getSteps() {
    // debugger;
    return ["CHOOSE", "DECIDE", "ORDER"];
  }

  const removeFoodItem = (id) => {
    setLoading(true);
    dispatch(removeItem(id));
    setLoading(false);
  };

  const subtractItem = (id) => {
    setLoading(true);
    dispatch(subtractQuantity(id));
    setLoading(false);
  };
  const addItem = (id) => {
    console.log(id);
    setLoading(true);
    dispatch(addToCart(id));
    setLoading(false);
  };

  console.log(addedItems);

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(getFreshModelObject);

  values.orderDetails = addedItems;

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <StepOne
            handleNext={handleNext}
            activeStep={activeStep}
            handlePrev={handlePrev}
            steps={steps}
            {...{
              values,
              setValues,
              errors,
              setErrors,
              handleInputChange,
              resetForm,
              OrderedFoodItems: addedItems,
            }}
          />
        );
      case 1:
        return (
          <StepTwo
            handleNext={handleNext}
            activeStep={activeStep}
            handlePrev={handlePrev}
            steps={steps}
            {...{
              values,
              setValues,
              errors,
              setErrors,
              handleInputChange,
              resetForm,
              OrderedFoodItems: values.orderDetails,
            }}
          />
        );
      case 2:
        return (
          <StepThree
            handleNext={handleNext}
            activeStep={activeStep}
            handlePrev={handlePrev}
            steps={steps}
            {...{
              values,
              setValues,
              errors,
              setErrors,
              handleInputChange,
              resetForm,
              OrderedFoodItems: values.orderDetails,
              addedItems,
              setActiveStep,
            }}
            setBookingid={orderNumber}
            removeFoodItem={removeFoodItem}
            addItem={addItem}
            subtractItem={subtractItem}
          />
        );
      default:
        return "Unknown";
    }
  }

  return (
    <section className={classes.root}>
      <Container spacing={2} style={{ margin: 10 }}>
        <Typography variant="h2" align="center" className={classes.title}>
          Order Healthy Thali Meals
        </Typography>

        <Stepper
          alternativeLabel
          activeStep={activeStep}
          className={classes.container}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel style={{ fontSize: "12px", color: "white" }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          values.paymentMethod === "Cash" ? (
            <CashPaymnet values={values} />
          ) : (
            <OrderPlaced
              values={values}
              setActiveStep={setActiveStep}
            ></OrderPlaced>
          )
        ) : (
          <>{getStepsContent(activeStep)}</>
        )}
      </Container>
    </section>
  );
}
