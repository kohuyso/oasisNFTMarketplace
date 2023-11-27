import React, { useContext, useEffect, useState } from "react";
import {
  NavBar,
  MiniNFT,
  CategoryCard,
  ArtistCard,
  Footer,
} from "@/components/componentsIndex";

import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import axios from "axios";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
const Home = () => {
  const { fetchNFTs } = useContext(Oasis_NFTMarketplaceContext);
  const { api_getTop10, api_getTopNFT } = useContext(Oasis_APIContext);

  const [allNft, setAllNft] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [topNFT, setTopNFT] = useState([]);

  useEffect(() => {
    fetchNFTs().then((item) => {
      if (item) {
        setAllNft(item.reverse());
      }
    });
  }, []);

  useEffect(() => {
    api_getTop10().then((item) => {
      if (item) {
        console.log(item);
        setAccounts(item);
      }
    });
  }, []);

  useEffect(() => {
    console.log("AAAAAAAAAA");
    api_getTopNFT().then((item) => {
      if (item) {
        console.log(item);
        setTopNFT(
          allNft.filter((el) => {
            console.log(el);
            for (let index = 0; index < item.length; index++) {
              if (el.tokenId == item[index]._id) {
                console.log(el);
                return el;
              }
            }
          })
        );
      }
    });
  }, [allNft]);
  console.log(topNFT);
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "3rem" }}>
        <MiniNFT title={"NFT nổi bật"} data={topNFT} />
      </div>
      <div style={{ marginTop: "3rem" }}>
        <CategoryCard allNft={allNft} />
      </div>
      <div style={{ marginTop: "3rem" }}>
        <ArtistCard accounts={accounts} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
