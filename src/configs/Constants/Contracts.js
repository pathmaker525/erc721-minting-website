import { CHAIN_ID } from "."

const { ETH_MAINNET, ETH_TESTNET } = CHAIN_ID

export const contractAddresses = {
  [ETH_MAINNET]: {
    address: "0x7b9C9C846a5a9ADaAab0B6cc224f9AF47405F721",
    explorerUrl:
      "https://etherscan.io/token/0x7b9C9C846a5a9ADaAab0B6cc224f9AF47405F721",
  },
  [ETH_TESTNET]: {
    address: "0x836f1f77311516c513ef4a5e7cbfa60738fe4f06",
    explorerUrl:
      "https://rinkeby.etherscan.io/token/0x30C4Df9E5323B1844bA91573B4966E7Af9A93683",
  },
}
