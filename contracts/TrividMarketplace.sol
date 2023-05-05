// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./TrividNFT.sol";

contract TrividUserContract is ReentrancyGuard{
  using Counters for Counters.Counter;
  Counters.Counter public userCount;

  address private triNft;
  address private owner;

  constructor(address nftAddress, address ownerAddress){
    triNft = nftAddress;
    owner = ownerAddress;
    Trivid(nftAddress).updateMarketPlaceAddress(address(this));
  } 
}
