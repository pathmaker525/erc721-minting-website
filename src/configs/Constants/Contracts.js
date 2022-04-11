import { CHAIN_ID } from "."

const { ETH_MAINNET, ETH_TESTNET } = CHAIN_ID

export const contractAddresses = {
  [ETH_MAINNET]: {
    address: "0x7b9C9C846a5a9ADaAab0B6cc224f9AF47405F721",
    explorerUrl:
      "https://etherscan.io/token/0x7b9C9C846a5a9ADaAab0B6cc224f9AF47405F721",
  },
  [ETH_TESTNET]: {
    address: "0x575702DAd53D4681C45EDD33D349c6e10C2C9d49",
    explorerUrl:
      "https://rinkeby.etherscan.io/token/0x30C4Df9E5323B1844bA91573B4966E7Af9A93683",
  },
}
