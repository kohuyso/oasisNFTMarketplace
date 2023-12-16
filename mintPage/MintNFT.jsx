import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

import Style from "./MintNFT.module.css";
import formStyle from "../accountPage/Form/Form.module.css";
import images from "@/images";
import { Button } from "@/components/componentsIndex";
import DropZone from "./DropZone/DropZone";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { useContext } from "react";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const MintNFT = ({ uploadToIPFS, createNFT }) => {
  const router = useRouter();
  const address = useAddress();

  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const categoryArry = [
    {
      image: images.kindArt,
      category: "Arts",
    },
    {
      image: images.NFT3,
      category: "Animals",
    },
    {
      image: images.kindGame,
      category: "Games",
    },
    {
      image: images.kindFashion,
      category: "Fashions",
    },
    {
      image: images.kindOther,
      category: "Others",
    },
  ];

  return (
    <div className={Style.MintNFT}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Kéo và thả file"
        subHeading="hoặc chọn ảnh từ máy"
        name={name}
        description={description}
        category={category}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <div className={Style.MintNFT_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Tên NFT</label>
          <input
            type="text"
            placeholder="Tên NFT"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Mô tả</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="Mô tả NFT"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Chủ đề</label>
          <p className={Style.MintNFT_box_input_para}>Chọn chủ đề cho NFT</p>

          <div className={Style.MintNFT_box_slider_div}>
            {categoryArry.map((el, i) => (
              <div
                className={`${Style.MintNFT_box_slider} ${
                  active == i + 1 ? Style.active : ""
                }`}
                key={i + 1}
                onClick={() => (setActive(i + 1), setCategory(el.category))}
              >
                <div className={Style.MintNFT_box_slider_box}>
                  <div className={Style.MintNFT_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      className={Style.MintNFT_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.MintNFT_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p style={{ marginTop: "0.2rem", textAlign: "center" }}>
                  {" "}
                  {el.category}{" "}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.MintNFT_box}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="price">Giá</label>
            <input
              type="text"
              placeholder="Giá NFT"
              className={formStyle.Form_box_input_userName}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
        </div>

        <div className={Style.MintNFT_box_btn}>
          <Button
            btnName="Tạo NFT"
            handleClick={async () => {
              createNFT(
                name,
                price,
                image,
                description,
                router,
                category,
                address
              );
            }}
            classButton="buyButton"
          />
        </div>
      </div>
    </div>
  );
};

export default MintNFT;
