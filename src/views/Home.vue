<template>
  <div class="background" style="height: 120%; min-height: 100vh">
    <v-row>
      <v-col align="center">
        <v-btn variant="text" class="navButtons"> Submit proposal</v-btn>
      </v-col>
      <v-col align="center">
        <v-btn variant="text" class="navButtons"> Accept settlement</v-btn>
      </v-col>
      <v-col align="center">
        <v-btn variant="text" class="navButtons"> Mission & Vision </v-btn>
      </v-col >
      <v-col align="center"> <v-btn @click="connectWrapper"> {{state.status ? "Connected" : "Connect Wallet"}}</v-btn> </v-col>
    </v-row>
  </div>
</template>

<script>
  import connect from '../composables/connect/index';
  export default {
    name: "HomeView",
	setup: () => {
      const { connectWalletConnect, disconnectWallet, state } = connect();
      const connectUserWallet = async () => {
        await connectWalletConnect();
    };
    const disconnectUser = async() => {
      await disconnectWallet()
    }
    return {
      connectUserWallet,
      disconnectUser,
      state
      }
	},
    data: () => ({
      text: "",
    }),
	methods: {
		connectWrapper(){
			if (this.state.status == true)
				this.disconnectUser();
			else
				this.connectUserWallet();
		}
	}
  };
</script>

<style scoped>
  .navButtons {
    color: #ffffff;
    font-family: "Kosugi";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;

    line-height: 29px;
  }
  .background {
    background: linear-gradient(
      111.21deg,
      #000000 58.96%,
      rgba(0, 0, 0, 0.53) 108.36%
    );
  }
</style>
