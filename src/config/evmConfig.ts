import { createConfig, fallback, http } from 'wagmi';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  polygon,
  polygonAmoy,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';;

import {
  coreMainnet,
  coreTestnet,
  shibariumMainnet,
  shibariumTestnet,
  victionMainnet,
  victionTestnet,
} from './evmCustomChains';

const DEFAULT_POLLING_INTERVAL = 8_000;

// Allow test networks in non-production environments
export const chainsList = [
  sepolia,
  victionTestnet,
  coreTestnet,
  shibariumTestnet,
  polygonMumbai,
  polygon,
  victionMainnet,
  shibariumMainnet,
  coreMainnet,
  arbitrumSepolia,
  polygonAmoy,
  base,
  baseSepolia,
];

const walletConnectKey = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const infuraApiKey = import.meta.env.VITE_INFURA_KEY;

const defaultAppMeta = {
  name: 'D3 Marketplace widget',
  description: 'Official Identity Service for Top web3 communities',
  url: window.location.origin,
  icons: ['https://d3.app/favicon.png'],
};

// Set up wagmi config
export const wagmiConfig = createConfig({
    chains: [mainnet, ...chainsList],
    connectors: [
      coinbaseWallet({
        appName: defaultAppMeta.name,
        appLogoUrl: defaultAppMeta.icons[0],
        darkMode: true,
      }),
      injected({ shimDisconnect: false }),
      walletConnect({
        projectId: walletConnectKey,
        qrModalOptions: {
          themeMode: 'dark',
        },
        showQrModal: true,
        metadata: {
          ...defaultAppMeta,
        },
      }),
    ],
    ssr: true,
    syncConnectedChain: true,
    multiInjectedProviderDiscovery: true,
    cacheTime: DEFAULT_POLLING_INTERVAL,
    pollingInterval: DEFAULT_POLLING_INTERVAL,
    transports: {
      [mainnet.id]: fallback([
        http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
        http('https://cloudflare-eth.com/'),
      ]),
      [coreMainnet.id]: http(),
      [shibariumMainnet.id]: http(),
      [victionMainnet.id]: http(),
      [polygon.id]: http(),
      [sepolia.id]: fallback([
        http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
        http('https://rpc2.sepolia.org/'),
      ]),
      [polygonMumbai.id]: http(),
      [victionTestnet.id]: http(),
      [shibariumTestnet.id]: http(),
      [coreTestnet.id]: http(),
      [arbitrum.id]: http(),
      [arbitrumSepolia.id]: http(),
      [polygonAmoy.id]: http(),
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });