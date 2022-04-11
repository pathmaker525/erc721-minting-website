import { ethers } from "ethers"
import { getTheShmurfsContract } from "./GetContractInstances"
import { getProviderOrSigner } from "utils/index"

// Get Current Total Supply from the Contract
// export const getCurrentTotalSupply = async (library, account) => {
//   const contract = getTheShmurfsContract(
//     getProviderOrSigner(library, account)
//   )

//   try {
//     let totalSupply = await contract.totalSupply()

//     return ethers.BigNumber.from(totalSupply).toNumber()
//   } catch (err) {
//     return 0
//   }
// }

// Get Max Supply from the Contract
export const getMaxSupply = async (library, account) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  try {
    let maxSupply = await contract.maxSupply()

    return ethers.BigNumber.from(maxSupply).toNumber()
  } catch (err) {
    return 0
  }
}

// Get Max Mintable Counts per Click from the Contract
export const getCurrentMaxMint = async (library, account) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  try {
    let currentMaxMint = await contract.maxMint()

    return ethers.BigNumber.from(currentMaxMint).toNumber()
  } catch (err) {
    return 0
  }
}

// Get Max Mintable Counts per Click from the Contract
export const getMaxMintingSupply = async (library, account) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  try {
    let currentMaxSupply = await contract.maxSupply()

    return ethers.BigNumber.from(currentMaxSupply).toNumber()
  } catch (err) {
    return 0
  }
}

export const getOccupiedIds = async (library, account) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  try {
    let occupiedList = await contract.occupiedList()

    return occupiedList
  } catch (err) {
    return 0
  }
}

export const getPrice = async (library, account) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  try {
    let price = await contract.getPrice()

    return ethers.BigNumber.from(price).div(1e14).toNumber()
  } catch (err) {
    console.log(err.message)
    return 0
  }
}

export const getOwnerAddress = async (library, account) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  try {
    let ownerAddress = await contract.owner()

    return ownerAddress
  } catch (err) {
    return ""
  }
}

export const mintNFT = async (
  library,
  account,
  alertInfo,
  alertSuccess,
  alertError,
  mintCount
) => {
  const contract = getTheShmurfsContract(
    getProviderOrSigner(library, account)
  )

  let price = await getPrice(library, account)
  console.log(
    ethers.BigNumber.from(price).mul(1e14).mul(mintCount).toString(),
    mintCount
  )

  try {
    let txhash = await contract.publicSaleMint(mintCount, {
      value: ethers.BigNumber.from(price).mul(1e14).mul(mintCount),
      from: account,
    })

    alertInfo("Tx Submitted")
    let res = await txhash.wait()

    if (res.transactionHash) {
      alertSuccess("Successfully Minted")
    } else {
      alertError("Tx Failed")
    }
  } catch (err) {
    alertError(err.message)
  }
}
