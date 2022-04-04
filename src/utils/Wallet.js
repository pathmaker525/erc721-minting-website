import { RPC_URL, SCANNER_URL } from "configs/Constants"

/**
 * Prompt the user to add BSC as a network on metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum

  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: "Rinkeby Test Network",
                nativeCurrency: {
                  name: "tETH",
                  symbol: "tETH",
                  decimals: 18,
                },
                rpcUrls: [RPC_URL[chainId]],
                blockExplorerUrls: [SCANNER_URL[chainId]],
              },
            ],
          })

          return true
        } catch (error) {
          console.error("Failed to setup the network in metamask:", error)

          return false
        }
      }
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    )

    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals
) => {
  const tokenAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        // image: () => ({}),
      },
    },
  })

  return tokenAdded
}
