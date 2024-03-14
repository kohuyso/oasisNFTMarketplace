import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { Search } from "@web3uikit/icons";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import Tippy from "@tippyjs/react/headless";
import Style from "./NavBar.module.css";
import { FaBars } from "react-icons/fa";

import images from "../../images";
import NavBarMobile from "./NavBarMobile/NavBarMobile";
import { useRouter } from "next/router";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const NavBar = () => {
  const router = useRouter();
  const address = useAddress();
  const { api_getAllAccount, api_createAccount, api_getOneAccount } =
    useContext(Oasis_APIContext);
  const [user, setUser] = useState();

  const [searchResult, setSearchResult] = useState([]);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        setSearchResult([]);
      }, 0);
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
    <main className={Style.main}>
      <div className={Style.navbar}>
        <FaBars className={Style.barsIcon} onClick={() => openMobileNavbar()} />
        {mobileNavbar && (
          <div className={Style.nav_bar_mobile}>
            <NavBarMobile handleClick={openMobileNavbar} />
          </div>
        )}
        <Link href="/">
          <div className={Style.logo}>
            <Image
              src={images.sitdeLogo}
              alt="Blur Logo"
              width="40"
              height="40"
              className={Style.logoImage}
            />

            <div className={Style.logoText} >
              OASIS
            </div>
          </div>
        </Link>
        <div className={Style.nav}>
          <div className={Style.searchSection}>
            <div>
              <span>
                <Search />
              </span>
              <input
                placeholder="Tìm kiếm NFT và chủ đề"
                disabled=""
                className={Style.inputField}
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
                <p>KHÁM PHÁ</p>
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

      <section className={Style.heroSection}>
        <section className={Style.carousel}>
          <section className={Style.carousel_section}>
            <a href="https://ethereum.org/vi/" target="_blank">
              <Image
                src={images.IntroEThereum}
                alt="Ethereum_image"
                width=""
                height=""
                className={Style.carousel_img}
              />
              <Image
                src={images.logo1}
                alt=""
                width=""
                height=""
                className={Style.carousel_profile}
              />
            </a>
          </section>

          <section className={Style.carousel_section}>
            <a href="https://ethereum.org/en/web3/" target="_blank">
              <Image
                src={images.IntroWeb3}
                alt="Web3_image"
                width=""
                height=""
                className={Style.carousel_img}
              />
              <Image
                src={images.logo1}
                alt=""
                width=""
                height=""
                className={Style.carousel_profile}
              />
            </a>
          </section>
          <section className={Style.carousel_section}>
            <a
              href="https://about.meta.com/what-is-the-metaverse/"
              target="_blank"
            >
              <Image
                src={images.IntroMetaverse}
                alt="Metaverse_image"
                width=""
                height=""
                className={Style.carousel_img}
              />
              <Image
                src={images.logo1}
                alt=""
                width=""
                height=""
                className={Style.carousel_profile}
              />
            </a>
          </section>
          <section className={Style.carousel_section}>
            <a
              href="https://vi.wikipedia.org/wiki/Non-fungible_token"
              target="_blank"
            >
              <Image
                src={images.IntroNFT}
                alt="NFT_image"
                width=""
                height=""
                className={Style.carousel_img}
              />
              <Image
                src={images.logo1}
                alt=""
                width=""
                height=""
                className={Style.carousel_profile}
              />
            </a>
          </section>
          <section className={Style.carousel_section}>
            <a href="https://coin98.net/vi-metamask" target="_blank">
              <Image
                src={images.metaMask}
                alt="Solidity_image"
                width=""
                height=""
                className={Style.carousel_img}
              />
              <Image
                src={images.logo1}
                alt=""
                width=""
                height=""
                className={Style.carousel_profile}
              />
            </a>
          </section>
        </section>
      </section>
    </main>
  );
};

export default NavBar;
