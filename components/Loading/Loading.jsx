import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={Style.wrapper}>
      <CircularProgress
        color="inherit"
        style={{ width: "200px", height: "200px" }}
      />
      <div className={Style.title}>LOADING</div>
    </div>
  );
};

export default Loading;
