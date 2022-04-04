import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { ConnectorIds } from "configs/Wallets"
import { ethers } from "ethers"
import { RPC_URL } from "configs/Constants"

const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const rpcUrl = RPC_URL.chainId

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const connectersById = {
  [ConnectorIds.Injected]: injected,
  [ConnectorIds.WalletConnect]: walletconnect,
}

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL

  return library
}
