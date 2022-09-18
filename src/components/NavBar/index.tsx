/**
 * @file NavBar组件
 * @author  lizhengtai@sensordata.cn
 */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Menu } from "sensd";
import { Link } from "dva/router";
export default function NavBar({ location }) {
  //   selectedKeys的状态
  const [keys, setKeys] = useState<any>([]);
  const handleKey = (pathname) => {
    const temp = pathname.split("/");
    const key = temp && temp.length < 2 ? "tabPage" : temp[1];
    setKeys([key]);
  };

  useEffect(() => {
    handleKey(location.pathname);
  }, [location.pathname]);
  return (
    <div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["tabPage"]}
        selectedKeys={keys}
      >
        <Menu.Item key="tabPage">
          <Link to="/tabPage">tabPage</Link>
        </Menu.Item>
        <Menu.Item key="multiSelect">
          <Link to="/multiSelect">multiSelect</Link>
        </Menu.Item>
        <Menu.Item key="step">
          <Link to="/step">step</Link>
        </Menu.Item>
        <Menu.Item  key="threeSelect">
          <Link to="/threeSelect">threeSelect</Link>
        </Menu.Item>
        <Menu.Item key="userInfo">
          <Link to="/userInfo">userInfo</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
