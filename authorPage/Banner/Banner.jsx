import React from "react";
import Image from "next/image";

import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.Banner}>
      <Image
        src={bannerImage}
        objectFit="cover"
        alt="background"
        className={Style.Banner_img}
      />
    </div>
  );
};

export default Banner;
