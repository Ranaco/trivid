//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0 <0.9.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Trivid.sol";

contract TrividUserContract is ReentrancyGuard{
  using Counters for Counters.Counter;
  Counters.Counter public userCount;

  mapping(address => bool) public userRegistered;
  mapping(address => string) public userToId;

  address private triNft;
  address private owner;

  constructor(address nftAdd, address deployer ){
    triNft = nftAdd;
    owner = deployer;
    Trivid(nftAdd).updateMarketPlaceAddress(address(this));
  }
  
  function registerUser (address newUser, string memory id) public {
    require(msg.sender == owner, "Only the contract can call this method");
    userToId[newUser] = id;
    userRegistered[newUser] = true;
  } 

  function isRegistered(address userAdd) public view returns(bool){
    return userRegistered[userAdd];
  }

  function getUserId(address user) public view returns(string memory){
    require(msg.sender == owner, "Only the contract can call this method");
    return userToId[user];
  }
  
}
