import { useAccount, useConfig, useConnect, type Connector } from 'wagmi';
import { disconnect } from 'wagmi/actions';

export const createMetaMaskDeepLink = () => {
  const origin = window.location.origin;
  // Don't attach the query params symbol ? in case of no query params found
  const link = `https://metamask.app.link/dapp/${origin}`;
  return window.open(link);
};

export const useWalletButtons = () => {
  const wagmiConfig = useConfig();

  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  const areAdditionalInjectorsInserted = connectors?.length > 3

  const handleWalletConnection = async (connector: Connector) => {
    const isInjectedBrowser = !isCoin98Wallet();

    if (!areAdditionalInjectorsInserted && connector?.type === 'injected' && isInjectedBrowser) {
      createMetaMaskDeepLink();
      return;
    }
    if (address) {
      disconnect(wagmiConfig);
    }
    connect(
      { connector },
      {
        onError: async (error) => {
          const errorCode = error?.name;
          if (errorCode === 'ConnectorAlreadyConnectedError') {
            disconnect(wagmiConfig);
          }
        },
      },
    );
  };

  const isCoin98Wallet = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /coin98/i.test(userAgent);
  };
  return {
    isCoin98Wallet,
    handleWalletConnection,
    connectors,
    areAdditionalInjectorsInserted,
    address,
  };
};
