import React, { Component } from "react";
import axios from "axios";
import { Menu } from "antd";
import EditableSuggestionTable from "./EditSuggestionsComponent/EditableSuggestionTableComponent";
import { itemTemplate } from "../util/JSONHandler";
import AddDetailsModal from "./EditWorkshopComponents/AddDetailsModal";
import LoadDataPromptPage from "./DisplayComponents/LoadDataPromptPage";
import "../EditSuggestionsPage.css";

//Used to Add/Delete Suggestions from the Suggestions Database
export default class EditSuggestionPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      itemList: [""],
      itemSelected: {
        id: "",
        itemName: "Default",
        detail1: ["Default"],
        detail2: ["Default"],
        detail3: ["Default"],
        detail4: ["Default"],
      },
      isOpenAddItemModal: false,
      isItemSelected: false,
    };

    this.toggleAddItemModal = this.toggleAddItemModal.bind(this);
    this.toggleAndSaveAddItemModal = this.toggleAndSaveAddItemModal.bind(this);
    this.toggleItemSelectedTrue = this.toggleItemSelectedTrue.bind(this);
    this.toggleItemSelectedFalse = this.toggleItemSelectedFalse.bind(this);
    this.updateItemSelected = this.updateItemSelected.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  //Extract Item Data
  getItemData(workshopList) {
    var extractedItemsList = [];

    workshopList.forEach((workshop) => {
      workshop.nodes.forEach((node) => {
        node.subnodes.forEach((subnode) => {
          subnode.items.forEach((item) => {
            extractedItemsList.push(item);
          });
        });
      });
    });

    console.log("Extracted Items List: ", extractedItemsList);
  }

  componentDidMount() {
    console.log("Edit Items Suggestions Page Instance");
    this._isMounted = true;
    this.timer = setInterval(() => this.loadData(), 500);
  }

  //TODO - Doesnt work for now - need to configure the backend
  loadData() {
    axios.get("http://localhost:5000/workshop/suggestions").then((response) => {
      this.setState({ itemList: response.data });
    });
  }

  toggleItemSelectedTrue() {
    this.setState({ isItemSelected: true });
  }
  toggleItemSelectedFalse() {
    this.setState({ isItemSelected: false });
  }

  toggleAddItemModal() {
    this.setState({ isOpenAddItemModal: !this.state.isOpenAddItemModal });
  }

  //get The template and add the Name to the template
  toggleAndSaveAddItemModal(propertyType, name) {
    const obj = itemTemplate;
    obj.itemName = name;
    console.log("Suggestion Obj to be saved :", obj);
    //TODO - CALL Axios post router
    axios.post("http://localhost:5000/workshop/addSuggestions", obj);

    this.toggleAddItemModal();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * set state of Item Selected
   * @param {Object} items
   */
  updateItemSelected(item) {
    var itemObj = item;
    itemObj.id = item._id; //Makes the item id identifiable could be bad practice //TODO - Double check what this does why got _
    this.setState({ itemSelected: itemObj }, () => {
      console.log("Item Selected: ", this.state.itemSelected);
    });
  }

  render() {
    const { isItemSelected, isOpenAddItemModal } = this.state;
    return (
      <>
        <AddDetailsModal
          open={isOpenAddItemModal}
          propertyType={"suggestion"}
          closeModal={this.toggleAndSaveAddItemModal}
          hideModal={this.toggleAddItemModal}
        />
        <div className="edit-suggestions">
          <div className="es-left-col">
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item
                key="Add Item Button"
                onClick={this.toggleAddItemModal}
              >
                Add Suggestion
              </Menu.Item>
              {this.state.itemList.map((item, index) => {
                return (
                  <Menu.Item
                    key={item._id}
                    onClick={() => {
                      this.updateItemSelected(item);
                      this.toggleItemSelectedTrue();
                    }}
                  >
                    {item.itemName}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>

          <div className="es-right-col">
            <div className="es-main-header"> Edit Item Suggestion Page</div>
            {isItemSelected ? (
              <EditableSuggestionTable itemSelected={this.state.itemSelected} />
            ) : (
              <LoadDataPromptPage />
            )}
          </div>
        </div>
      </>
    );
  }
}
