import React, { useEffect, useState } from "react";
import Style from "./ArtistCard.module.css";
import Image from "next/image";
import images from "@/images";
import Link from "next/link";

const ArtistCard = ({ accounts }) => {
  const [arrayArtist, setArrayArtist] = useState([]);

  useEffect(() => {
    if (accounts?.length != 0) {
      console.log(accounts);
      setArrayArtist(accounts);
    }
  }, [accounts]);

  return (
    <div className={Style.ArtistCard_wrapper}>
      <div className={Style.ArtistCard_title}>Tác giả nổi bật</div>
      <div className={Style.ArtistCard_list}>
        {arrayArtist?.map((el, i) => (
          <Link
            href={{
              pathname: "/author",
              query: { address: el._id },
            }}
            key={el._id}
          >
            <div className={Style.ArtistCard_box}>
              <Image
                src={el.newestNFT || images.NFT1}
                alt="NFT images"
                width={500}
                height={500}
                className={Style.ArtistCard_box_img}
              />
              <div className={Style.ArtistCard_bug}>
                <Image
                  src={el.avatar || images.avatar1}
                  alt="NFT images"
                  width={300}
                  height={300}
                  className={Style.ArtistCard_box_avatar}
                />
                <div className={Style.ArtistCard_box_infor}>
                  <div className={Style.ArtistCard_box_infor_name}>
                    {" "}
                    {el._id.slice(0, 5) + "..." + el._id.slice(-5)}{" "}
                  </div>
                  <div className={Style.ArtistCard_box_infor_number}>
                    {"Số NFT: " + el.nftNumber}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistCard;
