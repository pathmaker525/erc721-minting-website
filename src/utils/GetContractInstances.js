import { getContract } from "utils/index"
import getNFTContract from "./GetContractInfo"
import contractAbi from "abis/DoodleFriends.json"

export const getDoodleFriendsContract = (signer) => {
  return getContract(getNFTContract().address, contractAbi.abi, signer)
}
