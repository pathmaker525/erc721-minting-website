// SPDX-License-Identifier: MIT

//   /$$$$$$$$ /$$                        /$$$$$$  /$$                                          /$$$$$$                 /$$$$$$   /$$$$$$   /$$$$$$  /$$           /$$           /$$        /$$$$$$            /$$ /$$                       /$$     /$$                    
//  |__  $$__/| $$                       /$$__  $$| $$                                         /$$__  $$               /$$__  $$ /$$__  $$ /$$__  $$|__/          |__/          | $$       /$$__  $$          | $$| $$                      | $$    |__/                    
//     | $$   | $$$$$$$   /$$$$$$       | $$  \__/| $$$$$$$  /$$$$$$/$$$$  /$$   /$$  /$$$$$$ | $$  \__//$$$$$$$      | $$  \ $$| $$  \__/| $$  \__/ /$$  /$$$$$$$ /$$  /$$$$$$ | $$      | $$  \__/  /$$$$$$ | $$| $$  /$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$ 
//     | $$   | $$__  $$ /$$__  $$      |  $$$$$$ | $$__  $$| $$_  $$_  $$| $$  | $$ /$$__  $$| $$$$   /$$_____/      | $$  | $$| $$$$    | $$$$    | $$ /$$_____/| $$ |____  $$| $$      | $$       /$$__  $$| $$| $$ /$$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$
//     | $$   | $$  \ $$| $$$$$$$$       \____  $$| $$  \ $$| $$ \ $$ \ $$| $$  | $$| $$  \__/| $$_/  |  $$$$$$       | $$  | $$| $$_/    | $$_/    | $$| $$      | $$  /$$$$$$$| $$      | $$      | $$  \ $$| $$| $$| $$$$$$$$| $$        | $$    | $$| $$  \ $$| $$  \ $$
//     | $$   | $$  | $$| $$_____/       /$$  \ $$| $$  | $$| $$ | $$ | $$| $$  | $$| $$      | $$     \____  $$      | $$  | $$| $$      | $$      | $$| $$      | $$ /$$__  $$| $$      | $$    $$| $$  | $$| $$| $$| $$_____/| $$        | $$ /$$| $$| $$  | $$| $$  | $$
//     | $$   | $$  | $$|  $$$$$$$      |  $$$$$$/| $$  | $$| $$ | $$ | $$|  $$$$$$/| $$      | $$     /$$$$$$$/      |  $$$$$$/| $$      | $$      | $$|  $$$$$$$| $$|  $$$$$$$| $$      |  $$$$$$/|  $$$$$$/| $$| $$|  $$$$$$$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$
//     |__/   |__/  |__/ \_______/       \______/ |__/  |__/|__/ |__/ |__/ \______/ |__/      |__/    |_______/        \______/ |__/      |__/      |__/ \_______/|__/ \_______/|__/       \______/  \______/ |__/|__/ \_______/ \_______/   \___/  |__/ \______/ |__/  |__/
//
//    The Shmurfs are a collection of 1,000, 3D amazing PFP NFT's that offer real long term value
//
//

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721A.sol";

