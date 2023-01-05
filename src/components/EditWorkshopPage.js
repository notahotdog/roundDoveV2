import React, { Component } from "react";
// import "../FacilitatorPage.css";
import EditWorkshopBody from "./EditWorkshopComponents/EditWorkshopBodyComponent";
import axios from "axios";

import { addVisibilityElement, deleteItemFromIndex } from "../util/Utilities";
import EditDetailsModal from "./EditWorkshopComponents/EditDetailsModal";
import EditWorkshopHeader from "./EditWorkshopComponents/EditWorkshopHeaderComponent";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

//Used to Edit the contents of a workshop from
class EditWorkshop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeSelected: "", //Change this to an object
      subnodeSelected: "", //Change this to an object with index
      itemSelected: "",
      nodeSelIndex: 0,
      subnodeSelIndex: 0,
      itemSelIndex: 0,

      isOpenNodeNameModal: false,
      isOpenSubnodeNameModal: false,
      isOpenItemNameModal: false,
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

    //TODO - REFACTOR Body component
    this.setNodeSelected = this.setNodeSelected.bind(this); //Used for the Body component
    this.updateNodeHazard = this.updateNodeHazard.bind(this); //TODO - REMOVE
    this.updateNodeItem = this.updateNodeItem.bind(this);

    this.loadData = this.loadData.bind(this);
    this.addNodeToNodeList = this.addNodeToNodeList.bind(this);
    this.addSubNodeToNode = this.addSubNodeToNode.bind(this);
    this.addItemToSubNode = this.addItemToSubNode.bind(this);
    this.deleteNodeFromNodeList = this.deleteNodeFromNodeList.bind(this);
    this.deleteSubNodeFromNode = this.deleteSubNodeFromNode.bind(this);
    this.deleteItemFromSubNode = this.deleteItemFromSubNode.bind(this);

    this.toggleNodeNameModal = this.toggleNodeNameModal.bind(this);
    this.toggleSubnodeNameModal = this.toggleSubnodeNameModal.bind(this);
    this.toggleItemNameModal = this.toggleItemNameModal.bind(this);

    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {
    let { id } = this.props.params; //workshopId
    console.log("Workshop Id: ", id);
    this.timer = setInterval(() => this.loadData(id), 10000);
  }

  loadData(workshopId) {
    //Need to solve async issue - if i dont put this, sometimes an undefined workshopID is passed, hence the param, might be wrong since it doesnt point to an appropriate endpoint
    if (workshopId !== "undefined") {
      var apiEndpoint =
        "http://localhost:5000/workshop/workshopDetails/" + workshopId;

      console.log("workshop id: ", apiEndpoint);

      axios.get(apiEndpoint).then((response) => {
        console.log("Response: ", response.data);
        this.setState({
          data: response.data,
          workshopName: response.data.workshopName,
          tags: response.data.tags,
        });
      });
    }
  }

  //TODO - REFACTOR FROM BODY
  updateNodeItem(updatedItem) {
    const { nodeSelIndex, subnodeSelIndex, itemSelIndex } = this.state;
    console.log(
      "Node Index: ",
      nodeSelIndex,
      " subnode Index: ",
      subnodeSelIndex,
      " item Index: ",
      itemSelIndex
    );
    //Update the item with the current proposed item
    var data = { ...this.state.data };
    console.log("Workshop Data before update: ", data);
    data.nodes[nodeSelIndex].subnodes[subnodeSelIndex].items[itemSelIndex] =
      updatedItem;
    console.log("Workshop Data after update: ", data);

    this.saveDataToBackend(data);
  }

  updateNodeHazard(updatedHazard) {
    //TODO DELETE From Body
    const { nodeSelIndex, subnodeSelIndex, hazardSelndex } = this.state;
    console.log(
      "Node Index: ",
      nodeSelIndex,
      " subnode Index: ",
      subnodeSelIndex,
      " hazard Index: ",
      hazardSelndex
    );

    //Update the hazard with the current proposed Hazard
    var data = { ...this.state.data };
    console.log("Workshop before update");
    console.log("Workshop Data: ", data);

    console.log("Workshop after update");
    data.nodes[nodeSelIndex].subnodes[subnodeSelIndex].hazards[hazardSelndex] =
      updatedHazard;
    console.log("Workshop Data: ", data);

    this.saveDataToBackend(data);
  }

  //Updates Backend data with new values
  updateName() {
    var nodeName = this.state.nodeSelected;
    var nodeIndex = this.state.nodeSelIndex;
    var subnodeName = this.state.subnodeSelected;
    var subnodeIndex = this.state.subnodeSelIndex;
    var itemName = this.state.itemName;
    var itemIndex = this.state.itemSelIndex;

    var data = { ...this.state.data };

    data.nodes[nodeIndex].nodeName = nodeName;
    data.nodes[nodeIndex].subnodes[subnodeIndex].subnodeName = subnodeName;
    data.nodes[nodeIndex].subnodes[subnodeIndex].items[itemIndex].itemName =
      itemName;

    console.log("Update Workshop Data Name: ", data);
    this.saveDataToBackend(data);
  }

  saveDataToBackend(data) {
    //From the workshop ID it replaces the values, the body will be the data Item
    const payload = {
      id: this.state.data._id,
      workshopName: data.workshopName,
      tags: data.tags,
      nodes: data.nodes,
    };

    console.log("Update Data to BACKEND: ", payload);
    axios.post("http://localhost:5000/workshop/updateWorkshop", payload); //Send Payload to Backend
  }

  // setNodeSelected(
  //   nameNode,
  //   nameSubnode,
  //   nameHazard,
  //   nodeIndex,
  //   subnodeIndex,
  //   itemIndex
  // ) {
  //   this.setState({
  //     nodeSelected: nameNode,
  //     subnodeSelected: nameSubnode,
  //     itemSelected: nameItem,
  //     nodeSelIndex: nodeIndex,
  //     subnodeSelIndex: subnodeIndex,
  //     itemSelIndex: itemIndex,
  //     isItemSelected: true,
  //   });
  // }

  //TODO - Refactor from body
  setNodeSelected(
    nameNode,
    nameSubnode,
    nameHazard,
    nodeIndex,
    subnodeIndex,
    hazardIndex
  ) {
    this.setState({
      nodeSelected: nameNode,
      subnodeSelected: nameSubnode,
      hazardSelected: nameHazard,
      nodeSelIndex: nodeIndex,
      subnodeSelIndex: subnodeIndex,
      hazardSelndex: hazardIndex,
      isHazardSelected: true,
    });
  }

  /**
   * Adds Node to node list
   * @param {Obj} node to be added
   */
  addNodeToNodeList(node) {
    //TODO - DOUBLE check if this code is correct
    var data = { ...this.state.data };
    var nodes = [...this.state.data.nodes];
    nodes.push(node);
    data.nodes = nodes;
    this.saveDataToBackend(data);
  }

  clearState() {
    this.setState({
      isItemSelected: false,
      nodeSelected: "",
      subnodeSelected: "",
      itemSelected: "",
    });
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
    var subNodeUpdate = {
      ...this.state.data.nodes[nodeIndex].subnodes[subNodeIndex],
    };
    var itemDataVisible = addVisibilityElement(itemData);
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
  //Generalised for all propertyTypes
  closeAndSaveName(propertyType, updatedName) {
    console.log(`Saving new ${propertyType} name: `, updatedName);
    if (propertyType === "node") {
      this.setState({ nodeSelected: updatedName });
      console.log("TOGGLE NODE modal");
      this.toggleNodeNameModal();
    } else if (propertyType === "subnode") {
      console.log("TOGGLE SUBNODE modal");
      this.setState({ subNodeSelected: updatedName });
      this.toggleSubnodeNameModal();
    } else if (propertyType === "item") {
      console.log("TOGGLE ITEM MODAL");
      this.setState({ itemSelected: updatedName });
      this.toggleItemNameModal();
    } else {
      //TODO Throw some error
      console.log("Improper propertyType when saving data");
    }
    this.updateName();
  }

  toggleNodeNameModal() {
    this.setState({ isOpenNodeNameModal: !this.state.isOpenNodeNameModal });
  }

  toggleSubnodeNameModal() {
    this.setState({
      isOpenSubnodeNameModal: !this.state.isOpenSubnodeNameModal,
    });
  }

  toggleItemNameModal() {
    this.setState({ isOpenItemNameModal: !this.state.isOpenItemNameModal });
  }

  render() {
    const { isOpenNodeNameModal, isOpenSubnodeNameModal, isOpenItemNameModal } =
      this.state;

    return (
      <div>
        <div>Edit Workshop</div>
        <EditDetailsModal
          open={isOpenNodeNameModal}
          propertyType={"node"}
          closeModal={this.closeAndSaveName}
          hideModal={this.toggleNodeNameModal}
        />
        <EditDetailsModal
          open={isOpenSubnodeNameModal}
          propertyType={"subnode"}
          closeModal={this.closeAndSaveName}
          hideModal={this.toggleSubnodeNameModal}
        />
        <EditDetailsModal
          open={isOpenItemNameModal}
          propertyType={"item"}
          closeModal={this.closeAndSaveName}
          hideModal={this.toggleItemNameModal}
        />
        <EditWorkshopHeader
          displayNodeEditModal={this.toggleNodeNameModal}
          displaySubnodeEditModal={this.toggleSubnodeNameModal}
          displayItemEditModal={this.toggleItemNameModal}
          deleteNode={this.deleteNodeFromNodeList}
          deleteSubnode={this.deleteSubNodeFromNode}
          deleteItem={this.deleteItemFromSubNode}
          workshopName={this.state.workshopName}
          nodeSelected={this.state.nodeSelected}
          subnodeSelected={this.state.subnodeSelected}
          itemSelected={this.state.itemSelected}
          tags={this.state.tags}
        />
        <div>test end</div>
      </div>
    );
    // <div>
    //

    //     {/* <EditWorkshopBody
    //       data={this.state.data}
    //       setNodeSelected={this.setNodeSelected}
    //       addNode={this.addNodeToNodeList}
    //       addSubNode={this.addSubNodeToNode}
    //       addHazard={this.addHazardToSubNode}
    //       updateNodeHazard={this.updateNodeHazard}
    //     /> */}
    //   </div>
    // );
  }
}

export default withParams(EditWorkshop);
