import React, { Component } from "react";
import { Input, Popconfirm } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiSave } from "react-icons/fi";

export default class EditableSuggestionItem extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      dataAssessed: this.props.data,
    };

    this.toggleEditable = this.toggleEditable.bind(this);
    this.deleteCurrentField = this.deleteCurrentField.bind(this);
  }

  toggleEditable() {
    this.setState({ editable: !this.state.editable });
  }

  /**
   *  Change field type to not editable if user press enter
   * @param {event} e
   */
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.toggleEditable();
    }
  };
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      console.log("Edit Suggestion Item Updated");
      console.log("Data Assessed: ", this.props.data);
      this.setState({ dataAssessed: this.props.data });
    }
  }

  //Update individual field state
  updateFieldName = (e) => {
    this.setState({ dataAssessed: e.target.value });
  };

  //Detect Changed state than triggers the option to change
  saveToParent() {
    this.props.updateData(
      this.state.dataAssessed,
      this.props.index,
      this.props.itemType
    );
  }

  //Delete itemField
  deleteCurrentField() {
    this.props.deleteField(this.props.itemType, this.props.index);
  }

  render() {
    if (!this.state.editable) {
      return (
        <div className="editable-suggestion-item">
          {this.saveToParent()}
          <div className="esi-box-default" onDoubleClick={this.toggleEditable}>
            <div style={{ marginLeft: "5px" }}>{this.state.dataAssessed}</div>
          </div>
          <AiOutlineEdit />
          <Popconfirm
            title="Are you sure you want to delete the field"
            onConfirm={this.deleteCurrentField}
          >
            <AiOutlineDelete />
          </Popconfirm>
        </div>
      );
    } else {
      return (
        <div className="editable-suggestion-item">
          <Input
            defaultValue={this.state.dataAssessed}
            onDoubleClick={this.toggleEditable}
            onKeyPress={this.handleKeyPress}
            size="small"
            style={{ width: "95%" }}
            onChange={this.updateFieldName}
          />
          <FiSave />
          <Popconfirm
            title="Are you sure you want to delete this field"
            onConfirm={this.deleteCurrentField}
          >
            <AiOutlineDelete />
          </Popconfirm>
        </div>
      );
    }
  }
}
