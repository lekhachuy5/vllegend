import React from "react";

const Logo = (props) => {
  return (
    <div>
      <img
        alt="Logo"
        src="/static/images/logoVL.png"
        style={{ maxHeight: "50px", maxWidth: "50px" }}
        {...props}
      />
      <h4>VL-Legend</h4>
    </div>
  );
};

export default Logo;
