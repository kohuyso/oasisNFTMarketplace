import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import Style from "./MiniNFT.module.css";
import images from "../../images";
import Link from "next/link";
import { FcAlarmClock } from "react-icons/fc";
import CountdownTimer from "@/detailPage/CountdownTimer/CountdownTimer";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const MiniNFTForHome = ({ title, data = [{ seller: "" }] }) => {
  const { api_getAllAccount } = useContext(Oasis_APIContext);

  const [avatar, setAvatar] = useState({});
  console.log(data);
  useEffect(() => {
    let isMounted = true;
    console.log(data);

    if (isMounted) {
      api_getAllAccount().then((item) => {
        if (item) {
          console.log(item);
          let tempAllAccount = {};
          console.log(item.length);
          for (let index = 0; index < item.length; index++) {
            tempAllAccount[item[index]._id] = item[index].avatar;
          }
          console.log(tempAllAccount);
          setAvatar(tempAllAccount);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className={Style.MiniNFT_wrapper}>
        <div className={Style.MiniNFT_title}>{title}</div>
        <div className={Style.MiniNFT_nft_list}>
          {data?.map((el, i) => (
            <div className={Style.MiniNFT_nft_box} key={el.tokenId}>
              {el.auction?.ended || (
                <div className={Style.auction_box}>
                  <FcAlarmClock className={Style.auction_icon} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    Kết thúc sau:
                    <CountdownTimer endTime={el.auction?.acutionEndTime} />
                  </div>
                </div>
              )}

              <Link href={{ pathname: "/detail", query: el }}>
                <Image
                  src={el.image}
                  alt="NFT images"
                  className={Style.MiniNFT_nft_img}
                  width={1000}
                  height={1000}
                />
              </Link>

              <div className={Style.MiniNFT_nft_info_name}>
                {"#" + el.tokenId + " " + el.name}
              </div>

              <div className={Style.MiniNFT_nft_info}>
                <div className={Style.MiniNFT_nft_info_author}>
                  <Link
                    href={{
                      pathname: "/author",
                      query: { address: el.seller },
                    }}
                  >
                    <Image
                      src={avatar[el.seller] || images.avatar1}
                      alt="NFT images"
                      width={300}
                      height={300}
                      className={Style.MiniNFT_nft_author_avatar}
                    />
                  </Link>
                  <div className={Style.MiniNFT_author_box}>
                    <div> Chủ sở hữu </div>
                    <div>
                      {el.seller
                        ? el.seller.slice(0, 5) +
                          "..." +
                          el.seller.slice(
                            el.seller.length - 5,
                            el.seller.length
                          )
                        : ""}
                    </div>
                  </div>
                </div>

                <div className={Style.MiniNFT_nft_info_price}>
                  <div> Giá </div>
                  <div> {el.price + " ETH"} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniNFTForHome;
