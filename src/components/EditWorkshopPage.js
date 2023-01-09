//TODO - REFACTOR FRONTEND
import React, { Component } from "react";
import "../EditWorkshopPage.css";
// import "../FacilitatorPage.css";
import EditWorkshopBody from "./EditWorkshopComponents/EditWorkshopBodyComponent";
import axios from "axios";

import { addVisibilityElement, deleteItemFromIndex } from "../util/Utilities";
import EditDetailsModal from "./EditWorkshopComponents/EditDetailsModal";
import EditWorkshopHeader from "./EditWorkshopComponents/EditWorkshopHeaderComponent";
import AddDetailsModal from "./EditWorkshopComponents/AddDetailsModal";
import { useParams } from "react-router-dom";
import {
  getNodeTemplate,
  getSubNodeTemplate,
  getItemTemplate,
} from "../util/JSONHandler";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

//Used to Edit the contents of a workshop from
class EditWorkshop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeSelected: "", // Name of nodes/subnodes/items selected
      subnodeSelected: "",
      itemSelected: "",
      nodeSelIndex: 0,
      subnodeSelIndex: 0,
      itemSelIndex: 0,

      isOpenAddNodeModal: false,
      isOpenAddSubnodeModal: false,
      isOpenAddItemModal: false,

      isOpenEditNodeNameModal: false,
      isOpenEditSubnodeNameModal: false,
      isOpenEditItemNameModal: false,
      isItemSelected: false,

      tags: [""],
      data: {
        workshop: "",
        workshopName: "",
        tags: [""],
        _id: "",
        nodes: [
          {
            nodeName: "",
            subnodes: [
              {
                subnodeName: "",
                items: [
                  {
                    itemName: "",
                    detail1: [""],
                    detail2: [""],
                    detail3: [""],
                    detail4: [""],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    //Completed
    this.setNodeSelected = this.setNodeSelected.bind(this);

    this.addNodeToNodeList = this.addNodeToNodeList.bind(this);
    this.addSubNodeToNode = this.addSubNodeToNode.bind(this);
    this.addItemToSubNode = this.addItemToSubNode.bind(this);
    this.deleteNodeFromNodeList = this.deleteNodeFromNodeList.bind(this);
    this.deleteSubNodeFromNode = this.deleteSubNodeFromNode.bind(this);
    this.deleteItemFromSubNode = this.deleteItemFromSubNode.bind(this);

    this.toggleEditNodeNameModal = this.toggleEditNodeNameModal.bind(this);
    this.toggleEditSubnodeNameModal =
      this.toggleEditSubnodeNameModal.bind(this);
    this.toggleEditItemNameModal = this.toggleEditItemNameModal.bind(this);

    this.toggleAddNodeModal = this.toggleAddNodeModal.bind(this);
    this.toggleAddSubnodeModal = this.toggleAddSubnodeModal.bind(this);
    this.toggleAddItemModal = this.toggleAddItemModal.bind(this);

    this.closeAddDetailModal = this.closeAddDetailModal.bind(this);
    this.closeAndSaveName = this.closeAndSaveName.bind(this);

    this.loadData = this.loadData.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {
    let { id } = this.props.params; //workshopId
    console.log("Workshop Id: ", id);
    this.timer = setInterval(() => this.loadData(id), 500);
  }

  loadData(workshopId) {
    //Need to solve async issue - if i dont put this, sometimes an undefined workshopID is passed, hence the param, might be wrong since it doesnt point to an appropriate endpoint
    if (workshopId !== "undefined") {
      var apiEndpoint = "http://localhost:5000/workshop/" + workshopId;

      // console.log("workshop id: ", apiEndpoint);
      axios.get(apiEndpoint).then((response) => {
        this.setState({
          data: response.data,
          workshopName: response.data.workshopName,
          tags: response.data.tags,
        });
      });
    }
  }

  /**
   * Updates the names which have been modified - calls save to backend database
   */
  updateName() {
    var nodeName = this.state.nodeSelected;
    var nodeIndex = this.state.nodeSelIndex;
    var subnodeName = this.state.subnodeSelected;
    var subnodeIndex = this.state.subnodeSelIndex;
    var itemName = this.state.itemSelected;
    var itemIndex = this.state.itemSelIndex;

    var data = { ...this.state.data };
    console.log("UPDATE NAME");
    console.log(
      "Node sel: ",
      this.state.nodeSelected,
      "\nsubnode sel:",
      this.state.subnodeSelected,
      "\nitem sel:",
      this.state.itemSelected
    );

    data.nodes[nodeIndex].nodeName = nodeName;
    data.nodes[nodeIndex].subnodes[subnodeIndex].subnodeName = subnodeName;
    data.nodes[nodeIndex].subnodes[subnodeIndex].items[itemIndex].itemName =
      itemName;

    console.log("Update Workshop Data Name: ", data);
    this.saveDataToBackend(data);
  }

  /**
   * Saves data to backend database
   * @param {Obj} data
   */
  saveDataToBackend(data) {
    //From the workshop ID it replaces the values, the body will be the data Item
    const payload = {
      id: this.state.data._id,
      workshopName: data.workshopName,
      tags: data.tags,
      nodes: data.nodes,
    };

    // console.log("Update Data to BACKEND: ", payload);
    axios.post("http://localhost:5000/workshop/updateWorkshop", payload);
  }

  /**
   * Sets the names of the nodes,subnodes and item that is currently being selected
   * @param {string} nameNode
   * @param {string} nameSubnode
   * @param {string} nameItem
   * @param {int} nodeIndex
   * @param {int} subnodeIndex
   * @param {int} itemIndex
   */
  setNodeSelected(
    nameNode,
    nameSubnode,
    nameItem,
    nodeIndex,
    subnodeIndex,
    itemIndex
  ) {
    this.setState({
      nodeSelected: nameNode,
      subnodeSelected: nameSubnode,
      itemSelected: nameItem,
      nodeSelIndex: nodeIndex,
      subnodeSelIndex: subnodeIndex,
      itemSelIndex: itemIndex,
      isItemSelected: true,
    });
  }

  clearState() {
    this.setState({
      isItemSelected: false,
      nodeSelected: "",
      subnodeSelected: "",
      itemSelected: "",
    });
  }

  /**
   * Adds Node to node list - Need to include the template
   * @param {Obj} node to be added
   */
  addNodeToNodeList(node) {
    var data = { ...this.state.data };
    var nodes = [...this.state.data.nodes];
    nodes.push(node);
    data.nodes = nodes;
    this.saveDataToBackend(data);
  }
  deleteNodeFromNodeList() {
    const { nodeSelIndex, isItemSelected } = this.state;
    if (isItemSelected) {
      var data = { ...this.state.data };
      var nodes = [...this.state.data.nodes];
      var updateNodeList = deleteItemFromIndex(nodes, nodeSelIndex); //Remove data from array
      data.nodes = updateNodeList;
      this.saveDataToBackend(data);
      this.clearState();
    } else {
      alert("Please select a node to be deleted");
    }
  }

  /**
   *  Adds subnode to node selected takes in the index of the node to be appended
   * @param {Num} nodeIndex  of the node to be appended to
   * @param {Obj} subnode  Object of subnode to be added
   */
  addSubNodeToNode(nodeIndex, subnode) {
    var nodeUpdate = { ...this.state.data.nodes[nodeIndex] };
    nodeUpdate.subnodes.push(subnode); //increment the subnodes to the particular node
    var data = { ...this.state.data };
    data.nodes[nodeIndex] = nodeUpdate;
    this.saveDataToBackend(data);
  }

  deleteSubNodeFromNode() {
    const { nodeSelIndex, subnodeSelIndex, isItemSelected } = this.state;
    if (isItemSelected) {
      var data = { ...this.state.data };
      var subNodeList = [...this.state.data.nodes[nodeSelIndex].subnodes];
      var updatedSubNodeList = deleteItemFromIndex(
        subNodeList,
        subnodeSelIndex
      );
      data.nodes[nodeSelIndex].subnodes = updatedSubNodeList;
      this.saveDataToBackend(data);
      this.clearState();
    } else {
      alert("Please select a subnode to be deleted");
    }
  }

  /**
   * Adds Item to subnode
   * @param {Num} nodeIndex index of Node to be appended to
   * @param {Num} subNodeIndex index of subnode to be appended to
   * @param {Num} itemData Object data to be appended
   */
  addItemToSubNode(nodeIndex, subNodeIndex, itemData) {
    console.log(
      "nodeIx:",
      nodeIndex,
      "\nsubnodeIx: ",
      subNodeIndex,
      "\nitemData: ",
      itemData
    );
    var subNodeUpdate = {
      ...this.state.data.nodes[nodeIndex].subnodes[subNodeIndex],
    };
    var itemDataVisible = addVisibilityElement(itemData); //TODO - REFACTOR THIS add visibility function
    subNodeUpdate.items.push(itemDataVisible);
    var data = { ...this.state.data };
    data.nodes[nodeIndex].subnodes[subNodeIndex] = subNodeUpdate;
    this.saveDataToBackend(data);
  }

  deleteItemFromSubNode() {
    const { nodeSelIndex, subnodeSelIndex, itemSelIndex, isItemSelected } =
      this.state;
    if (isItemSelected) {
      var data = { ...this.state.data };
      var itemList = [
        ...this.state.data.nodes[nodeSelIndex].subnodes[subnodeSelIndex].items,
      ];

      var updatedItemList = deleteItemFromIndex(itemList, itemSelIndex);
      data.nodes[nodeSelIndex].subnodes[subnodeSelIndex].items =
        updatedItemList;
      this.saveDataToBackend(data);
      this.clearState();
    } else {
      alert("Please select a subnode to be deleted");
    }
  }

  /**
   * Updates the name of the node/subnode/item
   * @param {string} propertyType - node/subnode/item
   * @param {string} updatedName - name to be changed
   */
  closeAndSaveName(propertyType, updatedName) {
    // console.log(`Saving new ${propertyType} name: `, updatedName);
    // console.log("Before save");
    // console.log(
    //   "Node sel: ",
    //   this.state.nodeSelected,
    //   "\nsubnode sel:",
    //   this.state.subnodeSelected,
    //   "\nitem sel:",
    //   this.state.itemSelected
    // );
    if (propertyType === "node") {
      this.setState({ nodeSelected: updatedName }, () => {
        this.updateName();
      });
      this.toggleEditNodeNameModal();
    } else if (propertyType === "subnode") {
      this.setState({ subnodeSelected: updatedName }, () => {
        this.updateName();
      });
      this.toggleEditSubnodeNameModal();
    } else if (propertyType === "item") {
      this.setState({ itemSelected: updatedName }, () => {
        this.updateName();
      });

      this.toggleEditItemNameModal();
    } else {
      //TODO Throw some error
      console.log("Improper propertyType when saving data");
    }
  }

  /**
   * Adds new node/subnode/item
   * @param {string} propertyType - node/subnode/item
   * @param {string} name - name of detail to be added
   */
  closeAddDetailModal(propertyType, name) {
    console.log(`Saving new ${propertyType} name: `, name);
    const { nodeSelIndex, subnodeSelIndex } = this.state;
    if (propertyType === "node") {
      const nodeObj = getNodeTemplate(name, 1); //Need to indicate the number of subnodes to generate
      this.addNodeToNodeList(nodeObj);
      this.toggleAddNodeModal();
    } else if (propertyType === "subnode") {
      const subnodeObj = getSubNodeTemplate(name);
      this.addSubNodeToNode(nodeSelIndex, subnodeObj);
      this.toggleAddSubnodeModal();
    } else if (propertyType === "item") {
      const itemObj = getItemTemplate(name);
      this.addItemToSubNode(nodeSelIndex, subnodeSelIndex, itemObj);
      this.toggleAddItemModal();
    } else {
      console.log("Improper propertyType when saving data");
    }
  }

  toggleAddNodeModal() {
    this.setState({ isOpenAddNodeModal: !this.state.isOpenAddNodeModal });
  }
  toggleAddSubnodeModal() {
    this.setState({ isOpenAddSubnodeModal: !this.state.isOpenAddSubnodeModal });
  }

  toggleAddItemModal() {
    this.setState({ isOpenAddItemModal: !this.state.isOpenAddItemModal });
  }

  toggleEditNodeNameModal() {
    this.setState({
      isOpenEditNodeNameModal: !this.state.isOpenEditNodeNameModal,
    });
  }

  toggleEditSubnodeNameModal() {
    this.setState({
      isOpenEditSubnodeNameModal: !this.state.isOpenEditSubnodeNameModal,
    });
  }

  toggleEditItemNameModal() {
    this.setState({
      isOpenEditItemNameModal: !this.state.isOpenEditItemNameModal,
    });
  }

  render() {
    const {
      isOpenEditNodeNameModal,
      isOpenEditSubnodeNameModal,
      isOpenEditItemNameModal,
      isOpenAddNodeModal,
      isOpenAddSubnodeModal,
      isOpenAddItemModal,
    } = this.state;

    return (
      <div className="edit-workshop">
        <div className="edit-workshop-header-font">Edit Workshop</div>
        <EditDetailsModal
          open={isOpenEditNodeNameModal}
          propertyType={"node"}
          closeModal={this.closeAndSaveName}
          hideModal={this.toggleEditNodeNameModal}
        />
        <EditDetailsModal
          open={isOpenEditSubnodeNameModal}
          propertyType={"subnode"}
          closeModal={this.closeAndSaveName}
          hideModal={this.toggleEditSubnodeNameModal}
        />
        <EditDetailsModal
          open={isOpenEditItemNameModal}
          propertyType={"item"}
          closeModal={this.closeAndSaveName}
          hideModal={this.toggleEditItemNameModal}
        />
        <AddDetailsModal
          open={isOpenAddNodeModal}
          propertyType={"node"}
          closeModal={this.closeAddDetailModal}
          hideModal={this.toggleAddNodeModal}
        />
        <AddDetailsModal
          open={isOpenAddSubnodeModal}
          propertyType={"subnode"}
          closeModal={this.closeAddDetailModal}
          hideModal={this.toggleAddSubnodeModal}
        />
        <AddDetailsModal
          open={isOpenAddItemModal}
          propertyType={"item"}
          closeModal={this.closeAddDetailModal}
          hideModal={this.toggleAddItemModal}
        />
        <EditWorkshopHeader
          displayNodeEditModal={this.toggleEditNodeNameModal}
          displaySubnodeEditModal={this.toggleEditSubnodeNameModal}
          displayItemEditModal={this.toggleEditItemNameModal}
          deleteNode={this.deleteNodeFromNodeList}
          deleteSubnode={this.deleteSubNodeFromNode}
          deleteItem={this.deleteItemFromSubNode}
          nodeSelected={this.state.nodeSelected}
          subnodeSelected={this.state.subnodeSelected}
          itemSelected={this.state.itemSelected}
          tags={this.state.tags}
        />
        <EditWorkshopBody
          data={this.state.data}
          setNodeSelected={this.setNodeSelected}
          showAddNodeModal={this.toggleAddNodeModal}
          showAddSubnodeModal={this.toggleAddSubnodeModal}
          showAddItemModal={this.toggleAddItemModal}
        />
      </div>
    );
  }
}

export default withParams(EditWorkshop);
