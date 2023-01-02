import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileDrawer from "./UserProfileDrawer";
import { Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function NavBar() {
  const [drawerVisible, setDrawerVisible] = useState(false); // convert to hook
  const navigate = useNavigate();

  //TODO - replace this two commands with a toggle command

  function toggleDrawer() {
    setDrawerVisible(!drawerVisible);
  }

  function onNavBarClick(e) {
    if (e.key === "/userDetails") {
      toggleDrawer();
    } else {
      navigate(e.key); //route changes
    }
  }

  const navBarItems = [
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

  return (
    <div>
      <Menu
        items={navBarItems}
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["/"]}
        onClick={onNavBarClick}
      />
      <UserProfileDrawer drawerVisible={drawerVisible} onClose={toggleDrawer} />
    </div>
  );
}
