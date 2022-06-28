import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import * as contractJson from '../artifacts/contracts/KakiCoin.sol/KakiCoin.json';
import { ProcEnv, ChainList } from './procenv';

dotenv.config();

const main = async () => {
  const {
    mnemonic: targetNetwork,
    chainId: targetChainId,
    blockExplorerUrl: urlPrefix,
    // } = ChainList.Mumbai;
  } = ChainList.Goerli;
  // const contractAddress = ProcEnv.MUMBAI_CONTRACT_ADDRESS;
  const contractAddress = ProcEnv.GOERLI_CONTRACT_ADDRESS;
  const contractAbi = contractJson.abi;
  const privateKey = ProcEnv.PRIVATE_KEY;

  // const alchemyProvider = new ethers.providers.AlchemyProvider(
  //   targetNetwork,
  //   ProcEnv.ALCHEMY_API_KEY,
  // );
  // const infuraProvider = new ethers.providers.InfuraProvider(targetNetwork, {
  //   projectId: ProcEnv.INFURA_PROJECT_ID,
  //   projectSecret: ProcEnv.INFURA_PROJECT_SECRET,
  // });
  // const provider = infuraProvider;

  // const provider = new ethers.providers.FallbackProvider([
  //   { provider: alchemyProvider, priority: 1 },
  //   { provider: infuraProvider, priority: 1 },
  // ]);
  // console.log(provider.providerConfigs);

  // const provider = ethers.getDefaultProvider(targetNetwork, {
  //   alchemy: ProcEnv.ALCHEMY_API_KEY,
  //   infura: ProcEnv.INFURA_PROJECT_ID,
  //   etherscan: ProcEnv.ETHRSCAN_API_KEY,
  //   pocket: ProcEnv.POCKET_PORTAL_ID,
  // });

  const provider = new ethers.providers.EtherscanProvider(targetNetwork, ProcEnv.ETHERSCAN_API_KEY);

  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  const network = await provider.getNetwork();
  const { chainId } = network;
  const wallet = await new ethers.Wallet(privateKey, provider);
  // const { address } = wallet;

  const callContractWriteMethod = async () => {
    if (chainId !== targetChainId)
      console.log('Wrong network - Connect to configured chain ID first!');

    try {
      const contractWithSigner = contract.connect(wallet);

      const balanceBefore = await contract.balanceOf(ProcEnv.PUBLIC_KEY_MOBILE);
      console.log('balance before', ethers.utils.formatUnits(balanceBefore, 18));
      const txn = await contractWithSigner.transfer(
        // ProcEnv.PUBLIC_KEY_FRIEND,
        ProcEnv.PUBLIC_KEY_MOBILE,
        // ethers.utils.parseEther('1'),
        ethers.BigNumber.from(1),
      );
      // const contractWithMoblieSigner = contract.connect(
      //   await new ethers.Wallet(ProcEnv.PRIVATE_KEY_MOBILE, provider),
      // );
      // const txn = await contractWithMoblieSigner.transfer(
      //   ProcEnv.PUBLIC_KEY,
      //   ethers.BigNumber.from(1),
      // );
      txn.wait();
      if (txn) {
        const { hash, blockNumber } = txn;
        console.log(
          `Transaction is successful.\n\tTransaction Hash: ${hash}\n\tBlock Number: ${blockNumber}\n\tNavigate to\n\t\t${urlPrefix}tx/${hash}\n\tto see your transaction`,
        );
      } else {
        console.log('Error submitting transaction');
      }
    } catch (e) {
      console.log('Error Caught in Catch Statement: ', e);
    }
  };

  const callContractReadOnlyMethod = async () => {
    const balanceAfter = await contract.balanceOf(ProcEnv.PUBLIC_KEY_MOBILE);
    console.log('balance after', ethers.utils.formatUnits(balanceAfter, 18));
  };
  await callContractWriteMethod();
  await callContractReadOnlyMethod();
};

main()
  .then(() => console.log('Everything is OK.'))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
