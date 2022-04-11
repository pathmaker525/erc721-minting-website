import { ConnectorIds } from "configs/Wallets"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { BannerImage } from "resources/Images"

import "./style.scss"

const Mint = ({
  account,
  mintCount,
  ticker,
  mintPrice,
  walletConfig,
  connector,
  disconnector,
  onIncreaseMintCount,
  onDecreaseMintCount,
  onMint,
}) => (
  <div className="mint flex">
    <div className="mint-wrapper container flex">
      <div className="mint-main card shadowed rounded flex flex-column">
        <img className="rounded-md" src={BannerImage} alt="banner" />
        {account ? (
          <>
            <div className="mint-disconnect flex">
              <button className="rounded-sm" onClick={disconnector}>
                Disconnect
              </button>
              <span className="rounded-sm">{`${account.slice(
                0,
                4
              )}...${account.slice(-4)}`}</span>
            </div>
            <h3>Get your Shmurfs</h3>
            <span className="mint-ticker">
              {ticker < 500
                ? "😎 Go Go Go Fam 😎"
                : ticker < 1500
                ? "🔥 Minting in Process 🔥"
                : ticker < 2500
                ? "😍 Many Minted 😍"
                : ticker < 3353
                ? "😱 Almost there Fam 😱"
                : ticker === 3353
                ? "🎉 Sold out! 🎉"
                : "🤔 Unknown Status 🤔"}
            </span>
            <span className="mint-price">
              {(mintPrice * mintCount) / 10000} ETH
            </span>
            <div className="mint-counter flex">
              <FiMinusCircle onClick={onDecreaseMintCount} />
              <input
                type="number"
                className="rounded-sm"
                value={mintCount}
                readOnly
              />
              <FiPlusCircle onClick={onIncreaseMintCount} />
            </div>
            <div className="mint-button">
              <button className="rounded-sm" onClick={onMint}>
                Mint
              </button>
            </div>
          </>
        ) : (
          <div className="mint-button">
            <button
              className="rounded-sm"
              onClick={() => {
                const isIOS =
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !window.MMStream

                // Since iOS does not support Trust Wallet we fall back to WalletConnect
                if (walletConfig.title === "Trust Wallet" && isIOS) {
                  connector(ConnectorIds.WalletConnect)
                } else {
                  connector(walletConfig.connectorId)
                }
              }}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Mint
