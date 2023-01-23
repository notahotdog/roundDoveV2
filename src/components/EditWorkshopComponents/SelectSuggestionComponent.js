//TODO - Implement the header choice
import React, { Component } from "react";
import { Button, Select } from "antd";
import { addVisibilityElement } from "../../util/Utilities";

import axios from "axios";
const { Option } = Select;

//Selects between the list of suggestions that are available Passes back to parent
export default class SelectSuggestionComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      suggestionList: [""],
      suggestionSelected: false,
    };
    this.onChange = this.onChange.bind(this);
    this.saveSuggestionToItem = this.saveSuggestionToItem.bind(this);
  }

  //Load once on initialization
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
    console.log("Table value: ", this.state.suggestionList);
    var result = this.state.suggestionList.filter((obj) => {
      return obj._id === value;
    }); //This returns as a list of obj w length 1, thats why need to [0]
    this.props.selectSuggestion(result[0]);

    //TODO - Pass to parent
  }

  saveSuggestionToItem() {
    //TODO - Parent function trigger save, allocate to parent
    this.props.saveSuggestionToItem(); //Todo - toggle this to be true
  }

  //OnClick -> Should pass template data to parent class -> parent class should pass data to child which modifies the

  render() {
    const { suggestionSelected } = this.state;
    return (
      <div className="select-suggestion-component">
        <div>Select Suggestion</div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a suggestion"
          optionFilterProp="children"
          onChange={this.onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.suggestionList.map((suggestion) => {
            return (
              <Option value={suggestion._id} key={suggestion._id}>
                {suggestion.itemName}
              </Option>
            );
          })}
        </Select>
        {suggestionSelected ? (
          <Button
            onClick={this.saveSuggestionToItem} //Backend shit
            style={{ marginLeft: "20px" }}
          >
            {" "}
            Allocate and save suggestion to item
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
