import classes from "./MealsSummary.module.css";

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>Food Item, delivered to you!</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with heigh-quality ingredients, just-in-time
        and of course by experience chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
