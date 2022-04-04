const CustomNFT = artifacts.require("CustomNFT")

module.exports = function (deployer) {
  deployer.deploy(CustomNFT)
}
