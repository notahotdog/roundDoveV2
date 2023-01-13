//TODO - Implement the header choice
import React, { Component } from "react";
import { Button, Select, Checkbox, message } from "antd";
import { addVisibilityElement } from "../../util/Utilities";

import axios from "axios";
const { Option } = Select;

//Selects between the list of suggestions that are available
export default class SelectSuggestionComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      suggestionList: [""],
      suggestionSelected: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  //Load once on initialisation
  componentDidMount() {
    this._isMounted = true;
    console.log("Select Suggestion Component Mounted");
    axios.get("http://localhost:5000/workshop/suggestions").then((response) => {
      const suggestionList = response.data;
      const updateList = [];
      suggestionList.forEach((suggestion) => {
        var suggestionObj = addVisibilityElement(suggestion, false);
        updateList.push(suggestionObj);
      });
      console.log("Updated Suggestion List:", updateList);
      this.setState({ suggestionList: updateList });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Value of suggestion Selected
  onChange(value) {
    this.setState({ suggestionSelected: true });
    console.log("Suggestion Selected:", value);
  }

  //OnClick -> Should pass template data to parent class -> parent class should pass data to child which modifies the

  render() {
    const { suggestionSelected } = this.state;
    return (
      <div>
        <div>Select Suggestion</div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a suggestion"
          optionFilterProp="children"
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSearch={this.onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.suggestionList.map((suggestion, sIx) => {
            return (
              <Option value={suggestion._id} key={suggestion._id}>
                {suggestion.itemName}
              </Option>
            );
          })}
        </Select>
        {suggestionSelected ? (
          <Button
            // onClick={this.saveHazardChoice} //Backend shit
            style={{ marginLeft: "20px" }}
          >
            {" "}
            Edit Selection
          </Button>
        ) : (
          <Button
            // onClick={this.saveHazardChoice} //Backend Shit
            style={{ marginLeft: "20px" }}
          >
            {" "}
            Save Selection
          </Button>
        )}
      </div>
    );
  }
}
