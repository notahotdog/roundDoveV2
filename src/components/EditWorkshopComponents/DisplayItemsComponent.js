//TODO EVALUATE THIS COMPONENT
import React, { Component } from "react";
// import axios from "axios";
import { message, Checkbox } from "antd";
import DisplaySuggestionItemsComponent from "./DisplaySuggestionItemsComponent";
import SelectSuggestionComponent from "./SelectSuggestionComponent";
import "../../EditWorkshopPage.css";

export default class DisplayItemsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemNameParent: "", //WHAT IS THIS
      suggestionList: [""],
      itemAllocated: false,
      parentItem: this.props.itemName,
      suggestionSelected: {
        id: "",
        itemName: "Default",
        detail1: ["Default"],
        detail2: ["Default"],
        detail3: ["Default"],
        detail4: ["Default"],
      },
      savedSelection: false,
      isItemSelected: false, //ShouldBeTrue if not this component will not show
      isSuggestionSelected: false,
    };

    this.onChange = this.onChange.bind(this);
    // this.saveItemChoice = this.saveItemChoice.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);

    this.selectSuggestion = this.selectSuggestion.bind(this);
    this.saveSuggestionToItem = this.saveSuggestionToItem.bind(this);
  }

  //Loads the suggestion list , allocate to selected item
  componentDidMount() {}

  // saveItemChoice() {
  //   message.success("Data saved to backend");
  //   this.setState({ savedSelection: !this.state.savedSelection });
  //   var updatedState = this.state.suggestionSelected;
  //   updatedState.itemAllocated = true; //THIS LOOKS A BIT WEIRD
  //   this.props.saveUpdatedNode(updatedState);
  // }

  // saveHazardChoice() {
  //   //Saves Choice within parent component
  //   message.success("Data saved to backend");
  //   this.setState({ savedSelection: !this.state.savedSelection });
  //   var updatedState = this.state.hazardSelected;
  //   updatedState.hazardAllocated = true;
  //   this.props.saveUpdatedNode(updatedState);
  //   // this.props.saveUpdatedNode(this.state.hazardSelected);
  //   //Passes Hazard to Parent Component
  //   // const {hazardSelected} = this.state;
  //   // this.props.saveHazardSelection(hazardSelected);
  // }

  /**
   *  Updates when item box select is changed
   * @param {e} value
   */
  onChange(value) {
    this.setState({ itemAllocated: false, savedSelection: true });

    this.setState({ isItemSelected: true });
    console.log(`selected ${value}`);
    const { itemList } = this.state;

    itemList.forEach((item) => {
      if (item._id === value) {
        this.setState({ suggestionSelected: item });
      }
    });
  }

  /**
   * Toggle between checking/ unchecking everything*
   * @param {target} e Target to be modified
   * @param {String} itemType of
   */
  toggleCheckAll(e, itemType) {
    var checkAssert = e.target.checked;
    const { itemSelected } = this.state;

    var obj = { ...itemSelected };

    var detail1 = [...itemSelected.detail1];
    var detail2 = [...itemSelected.detail2];
    var detail3 = [...itemSelected.detail3];
    var detail4 = [...itemSelected.detail4];

    if (itemType === "detail1") {
      detail1.forEach((item) => {
        item.visible = checkAssert;
      });
    } else if (itemType === "detail2") {
      detail2.forEach((item) => {
        item.visible = checkAssert;
      });
    } else if (itemType === "detail3") {
      detail3.forEach((item) => {
        item.visible = checkAssert;
      });
    } else if (itemType === "detail4") {
      detail4.forEach((item) => {
        item.visible = checkAssert;
      });
    }

    obj.detail1 = detail1;
    obj.detail2 = detail2;
    obj.detail3 = detail3;
    obj.detail4 = detail4;

    this.setState({ itemSelected: obj });
  }

  /**
   * Toggles between checked and unchecked field
   * @param {string} itemType type of field
   * @param {num} index of field to be modified
   */
  toggleChecked(itemType, index) {
    const { itemSelected } = this.state;
    var obj = { ...itemSelected };

    var detail1 = [...itemSelected.detail1];
    var detail2 = [...itemSelected.detail2];
    var detail3 = [...itemSelected.detail3];
    var detail4 = [...itemSelected.detail4];

    if (itemType === "detail1") {
      detail1[index].visible = !detail1[index].visible;
    } else if (itemType === "detail2") {
      detail2[index].visible = !detail2[index].visible;
    } else if (itemType === "detail3") {
      detail3[index].visible = !detail3[index].visible;
    } else if (itemType === "detail4") {
      detail4[index].visible = !detail4[index].visible;
    }

    obj.detail1 = detail1;
    obj.detail2 = detail2;
    obj.detail3 = detail3;
    obj.detail4 = detail4;

    this.setState({ itemSelected: obj });
  }

  //Updates the state table on current selection
  selectSuggestion(suggestionData) {
    this.setState({
      suggestionSelected: suggestionData,
      isSuggestionSelected: true,
    });
    console.log("Suggestion data: ", suggestionData);
  }

  saveSuggestionToItem() {
    //TODO - Toggles the save to the backend
    console.log("Saving suggestion Backend");
  }

  render() {
    const { suggestionSelected, isSuggestionSelected } = this.state;
    // var editHazardMode = !this.state.savedSelection; // if the selection is not saved(false) , edit Hazard
    // const updateHazardData = this.props.hazardToBeEdited;
    // const isHazardAllocated = this.state.hazardAllocated;
    // console.log("isHAZARD ALLOCATE", isHazardAllocated);

    return (
      //Should be able to select between what they want to use and not - Header component
      <>
        <SelectSuggestionComponent
          selectSuggestion={this.selectSuggestion}
          saveSuggestionToItem={this.saveSuggestionToItem}
        />
        {isSuggestionSelected ? (
          <>
            <div>Yes: {suggestionSelected._id}</div>
            <div className="display-items-component">
              <div className="dh-col">
                <h1 className="dh-col-header">Detail 1</h1>
                <div className="dh-checkbox">
                  <Checkbox onChange={(e) => this.toggleCheckAll(e, "detail1")}>
                    Select All
                  </Checkbox>
                </div>

                {suggestionSelected.detail1.map((suggestion, ix) => {
                  return (
                    <DisplaySuggestionItemsComponent
                      item={suggestion}
                      index={ix}
                      dType="detail1"
                      isDisabled={true}
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dh-col">
                <h1 className="dh-col-header">Detail 2</h1>
                <div className="dh-checkbox">
                  <Checkbox onChange={(e) => this.toggleCheckAll(e, "detail2")}>
                    Select All
                  </Checkbox>
                </div>

                {suggestionSelected.detail2.map((suggestion, ix) => {
                  return (
                    <DisplaySuggestionItemsComponent
                      item={suggestion}
                      index={ix}
                      dType="detail2"
                      isDisabled={true}
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dh-col">
                <h1 className="dh-col-header">Detail 3</h1>
                <div className="dh-checkbox">
                  <Checkbox
                    onChange={(e) => this.toggleCheckAll(e, "detail 3")}
                  >
                    Select All
                  </Checkbox>
                </div>

                {suggestionSelected.detail3.map((suggestion, ix) => {
                  return (
                    <DisplaySuggestionItemsComponent
                      item={suggestion}
                      index={ix}
                      dType="detail3"
                      isDisabled={true}
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dh-col">
                <h1 className="dh-col-header">Detail 4</h1>
                <div className="dh-checkbox">
                  <Checkbox onChange={(e) => this.toggleCheckAll(e, "detail4")}>
                    Select All
                  </Checkbox>
                </div>

                {suggestionSelected.detail4.map((suggestion, ix) => {
                  return (
                    <DisplaySuggestionItemsComponent
                      item={suggestion}
                      index={ix}
                      dType="detail4"
                      isDisabled={true}
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div>No</div>
        )}
      </>
    );
  }
}
