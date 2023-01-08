//TODO - Add Display Item Component
import React, { Component } from "react";
import { Menu } from "antd";
import "../../EditWorkshopPage.css";
const { SubMenu } = Menu;

export default class EditWorkshopBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemLoaded: {
        itemName: "",
        itemAllocated: false,
        detail1: [""],
        detail2: [""],
        detail3: [""],
        detail4: [""],
        isItemAllocated: false,
      },
      nodeIndexToAddSubnode: 0,
      subnodeIndexToAddItem: 0,
      isItemAllocated: false,
    };

    this.toggleAddNodeModalVisible = this.toggleAddNodeModalVisible.bind(this);
    this.toggleAddSubNodeModalVisible =
      this.toggleAddSubNodeModalVisible.bind(this);
    this.toggleAddItemModalVisible = this.toggleAddItemModalVisible.bind(this);
  }

  toggleAddNodeModalVisible() {
    console.log("toggle add node modal");
    this.props.showAddNodeModal();
  }

  toggleAddSubNodeModalVisible(nodeIndex) {
    this.setState({
      nodeIndexToAddSubnode: nodeIndex,
    });
    this.props.showAddSubnodeModal();
  }
  toggleAddItemModalVisible(nodeIndex, subnodeIndex) {
    this.setState({
      nodeIndexToAddSubnode: nodeIndex,
      subnodeIndexToAddItem: subnodeIndex,
    });
    this.props.showAddItemModal();
  }

  //TODO - Complete
  setItemSelectedTrue() {}

  //Everytime trigger click - updates the node/subnodeIndex,item selected

  updateClickedItem(node, subnode, item, nodeIndex, subnodeIndex, itemIndex) {
    console.log("State of Menu Item Clicked Item", item);
    //TODO - Instead of the nodeName and subNodeName should pass in the index of all the components
    //Should be able to extract the node by themselves
    this.props.setNodeSelected(
      node.nodeName,
      subnode.subnodeName,
      item.itemName,
      nodeIndex,
      subnodeIndex,
      itemIndex
    );

    this.setState({ itemLoaded: item });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="edit-workshop-body">
        <div className="ewb-left-col">
          {/* {data.nodes.map((node, nodeIndex) => {
            return (
              <div>
                <div>Node Name: {node.nodeName}</div>;
                {node.subnodes.map((subnode, subnodeIndex) => {
                  return (
                    <div>
                      <div> Subnode Name: {subnode.subnodeName}</div>
                      {subnode.items.map((item, itemIndex) => {
                        return (
                          <div>
                            <div> itemName: {item.itemName}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })} */}
          <Menu
            onClick={this.handleClick}
            style={{ width: "100%" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item onClick={this.toggleAddNodeModalVisible}>
              ++ Add Node
            </Menu.Item>
            {data.nodes.map((node, nodeIndex) => {
              return (
                <SubMenu key={node.nodeName} title={node.nodeName}>
                  <Menu.Item
                    onClick={
                      () => this.toggleAddSubNodeModalVisible(nodeIndex) //TODO figure out how to include the node and nodeIndex
                    }
                  >
                    ++ Add SubNode
                  </Menu.Item>
                  {node.subnodes.map((subnode, subnodeIndex) => {
                    return (
                      <SubMenu
                        key={node.nodeName
                          .concat(subnode.subnodeName)
                          .concat(subnodeIndex)} //TODO - REFACTOR THIS KEY
                        title={subnode.subnodeName}
                      >
                        <Menu.Item
                          onClick={() =>
                            this.toggleAddItemModalVisible(
                              nodeIndex,
                              subnodeIndex
                            )
                          }
                        >
                          ++ Add Item
                        </Menu.Item>
                        {subnode.items.map((item, itemIndex) => {
                          return (
                            <Menu.Item
                              key={node.nodeName
                                .concat(subnode.subnodeName)
                                .concat(subnodeIndex)
                                .concat(item.itemName)
                                .concat(itemIndex)}
                              onClick={() => {
                                this.updateClickedItem(
                                  node,
                                  subnode,
                                  item,
                                  nodeIndex,
                                  subnodeIndex,
                                  itemIndex
                                );
                                this.setItemSelectedTrue();
                              }}
                            >
                              {item.itemName}
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </div>
        {/* {console.log("Edit workshop body", this.props.data)} */}
        <div className="ewb-right-col">something</div>
      </div>
    );
  }
}
