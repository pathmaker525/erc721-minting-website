import { useCallback } from "react"
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core"
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector"
import {
  WalletConnectConnector,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector"

import { setupNetwork } from "utils/Wallet"
import { connectersById } from "utils/Web3React"

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    (connectorId) => {
      const connector = connectersById[connectorId]

      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            console.log(error)
            const hasSetup = await setupNetwork()

            if (hasSetup) {
              activate(connector)
            }
          } else {
            if (error instanceof NoEthereumProviderError) {
              console.error("Provider Error: No provider was found")
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector

                walletConnector.walletConnectProvider = null
              }

              console.error(
                "Authorization Error: Please authorize to access your account"
              )
            } else {
              console.error(`${error.name}: ${error.message}`)
            }
          }
        })
      } else {
        console.error("Unable to find connector: The connector config is wrong")
      }
    },
    [activate]
  )

  const logout = useCallback(() => {
    deactivate()

    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem("walletconnect")) {
      connectersById.walletconnect.close()
      connectersById.walletconnect.walletConnectProvider = null
    }
  }, [deactivate])

  return { login, logout }
}

export default useAuth
