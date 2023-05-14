//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0 <0.9.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Trivid.sol";

contract TrividUserContract is ReentrancyGuard{
  using Counters for Counters.Counter;
  Counters.Counter public userCount;

  mapping(address => bool) public userRegistered;

  address private triNft;
  address private owner;

  constructor(address nftAdd, address deployer ){
    triNft = nftAdd;
    owner = deployer;
    Trivid(nftAdd).updateMarketPlaceAddress(address(this));
  }
  
  function registerUser (address newUser) public {
    require(userRegistered[newUser] != true, "User already registered");
    userRegistered[newUser] = true;
  }

  function isRegistered(address userAdd) public view returns(bool){
    return userRegistered[userAdd];
  }
  
}

