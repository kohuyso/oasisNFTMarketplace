import React, { useContext, useEffect, useState } from "react";
import {
  NavBar,
  MiniNFT,
  CategoryCard,
  Footer,
} from "@/components/componentsIndex";

import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import ArtistCardForHome from "@/components/ArtistCardForHome/ArtistCardForHome";
import MiniNFTForHome from "@/components/MiniNFT/MiniNFTForHome";
const Home = () => {
  const { fetchNFTs, fetchNFTsByPage } = useContext(
    Oasis_NFTMarketplaceContext
  );
  const { api_getTopNFT } = useContext(Oasis_APIContext);

  const [allNft, setAllNft] = useState([]);
  const [topNFT, setTopNFT] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchNFTs().then((item) => {
        if (item) {
          setAllNft(item);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && allNft.length != 0) {
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
    }
    return () => {
      isMounted = false;
    };
  }, [allNft]);
  console.log(topNFT);
  console.log(allNft);

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "3rem" }}>
        <MiniNFTForHome title={"NFT nổi bật"} data={topNFT} />
      </div>
      <div style={{ marginTop: "3rem" }}>
        <CategoryCard allNft={allNft} />
      </div>
      <div style={{ marginTop: "3rem" }}>
        <ArtistCardForHome />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