contract TheShmurfs is Ownable, ERC721A {

  enum Step {
    Inactive,
    WhitelistSale,
    PublicSale
  }

  Step public sellingStep;

  string private baseURI;
  string private unrevealedImageURL;
  bool private revealed;

  uint private MAX_SUPPLY          = 1000;
  uint private constant PRICE_WHITELIST     = 0.08 ether;
  uint private constant PRICE_PUBLIC        = 0.09 ether;
  uint private constant MAX_WHITELIST_BATCH = 3;

  address private fundWallet    = payable(0xe8a18cD415e54A99FCd2d89F52434dd8259926fb); // Owner Fund Wallet Address
  address private devOneWallet  = payable(0xbC937543371F759867acf29A3391dEecF12f3d76); // Developer One Wallet Address

  mapping(address => uint8) private whitelistBuyList;

  constructor() ERC721A("The Shmurfs Official Collection", "SHMURFS") {
    sellingStep = Step.Inactive;
    revealed = false;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  modifier whitelistSaleIsOpen() {
    require(sellingStep == Step.WhitelistSale, "Whitelist Sale is not activated");
    _;
  }

  modifier publicSaleIsOpen() {
    require(sellingStep == Step.PublicSale, "Public Sale is not activated");
    _;
  }

  function whitelistMint(uint8 quantity) external payable callerIsUser whitelistSaleIsOpen {
    require(totalSupply() < MAX_SUPPLY, "WHITELIST_SALE: Please go to the Opensea to buy The Shmurfs.");
    require(totalSupply() + quantity <= MAX_SUPPLY, "WHITELIST_SALE: Max supply exceeded");
    require(whitelistBuyList[msg.sender] + quantity <= MAX_WHITELIST_BATCH, "WHITELIST_SALE: You can not get more than 3 NFTs on the Whitelist Sale");
    require(msg.value >= PRICE_WHITELIST * quantity, "WHITELIST_SALE: Not enough funds");

    whitelistBuyList[msg.sender] += quantity;
    _safeMint(msg.sender, quantity);

    refundIfOver(PRICE_WHITELIST * quantity);
  }

  function publicSaleMint(uint8 quantity) external payable callerIsUser publicSaleIsOpen{
    require(totalSupply() < MAX_SUPPLY, "PUBLIC_SALE: Please go to the Opensea to buy The Shmurfs.");
    require(totalSupply() + quantity <= MAX_SUPPLY, "PUBLIC_SALE: Max supply exceeded");
    require(msg.value >= PRICE_PUBLIC * quantity, "WHITELIST_SALE: Not enough funds");

    _safeMint(msg.sender, quantity);
    refundIfOver(PRICE_PUBLIC * quantity);
  }

  function setStepAsInactive() external onlyOwner {
    sellingStep = Step.Inactive;
  }

  function setStepAsWhitelistSale() external onlyOwner {
    sellingStep = Step.WhitelistSale;
  }

  function setStepAsPublicSale() external onlyOwner {
    sellingStep = Step.PublicSale;
  }

  function setMaxSupply(uint max_) external onlyOwner {
    MAX_SUPPLY = max_;
  }
  
  // metadata URI
  function setUnrevealedImageURL(string calldata _imageURL) external onlyOwner {
    unrevealedImageURL = _imageURL;
  }

  function setRevealed(bool _reveal) external onlyOwner {
    revealed = _reveal;
  }

  function setBaseURI(string calldata _baseuri) external onlyOwner {
    baseURI = _baseuri;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  function tokenURI(uint _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "URI query for nonexistent token");

    if (revealed)
      return super.tokenURI(_tokenId);
    else
      return unrevealedImageURL;
  }

  // fund
  function withdrawAll() external onlyOwner {
    uint totalBalance = address(this).balance;
    require(totalBalance > 0, "WITHDRAW: No balance in contract");

    uint devOneBalance = totalBalance / 10; // 10% of total sale
    uint ownerBalance = totalBalance - devOneBalance; // 90% of total sale

    _withdraw(devOneWallet, devOneBalance);
    _withdraw(fundWallet, ownerBalance);
  }

  function _withdraw(address _address, uint _amount) private {
    (bool success, ) = _address.call{value: _amount}("");

    require(success, "WITHDRAW: Transfer failed.");
  }

  function refundIfOver(uint price) private {
    require(msg.value >= price, "Need to send more ETH.");

    if (msg.value > price) {
      payable(msg.sender).transfer(msg.value - price);
    }
  }

  function getPrice() public view returns (uint) {
    require(sellingStep != Step.Inactive, "Sale not activated");
    if (sellingStep == Step.PublicSale)
      return PRICE_PUBLIC;
    else
      return PRICE_WHITELIST;
  }
}