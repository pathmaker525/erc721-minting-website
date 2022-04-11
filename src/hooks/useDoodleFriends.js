import { Contract } from "ethers"
import useSWR from "swr"

import { getProviderOrSigner } from "utils/index"
import getNFTContract from "utils/GetContractInfo"
import contractAbi from "abis/TheShmurfs.json"
import useActiveWeb3React from "./useActiveWeb3React"

const fetcher =
  (library) =>
  (...args) => {
    const [arg1, arg2, arg3, ...params] = args
    const address = arg1
    const method = arg2
    const account = arg3

    console.log(address, method, account)

    const contract = new Contract(
      address,
      contractAbi.abi,
      getProviderOrSigner(library, account)
    )

    return contract[method](arg3, ...params)
  }

const useTheShmurfsFeatures = (method, ...args) => {
  const { library, account } = useActiveWeb3React()

  const { data: response, mutate } = useSWR(
    [getNFTContract().address, method, account, ...args],
    {
      fetcher: fetcher(library),
    }
  )

  return { response, mutate }
}

export default useTheShmurfsFeatures
