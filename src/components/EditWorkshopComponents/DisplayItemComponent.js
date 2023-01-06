import React, { Component } from "react";
import axios from "axios";
import { Button, Select, Checkbox, message } from "antd";
import { addVisibilityElement } from "../../util/Utilities";

const { Option } = Select;

export default class DisplayItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {

    return (
    <div>Display Item Component</div>
    );
  
  }
