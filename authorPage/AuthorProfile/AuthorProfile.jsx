import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";

import Style from "./AuthorProfile.module.css";
import images from "@/images";
import { Button } from "@/components/componentsIndex";
import { useAddress } from "@thirdweb-dev/react";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import Link from "next/link";

const AuthorProfile = ({ authorData }) => {
  const address = useAddress();
  console.log(authorData);

  const { api_getOneAccount, api_followAccount } = useContext(Oasis_APIContext);

  const [followState, setFollowState] = useState(false);
  const [accountData, setAccountData] = useState();

  useEffect(() => {
    api_getOneAccount(authorData.address).then((item) => {
      if (item) {
        setAccountData(item);
        console.log(item);
        const checkFollow = item.follower.find((el) => {
          console.log(el);
          console.log(address);

          if (el == address) {
            console.log(el);
            return el;
          }
        });
        console.log(checkFollow);
        if (checkFollow) {
          setFollowState(true);
        }
      }
    });
  }, [authorData, address]);

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const followAccount = () => {
    if (followState == false) {
      api_followAccount(address, authorData.address, 1);
      setFollowState(true);
    } else {
      api_followAccount(address, authorData.address, -1);
      setFollowState(false);
    }
    // api_likeNFT();
    // setLike(!like);
    // setLikeNumber(likeNumber + 1);
    console.log("BBBBBBB");
  };

  return (
    <div className={Style.AuthorProfile}>
      <div className={Style.AuthorProfile_box}>
        <div className={Style.AuthorProfile_box_img}>
          <Image
            src={accountData?.avatar || images.avatar1}
            className={Style.AuthorProfile_box_img_img}
            width={500}
            height={500}
            alt="NFT IMAGES"
          />
        </div>

        <div className={Style.AuthorProfile_box_info}>
          <h2>Nhà sáng tạo </h2>

          <div>
            <input
              type="text"
              value={authorData.address}
              id="myInput"
              className={Style.AuthorProfile_box_info_address}
            />
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.AuthorProfile_box_info_address_icon}
            />
          </div>

          <p>
            Nhà sáng tạo nội dung, tác phẩm nghệ thuật ứng dụng công nghệ
            blockchain
          </p>

          <div className={Style.AuthorProfile_box_info_social}>
            <Link
              href={"https://" + accountData?.link || "youtube.com"}
              target="_blank"
            >
              <TiSocialFacebook />
            </Link>
            <a
              href={"https://" + accountData?.link || "youtube.com"}
              target="_blank"
            >
              <TiSocialInstagram />
            </a>
            <a
              href={"https://" + accountData?.link || "youtube.com"}
              target="_blank"
            >
              <TiSocialLinkedin />
            </a>
            <a
              href={"https://" + accountData?.link || "youtube.com"}
              target="_blank"
            >
              <TiSocialYoutube />
            </a>
          </div>
        </div>
        {authorData.address == address ? (
          <></>
        ) : (
          <>
            {followState ? (
              <Button
                btnName="Đang theo dõi"
                handleClick={() => {
                  followAccount();
                }}
              />
            ) : (
              <Button
                btnName="Theo dõi"
                handleClick={() => {
                  followAccount();
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
