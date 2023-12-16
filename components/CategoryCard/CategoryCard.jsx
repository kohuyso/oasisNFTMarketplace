import React, { useEffect, useState } from "react";
import Style from "./CategoryCard.module.css";
import Image from "next/image";

import images from "../../images";
import Link from "next/link";

const CategoryCard = ({ allNft = [] }) => {
  const [arrayNFT, setArrayNFT] = useState([
    { cateName: "Arts", listNFT: [] },
    { cateName: "Animals", listNFT: [] },
    { cateName: "Games", listNFT: [] },
    { cateName: "Fashions", listNFT: [] },
    { cateName: "Others", listNFT: [] },
  ]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && allNft.length != 0) {
      const itemArts = [];
      const itemAnimals = [];
      const itemGames = [];
      const itemFashions = [];
      const itemOthers = [];
      for (const value of allNft) {
        if (value.category == "Arts") {
          itemArts.push(value);
        }
        if (value.category == "Animals") {
          itemAnimals.push(value);
        }
        if (value.category == "Games") {
          itemGames.push(value);
        }
        if (value.category == "Fashions") {
          itemFashions.push(value);
        }
        if (value.category == "Others") {
          itemOthers.push(value);
        }
      }
      setArrayNFT([
        { cateName: "Arts", listNFT: itemArts },
        { cateName: "Animals", listNFT: itemAnimals },
        { cateName: "Games", listNFT: itemGames },
        { cateName: "Fashions", listNFT: itemFashions },
        { cateName: "Others", listNFT: itemOthers },
      ]);
    }
    return () => {
      isMounted = false;
    };
  }, [allNft]);
  console.log(arrayNFT);
  return (
    <div className={Style.wrapper}>
      <div className={Style.title}>Các chủ đề nổi bật</div>
      <div className={Style.CategoryCard_list}>
        {arrayNFT.map((el, i) => (
          <Link href={{ pathname: "/search" }} key={el.cateName}>
            <div className={Style.CategoryCard_box}>
              <Image
                src={el.listNFT[0]?.image || images.corgiNFT}
                alt="NFT images"
                height={800}
                width={800}
                className={Style.CategoryCard_box_big}
              />
              <div className={Style.CategoryCard_box_small}>
                <Image
                  src={el.listNFT[1]?.image || images.corgiNFT}
                  alt="NFT images"
                  height={400}
                  width={400}
                  className={Style.box_small_img}
                />
                <Image
                  src={el.listNFT[2]?.image || images.corgiNFT}
                  alt="NFT images"
                  height={400}
                  width={400}
                  className={Style.box_small_img}
                />
                <Image
                  src={el.listNFT[3]?.image || images.corgiNFT}
                  alt="NFT images"
                  height={400}
                  width={400}
                  className={Style.box_small_img}
                />
              </div>
              <div className={Style.CategoryCard_box_info}>
                <div className={Style.info_name}>{el.cateName}</div>
                <div className={Style.info_number}>
                  {"Số lượng: " + el.listNFT.length}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
