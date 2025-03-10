import { Footer, Header } from "@/components/componentsIndex";
import React, { useContext, useEffect, useState } from "react";
import Style from "../styles/withdraw.module.css";
import { Oasis_NFTMarketplaceContext } from "@/Context/Oasis_NFTMarketplaceContext";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";
import { useAddress } from "@thirdweb-dev/react";
import GuestError from "@/components/GuestError/GuestError";

const withdraw = () => {
  const { auctionWithdraw } = useContext(Oasis_NFTMarketplaceContext);
  const { api_getOneAccount } = useContext(Oasis_APIContext);
  const address = useAddress();

  const [withdrawData, setWithdrawData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log("AAAAAAAAAAAA");
      api_getOneAccount(address).then((item) => {
        if (item) {
          console.log(item);
          setWithdrawData(item.auctionList);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [address]);

  const handleWithdraw = async (_auctionId, _nftID) => {
    await auctionWithdraw(_auctionId, _nftID);
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
      {address ? (
        <>
          {" "}
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
        </>
      ) : (
        <GuestError />
      )}
      <Footer theme="dark" />
    </div>
  );
};

export default withdraw;
