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
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const MainInfo = ({ nftData, nftDataApiSub }) => {
  const {
    api_likeNFT,
    api_getOneAccount,
    api_updateAccountAddAuctionID,
    api_updateNFTResell,
  } = useContext(Oasis_APIContext);
  const {
    buyNFT,
    createAuctionn,
    createBidAuction,
    auctionEnded,
    getSingleNFT,
  } = useContext(Oasis_NFTMarketplaceContext);
  const [likeNumber, setLikeNumber] = useState(nftDataApiSub.like);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [creatorAvatar, setCreatorAvatar] = useState(images.avatar2);
  const [ownerAvatar, setOwnerAvatar] = useState(images.avatar2);
  const [createAuction, setCreateAuction] = useState(false);
  const [auction, setAuction] = useState(false);
  const [auctionStartPrice, setAuctionStartPrice] = useState(0);
  const [auctionTime, setAuctionTime] = useState(0);
  const [auctionBidding, setAuctionBidding] = useState(0);
  const [updateData, setUpdateData] = useState(nftData);

  const router = useRouter();
  const address = useAddress();
  const [like, setLike] = useState(false);
  const [ethUSDPrice, setEthUSDPrice] = useState(1733);
  console.log(nftData);
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

    // getSingleNFT(nftData.tokenId).then((item) => {
    //   if (item) {
    //     setUpdateData(item);
    //   }
    // });
    UP();
  }, []);

  useEffect(() => {
    getSingleNFT(nftData.tokenId).then((item) => {
      console.log(item);
      console.log(item);
      if (item) {
        console.log(item);
        setUpdateData(item);
      }
    });
    UP();
  }, [nftData]);

  const UP = () => {
    console.log(nftData);
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
        }
        if (checkLike) {
          setLike(true);
        } else {
          setLike(false);
        }
      });

      api_getOneAccount(nftDataApiSub.creator).then((item) => {
        setCreatorAvatar(item?.avatar);
      });
      api_getOneAccount(nftData.owner).then((item) => {
        setOwnerAvatar(item?.avatar);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    UP();
  }, [updateData]);
  useEffect(() => {
    UP();
  }, [address]);

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

  useEffect(() => {
    console.log("Log set auction" + auction);
    if (updateData.auction?.ended == false) {
      setAuction(true);
    } else {
      setAuction(false);
    }
  }, [updateData]);
  useEffect(() => {
    console.log("Log set auction 1");
    if (updateData.auction?.ended == false) {
      setAuction(true);
    } else {
      setAuction(false);
    }
  }, []);

  console.log(nftData);
  console.log(updateData);

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

  const handleCreateAuction = async () => {
    const time = Math.round(auctionTime);
    await createAuctionn(nftData.tokenId, time, auctionStartPrice);
    console.log("handleCreateAuction1");
    console.log(nftData);

    getSingleNFT(nftData.tokenId).then((item) => {
      if (item) {
        console.log(item);
        setUpdateData(item);
      }
    });
    console.log("handleCreateAuction2");
    setAuction(true);
    router.push("/search");
  };

  const handleCreateBidding = async () => {
    await createBidAuction(nftData.tokenId, auctionBidding);
    // const checkUpdateWithdraw = await createBidAuction(
    //   nftData.tokenId,
    //   auctionBidding
    // );
    console.log("handleCreateBidding");
    await getSingleNFT(nftData.tokenId).then((item) => {
      if (item) {
        console.log(item);
        setUpdateData(item);
      }
    });

    api_updateAccountAddAuctionID(
      updateData.tokenId,
      updateData.auction?.AuctionId,
      address,
      auctionBidding
    );
  };

  const handleEndAuctin = async () => {
    await auctionEnded(nftData.tokenId);
    await api_updateNFTResell(
      nftData.tokenId,
      updateData.auction?.highestPrice,
      true
    );
    api_updateAccountAddAuctionID(
      updateData.tokenId,
      updateData.auction?.AuctionId,
      updateData.auction?.highestPayer,
      updateData.auction?.highestPrice * -1
    );
    console.log("handleEndAuctin");
    await getSingleNFT(nftData.tokenId).then((item) => {
      if (item) {
        console.log(item);
        setUpdateData(item);
      }
    });
    setAuction(false);
    UP();
    router.push("/author?address=" + updateData.auction?.highestPayer);
  };

  return (
    <div className={Style.wrapper}>
      <div className={Style.nft_info_name_mobile}>
        {"#" + nftData.tokenId + " " + nftData.name}
      </div>

      <Image
        src={nftData.image}
        width={1200}
        height={1200}
        alt="NFT images"
        className={Style.nft_img}
      />
      <div className={Style.nft_info}>
        <div className={Style.nft_info_name}>
          {"#" + nftData.tokenId + " " + nftData.name}
        </div>
        {!auction ? (
          <>
            {address == nftData.seller ? (
              <>
                {!createAuction ? (
                  <>
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
                            width={300}
                            height={300}
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
                            src={creatorAvatar || images.avatar1}
                            alt="owner images"
                            width={300}
                            height={300}
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

                    <div className={Style.nft_btn_box}>
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
                      <Button
                        btnName="Đấu giá"
                        handleClick={() => setCreateAuction(true)}
                        classButton="buyButton"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={Style.AuctionForm}>
                      <div className={Style.Form_box_input}>
                        <label htmlFor="time">Thời gian đấu giá </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          placeholder="Thời gian đấu giá - Theo giây"
                          className={Style.Form_box_input_userName}
                          onChange={(e) => setAuctionTime(e.target.value)}
                          value={auctionTime}
                        />
                      </div>
                      <div className={Style.Form_box_input}>
                        <label htmlFor="time">Giá khởi điểm </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="Giá khởi điểm"
                          className={Style.Form_box_input_userName}
                          onChange={(e) => setAuctionStartPrice(e.target.value)}
                          value={auctionStartPrice}
                        />
                      </div>
                    </div>

                    <div className={Style.nft_btn_box}>
                      <Button
                        btnName="Tạo Đấu giá"
                        handleClick={() => handleCreateAuction()}
                        classButton="buyButton"
                      />
                      <Button
                        btnName="Quay lại"
                        handleClick={() => setCreateAuction(false)}
                        classButton="buyButton"
                      />
                    </div>
                  </>
                )}
              </>
            ) : address == nftData.owner ? (
              <>
                {!createAuction ? (
                  <>
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
                            width={300}
                            height={300}
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
                            src={creatorAvatar || images.avatar1}
                            alt="owner images"
                            width={300}
                            height={300}
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

                    <div className={Style.nft_btn_box}>
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
                      <Button
                        btnName="Đấu giá"
                        handleClick={() => setCreateAuction(true)}
                        classButton="buyButton"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={Style.AuctionForm}>
                      <div className={Style.Form_box_input}>
                        <label htmlFor="time">Thời gian đấu giá </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          placeholder="Thời gian đấu giá - Theo giây"
                          className={Style.Form_box_input_userName}
                          onChange={(e) => setAuctionTime(e.target.value)}
                          value={auctionTime}
                        />
                      </div>
                      <div className={Style.Form_box_input}>
                        <label htmlFor="time">Giá khởi điểm </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="Giá khởi điểm"
                          className={Style.Form_box_input_userName}
                          onChange={(e) => setAuctionStartPrice(e.target.value)}
                          value={auctionStartPrice}
                        />
                      </div>
                    </div>

                    <div className={Style.nft_btn_box}>
                      <Button
                        btnName="Tạo Đấu giá"
                        handleClick={() => handleCreateAuction()}
                        classButton="buyButton"
                      />
                      <Button
                        btnName="Quay lại"
                        handleClick={() => setCreateAuction(false)}
                        classButton="buyButton"
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
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
                        width={300}
                        height={300}
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
                        src={creatorAvatar || images.avatar1}
                        alt="owner images"
                        width={300}
                        height={300}
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
                <Button
                  btnName="Mua"
                  handleClick={() => buyNFT(nftData, address)}
                  classButton="buyButton"
                />
              </>
            )}
          </>
        ) : (
          <>
            {address == nftData.seller || address == nftData.owner ? (
              <>
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
                        width={300}
                        height={300}
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
                        src={creatorAvatar || images.avatar1}
                        alt="owner images"
                        width={300}
                        height={300}
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
                <div
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  Kết thúc sau:
                  <CountdownTimer
                    endTime={updateData.auction?.acutionEndTime}
                  />
                </div>
                <div style={{ fontWeight: "600" }}>
                  {" "}
                  {"Giá cao nhất: " + updateData.auction?.highestPrice + " ETH"}
                </div>

                <Button
                  btnName="Kết thúc đấu giá"
                  handleClick={() => handleEndAuctin()}
                  classButton="buyButton"
                />
              </>
            ) : (
              <>
                <div className={Style.AuctionForm}>
                  <div
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    Kết thúc sau:
                    <CountdownTimer
                      endTime={updateData.auction?.acutionEndTime}
                    />
                  </div>
                  <div style={{ fontWeight: "600" }}>
                    {" "}
                    {"Giá cao nhất: " +
                      updateData.auction?.highestPrice +
                      " ETH"}
                  </div>
                </div>
                <div className={Style.AuctionForm}>
                  <div className={Style.Form_box_input}>
                    <label htmlFor="time"> Đặt giá </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Thời gian đấu giá - Theo giây"
                      className={Style.Form_box_input_userName}
                      onChange={(e) => setAuctionBidding(e.target.value)}
                      value={auctionBidding}
                    />
                  </div>
                </div>
                <div className={Style.nft_btn_box}>
                  <Button
                    btnName="Đặt giá"
                    handleClick={() => handleCreateBidding()}
                    classButton="buyButton"
                  />
                  <Button
                    btnName="Kết thúc đấu giá"
                    handleClick={() => handleEndAuctin()}
                    classButton="buyButton"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainInfo;
