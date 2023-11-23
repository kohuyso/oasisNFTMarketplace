// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Oasis_NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _auctionIds;

    uint256 listingPrice = 0.001 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        AuctionSession auction;
        bool sold;
    }

    mapping(uint256=>mapping(address=>uint256)) idToAuctionSecssionPrices;

    struct AuctionSession {
        uint256 AuctionId;
        uint256 acutionEndTime;
        uint256 highestPrice;
        address highestPayer;
        bool ended;
    }

    event highestPriceIncrease (address payer, uint256 amount);
    event auctionEnded (address winner, uint256 amount);

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 indexed price,
        bool sold
    );

    constructor() ERC721("Oasis token", "OAS") {
        owner = payable(msg.sender);
    }

    /////////////////////////////////////////////////////////////

    function createAuction (uint256 tokenId,  uint256 time, uint256 startPrice) public payable  {
        require(
            idToMarketItem[tokenId].auction.ended == true,
            "The NFT is bidding"
        );
        if ((idToMarketItem[tokenId].seller == msg.sender && idToMarketItem[tokenId].sold == false) || ( idToMarketItem[tokenId].owner == msg.sender && idToMarketItem[tokenId].sold == true)) {
            _auctionIds.increment();
            idToMarketItem[tokenId].auction = AuctionSession(
                _auctionIds.current(),
                block.timestamp + time,
                startPrice,
                msg.sender,
                false
            );

            if  (idToMarketItem[tokenId].sold == true) {
                idToMarketItem[tokenId].sold = false;
                idToMarketItem[tokenId].seller = payable(msg.sender);
                idToMarketItem[tokenId].owner = payable(address(this));
                _itemsSold.decrement();
                _transfer(msg.sender, address(this), tokenId);
            }
          
        }
    
    }

    function bid(uint256 tokenId) public payable  {
        require(
            idToMarketItem[tokenId].owner != msg.sender && idToMarketItem[tokenId].seller != msg.sender,
            "Owner and seller can not buy this nft"
        );
        require(
            block.timestamp <= idToMarketItem[tokenId].auction.acutionEndTime,
            "The auction was ended"
        );
        require(
            msg.value >  idToMarketItem[tokenId].auction.highestPrice,
            "Your price is not the highest price"
        );



        if (idToMarketItem[tokenId].auction.highestPayer != idToMarketItem[tokenId].seller) {
            idToAuctionSecssionPrices[idToMarketItem[tokenId].auction.AuctionId][idToMarketItem[tokenId].auction.highestPayer] += idToMarketItem[tokenId].auction.highestPrice;
        }

        idToMarketItem[tokenId].auction.highestPrice = msg.value;
        idToMarketItem[tokenId].auction.highestPayer = msg.sender;
        emit highestPriceIncrease(msg.sender, msg.value);
    }

    function auctionWithdraw(uint256 _auctionId) public returns(bool) {
        uint256 amount = idToAuctionSecssionPrices[_auctionId][msg.sender];
        if (amount > 0) {
            idToAuctionSecssionPrices[_auctionId][msg.sender] = 0;
            if (!payable(msg.sender).send(amount)) {
                idToAuctionSecssionPrices[_auctionId][msg.sender] = amount;
                return false;
            }
        }

        return true;
    }


    function auctionEnd(uint256 _tokenId) public payable returns(bool) {
        require(
           idToMarketItem[_tokenId].auction.ended == false
        );

        require(
          block.timestamp > idToMarketItem[_tokenId].auction.acutionEndTime,
            "It is not the end time"
        ); 

        idToMarketItem[_tokenId].auction.ended = true;
        if (idToMarketItem[_tokenId].auction.highestPayer == idToMarketItem[_tokenId].seller) {
            idToMarketItem[_tokenId].price = idToMarketItem[_tokenId].auction.highestPrice;
            return true;
        }
     
        emit auctionEnded(idToMarketItem[_tokenId].auction.highestPayer,  idToMarketItem[_tokenId].auction.highestPrice);
        // if (idToMarketItem[_tokenId].sold == false) {
            payable(idToMarketItem[_tokenId].seller).transfer(idToMarketItem[_tokenId].auction.highestPrice);
            idToMarketItem[_tokenId].owner = payable(idToMarketItem[_tokenId].auction.highestPayer);
            idToMarketItem[_tokenId].sold = true;
            idToMarketItem[_tokenId].seller = payable(address(0));


            _transfer(address(this), payable(idToMarketItem[_tokenId].auction.highestPayer), _tokenId);
            payable(owner).transfer(listingPrice);
            _itemsSold.increment();


        return true;
    }

    ///////////////////////////////////////////////////////////

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        emit MarketItemCreated(
            newTokenId,
            msg.sender,
            address(this),
            price,
            false
        );
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            AuctionSession(
                0,
                0,
                0,
                msg.sender,
                true
            ),
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );

        payable(owner).transfer(listingPrice);
    }

    function reSetPrice(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].seller == msg.sender,
            "Only item seller can perform this operation"
        );
        idToMarketItem[tokenId].price = price;
    }

    function getSingleNFT(uint256 _tokenId) public view returns(MarketItem[] memory) {
        MarketItem[] memory items = new MarketItem[](1);
        items[0] = idToMarketItem[_tokenId];
        return items;
    }

     function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }


    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
    }


    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }


}
    