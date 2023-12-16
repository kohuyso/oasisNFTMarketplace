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
    let isMounted = true;
    if (isMounted) {
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
    }

    return () => {
      isMounted = false;
    };
  }, [router.isReady]);

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
      <Footer />
    </div>
  );
};

export default detail;
