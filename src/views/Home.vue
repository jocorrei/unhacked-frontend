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
      </v-col>
      <v-col align="center">
        <v-btn class="connectButton"  @click="connectWrapper"> {{state.status ? "Connected" : "Connect Wallet"}} </v-btn>
      </v-col>
    </v-row>
    <v-row class="card">
      <v-col align="center" style="color: white">
        <v-row>
          <v-col
            align="center"
            style="align-self: center"
            cols="2"
            class="pa-0"
          >
            <v-img
              src="@/assets/unhacked_logo.jpeg"
              :aspectRatio="16 / 9"
              class="img"
            ></v-img>
          </v-col>
          <v-col>
            <v-row class="mb-3">
              <v-col style="align-self: center">
                <v-row>
                  <v-col align="start">
                    <h1 class="title">UnHacked</h1>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col align="start" class="pt-0">
                    <h3 class="description ml-1">
                      Turning Black Hats into White Hats
                    </h3>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row style="margin-top: 50px">
      <v-col align="center" class="mb-0">
        <h3 class="description" style="color: white">Open Bounties</h3>
      </v-col>
    </v-row>
    <v-row
      class="tableCard"
      v-for="bounty in openBounties"
      :key="bounty.protocol"
      style="color: white"
    >
      <v-col align="center">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-row class="justify-center">
              <v-col
                cols="1"
                class="cardElements"
                v-bind="props"
                :style="
                  isHovering
                    ? 'background-color: #c6c4c4; cursor: pointer'
                    : 'background-color: #d9d9d9;'
                "
              >
                {{ bounty.date }}
              </v-col>
              <div style="width: 15px"></div>
              <v-col
                align="start"
                cols="3"
                class="cardElements"
                v-bind="props"
                :style="
                  isHovering
                    ? 'background-color: #c6c4c4; cursor: pointer'
                    : 'background-color: #d9d9d9;'
                "
              >
                {{ bounty.protocol }}
              </v-col>
              <div style="width: 15px"></div>
              <v-col
                cols="1"
                class="cardElements"
                v-bind="props"
                :style="
                  isHovering
                    ? 'background-color: #c6c4c4; cursor: pointer'
                    : 'background-color: #d9d9d9;'
                "
              >
                {{ bounty.bounty }}
              </v-col>
            </v-row>
          </template>
        </v-hover>
      </v-col>
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
      openBounties: [
        {
          date: "25/10/22",
          protocol: "Ape Factory DeFi",
          bounty: "100 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
        },
        {
          date: "29/10/22",
          protocol: "Cow DEX",
          bounty: "25 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
        },
        {
          date: "02/10/22",
          protocol: "Cow DEX",
          bounty: "10 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
        },
        {
          date: "02/10/22",
          protocol: "Sushi DAO",
          bounty: "30 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
        },
      ],
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
  .hover {
    background-color: #c6c4c4;
  }
  .cardElements {
    font-size: 15px;
    font-family: "Kosugi";
    font-style: normal;
    background-color: #d9d9d9;
    border: 2px solid #27ae3d;
    border-radius: 8px;
    border-color: #27ae3d;
    color: black;
  }
  .img {
    background-color: white;
    border-radius: 23px;
    width: 200px;
    height: 130px;
  }
  .description {
    font-size: 15px;
    font-family: "Kosugi";
    font-style: normal;
  }

  .title {
    font-weight: 400;
    font-size: 100px;
    height: 130px;
    font-family: "Kosugi";
    font-style: normal;
  }
  .card {
    margin-top: 7%;
    margin-left: 30%;
    margin-right: 15%;
  }

  .tableCard {
    margin-top: 2%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .connectButton {
    border: 2px solid #27ae3d;
    border-radius: 8px;
    border-color: #27ae3d;
    margin-top: 12px;
    background-color: #d9d9d9;
    color: black;
    font-family: "Kosugi";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
  }
  .navButtons {
    margin-top: 10px;
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
