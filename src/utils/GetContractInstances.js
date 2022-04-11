import { getContract } from "utils/index"
import getNFTContract from "./GetContractInfo"
import contractAbi from "abis/TheShmurfs.json"

export const getTheShmurfsContract = (signer) => {
  return getContract(getNFTContract().address, contractAbi.abi, signer)
}
