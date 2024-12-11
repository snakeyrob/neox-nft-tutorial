// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NeoxNFT is ERC721, Ownable(msg.sender) {
    uint256 public tokenCounter;
    constructor() ERC721("NeoxNFT", "XNFT") {
        tokenCounter = 0;
    }
    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId);
        tokenCounter++;
        return newItemId;
    }
}