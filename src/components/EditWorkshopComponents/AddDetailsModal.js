//COMPLETED //TODO - consider add items with options
import React, { Component } from "react";
import { Modal, Alert, Input, message } from "antd";
import { isEmptyString, capitalizeFirstLetter } from "../../util/Utilities";

export default class AddDetailsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyType: "", //should be node, subNode or item
      value: "", // value to be updated
      emptyField: false,
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showEmptyFieldAlert = this.showEmptyFieldAlert.bind(this);
  }

  handleOk() {
    var { propertyType, value } = this.state;
    if (!isEmptyString(value)) {
      this.props.closeModal(propertyType, value); //passes to external
    } else {
      this.setState({ emptyField: true });
      this.showEmptyFieldAlert();
    }
  }

  updateValue = (e) => {
    this.setState({ value: e.target.value });
  };

  handleCancel() {
    this.props.hideModal();
  }
  showEmptyFieldAlert() {
    message.error({
      content: `Please enter a name for the ${this.state.value}`,
      className: "custom-class",
      style: {
        marginTop: "2vh",
      },
    });
  }

  render() {
    const { emptyField } = this.state;
    const { open, propertyType } = this.props;
    const prompt = capitalizeFirstLetter(propertyType) + " Name:";
    const titleHeading = "Add " + prompt;
    return (
      <div>
        <Modal
          title={titleHeading}
          open={open}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {emptyField ? (
            <Alert description="Please enter a name " type="error" closable />
          ) : null}

          <h3> {propertyType} Name: </h3>
          <Input placeholder={prompt} onChange={this.updateValue} allowClear />
        </Modal>
      </div>
    );
  }
}
