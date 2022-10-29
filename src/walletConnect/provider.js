import WalletConnectProvider from "@walletconnect/web3-provider";
console.log(process.env.VUE_APP_INFURA_ID)
export const provider = new WalletConnectProvider({

  infuraId: process.env.VUE_APP_INFURA_ID,
});
