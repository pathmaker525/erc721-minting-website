import { Metamask, WalletConnect } from "resources/Icons"

const ConnectorIds = {
  Injected: "injected",
  WalletConnect: "walletconnect",
}

const connectors = [
  {
    title: "Metamask",
    icon: <Metamask />,
    connectorId: ConnectorIds.Injected,
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: <WalletConnect />,
    connectorId: ConnectorIds.WalletConnect,
    priority: 2,
  },
]

export { ConnectorIds }
export default connectors
