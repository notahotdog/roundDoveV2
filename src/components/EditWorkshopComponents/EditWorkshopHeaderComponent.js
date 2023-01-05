import React, { Component } from "react";
import { Button, Popconfirm } from "antd";
//TODO - Refactor frontend
export default class EditWorkshopHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      displayNodeEditModal,
      displaySubnodeEditModal,
      displayItemEditModal,
      deleteNode,
      deleteSubnode,
      deleteItem,
      workshopName,
      nodeSelected,
      subnodeSelected,
      itemSelected,
      tags,
    } = this.props;
    return (
      <div>
        <div>Edit Workshop Header</div>
        <div className="ew-header">
          <div className="ew-header-left-col">
            <div className="ew-header-title">{workshopName}</div>
            <div className="ew-header-node-details">
              <div className="ew-node-details-col1">
                <div className="item-subtitle">
                  <div className="ew-node-title">Node Assessed:</div>
                  <div className="item-content">{nodeSelected}</div>
                </div>
                <div className="item-subtitle">
                  <div className="ew-node-title">Sub node Assessed:</div>
                  <div className="item-content">{subnodeSelected}</div>
                </div>
                <div className="item-subtitle">
                  <div className="ew-node-title">Item Assessed:</div>
                  <div className="item-content">{itemSelected}</div>
                </div>
              </div>
              <div className="ew-node-details-col2">
                <div className="ew-row-button">
                  <div className="ew-edit-button">
                    <Button
                      className="item-button"
                      type="link"
                      style={{
                        alignItem: "flex-end",
                        fontSize: "17px",
                        marginRight: "60px",
                      }}
                      onClick={displayNodeEditModal}
                    >
                      Edit Node Name
                    </Button>
                  </div>

                  <Popconfirm
                    title="Are you sure you want to delete node?"
                    onConfirm={deleteNode}
                  >
                    <Button
                      className="item-button"
                      type="link"
                      style={{ alignItem: "flex-end", fontSize: "17px" }}
                    >
                      Delete Node
                    </Button>
                  </Popconfirm>
                </div>
                <div className="ew-row-button">
                  <div className="ew-edit-button">
                    <Button
                      className="item-button"
                      type="link"
                      style={{
                        alignItem: "flex-end",
                        fontSize: "17px",
                      }}
                      onClick={displaySubnodeEditModal}
                    >
                      Edit Subnode Name
                    </Button>
                  </div>
                  <Popconfirm
                    title="Are you sure you want to delete subnode?"
                    onConfirm={deleteSubnode}
                  >
                    <Button
                      className="item-button"
                      type="link"
                      style={{ alignItem: "flex-end", fontSize: "17px" }}
                    >
                      Delete SubNode
                    </Button>
                  </Popconfirm>
                </div>
                <div className="ew-row-button">
                  <div className="ew-edit-button">
                    <Button
                      className="item-button"
                      type="link"
                      style={{
                        alignItem: "flex-end",
                        fontSize: "17px",
                        marginRight: "30px",
                      }}
                      onClick={displayItemEditModal}
                    >
                      Edit Item Name
                    </Button>
                  </div>

                  <Popconfirm
                    title="Are you sure you want to delete item?"
                    onConfirm={deleteItem}
                  >
                    <Button
                      className="item-button"
                      type="link"
                      style={{ alignItem: "flex-end", fontSize: "17px" }}
                    >
                      Delete Item
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>

          <div className="ew-header-right-col">
            <div className="ew-tags">
              <div className="ew-tags-title">Tags </div>
              {tags.map((tag, index) => {
                return (
                  <div className="ew-node-details-tags" key={index}>
                    [ {tag} ]
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
