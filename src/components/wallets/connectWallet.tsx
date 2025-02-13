import { formatWalletAddress } from '../../lib/utils';
import EVMWalletButtons from './evmWalletButtons';
import { useWalletButtons } from './hooks/useWalletButtons';

export function ConnectWallet() {
  const { address } = useWalletButtons();

  return (
    <>
      {!address ? (
        <>
          <h1>Connect Wallet</h1>
          <EVMWalletButtons />
        </>
      ) : (
        <div>{formatWalletAddress(address)}</div>
      )}
    </>
  );
}
