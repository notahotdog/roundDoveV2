import React, { Component } from "react";
import { Button, Popconfirm } from "antd";
export default class EditWorkshopHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //Needs workshop,node,subnode,item

  render() {
    return (
      <div>
        <div>Edit Workshop Header</div>
        <div className="ew-header">
          <div className="ew-header-left-col">
            <div className="ew-header-title">{this.state.workshopName}</div>

            <div className="ew-header-node-details">
              <div className="ew-node-details-col1">
                <div className="item-subtitle">
                  <div className="ew-node-title">Node Assessed:</div>
                  <div className="item-content">{this.state.nodeSelected}</div>
                </div>
                <div className="item-subtitle">
                  <div className="ew-node-title">Sub node Assessed:</div>
                  <div className="item-content">
                    {this.state.subnodeSelected}
                  </div>
                </div>
                <div className="item-subtitle">
                  <div className="ew-node-title">Hazard Assessed:</div>
                  <div className="item-content">
                    {this.state.hazardSelected}
                  </div>
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
                      onClick={this.props.displayNodeEditModal}
                    >
                      Edit Node Name
                    </Button>
                  </div>

                  <Popconfirm
                    title="Are you sure you want to delete node?"
                    onConfirm={this.deleteNodeFromNodeList}
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
                      onClick={this.openSubnodeNameModal}
                    >
                      Edit Subnode Name
                    </Button>
                  </div>
                  <Popconfirm
                    title="Are you sure you want to delete subnode?"
                    onConfirm={this.deleteSubNodeFromNode}
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
                      onClick={this.openHazardNameModal}
                    >
                      Edit Hazard Name
                    </Button>
                  </div>

                  <Popconfirm
                    title="Are you sure you want to delete hazard?"
                    onConfirm={this.deleteHazardFromSubNode}
                  >
                    <Button
                      className="item-button"
                      type="link"
                      style={{ alignItem: "flex-end", fontSize: "17px" }}
                    >
                      Delete Hazard
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>

          <div className="ew-header-right-col">
            <div className="ew-tags">
              <div className="ew-tags-title">Tags </div>
              {this.state.tags.map((tag, index) => {
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
