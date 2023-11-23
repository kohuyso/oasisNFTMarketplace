import React from "react";

import Style from "./Button.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(Style);

const Button = ({ btnName, handleClick, classButton = "" }) => {
  console.log(classButton);
  return (
    <div className={Style.box}>
      <button
        className={cx("button", classButton)}
        onClick={() => handleClick()}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
