import React, { Component } from "react";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import UserProfileDrawer from "./UserProfileDrawer";
import { Menu, Button } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default class NavBar extends Component {
  state = { drawerVisible: false };
  //   navigate = useNavigate();

  //TODO - replace this two commands with a toggle command
  showDrawer = () => {
    this.setState({ drawerVisible: true });
    console.log("Show Drawer");
  };

  onClose = () => {
    this.setState({ drawerVisible: false });
  };

  onNavBarClick = (e) => {
    //pass
    if (e.key == "/userDetails") {
      //Do toggle navbar
    } else {
      //Handle route changes
      //   this.navigate(e.key);
    }

    console.log("Current key:", e.key);
    //Todo handle corresponding changes
  };

  navBarItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: "Home Page",
    },
    {
      key: "/FacilitateWorkshopPage",
      icon: <UserOutlined />,
      label: "Facilitate Workshop",
    },
    {
      key: "/WorkshopCreationPage",
      icon: <UserOutlined />,
      label: "Create Workshop",
    },
    {
      key: "/userDetails",
      icon: <PlusOutlined />,
      label: "User Details",
    },
  ];

  render() {
    return (
      <div>
        <Menu
          items={this.navBarItems}
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={["/"]}
          //   onClick={this.onNavBarClick}
        />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item icon={<AppstoreOutlined />}>
            <Link to="/">Home Page</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to="/FacilitateWorkshopPage">Facilitate Workshop</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to="/WorkshopCreationPage">Create Workshop</Link>
          </Menu.Item>
          <Menu.Item>
            <Button type="primary" onClick={this.showDrawer}>
              <PlusOutlined /> User Details
            </Button>
          </Menu.Item>
        </Menu> */}
        <UserProfileDrawer
          drawerVisible={this.state.drawerVisible}
          onClose={this.onClose}
        />
      </div>
    );
  }
}
