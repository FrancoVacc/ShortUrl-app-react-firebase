import React from "react";
import { Outlet } from "react-router-dom";

const LayoutContainerForm = () => {
  return (
    <div className="bg-[url('./img/fondo.png')] pt-5 pb-20">
      <Outlet />
    </div>
  );
};

export default LayoutContainerForm;
