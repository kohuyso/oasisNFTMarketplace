import React, { useContext, useEffect, useState } from "react";

import Style from "../styles/author.module.css";
import Banner from "@/authorPage/Banner/Banner";

import images from "@/images";
import AuthorProfile from "@/authorPage/AuthorProfile/AuthorProfile";
import { Footer, Header } from "@/components/componentsIndex";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import Loading from "@/components/Loading/Loading";
import AuthorBar from "@/authorPage/AuthorBar/AuthorBar";

const author = () => {
  const { fetchMyNFTsOrListedNFTs, fetchNFTs } = useContext(
    Oasis_NFTMarketplaceContext
  );
  const address = useAddress();
  const [nft, setNft] = useState([]);
  const [myNft, setmyNft] = useState([]);
  const [authorData, setAuthorData] = useState({ address: "" });
  const [nfts, setNfts] = useState([]);
  const [ownNft, setOwnNft] = useState([]);
  const [createdNft, setCreatedNft] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    console.log(router.query);
    setAuthorData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      console.log(items);
      setNft(items);
    });
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      console.log(items);
      setmyNft(items);
    });
  }, []);

  useEffect(() => {
    fetchNFTs().then((item) => {
      if (item) {
        console.log(item);
        setNfts(item);
      }
    });
  }, []);

  useEffect(() => {
    setOwnNft(
      nfts.filter((el) => {
        if (authorData.address == el.seller) {
          return el;
        }
      })
    );

    setCreatedNft(
      nfts.filter((el) => {
        if (authorData.address == el.creator) {
          return el;
        }
      })
    );
  }, [nfts]);

  return (
    <div style={{ width: "100%", backgroundColor: "rgb(250, 249, 246)" }}>
      <Header />
      <div className={Style.author}>
        <Banner bannerImage={images.backGround} />
        <AuthorProfile authorData={authorData} />

        {address == authorData.address ? (
          <AuthorBar
            filter={[
              0,
              "Đang bán",
              "Trong kho",
              "Thích",
              "Theo dõi bởi",
              "Theo dõi",
            ]}
            NFTData={nft}
            myNFT={myNft}
            nfts={nfts}
            authorData={authorData}
          />
        ) : (
          <AuthorBar
            filter={[
              0,
              "Sở hữu",
              "Sáng tác",
              "Thích",
              "Theo dõi bởi",
              "Theo dõi",
            ]}
            NFTData={ownNft}
            myNFT={createdNft}
            nfts={nfts}
            authorData={authorData}
          />
        )}
      </div>
      <Footer theme="dark" />
    </div>
  );
};

export default author;
