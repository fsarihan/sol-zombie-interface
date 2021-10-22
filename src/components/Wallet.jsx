import React, {useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {
	getLedgerWallet,
	getPhantomWallet,
	getSlopeWallet,
	getSolflareWallet,
	getSolletExtensionWallet,
	getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import {
	WalletModalProvider,
	WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function Wallet() {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const wallets = useMemo(() => [
		getPhantomWallet(),
		getSlopeWallet(),
		getSolflareWallet(),
		getLedgerWallet(),
		getSolletWallet({network}),
		getSolletExtensionWallet({network}),
	], [network]);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} localStorageKey={'solZombie'}>
				<WalletModalProvider>
					<WalletMultiButton/>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};