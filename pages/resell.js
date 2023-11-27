import { Button, Footer, Header } from "@/components/componentsIndex";
import React, { useContext, useState } from "react";
import resellStyle from "../styles/resell.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { LineChart } from "@/detailPage/componentIndex";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import GuestError from "@/components/GuestError/GuestError";

const resell = () => {
  const { createSale, createReSetPrice } = useContext(
    Oasis_NFTMarketplaceContext
  );
  const { api_updateNFTResell, api_getOneNFT } = useContext(Oasis_APIContext);
  const address = useAddress();

  const [nftData, setNftData] = useState({
    tokenId: "",
    image: "",
    name: "",
    ex: 1,
  });
  const [price, setPrice] = useState(0);
  const router = useRouter();

  const [nftDataApiSub, setNftDataApiSub] = useState({
    history: [],
    contractAddress: "",
    tradingTimes: 0,
    like: 0,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    console.log(router.query);
    setNftData(router.query);

    api_getOneNFT(router.query.tokenId).then((item) => {
      if (item) {
        console.log(item.history);
        setNftDataApiSub({
          history: item.history,
          contractAddress: item.contractAddress,
          tradingTimes: item.tradingTimes,
          like: item.like,
        });
      }
    });
  }, [router.isReady]);

  const resellNFT = async (tokenURI, price, check, id) => {
    console.log(tokenURI, price, check, id);
    await createSale(tokenURI, price, "", check, id);
    // router.push("/search");
  };

  const reSetPrice = async (price, id) => {
    await createReSetPrice(price, id);
    // router.push("/search");
  };

  return (
    <div className={resellStyle.wrapper}>
      <Header />
      {address ? (
        <>
          <div className={resellStyle.Form_wrapper}>
            <div className={resellStyle.resell_title}> Bán lại NFT</div>
            <div className={Style.Form}>
              <div className={Style.Form_box_input}>
                <label htmlFor="name">
                  {"#" + nftData.tokenId + " " + nftData.name}
                </label>
              </div>
              <Image
                src={nftData.image}
                width={800}
                height={800}
                alt="NFT images"
                className={resellStyle.nft_img}
              />
              <div className={Style.Form_box} style={{ marginBottom: "3rem" }}>
                <form>
                  <div className={Style.Form_box_input}>
                    <label htmlFor="name">Đặt lại giá</label>
                    <input
                      type="number"
                      min={1}
                      placeholder="Giá bán lại"
                      className={Style.Form_box_input_userName}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <Button
                btnName="Bán lại"
                handleClick={() => {
                  console.log(price);
                  if (nftData.ex == 0) {
                    resellNFT(nftData.image, price, true, nftData.tokenId);
                    api_updateNFTResell(nftData.tokenId, price, true);
                  } else if (nftData.ex == 1) {
                    reSetPrice(price, nftData.tokenId);
                    api_updateNFTResell(nftData.tokenId, price, false);
                  }
                }}
                classButton="buyButton"
              />

              <div className={resellStyle.subInfo}>
                <div className={resellStyle.resell_title}>
                  {" "}
                  Thông tin tham khảo
                </div>
                <div className={resellStyle.subInfo_chart}>
                  <LineChart chartData={nftDataApiSub.history} />
                </div>
                <div className={resellStyle.subInfo_chart}>
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <GuestError />
      )}
      <Footer theme="dark" />
    </div>
  );
};

export default resell;
