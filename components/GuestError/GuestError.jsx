import React from "react";
import Style from "./GuestError.module.css";
import { Button } from "../componentsIndex";
import { ConnectWallet } from "@thirdweb-dev/react";
const GuestError = () => {
  return (
    <div className={Style.guestError}>
      <div className={Style.guestError_box}>
        Bạn cần đăng nhập để truy cập chức năng này
        <div className={Style.guestError_box_button}>
          <ConnectWallet
            theme="dark"
            btnTitle="Kết nối ví"
            className={Style.buttonWallet1}
            style={{ minWidth: "none" }}
          />
          <a
            href="https://coin98.net/vi-metamask"
            className={Style.button}
            target="_blank"
          >
            Hướng dẫn tạo ví metamask
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestError;
