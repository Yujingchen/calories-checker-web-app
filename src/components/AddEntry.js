import React, { Component } from "react";
import { Consumer } from "../Context";
import classnames from "classnames";
import uuid from "uuid";
import "../App.css";

class AddEntry extends Component {
  state = {
    id: uuid(),
    name: "",
    perFat: "",
    perCarbs: "",
    perProtein: "",
    size: "",
    servings: "",
    calories: "200",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const {
      name,
      size,
      servings,
      perFat,
      perCarbs,
      perProtein,
      id,
      calories
    } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Entry name is required" } });
      return;
    }
    if (size === "") {
      this.setState({ errors: { size: "servings size is required" } });
      return;
    }
    if (servings === "") {
      this.setState({ errors: { servings: "servings is required" } });
      return;
    }

    const fat = perFat * servings;
    const carb = perCarbs * servings;
    const protein = perProtein * servings;

    const newEntry = {
      id,
      fat: fat,
      name,
      carb: carb,
      protein: protein,
      servings,
      calories
    };

    dispatch({ type: "ADD_ENTRY", payload: newEntry });

    this.setState({
      id: "",
      name: "",
      perFat: "",
      perCarbs: "",
      perProtein: "",
      size: "",
      servings: "",
      fat: "",
      carb: "",
      protein: "",
      errors: {}
    });
    this.props.history.push("/");
  };

  render() {
    const {
      name,
      perFat,
      perCarbs,
      perProtein,
      size,
      servings,
      errors
    } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <div className="card mb-3">
                <div className="card-header">Add Entry</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <div className="form group">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="name"
                          placeholder="Entry Name"
                          value={name}
                          onChange={this.onChange}
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.name
                            }
                          )}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="prepend">
                            Servings Size:
                          </span>
                        </div>

                        <input
                          type="text"
                          name="size"
                          value={size}
                          onChange={this.onChange}
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.size
                            }
                          )}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">g</span>
                        </div>
                        {errors.size && (
                          <div className="invalid-feedback">{errors.size}</div>
                        )}
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="prepend">
                            Servings Quantity:
                          </span>
                        </div>

                        <input
                          type="text"
                          name="servings"
                          value={servings}
                          onChange={this.onChange}
                          placeholder="How many servings? 1,2,3,4,5..."
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.servings
                            }
                          )}
                        />
                        {errors.servings && (
                          <div className="invalid-feedback">
                            {errors.servings}
                          </div>
                        )}
                      </div>

                      <label htmlFor="gramsPerservings">
                        Grams Per Servings
                      </label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="prepend">
                            Fat:
                          </span>
                        </div>
                        <input
                          type="text"
                          name="perFat"
                          className="form-control"
                          value={perFat}
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="prepend">
                            Carb:
                          </span>
                        </div>
                        <input
                          type="text"
                          name="perCarbs"
                          className="form-control"
                          value={perCarbs}
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="prepend">
                            Protein:
                          </span>
                        </div>
                        <input
                          type="text"
                          name="perProtein"
                          className="form-control"
                          value={perProtein}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <input
                      type="submit"
                      value="Add Entry"
                      className="btn btn-block btn-light"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddEntry;