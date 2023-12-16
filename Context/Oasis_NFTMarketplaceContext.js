import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import Wenb3Modal from "web3modal";

import { useRouter } from "next/router";
import { create as ifpsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";

// const client = ifpsHttpClient("https://ipfs.infura.io:5001/api/v0");
const projectID = "2VwSm0AO9E1bfqFBwycKxIj3gqu";
const projectSecretKey = "3c7502a12c80b3533d1d06156283424b";
const auth = `Basic ${Buffer.from(`${projectID}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://oasis-nft-marketplace.infura-ipfs.io";

const client = ifpsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

import {
  Oasis_NFTMarketplaceAddress,
  Oasis_NFTMarketplaceABI,
} from "./constants";
import { Oasis_APIContext } from "./Oasis_APIContext";

const fetchContract = (singerOrProvider) =>
  new ethers.Contract(
    Oasis_NFTMarketplaceAddress,
    Oasis_NFTMarketplaceABI,
    singerOrProvider
  );

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    console.log(web3Modal);
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    console.log(contract);
    return contract;
  } catch (error) {
    console.log("LOI");
    setAlertMessage({ message: "Kết nối contract thất bại", type: 1 });
    setOpenAlert(true);
  }
};

export const Oasis_NFTMarketplaceContext = React.createContext();

