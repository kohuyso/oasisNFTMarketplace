import React, { useContext, useEffect, useState } from "react";

import Style from "./MainInfo.module.css";
import Image from "next/image";
import images from "@/images";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaShapes, FaEthereum } from "react-icons/fa6";
import { Button } from "@/components/componentsIndex";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const MainInfo = ({ nftData, nftDataApiSub }) => {
  const { api_likeNFT, api_getOneAccount } = useContext(Oasis_APIContext);
  const { buyNFT } = useContext(Oasis_NFTMarketplaceContext);
  const [likeNumber, setLikeNumber] = useState(nftDataApiSub.like);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [creatorAvatar, setCreatorAvatar] = useState(images.avatar2);
  const [ownerAvatar, setOwnerAvatar] = useState(images.avatar2);
  const [createAuction, setCreateAuction] = useState(false);
  const [auction, setAuction] = useState(false);

  const router = useRouter();
  const address = useAddress();
  const [like, setLike] = useState(false);
  const [ethUSDPrice, setEthUSDPrice] = useState(1733);

  useEffect(() => {
    try {
      axios
        .get(" https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        .then((response) => {
          console.log(response);
          setEthUSDPrice(response.data.USD);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      api_getOneAccount(address).then((item) => {
        let checkLike = false;
        if (item) {
          item.like.filter((el) => {
            if (el == nftData.tokenId) {
              checkLike = true;
              console.log(checkLike);
            }
          });
          console.log(checkLike);
          if (checkLike) {
            setLike(true);
          } else {
            setLike(false);
          }
        }
      });

      api_getOneAccount(nftData.creator).then((item) => {
        setCreatorAvatar(item?.avatar);
      });
      api_getOneAccount(nftData.owner).then((item) => {
        setOwnerAvatar(item?.avatar);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(nftDataApiSub);
    nftDataApiSub.history.forEach((el, index) => {
      if (index == 0) {
        setMinPrice(el.price);
      }
      if (el.price > maxPrice) {
        setMaxPrice(el.price);
      }
      if (el.price < minPrice) {
        setMinPrice(el.price);
      }
    });
    setLikeNumber(nftDataApiSub.like);
  }, [nftDataApiSub]);

  console.log(nftData);

  const likeNFT = () => {
    if (like == false) {
      api_likeNFT(nftData.tokenId, address, 1);
      setLike(true);
      setLikeNumber(likeNumber + 1);
    } else {
      api_likeNFT(nftData.tokenId, address, -1);
      setLike(false);
      setLikeNumber(likeNumber - 1);
    }
    // api_likeNFT();
    // setLike(!like);
    // setLikeNumber(likeNumber + 1);
    console.log("AAAAAAA");
  };

  return (
    <div className={Style.wrapper}>
      <div className={Style.nft_info_name_mobile}>
        {"#" + nftData.tokenId + " " + nftData.name}
      </div>

      <Image
        src={nftData.image}
        width={100}
        height={100}
        alt="NFT images"
        className={Style.nft_img}
      />
      <div className={Style.nft_info}>
        <div className={Style.nft_info_name}>
          {"#" + nftData.tokenId + " " + nftData.name}
        </div>
        <div className={Style.info_owner_wrapper}>
          <div className={Style.info_owner_box}>
            <Link
              href={{
                pathname: "/author",
                query: { address: nftData.creator },
              }}
            >
              <Image
                src={creatorAvatar || images.avatar1}
                alt="creator images"
                className={Style.info_owner_avatar}
              />
              <div className={Style.info_owner_name}>
                <div style={{ fontWeight: "600" }}>Creator</div>

                <div>
                  {nftData.creator?.slice(0, 8) +
                    "..." +
                    nftData.creator?.slice(-8)}
                </div>
              </div>
            </Link>
          </div>
          <div className={Style.info_owner_box}>
            <Link
              href={{
                pathname: "/author",
                query: { address: nftData.seller },
              }}
            >
              <Image
                src={ownerAvatar || images.avatar1}
                alt="owner images"
                className={Style.info_owner_avatar}
              />
              <div className={Style.info_owner_name}>
                <div style={{ fontWeight: "600" }}>Owner</div>
                <div>
                  {nftData.seller?.slice(0, 8) +
                    "..." +
                    nftData.seller?.slice(-8)}
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className={Style.nft_items_wrapper}>
          <div className={Style.nft_item_box}>
            {like ? (
              <AiFillHeart
                className={Style.nft_item_icon}
                style={{ color: "red" }}
                onClick={() => likeNFT()}
              />
            ) : (
              <AiOutlineHeart
                className={Style.nft_item_icon}
                onClick={() => likeNFT()}
              />
            )}
            <div>{likeNumber} Likes</div>
          </div>
          <div className={Style.nft_item_box}>
            <FaShapes className={Style.nft_item_icon} />
            <div>{nftData.category}</div>
          </div>
          <div className={Style.nft_item_box}>
            <FaEthereum className={Style.nft_item_icon} />
            <div>Ethereum Chain</div>
          </div>
        </div>
        <div className={Style.nft_price_wrapper}>
          <div className={Style.nft_price_currentPrice}>
            <div> Giá hiện tại</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div> {nftData.price + " ETH"}</div>
              <FaEthereum className={Style.unit_icon} />
            </div>
            <div> ({ethUSDPrice * nftData.price} $)</div>
          </div>
          <div className={Style.nft_price_changePrice}>
            <div>{"Giá cao nhất: " + maxPrice + " ETH"}</div>
            <div>{"Giá thấp nhất: " + minPrice + " ETH"}</div>
          </div>
        </div>

        {address == nftData.seller ? (
          <Button
            btnName="Đặt lại giá"
            handleClick={() => {
              router.push(
                "/resell?tokenId=" +
                  nftData.tokenId +
                  "&image=" +
                  nftData.image +
                  "&name=" +
                  nftData.name +
                  "&ex=1"
              );
            }}
            classButton="buyButton"
          />
        ) : address == nftData.owner ? (
          <Button
            btnName="Bán"
            handleClick={() => {
              router.push(
                "/resell?tokenId=" +
                  nftData.tokenId +
                  "&image=" +
                  nftData.image +
                  "&name=" +
                  nftData.name +
                  "&ex=0"
              );
            }}
            classButton="buyButton"
          />
        ) : (
          <Button
            btnName="Mua"
            handleClick={() => buyNFT(nftData, address)}
            classButton="buyButton"
          />
        )}
      </div>
    </div>
  );
};

export default MainInfo;
