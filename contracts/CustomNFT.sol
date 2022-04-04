// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

contract CustomNFT is Ownable, ERC721A, ReentrancyGuard {
  uint256 public immutable maxPublicBatchSize;

  struct SaleConfig {
    uint32 publicSaleStartTime;
    uint64 whitelistPrice;
    uint64 publicPrice;
  }
  SaleConfig public saleConfig;

  address private fundWallet = payable(0x269D13DaF86aec35e9bD12684B027CbA597360f1); // Owner Fund Wallet Address
  address private devOneWallet = payable(0x75d08D5B49B53B6A8f964851E00707C3259Da330); // Developer One Wallet Address
  address private devTwoWallet = payable(0x18236675fE58640dc2e9dDFfC478eC2EEea6Ca52); // Developer Two Wallet Address

  bool public SALE_OPEN = false;

  uint256 private _mintPasskey = 0;

  mapping(address => uint256) public whitelist;

  constructor(uint256 maxBatchSize_, uint256 collectionSize_) ERC721A("Custom NFT", "CNFT", maxBatchSize_, collectionSize_) {
    maxPublicBatchSize = maxBatchSize_;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  modifier saleIsOpen {
    if (_msgSender() != owner()) {
      require(SALE_OPEN == true, "Sale stopped");
    }
    _;
  }

  function whitelistMint() external payable callerIsUser saleIsOpen {
    uint256 price = uint256(saleConfig.whitelistPrice);
    require(price != 0, "WHITELIST_SALE: whitelist sale has not begun yet");
    require(whitelist[msg.sender] > 0, "WHITELIST_SALE: not eligible for whitelist mint");
    require(totalSupply() + 1 <= collectionSize, "WHITELIST_SALE: reached max supply");

    whitelist[msg.sender]--;
    _safeMint(msg.sender, 1);

    refundIfOver(price);
  }

  function publicSaleMint(uint256 quantity, uint256 callerMintKey) external payable callerIsUser saleIsOpen {
    SaleConfig memory config = saleConfig;
    uint256 mintKey = _mintPasskey;
    uint256 publicPrice = uint256(config.publicPrice);
    uint256 publicSaleStartTime = uint256(config.publicSaleStartTime);

    require(mintKey == callerMintKey, "PUBLIC_SALE: called with incorrect public sale key");

    require(isPublicSaleOn(publicPrice, mintKey, publicSaleStartTime), "PUBLIC_SALE: public sale has not begun yet");
    require(totalSupply() + quantity <= collectionSize, "PUBLIC_SALE: reached max supply");
    require(numberMinted(msg.sender) + quantity <= maxPublicBatchSize, "PUBLIC_SALE: can not mint this many");

    _safeMint(msg.sender, quantity);
    refundIfOver(publicPrice * quantity);
  }

  function refundIfOver(uint256 price) private {
    require(msg.value >= price, "Need to send more ETH.");

    if (msg.value > price) {
      payable(msg.sender).transfer(msg.value - price);
    }
  }

  function isPublicSaleOn(uint256 publicPriceWei, uint256 mintKey, uint256 publicSaleStartTime) public view returns (bool) {
    return publicPriceWei != 0 && mintKey != 0 && block.timestamp >= publicSaleStartTime;
  }

  function setupSaleInfo(uint64 whitelistPriceWei, uint64 publicPriceWei, uint32 publicSaleStartTime) external onlyOwner {
    saleConfig = SaleConfig(publicSaleStartTime, whitelistPriceWei, publicPriceWei);
  }

  function setWhitelist(address[] memory addresses, uint256[] memory numSlots) external onlyOwner {
    require(addresses.length == numSlots.length, "addresses does not match numSlots length");

    for (uint256 i = 0; i < addresses.length; i++) {
      whitelist[addresses[i]] = numSlots[i];
    }
  }

  function flipSaleState() public onlyOwner {
    SALE_OPEN = !SALE_OPEN;
  }

  // metadata URI
  string private _baseTokenURI;

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function setBaseURI(string calldata baseURI) external onlyOwner {
    _baseTokenURI = baseURI;
  }

  function withdrawAll() external onlyOwner nonReentrant {
    uint256 totalBalance = address(this).balance;
    require(totalBalance > 0, "WITHDRAW: No balance in contract");

    uint256 devOneBalance = totalBalance / 7; // 7% of total sale
    uint256 devTwoBalance = totalBalance / 3; // 3% of total sale
    uint256 ownerBalance = totalBalance - devOneBalance - devTwoBalance; // 90% of total sale

    _withdraw(devOneWallet, devOneBalance);
    _withdraw(devTwoWallet, devTwoBalance);
    _withdraw(fundWallet, ownerBalance);
  }

  function _withdraw(address _address, uint256 _amount) internal {
    (bool success, ) = _address.call{value: _amount}("");

    require(success, "WITHDRAW: Transfer failed.");
  }

  function setOwnersExplicit(uint256 quantity) external onlyOwner nonReentrant {
    _setOwnersExplicit(quantity);
  }

  function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  function getOwnershipData(uint256 tokenId) external view returns (TokenOwnership memory) {
    return ownershipOf(tokenId);
  }

  function setMintPassKey(uint256 mintPasskey_) external onlyOwner {
    _mintPasskey = mintPasskey_;
  }
}