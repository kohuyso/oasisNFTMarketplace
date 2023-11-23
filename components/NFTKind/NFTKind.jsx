import React, { useContext, useEffect } from "react";
import { useState } from "react";
import images from "@/images";

import Style from "./NFTKind.module.css";
import { ArtistCard, MiniNFT } from "../componentsIndex";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const NFTKind = ({
  filter,
  NFTData,
  myNFT = [],
  nfts = [],
  authorData = {},
}) => {
  console.log(NFTData);

  const { api_getAllAccount } = useContext(Oasis_APIContext);
  // const { fetchNFTs } = useContext(Oasis_NFTMarketplaceContext);

  const [activeBtn, setActiveBtn] = useState(6);
  const [testNFT, setTestNFT] = useState([]);
  const [allNFT, setAllNFT] = useState(true);
  const [possess, setpossess] = useState(false);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const [nftLiked, setNftLiked] = useState();
  const [followerAccount, setFollowerAccount] = useState([]);
  const [followingAccount, setFollowingAccount] = useState([]);
  const [accountDataAPI, setAccountDataAPI] = useState({
    like: [],
    follower: [],
    following: [],
  });
  const [allAccountDataAPI, setAllAccountDataAPI] = useState([]);

  useEffect(() => {
    api_getAllAccount().then((item) => {
      if (item) {
        setAllAccountDataAPI(item);
      }
    });
  }, []);

  useEffect(() => {
    setTestNFT(NFTData);
  }, [NFTData]);

  useEffect(() => {
    console.log(accountDataAPI);
    api_getAllAccount().then((item) => {
      if (item) {
        console.log(item);
        setFollowerAccount(
          item.filter((el) => {
            for (const element of accountDataAPI.follower) {
              if (el._id == element) {
                return el;
              }
            }
          })
        );
        setFollowingAccount(
          item.filter((el) => {
            for (const element of accountDataAPI.following) {
              if (el._id == element) {
                return el;
              }
            }
          })
        );
      }
    });
  }, [accountDataAPI]);

  // useEffect(() => {
  //   fetchNFTs().then((item) => {
  //     if (item) {
  //       console.log(item);
  //       setNfts(item);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setNftLiked(
      nfts?.filter((nft) => {
        for (let i = 0; i < accountDataAPI.like.length; i += 1) {
          if (nft.tokenId == accountDataAPI.like[i]) {
            console.log(nft);
            return nft;
          }
        }
      })
    );
    // }, [nfts]);
  }, [possess]);

  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    if (btnText == filter[1]) {
      setpossess(true);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setAllNFT(false);
      setActiveBtn(1);
    } else if (btnText == filter[2]) {
      setpossess(false);
      setCreated(true);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setAllNFT(false);
      setActiveBtn(2);
    } else if (btnText == filter[3]) {
      setpossess(false);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(true);
      setAllNFT(false);
      setActiveBtn(3);
    } else if (btnText == filter[4]) {
      setpossess(false);
      setCreated(false);
      setFollower(true);
      setFollowing(false);
      setLike(false);
      setAllNFT(false);
      setActiveBtn(4);
    } else if (btnText == filter[5]) {
      setpossess(false);
      setCreated(false);
      setFollower(false);
      setFollowing(true);
      setLike(false);
      setAllNFT(false);
      setActiveBtn(5);
    } else {
      setpossess(false);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setAllNFT(true);
      setActiveBtn(6);
    }
  };

  return (
    <div>
      <div className={Style.Kind}>
        <div className={Style.Kind_box}>
          <div className={Style.Kind_box_left}>
            <div className={Style.Kind_box_left_btn}>
              {filter[0] == 1 ? (
                <button
                  className={`${activeBtn == 6 ? Style.active : ""}`}
                  onClick={(e) => openTab(e)}
                >
                  All
                </button>
              ) : (
                <></>
              )}
              <button
                className={`${activeBtn == 1 ? Style.active : ""}`}
                onClick={(e) => openTab(e)}
              >
                {filter[1]}
              </button>
              <button
                className={`${activeBtn == 2 ? Style.active : ""}`}
                onClick={(e) => openTab(e)}
              >
                {filter[2]}
              </button>
              <button
                className={`${activeBtn == 3 ? Style.active : ""}`}
                onClick={(e) => openTab(e)}
              >
                {filter[3]}
              </button>
              <button
                className={`${activeBtn == 4 ? Style.active : ""}`}
                onClick={(e) => openTab(e)}
              >
                {filter[4]}
              </button>
              <button
                className={`${activeBtn == 5 ? Style.active : ""}`}
                onClick={(e) => openTab(e)}
              >
                {filter[5]}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={Style.list}>
        {allNFT && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={testNFT}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {possess && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={testNFT?.filter(({ category }) => {
              return category == filter[1];
            })}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {created && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={testNFT.filter(({ category }) => {
              return category == filter[2];
            })}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {like && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={testNFT.filter(({ category }) => {
              return category == filter[3];
            })}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {follower && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={testNFT.filter(({ category }) => {
              return category == filter[4];
            })}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {following && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={testNFT.filter(({ category }) => {
              return category == filter[5];
            })}
            accountDataAPI={allAccountDataAPI}
          />
        )}
      </div>
    </div>
  );
};

export default NFTKind;
