import Banner from "@/authorPage/Banner/Banner";
import { Footer, Header, NFTKind } from "@/components/componentsIndex";
import SearchBar from "@/searchPage/SearchBar/SearchBar";
import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/search.module.css";
import images from "@/images";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import Loading from "@/components/Loading/Loading";
import { Pagination } from "@mui/material";

const search = () => {
  const { fetchNFTsByPage } = useContext(Oasis_NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [page, setPage] = React.useState(1);
  const pageChangeHandler = (event, pageNumber = 1) => {
    setPage(pageNumber);
    fetchNFTsByPage(pageNumber - 1).then((item) => {
      if (item) {
        console.log(item);
        setNfts(item);
        setNftsCopy(item);
      }
    });
  };

  const onHandleSearch = (value) => {
    console.log(value);
    const filteredNFT = nftsCopy.filter(({ name }) =>
      name.toLowerCase().includes(value?.toLowerCase())
    );
    console.log(filteredNFT);
    setNfts(filteredNFT);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchNFTsByPage(0).then((item) => {
        if (item) {
          console.log(item);
          setNfts(item);
          setNftsCopy(item);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);
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
      <div className={Style.search_pagination}>
        {page}
        <Pagination
          count={10}
          page={page}
          onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}
        />
      </div>
      <Footer theme="dark" />
    </div>
  );
};

export default search;
