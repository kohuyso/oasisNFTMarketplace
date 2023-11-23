import React from "react";
import Style from "./SubInfo.module.css";
import { BiDetail } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { LineChart } from "../componentIndex";

const SubInfo = ({ nftData, nftDataApiSub }) => {
  console.log(nftData);
  return (
    <div className={Style.wrapper}>
      <div className={Style.detail}>
        <div className={Style.detail_top}>
          <MdOutlineDescription
            style={{ marginTop: "2.5px", marginRight: "5px" }}
          />
          <div style={{ fontWeight: "600" }}> Mô tả </div>
        </div>
        <div className={Style.detail_bot}>
          <div className={Style.detail_bot_item}>
            <div>{nftData.description}</div>
          </div>
        </div>
        <div className={Style.detail_top}>
          <BiDetail style={{ marginTop: "2.5px", marginRight: "5px" }} />
          <div style={{ fontWeight: "600" }}> Chi tiết </div>
        </div>
        <div className={Style.detail_bot}>
          <div className={Style.detail_bot_item}>
            <div>Contract address</div>
            <a
              href={
                "https://sepolia.etherscan.io/tx/" +
                nftDataApiSub?.contractAddress
              }
              target="_blank"
            >
              {nftDataApiSub
                ? nftDataApiSub?.contractAddress?.slice(0, 5) +
                  "..." +
                  nftDataApiSub?.contractAddress?.slice(
                    nftDataApiSub?.contractAddress.length - 5,
                    nftDataApiSub?.contractAddress.length
                  )
                : ""}
            </a>
          </div>
          <div className={Style.detail_bot_item}>
            <div>Token ID</div>
            <a href={nftData.tokenURI} target="_blank">
              {"#" + nftData.tokenId}
            </a>
          </div>
          <div className={Style.detail_bot_item}>
            <div>Chain</div>
            <a href="https://ethereum.org/vi/" target="_blank">
              Ethereum
            </a>
          </div>
          <div className={Style.detail_bot_item}>
            <div>Chuẩn Token</div>
            ERC 721
          </div>
        </div>
      </div>
      <div className={Style.chart}>
        <LineChart chartData={nftDataApiSub.history} />
      </div>
    </div>
  );
};

export default SubInfo;
