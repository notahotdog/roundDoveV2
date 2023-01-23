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
      suggestionSelected: {
        id: "",
        suggestionAllocated: false,
        itemName: "Default",
        detail1: ["Default"],
        detail2: ["Default"],
        detail3: ["Default"],
        detail4: ["Default"],
      },
      savedSelection: false,
      isItemSelected: false, //ShouldBeTrue if not this component will not show
      isSuggestionSelected: false,
      suggestionLocked: false, //Change in the suggestion will trigger this lock to true ,
    };

    this.toggleChecked = this.toggleChecked.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);

    this.selectSuggestion = this.selectSuggestion.bind(this);
    this.saveSuggestionToItem = this.saveSuggestionToItem.bind(this);
  }

  //Loads the suggestion list , allocate to selected item
  componentDidMount() {
    //  if this.props.suggestionAllocated - update the checklist items
    const { data } = this.props;
    if (data.suggestionAllocated) {
      this.setState({ suggestionSelected: data }); //TODO - Change this to everytime they detect a change
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.data.itemName != prevProps.itemName) {
      this.setState({ suggestionLocked: true }, () => {
        console.log("Loaded new data : ", this.props.data);
        this.setState({ suggestionSelected: this.props.data });
      });
    } else if (
      this.props.data !== prevProps.data &&
      !this.state.suggestionLocked
    ) {
      console.log("Loaded new data : ", this.props.data);
      this.setState({ suggestionSelected: this.props.data });
    }
  }

  /**
   * Toggle between checking/ unchecking everything*
   * @param {target} e Target to be modified
   * @param {String} itemType of
   */
  toggleCheckAll(e, itemType) {
    var checkAssert = e.target.checked;
    const { suggestionSelected } = this.state;

    var obj = { ...suggestionSelected };

    var detail1 = [...suggestionSelected.detail1];
    var detail2 = [...suggestionSelected.detail2];
    var detail3 = [...suggestionSelected.detail3];
    var detail4 = [...suggestionSelected.detail4];

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

    this.setState({ suggestionSelected: obj });
  }

  /**
   * Toggles between checked and unchecked field
   * @param {string} itemType type of field
   * @param {num} index of field to be modified
   */
  toggleChecked(itemType, index) {
    const { suggestionSelected } = this.state;
    var obj = { ...suggestionSelected };

    var detail1 = [...suggestionSelected.detail1];
    var detail2 = [...suggestionSelected.detail2];
    var detail3 = [...suggestionSelected.detail3];
    var detail4 = [...suggestionSelected.detail4];

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
    console.log("TOGGLE CHECKED: ", itemType, "\nObj:", obj);

    this.setState({ suggestionSelected: obj });
  }

  //Updates the state table on current selection
  selectSuggestion(suggestionData) {
    this.setState({
      suggestionSelected: suggestionData,
      isSuggestionSelected: true,
      suggestionLocked: true,
    });
    console.log("Suggestion data: ", suggestionData);
  }

  saveSuggestionToItem() {
    //TODO - Toggles the save to the backend - Figure out how to carry out this save functionality

    //Perform some update
    const { suggestionSelected } = this.state;
    var saveObj = { ...suggestionSelected }; //Indicates that suggestionAllocated = true
    saveObj.suggestionAllocated = true;

    console.log("Saving suggestion Backend: ", saveObj);
    this.props.allocateSuggestionToItem(saveObj);
  }

  //TODO Should do a conditional check to check if suggestionAllocated  - if yes -> Triggers a load
  //TODO - check whether suggestion allocated: - if yes then display the parent component, if not then load from the child isSuggestionComponent

  render() {
    const { suggestionSelected, isSuggestionSelected } = this.state;
    const { data } = this.props;

    return (
      //Should be able to select between what they want to use and not - Header component
      <div className="display-items-component">
        <SelectSuggestionComponent
          selectSuggestion={this.selectSuggestion}
          saveSuggestionToItem={this.saveSuggestionToItem}
        />
        <div>PARENT DATA</div>
        <div>{JSON.stringify(this.props.data)}</div>
        <div> SUGGESTION Seleted: </div>
        <div>{JSON.stringify(this.state.suggestionSelected)}</div>
        {data.suggestionAllocated || isSuggestionSelected ? (
          <>
            <div className="dic-body">
              <div className="dic-col">
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
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dic-col">
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
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dic-col">
                <h1 className="dh-col-header">Detail 3</h1>
                <div className="dh-checkbox">
                  <Checkbox onChange={(e) => this.toggleCheckAll(e, "detail3")}>
                    Select All
                  </Checkbox>
                </div>

                {suggestionSelected.detail3.map((suggestion, ix) => {
                  return (
                    <DisplaySuggestionItemsComponent
                      item={suggestion}
                      index={ix}
                      dType="detail3"
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dic-col">
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
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div> Select Something</div>
          </>
        )}
        {/* {isSuggestionSelected ? (
          <>
            <div className="dic-body">
              <div className="dic-col">
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
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dic-col">
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
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dic-col">
                <h1 className="dh-col-header">Detail 3</h1>
                <div className="dh-checkbox">
                  <Checkbox onChange={(e) => this.toggleCheckAll(e, "detail3")}>
                    Select All
                  </Checkbox>
                </div>

                {suggestionSelected.detail3.map((suggestion, ix) => {
                  return (
                    <DisplaySuggestionItemsComponent
                      item={suggestion}
                      index={ix}
                      dType="detail3"
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dic-col">
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
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div>Nothing rendered</div>
        )} */}
      </div>
    );
  }
}
