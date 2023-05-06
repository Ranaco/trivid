// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Trivid is ERC721URIStorage{
  using Counters for Counters.Counter;
  
  address contractAddress = address(this);
  Counters.Counter private _tokenId;

  constructor() ERC721("Trivid", "TRI") {}

  function updateMarketPlaceAddress(address contractAdd) public {
    require(contractAddress == address(this) || contractAddress == msg.sender, "Address already updated or only the owner can update the address");
    contractAddress = contractAdd;
  }

  function mintToken(string memory tokenUri) public returns(uint256){
    require(contractAddress == msg.sender, "Only the contract owner can update the address");
    _tokenId.increment();
    uint256 currTokenId = _tokenId.current();
    _mint(contractAddress, currTokenId);
    _setTokenURI(currTokenId, tokenUri);
    return currTokenId;
  }

  function transferToken(address from, address to, uint256 tokenId) public {
    address owner = returnOwner(tokenId);
    require(owner == from, "Contract Violation! Not the owner");
    transferFrom(from, to, tokenId);
  }

  function returnOwner(uint256 tokenId) public view returns(address){
    return ownerOf(tokenId);
  }

  function getLatestTokenId() public view returns(uint256){
    return _tokenId.current();
  }

}

