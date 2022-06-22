import React, { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};

const lengthIs = (length) => {
  return (value) => value.trim().length === length;
};

const getInputClassNames = (valid) => {
  return valid ? classes.control : `${classes.control} ${classes.invalid}`;
};

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    nameValid: true,
    streetValid: true,
    cityValid: true,
    zipValid: true,
  });
  const { nameValid, streetValid, cityValid, zipValid } = formValidity;

  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const zipRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;
    const zip = zipRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const cityIsValid = !isEmpty(city);
    const zipIsValid = lengthIs(5)(zip);

    setFormValidity({
      nameValid: nameIsValid,
      streetValid: streetIsValid,
      cityValid: cityIsValid,
      zipValid: zipIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && zipIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={getInputClassNames(nameValid)}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!nameValid && <p>Please enter a valid name</p>}
      </div>
      <div className={getInputClassNames(streetValid)}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!streetValid && <p>Please enter a valid street</p>}
      </div>
      <div className={getInputClassNames(cityValid)}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!cityValid && <p>Please enter a valid city</p>}
      </div>
      <div className={getInputClassNames(zipValid)}>
        <label htmlFor="zip">Zip Code</label>
        <input type="text" id="zip" ref={zipRef} />
        {!zipValid && <p>Please enter a valid zip code</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
