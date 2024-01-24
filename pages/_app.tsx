import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
// @ts-ignore
import { toast } from 'react-hot-toast';
import { WalletConnectWallet, WalletConnectChainID } from '@tronweb3/walletconnect-tron';
// import {
//     BitKeepAdapter,
//     OkxWalletAdapter,
//     TokenPocketAdapter,
//     WalletConnectAdapter,
// } from '@tronweb3/tronwallet-adapters';
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
// import { AdaptersProvider } from './';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { useMemo } from 'react';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import { AdaptersProvider } from '../utils/AdaptersContext';
// import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';

export default function MyApp({ Component, pageProps }: AppProps) {
    function onError(e: WalletError) {
        if (e instanceof WalletNotFoundError) {
            toast.error(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            toast.error(e.message);
        } else toast.error(e.message);
    }
    const adapters = useMemo(function () {
        const tronLinkAdapter = new TronLinkAdapter();
        // const ledger = new LedgerAdapter({
        //     accountNumber: 2,
        // });
        const walletConnectAdapter = new WalletConnectAdapter({
            network: "Mainnet",
            options: {
                relayUrl: 'wss://relay.walletconnect.com',
                projectId: 'b18ee0b3771d68564f8f5639949941e5',
                metadata: {
                    name: 'Tron Grace',
                    description: 'Tron Grace WalletConnect',
                    url: 'https://tronwealth.online/',
                    icons: ['https://tronwealth.online/logo.png']
                }
            },
            web3ModalConfig: {
                themeMode: 'dark',
                themeVariables: {
                    '--w3m-z-index': '1000',
                },
            },
        });
        // const bitKeepAdapter = new BitKeepAdapter();
        // const tokenPocketAdapter = new TokenPocketAdapter();
        // const okxwalletAdapter = new OkxWalletAdapter();
        return [tronLinkAdapter,
            //  bitKeepAdapter, tokenPocketAdapter, okxwalletAdapter,
            walletConnectAdapter,
            //  ledger
        ];
    }, []);

    /**
     * wrap your app content with WalletProvider and WalletModalProvider
     * WalletProvider provide some useful properties and methods
     * WalletModalProvider provide a Modal in which you can select wallet you want use.
     *
     * Also you can provide a onError callback to process any error such as ConnectionError
     */
    return (
        <AdaptersProvider adapters={adapters}>
            <WalletProvider onError={onError} adapters={adapters} disableAutoConnectOnLoad={true}>
                <WalletModalProvider>
                    <Component {...pageProps} />
                </WalletModalProvider>
            </WalletProvider>
        </AdaptersProvider>
    );
}
