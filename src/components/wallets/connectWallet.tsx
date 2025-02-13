import { useConfig } from 'wagmi';
import { disconnect } from 'wagmi/actions';
import { formatWalletAddress } from '../../lib/utils';
import EVMWalletButtons from './evmWalletButtons';
import { useWalletButtons } from './hooks/useWalletButtons';

export function ConnectWallet() {
  const { address } = useWalletButtons();
  const WagmiConfig = useConfig();

  return (
    <>
      {!address ? (
        <div style={{ marginBottom: 20 }}>
          <h1>Connect Wallet</h1>
          <EVMWalletButtons />
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          {formatWalletAddress(address)}
          <button onClick={() => disconnect(WagmiConfig)}>Disconnect wallet</button>
        </div>
      )}
    </>
  );
}
