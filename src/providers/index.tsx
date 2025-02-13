import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { wagmiConfig } from '../config/evmConfig';

const queryClient = new QueryClient();

function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppProviders;
