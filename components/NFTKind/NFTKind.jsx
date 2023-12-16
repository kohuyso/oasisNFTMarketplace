import React, { useContext, useEffect } from "react";
import { useState } from "react";

import Style from "./NFTKind.module.css";
import MiniNFTForHome from "../MiniNFT/MiniNFTForHome";

const NFTKind = ({
  filter,
  NFTData,
  myNFT = [],
  nfts = [],
  authorData = {},
}) => {
  console.log(NFTData);

  const [activeBtn, setActiveBtn] = useState(6);
  const [allNFT, setAllNFT] = useState(true);
  const [possess, setpossess] = useState(false);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  // useEffect(() => {
  //   setTestNFT(NFTData);
  // }, [NFTData]);

  // useEffect(() => {
  //   fetchNFTs().then((item) => {
  //     if (item) {
  //       console.log(item);
  //       setNfts(item);
  //     }
  //   });
  // }, []);

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
        {allNFT && <MiniNFTForHome title={"Kết quả tìm kiếm"} data={NFTData} />}
        {possess && (
          <MiniNFTForHome
            title={"Kết quả tìm kiếm"}
            data={NFTData?.filter(({ category }) => {
              return category == filter[1];
            })}
          />
        )}
        {created && (
          <MiniNFTForHome
            title={"Kết quả tìm kiếm"}
            data={NFTData.filter(({ category }) => {
              return category == filter[2];
            })}
          />
        )}
        {like && (
          <MiniNFTForHome
            title={"Kết quả tìm kiếm"}
            data={NFTData.filter(({ category }) => {
              return category == filter[3];
            })}
          />
        )}
        {follower && (
          <MiniNFTForHome
            title={"Kết quả tìm kiếm"}
            data={NFTData.filter(({ category }) => {
              return category == filter[4];
            })}
          />
        )}
        {following && (
          <MiniNFTForHome
            title={"Kết quả tìm kiếm"}
            data={NFTData.filter(({ category }) => {
              return category == filter[5];
            })}
          />
        )}
      </div>
    </div>
  );
};

export default NFTKind;
