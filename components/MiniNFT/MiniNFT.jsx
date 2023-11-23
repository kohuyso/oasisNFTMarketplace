import React, { useEffect, useState } from "react";
import Image from "next/image";

import Style from "./MiniNFT.module.css";
import images from "../../images";
import Link from "next/link";
import { FcAlarmClock } from "react-icons/fc";
import CountdownTimer from "@/detailPage/CountdownTimer/CountdownTimer";

const MiniNFT = ({
  title,
  data = [{ seller: "" }],
  accountDataAPI = [{ _id: "", account: "" }],
}) => {
  const [nftsData, setNftsData] = useState([]);
  console.log(data);
  console.log(accountDataAPI);
  useEffect(() => {
    const tempData = [];
    for (const nft of data) {
      let tempNFT = nft;
      for (const account of accountDataAPI) {
        if (nft.seller == account._id) {
          tempNFT.accountAvatar = account.avatar;
        }
      }
      tempData.push(tempNFT);
    }
    setNftsData(data);
  }, [accountDataAPI, data]);

  return (
    <div>
      <div className={Style.MiniNFT_wrapper}>
        <div className={Style.MiniNFT_title}>{title}</div>
        <div className={Style.MiniNFT_nft_list}>
          {nftsData?.map((el, i) => (
            <div className={Style.MiniNFT_nft_box} key={el.tokenId}>
              {el.auction?.ended || (
                <div className={Style.auction_box}>
                  <FcAlarmClock className={Style.auction_icon} />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    Kết thúc sau:
                    <CountdownTimer endTime={el.auction.acutionEndTime} />
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
                      src={el.accountAvatar || images.avatar1}
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

export default MiniNFT;
