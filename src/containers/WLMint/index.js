import { useState, useEffect } from "react"
import useAuth from "hooks/useAuth"
import { useWeb3React } from "@web3-react/core"
import { useAlert } from "react-alert"

import connectors from "configs/Wallets"

import {
  // getCurrentTotalSupply,
  // getMaxSupply,
  // getCurrentMaxMint,
  // getMaxMintingSupply,
  // getOccupiedIds,
  getPrice,
  mintNFT
} from "utils/GetNFTContract"

import WLMintComponent from "components/WLMint"

const WLMint = () => {
  const { library, account } = useWeb3React()
  const { login, logout } = useAuth()
  const alert = useAlert()

  const [mintCount, setMintCount] = useState(1)
  const [txStatus, setTxStatus] = useState("")

  // const [totalSupply, setTotalSupply] = useState(0)
  // const [maxSupply, setMaxSupply] = useState(1000)
  const [maxMint] = useState(3)
  const [mintPrice, setMintPrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!!account) {
        // let totalSupply = await getCurrentTotalSupply(library, account)
        // setTotalSupply(totalSupply)

        // let mintMax = await getCurrentMaxMint(library, account)
        // setMaxMint(mintMax)

        // let maxSupply = await getMaxMintingSupply(library, account)
        // setMaxSupply(maxSupply)

        let mintPrice = await getPrice(library, account)
        setMintPrice(mintPrice)
      }
    }

    fetchData()
  }, [library, account])

  const alertInfo = (message) =>
    alert.info(message, {
      onOpen: () => {
        setTxStatus("Pending")
      },
    })

  const alertSuccess = (message) =>
    alert.success(message, {
      onOpen: () => {
        setTxStatus("Success")
      },
    })

  const alertError = (message) =>
    alert.error(message, {
      onOpen: () => {
        setTxStatus("Error")
      },
    })

  // const generateInitIds = () => {
  //   let initIds = []

  //   for (let i = 0; i < maxSupply; i++) {
  //     initIds.push(i + 1)
  //   }

  //   return initIds
  // }

  // const getDiffArray = (source, target) => {
  //   return source.filter((index) => {
  //     let tempArray = []
  //     for (let i = 0; i < target.length; i++) {
  //       tempArray.push(ethers.BigNumber.from(target[i]).toNumber())
  //     }

  //     return tempArray.indexOf(index) < 0
  //   })
  // }

  // const getRandomIds = async () => {
  //   let customIds = []
  //   const baseIds = generateInitIds()
  //   const occupied = await getOccupiedIds(library, account)
  //   const diffIds = getDiffArray(baseIds, occupied)

  //   while (customIds.length < Number(mintCount)) {
  //     const id = Math.floor(Math.random() * diffIds.length)
  //     const index = diffIds[id]
  //     customIds.push(index)
  //   }

  //   return customIds
  // }

  const onIncreaseMintCount = () => {
    if (mintCount < maxMint) 
    setMintCount(mintCount + 1)
  }

  const onDecreaseMintCount = () => {
    if (mintCount > 1) {
      setMintCount(mintCount - 1)
    }
  }

  const onMint = async () => {
    if (txStatus !== "Pending" && !!account) {
      // const randomIds = await getRandomIds()
      // console.log(randomIds)

      await mintNFT(
        library,
        account,
        alertInfo,
        alertSuccess,
        alertError,
        mintCount,
        false
      )
    }
  }

  return (
    <WLMintComponent
      account={account}
      mintCount={mintCount}
      // ticker={totalSupply}
      mintPrice={mintPrice}
      walletConfig={connectors[0]}
      connector={login}
      disconnector={logout}
      onIncreaseMintCount={onIncreaseMintCount}
      onDecreaseMintCount={onDecreaseMintCount}
      onMint={onMint}
    />
  )
}

export default WLMint
