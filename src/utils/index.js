import { constants, Contract } from "ethers"
import { isAddress } from "ethers/lib/utils"

export const getSigner = (library, account) => {
  return library.getSigner(account).connectUnchecked()
}

export const getProviderOrSigner = (library, account) => {
  return account === "" ? library : getSigner(library, account)
}

export const getContract = (address, ABI, signerOrProvider) => {
  if (!isAddress(address) || address === constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signerOrProvider)
}
