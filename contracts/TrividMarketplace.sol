// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721UriStorage.sol";
import "@tableland/evm/contracts/interfaces/ITablelandTables.sol";
import "./TrividNFT.sol";

contract TrividUserContract is ReentrancyGuard, ERC721UriStorage{
  using Counters for Counters.Counter;
  Counters.Counter public userCount;

  address private triNft;
  address private owner;
  ITablelandTables private table;

  constructor(address nftAddress, address ownerAddress){
    triNft = nftAddress;
    owner = ownerAddress;
    Trivid(nftAddress).updateMarketPlaceAddress(address(this));
  } 

  
  
}
