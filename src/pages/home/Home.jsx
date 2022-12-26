import React, { useEffect, useState } from "react";
import { SideMenu } from "../../components/menu/SideMenu/SideMenu";
import { TopMenu } from "../../components/menu/TopMenu";
import { useAuth } from "../../hooks/useAuth";
import { Login } from "../login/Login";
import "./Home.scss";

export const Home = () => {
  const { auth } = useAuth();
  if (!auth?.token || !auth?.user) return <Login />;

  return (
    <div className="home">
      <div className="home_menu">
        <TopMenu />
      </div>
      <div className="home_content">
        <SideMenu />
      </div>
    </div>
  );
};
