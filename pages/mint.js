import React, { useContext } from "react";

import Style from "../styles/mint.module.css";
import MintNFT from "@/mintPage/MintNFT";
import { Footer, Header } from "@/components/componentsIndex";

import { Oasis_NFTMarketplaceContext } from "../Context/Oasis_NFTMarketplaceContext";
import { useAddress } from "@thirdweb-dev/react";
import GuestError from "@/components/GuestError/GuestError";

const mint = () => {
  const { uploadToIPFS, createNFT } = useContext(Oasis_NFTMarketplaceContext);
  const address = useAddress();
  return (
    <div style={{ backgroundColor: "rgb(250, 249, 246)" }}>
      <Header />
      {address ? (
        <>
          <div className={Style.mint}>
            <div className={Style.mint_box}>
              <div className={Style.mint_box_heading}>
                <h1>Tạo NFT</h1>
              </div>

              <div className={Style.mint_box_title}>
                <h2>Chọn ảnh để tạo NFT</h2>
              </div>

              <div className={Style.mint_box_form}>
                <MintNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} />
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

export default mint;
