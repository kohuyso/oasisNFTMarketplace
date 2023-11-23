const getNFT = (nfts = [], n) => {
  const authors = [];

  const rs = nfts.reduce((index, currentValue) => {
    (index[currentValue.seller] || []).push(currentValue);
    return index;
  }, {});

  Object.entries(rs).forEach((nft) => {
    const seller = item[0];
    const sumValue = item[1]
      .map((newNFT) => Number(newNFT.price))
      .reduce((pre, cur) => pre + cur, 0);

    rs.push({ seller, sumValue });
  });

  const finalRS = rs.sort((val1, val2) => {
    return val1.sumValue - val2.sumValue;
  });

  return finalRS.slice(0, n);
};

export const top6 = (nfts = []) => {
  const rs = getAuthor(nfts, 6);
  return rs;
};
