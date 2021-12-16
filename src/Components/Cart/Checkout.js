import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isNotSixChars = (value) => {
  return value.trim().length !== 6;
};
const isNumericInput = (value) => {
  return !isNaN(parseInt(value));
};
const checkEmail = (value) => {
  return value.includes("@");
};

const isInvalidClass = (isTrue) => {
  return `${classes.control} ${isTrue ? "" : classes.invalid}`;
};

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    email: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const emailInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredEmailIsValid = checkEmail(enteredEmail);
    const enteredPostalCodeIsValid =
      !isNotSixChars(enteredPostalCode) && isNumericInput(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      email: enteredEmailIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredEmailIsValid &&
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      email: enteredEmail,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={isInvalidClass(formValidity.name)}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={isInvalidClass(formValidity.email)}>
        <label htmlFor="email">Your E-Mail</label>
        <input ref={emailInputRef} type="email" id="email" />
        {!formValidity.email && <p>Please enter a valid E-Mail.</p>}
      </div>
      <div className={isInvalidClass(formValidity.street)}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={isInvalidClass(formValidity.postalCode)}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" />
        {!formValidity.postalCode && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={isInvalidClass(formValidity.city)}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
