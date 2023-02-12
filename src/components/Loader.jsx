import React from "react";

const Loader = () => {
  return (
    <div className="w-[100%] text-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
