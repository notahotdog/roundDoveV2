import React, { Component } from "react";
import FacilitatorCard from "./FacilitateWorkshopComponents/FacilitatorCard";
import "../FacilitatorPage.css";
import axios from "axios";
export default class FacilitateWorkshopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    console.log("Facilitate Workshop Instance");
    axios.get("http://localhost:5000/workshop/").then((response) => {
      this.setState({ data: response.data });
    });
  }

  render() {
    return (
      <div className="facilitator-workshop-page">
        <div className="fwp-title">
          <h1>List of Workshops </h1>
        </div>

        <div className="card-list">
          {this.state.data.map((workshop) => {
            return <FacilitatorCard data={workshop} key={workshop._id} />;
          })}
        </div>
      </div>
    );
  }
}
