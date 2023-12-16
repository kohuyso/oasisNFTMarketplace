import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import { ConnectWallet } from "@thirdweb-dev/react";
import Style from "./NavBarMobile.module.css";

import Image from "next/image";
import Link from "next/link";
import images from "@/images";
import { Button } from "@/components/componentsIndex";
import { useRouter } from "next/router";

const NavBarMobile = ({ handleClick }) => {
  const router = useRouter();
  return (
    <div className={Style.wrapper}>
      <div className={Style.top}>
        <AiOutlineClose
          className={Style.closeIcon}
          onClick={() => handleClick()}
        />
        <Link href="/">
          <div className={Style.logo}>
            <Image
              src={images.sitdeLogo}
              alt="Blur Logo"
              className={Style.logo_img}
            />

            <div
              style={{
                fontWeight: "800",
                fontSize: "21px",
              }}
            >
              OASIS
            </div>
          </div>
        </Link>
        <Link href="/account/">
          <Image src={images.avatar1} className={Style.smallAvatar} />
        </Link>
      </div>
      <div className={Style.nav_items}>
        <Button
          className={Style.item}
          btnName="Tạo NFT"
          classButton="buyButton"
          onClick={() => router.push("/mint")}
        />
        <Button
          className={Style.item}
          btnName="Bộ sưu tập"
          classButton="buyButton"
          onClick={() => router.push("/author")}
        />
        <Button
          className={Style.item}
          btnName="Tìm kiếm"
          classButton="buyButton"
          onClick={() => router.push("/search")}
        />
        <Button
          className={Style.item}
          btnName="Rút tiền đấu giâ"
          classButton="buyButton"
          onClick={() => router.push("/withdraw")}
        />
      </div>
      <div className={Style.buttonWallet1}>
        <ConnectWallet
          btnTitle="Kết nối ví"
          className={Style.buttonWallet1}
          style={{ minWidth: "none" }}
        />
      </div>
    </div>
  );
};

export default NavBarMobile;
