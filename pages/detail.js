import { Footer, Header, MiniNFT } from "@/components/componentsIndex";
import { MainInfo, SubInfo } from "@/detailPage/componentIndex";
import React, { useContext, useEffect, useState } from "react";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import { useRouter } from "next/router";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const detail = () => {
  const { api_getOneNFT } = useContext(Oasis_APIContext);

  const [nftData, setNftData] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    creator: "",
    tokenURI: "",
  });
  const [nftDataApiSub, setNftDataApiSub] = useState({
    history: [],
    contractAddress: "",
    tradingTimes: 0,
    like: 0,
  });

  const router = useRouter();

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
          creator: item.name,
        });
      }
    });
  }, [router.isReady]);

  const { fetchNFTs } = useContext(Oasis_NFTMarketplaceContext);
  const [nft, setNft] = useState([]);
  useEffect(() => {
    fetchNFTs().then((item) => {
      if (item) {
        setNft(item.reverse());
      }
    });

    // setNftDataApiSub(
    //   api_getOneNFT(router.query.tokenId).then((item) => {
    //     if (item) {
    //       setNftDataApiSub({
    //         history: item.history,
    //         contractAddress: item.contractAddress,
    //         tradingTimes: item.tradingTimes,
    //       });
    //     }
    //   })
    // );
    // const item = api_getOneNFT(router.query.tokenId);
    // setNftDataApiSub(
    //   setNftDataApiSub({
    //     history: item.history,
    //     contractAddress: item.contractAddress,
    //     tradingTimes: item.tradingTimes,
    //   })
    // );
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgb(250, 249, 246)",
        color: "#4c5773",
        paddingBottom: "3rem",
      }}
    >
      <Header />
      <MainInfo nftData={nftData} nftDataApiSub={nftDataApiSub} />
      <SubInfo nftData={nftData} nftDataApiSub={nftDataApiSub} />
      <MiniNFT title={"NFT nổi bật"} data={nft} />
      <Footer />
    </div>
  );
};

export default detail;
