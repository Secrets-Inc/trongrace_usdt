import { WalletConnectWallet, WalletConnectChainID } from '@tronweb3/walletconnect-tron';
const wallet = new WalletConnectWallet({
  network: WalletConnectChainID.Mainnet,
  options: {
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: '....',
    metadata: {
      name: 'Your dapp name',
      description: 'Your dapp description',
      url: 'your dapp url',
      icons: ['your dapp icon']
    }
  },
  web3ModalConfig: {
    themeMode: 'dark',
    // themeVariables: {
    //   '--w3m-z-index': 1000
    // },
    /**
     * Recommended Wallets are fetched from WalletConnect explore api:
     * https://walletconnect.com/explorer?type=wallet&version=2.
     * You can copy these ids from the page.
     */ 
    explorerRecommendedWalletIds: [
      '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
      '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
    ]
  }
});