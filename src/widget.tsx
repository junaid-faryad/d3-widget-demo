import { D3Widget } from '@d3-inc/marketplace-widget';
import '@d3-inc/marketplace-widget/styles.css';
import { useAccount } from 'wagmi';
import { ConnectWallet } from './components/wallets/connectWallet';
import { useCryptoCheckout } from './hooks/useCryptoCheckout';

const d3ApiKey = import.meta.env.VITE_D3_API_KEY;
const d3ApiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const d3WidgetAppearance = import.meta.env.VITE_WIDGET_APPEARANCE ?? 'light';
const widgetTlds = import.meta.env.VITE_TLDS ?? 'shib,core';
const walletConnectKey = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

function Widget() {
  const { address } = useAccount();
  const { handleCryptoCheckout } = useCryptoCheckout();
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <a
        href="https://docs.d3.app/channel-partner-integrations/d3-embed"
        target="_blank"
        rel="noreferrer"
      >
        <img src={'https://d3.app/favicon.png'} className="logo" alt="Vite logo" />
      </a>
      <h2 style={{ fontWeight: 500 }}>D3 Marketplace Widget Demo</h2>
      <ConnectWallet />
      <D3Widget
        appName="Widget Test app"
        config={{
          appearance: d3WidgetAppearance,
          apiKey: d3ApiKey,
          showRecommendations: true,
          tlds: widgetTlds,
          apiEndpoint: d3ApiEndpoint,
          walletAddress: address,
          onPurchaseInit: handleCryptoCheckout,
          walletConfig: {
            walletConnectKey,
          },
        }}
      />
    </div>
  );
}

export default Widget;
