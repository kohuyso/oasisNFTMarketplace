import React, { useEffect, useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";

import Style from "./SearchBar.module.css";
const SearchBar = ({ onHandleSearch }) => {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  useEffect(() => {
    const time = setTimeout(() => setSearch(searchItem), 500);
    return () => {
      clearTimeout(time);
    };
  }, [searchItem]);

  useEffect(() => {
    onHandleSearch(search);
  }, [search]);

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Tìm kiếm NFT"
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
