import React, { Component } from "react";
import { Checkbox } from "antd";
import "../../EditWorkshopPage.css";

//TODO - this is just to select the individual - whether true or not
export default class DisplaySuggestionItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.updateChecked = this.updateChecked.bind(this);
  }

  updateChecked() {
    console.log("updateChecked: ", this.props.index, this.props.dType); //Just used for debugging, dType, used for the parent command to indicate which portion needs to be modified
    const { dType, index } = this.props;
    this.props.toggleChecked(dType, index); //dType to inform parent toggleFunction of which array to amend
  }

  render() {
    return (
      <div className="display-suggestion-item">
        <div className="dh-item-content">{this.props.item.name}</div>

        <Checkbox
          checked={this.props.item.visible}
          onClick={this.updateChecked}
          style={{ marginLeft: "auto", marginRight: "5px" }}
        />
      </div>
    );
  }
}
