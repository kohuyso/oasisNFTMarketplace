import Banner from "@/authorPage/Banner/Banner";
import { Footer, Header, NFTKind } from "@/components/componentsIndex";
import SearchBar from "@/searchPage/SearchBar/SearchBar";
import React, { useContext, useEffect, useState } from "react";

import images from "@/images";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import Loading from "@/components/Loading/Loading";

const search = () => {
  const { fetchNFTs } = useContext(Oasis_NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  const onHandleSearch = (value) => {
    console.log(value);
    const filteredNFT = nftsCopy.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredNFT);
    setNfts(filteredNFT);
  };

  useEffect(() => {
    fetchNFTs().then((item) => {
      if (item) {
        console.log(item);
        setNfts(item.reverse());
        setNftsCopy(item);
      }
    });
  }, []);
  console.log("ffffffffffff");
  return (
    <div style={{ backgroundColor: "rgb(250, 249, 246)" }}>
      <Header />
      <Banner bannerImage={images.backGround} />
      <SearchBar onHandleSearch={onHandleSearch} />

      {nfts.length == 0 ? (
        <Loading />
      ) : (
        <NFTKind
          filter={[1, "Arts", "Animals", "Games", "Fashions", "Others"]}
          NFTData={nfts}
        />
      )}

      <Footer theme="dark" />
    </div>
  );
};

export default search;
