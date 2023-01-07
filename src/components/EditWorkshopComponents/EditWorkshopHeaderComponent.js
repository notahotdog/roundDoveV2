//TODO - Refactor frontend
import React, { Component } from "react";
import { Button, Popconfirm } from "antd";
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
        <div className="edit-workshop-header">
          <div className="ewh-left-col">
            <div className="ewh-title">Workshop Name:{workshopName}</div>
            <div className="ewh-details">
              <div className="ewh-details-col1">
                <div className="ewh-details-col1-outline">
                  <div className="ewh-details-col1-title">Node Assessed:</div>
                  <div className="ewh-details-col1-desc">{nodeSelected}</div>
                </div>
                <div className="ewh-details-col1-outline">
                  <div className="ewh-details-col1-title">
                    Sub node Assessed:
                  </div>
                  <div className="ewh-details-col1-desc">{subnodeSelected}</div>
                </div>
                <div className="ewh-details-col1-outline">
                  <div className="ewh-details-col1-title">Item Assessed:</div>
                  <div className="ewh-details-col1-desc">{itemSelected}</div>
                </div>
              </div>
              <div className="ewh-details-col2">
                <div className="ewh-col2-outline">
                  <div className="ewh-col2-edit">
                    <Button
                      className="ewh-col2-editbutton"
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
                      className="ewh-col2-editbutton"
                      type="link"
                      style={{ alignItem: "flex-end", fontSize: "17px" }}
                    >
                      Delete Node
                    </Button>
                  </Popconfirm>
                </div>
                <div className="ewh-col2-outline">
                  <div className="ewh-col2-edit">
                    <Button
                      className="ewh-col2-editbutton"
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
                      className="ewh-col2-editbutton"
                      type="link"
                      style={{ alignItem: "flex-end", fontSize: "17px" }}
                    >
                      Delete SubNode
                    </Button>
                  </Popconfirm>
                </div>
                <div className="ewh-col2-outline">
                  <div className="ewh-col2-edit">
                    <Button
                      className="ewh-col2-editbutton"
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
                      className="ewh-col2-editbutton"
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

          <div className="ewh-right-col">
            <div className="ewh-tags">
              <div className="ewh-tags-title">Tags </div>
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
