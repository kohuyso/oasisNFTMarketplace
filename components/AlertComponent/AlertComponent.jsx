import React from "react";
import Style from "./AlertComponent.module.css";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
const AlertComponent = ({
  setOpenAlert,
  alertMessage = "Lỗi rồi",
  type = "error",
}) => {
  return (
    <div className={Style.wrapper}>
      {alertMessage.type == 1 ? (
        <>
          <div className={Style.info}>
            <AiOutlineExclamationCircle className={Style.icon} />
            <div className={Style.oops}>Fail!</div>
            <div>{alertMessage.message}</div>
          </div>
          <AiFillCloseCircle
            className={Style.iconClose}
            style={{ marginTop: "0.1rem" }}
            onClick={() => setOpenAlert(false)}
          />
        </>
      ) : (
        <>
          <div className={Style.info}>
            <AiFillCheckCircle className={Style.icon2} />
            <div className={Style.oops}>Success!</div>
            <div>{alertMessage.message}</div>
          </div>
          <AiFillCloseCircle
            className={Style.iconClose2}
            style={{ marginTop: "0.1rem" }}
            onClick={() => setOpenAlert(false)}
          />
        </>
      )}
    </div>
  );
};

export default AlertComponent;
