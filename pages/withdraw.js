import { Footer, Header } from "@/components/componentsIndex";
import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/withdraw.module.css";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import { useAddress } from "@thirdweb-dev/react";

const withdraw = () => {
  const { auctionWithdraw } = useContext(Oasis_NFTMarketplaceContext);
  const { api_getOneAccount, api_updateAccountWithdraw } =
    useContext(Oasis_APIContext);
  const address = useAddress();

  const [withdrawData, setWithdrawData] = useState([]);

  useEffect(() => {
    console.log("AAAAAAAAAAAA");
    api_getOneAccount(address).then((item) => {
      if (item) {
        console.log(item);
        setWithdrawData(item.auctionList);
      }
    });
  }, [address]);

  const handleWithdraw = async (_auctionId, _nftID) => {
    auctionWithdraw(_auctionId);
    await api_updateAccountWithdraw(_nftID, _auctionId, address);
    await api_getOneAccount(address).then((item) => {
      if (item) {
        console.log(item);
        setWithdrawData(item.auctionList);
      }
    });
  };

  return (
    <div style={{ backgroundColor: "rgb(250, 249, 246)" }}>
      <Header />
      <div className={Style.withdraw}>
        <div className={Style.withdraw_info}>
          <h1>Bảng rút tiền</h1>
        </div>
        <div className={Style.title}>
          <div> STT </div>
          <div>Mã đấu giá</div>
          <div> Mã token </div>
          <div> Có thể rút </div>
        </div>
        <div className={Style.table}>
          {withdrawData.map((el, i) => (
            <div className={Style.row} key={el.AuctionID}>
              <div className={Style.item}> {i + 1} </div>
              <div className={Style.item}>{el.AuctionID}</div>
              <div className={Style.item}> {el.NFTid} </div>
              <div className={Style.item}> {el.amount} </div>
              {el.amount == 0 ? (
                <div className={Style.noWithdrawButton}> Rút </div>
              ) : (
                <div
                  className={Style.withdrawButton}
                  onClick={() => handleWithdraw(el.AuctionID, el.NFTid)}
                >
                  Rút
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer theme="dark" />
    </div>
  );
};

export default withdraw;
