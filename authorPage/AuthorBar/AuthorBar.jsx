import React, { useContext, useEffect } from "react";
import { useState } from "react";

import Style from "./AuthorBar.module.css";
import { ArtistCard, MiniNFT } from "@/components/componentsIndex";
import { Oasis_APIContext } from "@/Context/Oasis_APIContext";

const AuthorBar = ({
  filter,
  NFTData,
  myNFT = [],
  nfts = [],
  authorData = {},
}) => {
  console.log(NFTData);

  const { api_getOneAccount, api_getTop10 } = useContext(Oasis_APIContext);

  const [activeBtn, setActiveBtn] = useState(0);
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
    let isMounted = true;
    if (isMounted) {
      api_getOneAccount(authorData.address).then((item) => {
        if (item) {
          console.log(item);
          setAccountDataAPI({
            like: item.like,
            follower: item.follower,
            following: item.following,
          });
        }
      });

      api_getTop10().then((item) => {
        if (item) {
          setAllAccountDataAPI(item);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log(accountDataAPI);
      api_getTop10().then((item) => {
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
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [accountDataAPI]);

  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    api_getOneAccount(authorData.address).then((item) => {
      if (item) {
        console.log(item);
        setAccountDataAPI({
          like: item.like,
          follower: item.follower,
          following: item.following,
        });
      }
    });
    if (btnText == filter[1]) {
      setpossess(true);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(1);
    } else if (btnText == filter[2]) {
      setpossess(false);
      setCreated(true);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(2);
    } else if (btnText == filter[3]) {
      setpossess(false);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(true);
      setActiveBtn(3);
    } else if (btnText == filter[4]) {
      setpossess(false);
      setCreated(false);
      setFollower(true);
      setFollowing(false);
      setLike(false);
      setActiveBtn(4);
    } else if (btnText == filter[5]) {
      setpossess(false);
      setCreated(false);
      setFollower(false);
      setFollowing(true);
      setLike(false);
      setActiveBtn(5);
    }
  };

  return (
    <div>
      <div className={Style.Kind}>
        <div className={Style.Kind_box}>
          <div className={Style.Kind_box_left}>
            <div className={Style.Kind_box_left_btn}>
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
        {possess && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={NFTData}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {created && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={myNFT}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {like && (
          <MiniNFT
            title={"Kết quả tìm kiếm"}
            data={nftLiked}
            accountDataAPI={allAccountDataAPI}
          />
        )}
        {follower && <ArtistCard accounts={followerAccount} />}
        {following && <ArtistCard accounts={followingAccount} />}
      </div>
    </div>
  );
};

export default AuthorBar;
