import React, { Component } from "react";
// import EditableHazardItem from "./EditableHazardItem";
import "../../EditSuggestionsPage.css";
import EditableSuggestionItem from "./EditableSuggestionItem";
import { Button, Input, message, Popconfirm } from "antd";
import axios from "axios";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { RiAddLine } from "react-icons/ri";

export default class EditableSuggestionTableComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: {
        id: this.props.itemSelected.id,
        itemName: this.props.itemSelected.itemName,
        detail1: this.props.itemSelected.detail1,
        detail2: this.props.itemSelected.detail2,
        detail3: this.props.itemSelected.detail3,
        detail4: this.props.itemSelected.detail4,
      },
      addDetail1: "",
      addDetail2: "",
      addDetail3: "",
      addDetail4: "",
    };

    this.saveSuggestionUpdateToBackend =
      this.saveSuggestionUpdateToBackend.bind(this);
    this.updateData = this.updateData.bind(this);
    this.addDetail1 = this.addDetail1.bind(this);
    this.addDetail2 = this.addDetail2.bind(this);
    this.addDetail3 = this.addDetail3.bind(this);
    this.addDetail4 = this.addDetail4.bind(this);

    this.deleteItemFromBackend = this.deleteItemFromBackend.bind(this);
    this.deleteField = this.deleteField.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("Editable Suggestion Component Mounted");
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   *  Checks whether there has been an update - by checking the difference between props
   * @param {props} prevProps no value needs to be passed in - automatic
   */
  componentDidUpdate(prevProps) {
    if (this.props.itemSelected !== prevProps.itemSelected) {
      console.log("Item Selected Updated: ", this.props.itemSelected);
      this.setState({ itemSelected: this.props.itemSelected });
    }
  }

  /**
   * Deletes Hazard from Backend //TODO - EXPORT All backend calls from another file
   */
  deleteItemFromBackend() {
    axios.delete("http://localhost:5000/workshop/deleteSuggestion", {
      data: { id: this.state.itemSelected.id },
    });
    console.log("Suggestion Deleted");
    message.success("Suggestion Deleted");
  }

  /**
   *  Update Item details to Backend
   */
  saveSuggestionUpdateToBackend() {
    console.log(
      "Saving item to backend: ",
      JSON.stringify(this.state.itemSelected)
    );
    message.success("Saved Item Data to Backend");

    axios.post(
      "http://localhost:5000/workshop/updateSuggestion",
      this.state.itemSelected
    );
  }

  //TODO -Figure out what this does
  updateData(data, index, itemType) {
    if (itemType === "detail1") {
      const detail1Arr = this.state.itemSelected.detail1; //Should copy not pass by ref
      detail1Arr[index] = data;
    } else if (itemType === "detail2") {
      const detail2Arr = this.state.itemSelected.detail2;
      detail2Arr[index] = data;
    } else if (itemType === "detail3") {
      const detail3Arr = this.state.itemSelected.detail3;
      detail3Arr[index] = data;
    } else if (itemType === "detail4") {
      const detail4Arr = this.state.itemSelected.detail4;
      detail4Arr[index] = data;
    }
  }

  /**
   * Add detailSuggestion to list of details
   */
  addDetail1() {
    var detail1 = [...this.state.itemSelected.detail1];
    detail1.push(this.state.addDetail1);
    var itemSelectedUpdate = { ...this.state.itemSelected };
    itemSelectedUpdate.detail1 = detail1;
    this.setState({ itemSelected: itemSelectedUpdate });
  }

  //Update Add Detail 1 Field Value
  updateAddDetail1Value = (e) => {
    this.setState({ addDetail1: e.target.value });
  };

  /**
   * Add detailSuggestion to list of details
   */
  addDetail2() {
    var detail2 = [...this.state.itemSelected.detail2];
    detail2.push(this.state.addDetail2);
    var itemSelectedUpdate = { ...this.state.itemSelected };
    itemSelectedUpdate.detail2 = detail2;
    this.setState({ itemSelected: itemSelectedUpdate });
  }

  //Update Add Detail 2 Field Value
  updateAddDetail2Value = (e) => {
    this.setState({ addDetail2: e.target.value });
  };

  /**
   * Add detailSuggestion to list of details
   */
  addDetail3() {
    var detail3 = [...this.state.itemSelected.detail3];
    detail3.push(this.state.addDetail3);
    var itemSelectedUpdate = { ...this.state.itemSelected };
    itemSelectedUpdate.detail3 = detail3;
    this.setState({ itemSelected: itemSelectedUpdate });
  }

  //Update Add Detail 3 Field Value
  updateAddDetail3Value = (e) => {
    this.setState({ addDetail3: e.target.value });
  };

  /**
   * Add detailSuggestion to list of details
   */
  addDetail4() {
    var detail4 = [...this.state.itemSelected.detail4];
    detail4.push(this.state.addDetail4);
    var itemSelectedUpdate = { ...this.state.itemSelected };
    itemSelectedUpdate.detail4 = detail4;
    this.setState({ itemSelected: itemSelectedUpdate });
  }

  //Update Add Detail 4 Field Value
  updateAddDetail4Value = (e) => {
    this.setState({ addDetail4: e.target.value });
  };

  /**
   *  Deletes an item from its array
   * @param {string} itemType to be deleted
   * @param {number} index  of item to be deleted
   */
  deleteField(itemType, index) {
    var itemSelectedUpdate = { ...this.state.itemSelected };

    if (itemType === "detail1") {
      var detail = [...this.state.itemSelected.detail1];
      detail.splice(index, 1);
      itemSelectedUpdate.detail1 = detail;
    }

    if (itemType === "detail2") {
      var detail = [...this.state.itemSelected.detail2];
      detail.splice(index, 1);
      itemSelectedUpdate.detail2 = detail;
    }

    if (itemType === "detail3") {
      var detail = [...this.state.itemSelected.detail3];
      detail.splice(index, 1);
      itemSelectedUpdate.detail3 = detail;
    }

    if (itemType === "detail4") {
      var detail = [...this.state.itemSelected.detail4];
      detail.splice(index, 1);
      itemSelectedUpdate.detail4 = detail;
    }
    this.setState({ itemSelected: itemSelectedUpdate });
  }

  render() {
    return (
      <div className="editable-suggestion-table">
        <div className="est-sel-header">
          <div className="est-header-row-1">
            <div className="est-title-font">Suggestion Selected: </div>
            <div className="est-item-font">
              {this.props.itemSelected.itemName}
            </div>
          </div>
          <div className="est-header-row-2">
            <div className="est-button-font">
              <Button
                style={{
                  marginLeft: "20px",
                  backgroundColor: "#a0d911",
                  color: "white",
                }}
                onClick={this.saveSuggestionUpdateToBackend}
                icon={<SaveOutlined />}
              >
                Save to Backend
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this Suggestion?"
                onConfirm={this.deleteItemFromBackend}
              >
                <Button
                  style={{
                    marginLeft: "20px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                  }}
                  icon={<DeleteOutlined />}
                >
                  Delete Item
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
        <div className="est-suggestion-table">
          <div className="est-col">
            <h1> Detail 1</h1>
            <div className="est-col-add-field">
              <Input
                placeholder=" + Add Detail1"
                onChange={this.updateAddDetail1Value}
                allowClear
              />
              <Button onClick={this.addDetail1}>
                <RiAddLine
                  style={{
                    marginTop: "3px",
                  }}
                />
                Add
              </Button>
            </div>
            {this.state.itemSelected.detail1.map((item, index) => {
              return (
                <div>
                  <EditableSuggestionItem
                    key={item.concat(index)}
                    data={item}
                    index={index}
                    updateData={this.updateData}
                    itemType="detail1"
                    deleteField={this.deleteField}
                  />
                </div>
              );
            })}
          </div>
          <div className="est-col">
            <h1> Detail 2</h1>
            <div className="est-col-add-field">
              <Input
                placeholder=" + Add Detail2"
                onChange={this.updateAddDetail2Value}
                allowClear
              />
              <Button onClick={this.addDetail2}>
                <RiAddLine
                  style={{
                    marginTop: "3px",
                  }}
                />
                Add
              </Button>
            </div>
            {this.state.itemSelected.detail2.map((item, index) => {
              return (
                <div>
                  <EditableSuggestionItem
                    key={item.concat(index)}
                    data={item}
                    index={index}
                    updateData={this.updateData}
                    itemType="detail2"
                    deleteField={this.deleteField}
                  />
                </div>
              );
            })}
          </div>
          <div className="est-col">
            <h1> Detail 3</h1>
            <div className="est-col-add-field">
              <Input
                placeholder=" + Add Detail3"
                onChange={this.updateAddDetail3Value}
                allowClear
              />
              <Button onClick={this.addDetail3}>
                <RiAddLine
                  style={{
                    marginTop: "3px",
                  }}
                />
                Add
              </Button>
            </div>
            {this.state.itemSelected.detail3.map((item, index) => {
              return (
                <div>
                  <EditableSuggestionItem
                    key={item.concat(index)}
                    data={item}
                    index={index}
                    updateData={this.updateData}
                    itemType="detail3"
                    deleteField={this.deleteField}
                  />
                </div>
              );
            })}
          </div>
          <div className="est-col">
            <h1> Detail 4</h1>
            <div className="est-col-add-field">
              <Input
                placeholder=" + Add Detail4"
                onChange={this.updateAddDetail4Value}
                allowClear
              />
              <Button onClick={this.addDetail4}>
                <RiAddLine
                  style={{
                    marginTop: "3px",
                  }}
                />
                Add
              </Button>
            </div>
            {this.state.itemSelected.detail4.map((item, index) => {
              return (
                <div>
                  <EditableSuggestionItem
                    key={item.concat(index)}
                    data={item}
                    index={index}
                    updateData={this.updateData}
                    itemType="detail4"
                    deleteField={this.deleteField}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
