import React, { Component } from "react";
import { Consumer } from "./../Context";
import Setgoals from "./setGoals";
class Calories extends Component {
  state = {
    fat: "34.4",
    carb: "274.4",
    protein: "99.4"
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { entries, goal } = value;
          const calculateTotalFat = entries.reduce(
            (totalFat, entry) => totalFat + entry.fat * entry.servings,
            0
          );

          const calculateTotalCarbs = entries.reduce(
            (totalCarbs, entry) => totalCarbs + entry.carb * entry.servings,
            0
          );
          const calculateTotalProtein = entries.reduce(
            (totalProtein, entry) =>
              totalProtein + entry.protein * entry.servings,
            0
          );

          const calculateTotalCalories = entries.reduce(
            (totalCalories, entry) =>
              totalCalories + entry.calories * entry.servings,
            0
          );
          return (
            <div>
              <div className="card card-body mb-3">
                <div className="row-header">
                  <h3 className="text-center mb-3">
                    Calories:{calculateTotalCalories}/{goal.calories}
                  </h3>
                  <span id="caloriesGoal">
                    <Setgoals />
                  </span>
                </div>
                <ul className="list-group">
                  <li className="list-group-item">
                    Fats: {calculateTotalFat}/{goal.fat}g
                  </li>
                  <li className="list-group-item">
                    carb: {calculateTotalCarbs}/{goal.carbs}g
                  </li>
                  <li className="list-group-item">
                    Protein: {calculateTotalProtein}/{goal.protein}g
                  </li>
                </ul>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Calories;
