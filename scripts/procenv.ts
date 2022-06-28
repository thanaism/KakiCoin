import * as dotenv from 'dotenv';

dotenv.config();

const assertIsDefined: <T>(value: T) => asserts value is NonNullable<T> = (value) => {
  if (value == null) throw Error;
};

// The following keys must be defined in the `.env` file.
// Please comment out any unnecessary keys.
const procEnvKeys = [
  'PRIVATE_KEY',
  'PRIVATE_KEY_MOBILE',
  'ALCHEMY_API_KEY',
  'ETHERSCAN_API_KEY',
  'POCKET_PORTAL_ID',
  'INFURA_PROJECT_ID',
  'INFURA_PROJECT_SECRET',
  'GOERLI_CONTRACT_ADDRESS',
  'MUMBAI_CONTRACT_ADDRESS',
  'PUBLIC_KEY',
  'PUBLIC_KEY_MOBILE',
  'PUBLIC_KEY_FRIEND',
] as const;

export type ProcEnv = Record<typeof procEnvKeys[number], string>;

export const ProcEnv = Object.fromEntries(
  procEnvKeys.map((key) => {
    const value = process.env[key];
    assertIsDefined(value);
    return [key, value];
  }),
) as ProcEnv;

export type Chain = {
  [key: string]: {
    mnemonic: string;
    chainId: number;
    blockExplorerUrl: string;
    alchemyRpcUrl?: string;
    infuraRpcUrl?: string;
    pocketRpcUrl?: string;
  };
};

export const ChainList: Chain = {
  Rinkeby: {
    mnemonic: 'rinkeby',
    chainId: 4,
    blockExplorerUrl: 'https://rinkeby.etherscan.io/',
    alchemyRpcUrl: `https://eth-rinkeby.alchemyapi.io/v2/${ProcEnv.ALCHEMY_API_KEY}`,
    infuraRpcUrl: `https://rinkeby.infura.io/v3/${ProcEnv.INFURA_PROJECT_ID}`,
    pocketRpcUrl: `https://eth-rinkeby.gateway.pokt.network/v1/lb/${ProcEnv.POCKET_PORTAL_ID}`,
  },
  Ropsten: {
    mnemonic: 'ropsten',
    chainId: 3,
    blockExplorerUrl: 'https://ropsten.etherscan.io/',
    alchemyRpcUrl: `https://eth-ropsten.alchemyapi.io/v2/${ProcEnv.ALCHEMY_API_KEY}`,
    infuraRpcUrl: `https://ropsten.infura.io/v3/${ProcEnv.INFURA_PROJECT_ID}`,
    pocketRpcUrl: `https://eth-ropsten.gateway.pokt.network/v1/lb/${ProcEnv.POCKET_PORTAL_ID}`,
  },
  Goerli: {
    mnemonic: 'goerli',
    chainId: 5,
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    alchemyRpcUrl: `https://eth-goerli.alchemyapi.io/v2/${ProcEnv.ALCHEMY_API_KEY}`,
    infuraRpcUrl: `https://goerli.infura.io/v3/${ProcEnv.INFURA_PROJECT_ID}`,
    pocketRpcUrl: `https://eth-goerli.gateway.pokt.network/v1/lb/${ProcEnv.POCKET_PORTAL_ID}`,
  },
  Mumbai: {
    mnemonic: 'maticmum',
    chainId: 80001,
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
    alchemyRpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${ProcEnv.ALCHEMY_API_KEY}`,
  },
  Polygon: {
    mnemonic: 'matic',
    chainId: 137,
    blockExplorerUrl: 'https://polygonscan.com/',
    alchemyRpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${ProcEnv.ALCHEMY_API_KEY}`,
    pocketRpcUrl: `https://poly-mainnet.gateway.pokt.network/v1/lb/${ProcEnv.POCKET_PORTAL_ID}`,
  },
};
