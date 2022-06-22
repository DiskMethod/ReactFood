import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch(
      "https://react-http-da165-default-rtdb.firebaseio.com/meals.json"
    );
    const data = await response.json();
    const items = Object.keys(data).reduce((acc, curr) => {
      const meal = data[curr];
      acc.push(<MealItem key={meal.id} meal={meal} />);
      return acc;
    }, []);
    setMeals(items);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>{meals}</Card>
    </section>
  );
};

export default AvailableMeals;
