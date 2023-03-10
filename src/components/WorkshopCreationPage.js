import React, { Component } from "react";
import { Layout, Button } from "antd";
import {
  PlusOutlined,
  CloudUploadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import WorkshopModal from "./ModalComponents/CreateWorkshopModal";
import WorkshopTable from "./WorkshopTable";
import { Link } from "react-router-dom";

export default class WorkshopCreationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    // console.log("Workshop Creation Page");
  }

  toggleModal = () => {
    const toggleVal = !this.state.modalVisible;
    this.setState({ modalVisible: toggleVal });
  };

  render() {
    return (
      <Layout>
        <div className="workshop-creation-page">
          <WorkshopModal
            open={this.state.modalVisible}
            closeModal={this.toggleModal}
          />
          <div className="wcp-header">
            <div className="wcp-header-title" level={2}>
              <div className="wcp-header-title-font">Workshop Creation</div>
            </div>
            <div className="wcp-header-button-list">
              <Button
                className="wcp-header-button-item"
                type="primary"
                onClick={this.toggleModal}
              >
                <PlusOutlined />
                New Workshop
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "20px", color: "white" }}
              >
                <CloudUploadOutlined />
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: "/WorkshopCreationPage/UploadData",
                  }}
                >
                  Load Backend{" "}
                </Link>
              </Button>

              <Button
                type="primary"
                style={{ marginLeft: "20px", color: "white" }}
              >
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: "/WorkshopCreationPage/EditSuggestionsPage",
                  }}
                >
                  <EditOutlined />
                  Edit Suggestions
                </Link>
              </Button>
            </div>
          </div>

          <WorkshopTable />
        </div>
      </Layout>
    );
  }
}
