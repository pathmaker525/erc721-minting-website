import { contractAddresses } from "configs/Constants/Contracts"

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const getNFTContract = () => {
  const assetInfo = contractAddresses[chainId]

  return assetInfo
}

export default getNFTContract
