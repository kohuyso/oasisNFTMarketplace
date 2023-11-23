import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

import Style from "./Footer.module.css";
import images from "@/images";
import classnames from "classnames/bind";
const cx = classnames.bind(Style);

const Footer = ({ theme = "" }) => {
  console.log(theme);
  return (
    <div className={cx("footer", theme)}>
      <div className={Style.Footer_box}>
        <div className={Style.Footer_box_social}>
          <Image
            src={images.sitdeLogo}
            alt="footer logo"
            height={100}
            width={100}
            className={Style.logoImage}
          />
          <p>
            Sàn giao dịch NFT và mở rộng hơn là nơi ứng dụng công nghệ
            blockchain và công nghệ Web3 vào nhiều lĩnh vực đời sống
          </p>

          <div className={Style.Footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div></div>

        <div></div>

        <div className={Style.subscribe}>
          <h3 className={Style.subscribe}>Đăng ký</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Nhập địa chỉ email *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Đăng ký để nhận thông báo về những cập nhập và tin tức mới nhất
              của sàn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
