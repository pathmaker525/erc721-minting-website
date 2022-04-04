import { providers } from "ethers"
import { RPC_URL } from "configs/Constants"

const { StaticJsonRpcProvider } = providers
const rpcUrl = RPC_URL.chainId

export const simpleRpcProvider = new StaticJsonRpcProvider(rpcUrl)
