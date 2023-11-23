import React from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";

export const Oasis_APIContext = React.createContext();

export const Oasis_APIProvider = ({ children }) => {
  const address = useAddress();

  const api_createNFT = async (id, contractAddress, price, creator) => {
    try {
      console.log(id, contractAddress, price, creator);
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/nft/create",
        withCredentials: true,
        data: {
          _id: id,
          name: creator,
          contractAddress: contractAddress,
          price: price,
        },
      });

      if (res.data.status == "success") {
        console.log("Tao NFT thanh cong");
      }
    } catch (error) {
      console.log("Tao NFT that bai");
    }
  };

  const api_getOneNFT = async (id) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/nft/" + id,
        withCredentials: true,
      });
      console.log(res.data.data.nft);
      if (res.data.status == "success") {
        console.log("Tao NFT thanh cong");
      }

      return res.data.data.nft;
    } catch (error) {
      console.log("Tao NFT that bai");
    }
  };

  const api_getAllNFT = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/nft/all",
        withCredentials: true,
      });
      console.log(res.data.data.nfts);
      if (res.data.status == "success") {
        console.log("Tao NFT thanh cong");
      }

      return res.data.data.nfts;
    } catch (error) {
      console.log("Tao NFT that bai");
    }
  };

  const api_getTopNFT = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/nft/top-5-nfts",
        withCredentials: true,
      });
      console.log(res.data.data.nfts);
      if (res.data.status == "success") {
        console.log("Tao NFT thanh cong");
      }

      return res.data.data.nfts;
    } catch (error) {
      console.log("Tao NFT that bai");
    }
  };

  const api_likeNFT = async (nftID, accountID, choose) => {
    try {
      const resNFT = await axios({
        method: "PATCH",
        url: "http://localhost:3000/nft/like",
        withCredentials: true,
        data: {
          id: nftID,
          choose: choose,
        },
      });

      if (resNFT.data.status == "success") {
        console.log("Like NFT thanh cong");
      }
      console.log(resNFT.data.data.nft);

      const resAccount = await axios({
        method: "PATCH",
        url: "http://localhost:3000/account/like/" + accountID,
        withCredentials: true,
        data: {
          nft: nftID,
          cd: choose,
        },
      });

      if (resAccount.data.status == "success") {
        console.log("Like-2 NFT thanh cong");
      }
      console.log(resAccount.data.data);
    } catch (error) {
      console.log("Like NFT that bai");
    }
  };

  const api_updateNFTResell = async (id, price, resell) => {
    try {
      const account = await axios({
        method: "PATCH",
        url: "http://localhost:3000/nft/resell/",
        withCredentials: true,
        data: {
          id: id,
          price: price,
          resell: resell,
        },
      });

      if (account.data.status == "success") {
        console.log("Like NFT thanh cong");
      }
      console.log(account.data.data.nft);
      return account.data.data.nft;
    } catch (error) {
      console.log("Like NFT that bai");
    }
  };

  const api_createAccount = async (id) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/account/create",
        withCredentials: true,
        data: {
          _id: id,
        },
      });
      console.log(res.data.data.account);
      if (res.data.status == "success") {
        console.log("Tao account thanh cong");
      }
      return res.data.data.account;
    } catch (error) {
      console.log("Tao account that bai");
    }
  };
  // const api_getOneAccount = async (id) => {
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:  " + id);
  //   try {
  //     const res = await Promise.all(async () => {
  //       console.log("BBBBB2");
  //       const rs = await axios({
  //         method: "GET",
  //         url: "http://localhost:3000/account/" + id,
  //         withCredentials: true,
  //       });

  //       return rs;
  //     });
  //     console.log(res.data);
  //     if (res.data.status == "success") {
  //       console.log("Lay thong tin tai khoan thanh cong");
  //     }

  //     return res.data.data.account;
  //   } catch (error) {
  //     console.log("Lay thong tin tai khoan that bai");
  //   }
  // };
  const api_getOneAccount = async (id) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:  " + id);
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/account/" + id,
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.status == "success") {
        console.log("Lay thong tin tai khoan thanh cong");
      }

      return res.data.data.account;
    } catch (error) {
      console.log("Lay thong tin tai khoan that bai");
    }
  };

  const api_getAllAccount = async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/account/all",
        withCredentials: true,
      });
      console.log(res.data.data.account);
      if (res.data.status == "success") {
        console.log("Lay toan bo tai khoan thanh cong");
      }

      return res.data.data.account;
    } catch (error) {
      console.log("Lay toan bo tai khoan that bai");
    }
  };

  const api_updateAccount = async (
    accountID,
    name,
    email,
    description,
    fbLink,
    avatar
  ) => {
    try {
      const account = await axios({
        method: "PATCH",
        url: "http://localhost:3000/account/" + accountID,
        withCredentials: true,
        data: {
          name: name,
          email: email,
          link: fbLink,
          description: description,
          avatar: avatar,
        },
      });

      if (account.data.status == "success") {
        console.log("Like NFT thanh cong");
      }
      console.log(account.data.data.account);
      return account.data.data.account;
    } catch (error) {
      console.log("Like NFT that bai");
    }
  };

  const api_updateAccountAddNFT = async (accountID, newNFTImage) => {
    try {
      const account = await axios({
        method: "PATCH",
        url: "http://localhost:3000/account/create-nft/" + accountID,
        withCredentials: true,
        data: { newestNFT: newNFTImage },
      });

      if (account.data.status == "success") {
        console.log("Like NFT thanh cong");
      }
      console.log(account.data.data.account);
    } catch (error) {
      console.log("Like NFT that bai");
    }
  };

  const api_getTop10 = async () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/account/top-10",
        withCredentials: true,
      });
      if (res.data.status == "success") {
        console.log("Lay toan bo tai khoan thanh cong");
      }

      return res.data.data.account;
    } catch (error) {
      console.log("Lay toan bo tai khoan that bai");
    }
  };

  const api_followAccount = async (followerID, followedID, choose) => {
    try {
      const resAccount = await axios({
        method: "PATCH",
        url: "http://localhost:3000/account/follow",
        withCredentials: true,
        data: {
          account: followerID,
          id: followedID,
          cd: choose,
        },
      });

      if (resAccount.data.status == "success") {
        console.log("Follow thanh cong");
      }
      console.log(resAccount.data.data);
    } catch (error) {
      console.log("Follow that bai");
    }
  };

  const api_updateAccountAddAuctionID = async (
    nftID,
    auctionID,
    accountID,
    amount
  ) => {
    console.log(amount);
    try {
      const account = await axios({
        method: "PATCH",
        url: "http://localhost:3000/account/auction/" + accountID,
        withCredentials: true,
        data: { nftId: nftID, auctionId: auctionID, amount: amount },
      });

      if (account.data.status == "success") {
        console.log("Like NFT thanh cong");
      }
      console.log(account.data.data.account);
    } catch (error) {
      console.log("Like NFT that bai");
    }
  };

  const api_updateAccountWithdraw = async (nftID, auctionID, accountID) => {
    try {
      const account = await axios({
        method: "PATCH",
        url: "http://localhost:3000/account/withdraw/" + accountID,
        withCredentials: true,
        data: { nftId: nftID, auctionId: auctionID },
      });

      if (account.data.status == "success") {
        console.log("Like NFT thanh cong");
      }
      console.log(account.data.data.account);
    } catch (error) {
      console.log("Like NFT that bai");
    }
  };

  return (
    <Oasis_APIContext.Provider
      value={{
        api_createNFT,
        api_getOneNFT,
        api_likeNFT,
        api_getOneAccount,
        api_getAllAccount,
        api_createAccount,
        api_updateAccount,
        api_updateAccountAddNFT,
        api_getTop10,
        api_followAccount,
        api_getTopNFT,
        api_updateNFTResell,
        api_updateAccountAddAuctionID,
        api_updateAccountWithdraw,
        api_getAllNFT,
      }}
    >
      {children}
    </Oasis_APIContext.Provider>
  );
};