export const Oasis_NFTMarketplaceProvider = ({ children }) => {
  const {
    api_createNFT,
    api_updateAccountAddNFT,
    api_soldNFT,
    api_updateNFTResell,
    api_updateAccountAddAuctionID,
    api_updateAccountWithdraw,
  } = useContext(Oasis_APIContext);

  const address = useAddress();
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const router = useRouter();

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      console.log(url);
      return url;
    } catch (error) {
      console.log("Loi upload IPFS");
      setAlertMessage({ message: "Upload ảnh thất bại", type: 1 });
      setOpenAlert(true);
    }
  };

  const createSale = async (url, formInputPrice, image, isReselling, id) => {
    try {
      if (address) {
        console.log(url, formInputPrice, isReselling, id);

        const price = ethers.utils.parseUnits(
          formInputPrice.toString(),
          "ether"
        );
        console.log(price);
        const contract = await connectingWithSmartContract();
        console.log(contract);
        const listingPrice = await contract.getListingPrice();
        console.log(listingPrice);

        console.log(url, price, id);
        // let checkCreate = false;
        if (!isReselling) {
          const transaction = await contract.createToken(url, price, {
            value: listingPrice.toString(),
          });
          transaction.wait();
          console.log(transaction);
          const readEvent = await contract.on(
            "MarketItemCreated",
            (tokenId, seller, owner, price1, sold, event) => {
              let info = {
                tokenId: tokenId.toNumber(),
                seller: seller,
                owner: owner,
                price1: Number(price1),
                sold: sold,
                data: event,
              };
              console.log(formInputPrice);
              console.log(info);
              // checkCreate = true;
              // console.log(checkCreate);
              api_createNFT(
                info.tokenId,
                transaction.hash,
                formInputPrice,
                address
              );
            }
          );
          api_updateAccountAddNFT(address, image);
        } else {
          const transaction = await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });
          console.log(transaction);
          transaction.wait();
          setTimeout(() => {
            router.push("/search");
          }, 9000);
        }
        // if (checkCreate) {
        //   console.log("Cha hieu");
        //   api_createNFT(info.tokenId, transaction.hash, formInputPrice);
        // }
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });
        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Loi create sale");
      setAlertMessage({ message: "Bán NFT thất bại", type: 1 });

      setOpenAlert(true);
    }
  };

  const createNFT = async (
    name,
    price,
    image,
    description,
    router,
    category,
    creator
  ) => {
    try {
      if (address) {
        if (!name || !description || !price || !image || !category) {
          setAlertMessage({ message: "Nhập thiếu thông tin", type: 1 });

          setOpenAlert(true);
          return console.log("Data is missing");
        }
        let type = 1;
        // if (image[5] == "v" && image[6] == "i") {
        //   type = 2;
        // }
        const data = JSON.stringify({
          name,
          description,
          image,
          category,
          creator,
          type,
        });

        try {
          const added = await client.add(data);
          const url = `${subdomain}/ipfs/${added.path}`;
          await createSale(url, price, image);
          setTimeout(() => {
            router.push("/search");
          }, 9000);
        } catch (error) {}
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log("Loi tao NFT");
      setAlertMessage({ message: "Tạo NFT thất bại", type: 1 });
      setOpenAlert(true);
    }
  };

  const createReSetPrice = async (formInputPrice, id) => {
    try {
      if (address) {
        const price = ethers.utils.parseUnits(
          formInputPrice.toString(),
          "ether"
        );
        console.log(price);
        const contract = await connectingWithSmartContract();
        console.log(contract);

        console.log(id);

        const transaction = await contract.reSetPrice(id, price);

        console.log(transaction);
        transaction.wait();
        setTimeout(() => {
          router.push("/search");
        }, 9000);
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log("Loi set price");
      setAlertMessage({ message: "Đặt lại giá NFT thất bại", type: 1 });

      setOpenAlert(true);
    }
  };

  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/dc03853a60d04540b6144467b09ba1e6"
      );
      console.log(provider);
      const contract = fetchContract(provider);
      console.log(contract);
      const data = await contract.fetchMarketItem();
      console.log(data);

      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auction,
          }) => {
            console.log(tokenId);

            const tokenURI = await contract.tokenURI(tokenId);
            console.log(tokenURI);

            const data = await axios.get(tokenURI);

            console.log(data);
            const name = data.data.name;
            const description = data.data.description;
            const image = data.data.image;
            const category = data.data.category;
            const creator = data.data.creator;
            const type = data.data.type;

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            console.log(price);

            return {
              tokenId: tokenId.toNumber(),
              price,
              name,
              description,
              image,
              owner,
              seller,
              category,
              creator,
              tokenURI,
              type,
              auction: {
                AuctionId: auction[0],
                acutionEndTime: auction[1],
                highestPrice: ethers.utils.formatUnits(
                  auction[2].toString(),
                  "ether"
                ),
                highestPayer: auction[3],
                ended: auction[4],
              },
            };
          }
        )
      );
      console.log(items);
      return items;
    } catch (error) {
      console.log("Loi fetch NFTs");
    }
  };

  const fetchNFTsByPage = async (pageNumber) => {
    try {
      console.log(pageNumber);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/dc03853a60d04540b6144467b09ba1e6"
      );
      console.log(provider);
      const contract = fetchContract(provider);
      console.log(contract);
      const data = await contract.fetchMarketItemPage(pageNumber, 16);
      console.log(data);
      let tempData = [];
      for (let index = 0; index < data.length; index++) {
        if (
          data[index].seller != "0x0000000000000000000000000000000000000000"
        ) {
          console.log(data[index]);
          tempData.push(data[index]);
        }
      }
      console.log(data);
      console.log(tempData);
      if (tempData.length == 0) {
        setAlertMessage({
          message: "Vượt quá số NFT hiện có, mời tìm kiếm ở trang trước",
          type: 1,
        });
        setOpenAlert(true);
        return;
      }
      const items = await Promise.all(
        tempData.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auction,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            console.log(tokenURI);

            const tempData = await axios.get(tokenURI);

            console.log(tempData);
            const name = tempData.data.name;
            const description = tempData.data.description;
            const image = tempData.data.image;
            const category = tempData.data.category;
            const creator = tempData.data.creator;

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              tokenId: tokenId.toNumber(),
              price,
              name,
              description,
              image,
              owner,
              seller,
              category,
              creator,
              tokenURI,
              auction: {
                AuctionId: auction[0].toNumber(),
                acutionEndTime: auction[1].toString(),
                highestPrice: ethers.utils.formatUnits(
                  auction[2].toString(),
                  "ether"
                ),
                highestPayer: auction[3],
                ended: auction[4],
              },
            };
          }
        )
      );
      console.log(items);
      return items;
    } catch (error) {
      setAlertMessage({
        message: "Vượt quá số NFT hiện có, mời tìm kiếm ở trang trước",
        type: 1,
      });
      setOpenAlert(true);
      console.log("Loi fetch NFTs");
    }
  };

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();
      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFT();

      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auction,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            console.log(tokenURI);

            const data = await axios.get(tokenURI);

            console.log(data);
            const name = data.data.name;
            const description = data.data.description;
            const image = data.data.image;
            const category = data.data.category;
            const creator = data.data.creator;

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              tokenId: tokenId.toNumber(),
              price,
              name,
              description,
              image,
              owner,
              seller,
              category,
              creator,
              tokenURI,
              auction: {
                AuctionId: auction[0].toNumber(),
                acutionEndTime: auction[1].toString(),
                highestPrice: ethers.utils.formatUnits(
                  auction[2].toString(),
                  "ether"
                ),
                highestPayer: auction[3],
                ended: auction[4],
              },
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Loi fetch listed  NFTs");
      setAlertMessage({ message: "Lấy dữ liệu NFT thất bại 02", type: 1 });

      setOpenAlert(true);
    }
  };

  const getSingleNFT = async (tokenId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/dc03853a60d04540b6144467b09ba1e6"
      );
      const contract = fetchContract(provider);
      console.log(tokenId);
      const data = await contract.getSingleNFT(tokenId);
      console.log(data);

      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
            auction,
          }) => {
            console.log(tokenId);

            const tokenURI = await contract.tokenURI(tokenId);
            console.log(tokenURI);

            const data = await axios.get(tokenURI);

            console.log(data);
            const name = data.data.name;
            const description = data.data.description;
            const image = data.data.image;
            const category = data.data.category;
            const creator = data.data.creator;

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            console.log(price);

            return {
              tokenId: tokenId.toNumber(),
              price,
              name,
              description,
              image,
              owner,
              seller,
              category,
              creator,
              tokenURI,
              auction: {
                AuctionId: auction[0].toNumber(),
                acutionEndTime: auction[1].toString(),
                highestPrice: ethers.utils.formatUnits(
                  auction[2].toString(),
                  "ether"
                ),
                highestPayer: auction[3],
                ended: auction[4],
              },
            };
          }
        )
      );
      console.log(items[0]);
      return items[0];
    } catch (error) {
      console.log("Loi fetch NFTs");
    }
  };

  const buyNFT = async (nft, authorAddress) => {
    try {
      if (address) {
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

        const contract = await connectingWithSmartContract();
        const transaction = await contract.createMarketSale(nft.tokenId, {
          value: price,
        });
        // const transaction = await contract.createMarketSale(nft.tokenId);
        await transaction.wait();
        console.log(transaction);
        api_soldNFT(nft.tokenId);

        setTimeout(() => {
          router.push("/author?address=" + authorAddress);
        }, 9000);
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log("Loi buy NFT");
      setAlertMessage({ message: "Mua NFT thất bại", type: 1 });

      setOpenAlert(true);
    }
  };

  const createAuctionn = async (tokenId, time, formInputPrice) => {
    try {
      if (address) {
        console.log(tokenId, time, formInputPrice);

        const price = ethers.utils.parseUnits(
          formInputPrice.toString(),
          "ether"
        );
        console.log(price);
        const contract = await connectingWithSmartContract();
        console.log(contract);
        const listingPrice = await contract.getListingPrice();
        console.log(listingPrice);

        const transaction = await contract.createAuction(tokenId, time, price, {
          value: listingPrice.toString(),
        });
        transaction.wait();
        console.log(transaction);
        setTimeout(() => {
          router.push("/search");
        }, 9000);
        setAlertMessage({ message: "Tao dau gia thanh cong", type: 2 });

        setOpenAlert(true);
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Loi create auction");
      setAlertMessage({ message: "Tao dau gia that bai", type: 1 });

      setOpenAlert(true);
    }
  };

  const createBidAuction = async (_tokenId, formInputPrice, auctionID) => {
    try {
      if (address) {
        console.log(_tokenId, formInputPrice);

        const price = ethers.utils.parseUnits(
          formInputPrice.toString(),
          "ether"
        );
        console.log(price);
        const contract = await connectingWithSmartContract();
        console.log(contract);

        const transaction = await contract.bid(_tokenId, {
          value: price,
        });
        transaction.wait();
        console.log(transaction);
        api_updateAccountAddAuctionID(
          _tokenId,
          auctionID,
          address,
          formInputPrice
        );
        setAlertMessage({ message: "Dat gia thanh cong", type: 2 });

        setOpenAlert(true);
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Loi dat gia auction");
      setAlertMessage({ message: "Loi dat gia auction", type: 1 });

      setOpenAlert(true);
    }
  };

  const auctionWithdraw = async (_auctionId, _nftID) => {
    try {
      if (address) {
        console.log(_auctionId);
        const contract = await connectingWithSmartContract();
        console.log(contract);

        const transaction = await contract.auctionWithdraw(_auctionId);
        transaction.wait();
        await api_updateAccountWithdraw(_nftID, _auctionId, address);
        console.log(transaction);
        setAlertMessage({ message: "Rut tien thanh cong", type: 2 });

        setOpenAlert(true);
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Lỗi rút tiền");
      setAlertMessage({ message: "Rút tiền thất bại", type: 1 });

      setOpenAlert(true);
    }
  };

  const auctionEnded = async (
    _tokenId,
    _highestPrice,
    _auctionId,
    _highestPayer
  ) => {
    try {
      if (address) {
        console.log(_tokenId);

        const contract = await connectingWithSmartContract();
        console.log(contract);

        const transaction = await contract.auctionEnd(_tokenId);
        transaction.wait();
        api_soldNFT(_tokenId);
        api_updateNFTResell(_tokenId, _highestPrice, true);
        api_updateAccountAddAuctionID(
          _tokenId,
          _auctionId,
          _highestPayer,
          _highestPrice * -1
        );
        console.log(transaction);
        setTimeout(() => {
          router.push("/author?address=" + _highestPayer);
        }, 9000);
      } else {
        console.log("Bạn cần kết nối tới ví metamask");
        setAlertMessage({
          message: "Bạn cần kết nối tới ví metamask",
          type: 1,
        });

        setOpenAlert(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Lỗi kết thúc đấu giá");
      setAlertMessage({ message: "Lỗi kết thúc đấu giá", type: 1 });

      setOpenAlert(true);
    }
  };

  return (
    <Oasis_NFTMarketplaceContext.Provider
      value={{
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        createReSetPrice,
        alertMessage,
        setOpenAlert,
        openAlert,
        getSingleNFT,
        createAuctionn,
        createBidAuction,
        auctionWithdraw,
        auctionEnded,
        fetchNFTsByPage,
      }}
    >
      {children}
    </Oasis_NFTMarketplaceContext.Provider>
  );
};
