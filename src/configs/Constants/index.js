export const CHAIN_ID = {
  // Binance Smart Chain
  ETH_MAINNET: 1,
  ETH_TESTNET: 4,
}

export const RPC_URL = {
  // Binance Smart Chain
  [CHAIN_ID.ETH_MAINNET]:
    "https://mainnet.infura.io/v3/63e0333c462f4000833607d16b5c3f23",
  [CHAIN_ID.ETH_TESTNET]:
    "https://rinkeby.infura.io/v3/63e0333c462f4000833607d16b5c3f23",
}

export const SCANNER_URL = {
  [CHAIN_ID.ETH_MAINNET]: "https://etherscan.io",
  [CHAIN_ID.ETH_TESTNET]: "https://rinkeby.etherscan.io",
}
