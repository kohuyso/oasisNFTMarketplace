import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Search } from "@web3uikit/icons";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import Tippy from "@tippyjs/react/headless";
import Style from "./Header.module.css";
import { FaBars } from "react-icons/fa";

import images from "../../images";
import NavBarMobile from "../NavBar/NavBarMobile/NavBarMobile";
import { useRouter } from "next/router";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import AlertComponent from "../AlertComponent/AlertComponent";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
const Header = () => {
  const { api_getAllAccount, api_createAccount, api_getOneAccount } =
    useContext(Oasis_APIContext);
  const address = useAddress();

  const router = useRouter();
  const { alertMessage, setOpenAlert, openAlert } = useContext(
    Oasis_NFTMarketplaceContext
  );

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [user, setUser] = useState();
  const [searchItem, setSearchItem] = useState("");

  const openMobileNavbar = () => {
    setMobileNavbar(!mobileNavbar);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      var checkExist = false;
      api_getAllAccount().then((el) => {
        console.log(el);
        el?.forEach((elemnet) => {
          if (elemnet._id == address) {
            checkExist = true;
          }
        });
      });
      console.log(checkExist);
      if (checkExist == false && address) {
        api_createAccount(address);
      }

      api_getOneAccount(address).then((item) => {
        setUser(item);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [address]);

  return (
    <div className={Style.wrapper}>
      {mobileNavbar && (
        <div className={Style.nav_bar_mobile}>
          <NavBarMobile handleClick={openMobileNavbar} />
        </div>
      )}
      <div className={Style.navbar}>
        <FaBars className={Style.barsIcon} onClick={() => openMobileNavbar()} />

        <Link href="/">
          <div className={Style.logo}>
            <Image
              src={images.sitdeLogo}
              alt="Blur Logo"
              width="40"
              height="40"
              className={Style.logoImage}
            />

            <div
              style={{
                fontWeight: "800",
                marginLeft: "1rem",
                fontSize: "16px",
              }}
            >
              OASIS
            </div>
          </div>
        </Link>
        <div className={Style.nav}>
          <div className={Style.searchSection}>
            <div>
              <span>
                );
                <Search
                  onClick={() => {
                    router.push("/search?search=" + searchItem);
                  }}
                />
              </span>
              <input
                placeholder="Tìm kiếm các NFT và chủ đề"
                disabled=""
                className={Style.inputField}
                onChange={(e) => setSearchItem(e.target.value)}
                value={searchItem}
              />
            </div>
          </div>
          <div className={Style.nav_items}>
            <Tippy
              interactive
              render={(attrs) => (
                <div className={Style.tippyChild} tabIndex="-1" {...attrs}>
                  <button
                    className={Style.button}
                    onClick={() => router.push("/mint")}
                  >
                    Tạo NFT
                  </button>

                  <button
                    className={Style.button}
                    onClick={() => router.push("/author/?address=" + address)}
                  >
                    Bộ sưu tập
                  </button>

                  <button
                    className={Style.button}
                    onClick={() => router.push("/search")}
                  >
                    Tìm kiếm
                  </button>
                  <button
                    className={Style.button}
                    onClick={() => router.push("/withdraw")}
                  >
                    Rút tiền đấu giá
                  </button>
                </div>
              )}
            >
              <div className={Style.link}>
                <div className={Style.nav_items_discover}>KHÁM PHÁ</div>
              </div>
            </Tippy>

            <div className={Style.buttonWallet1}>
              <ConnectWallet
                theme="dark"
                btnTitle="Kết nối ví"
                className={Style.buttonWallet1}
                style={{ minWidth: "none" }}
              />
            </div>
            <Link href="/account/">
              <Image
                src={user?.avatar || images.avatar1}
                width={100}
                height={100}
                className={Style.smallAvatar}
              />
            </Link>
          </div>
        </div>
      </div>
      {openAlert && (
        <AlertComponent
          setOpenAlert={setOpenAlert}
          alertMessage={alertMessage}
        />
      )}
    </div>
  );
};

export default Header;
