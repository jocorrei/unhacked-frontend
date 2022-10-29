<template>
  <div class="background" style="height: 120%; min-height: 100vh">
    <v-row>
      <v-col align="center">
        <v-btn variant="text" class="navButtons"> FAQ </v-btn>
      </v-col>
      <v-col align="center">
        <v-btn variant="text" class="navButtons"> Mission & Vision </v-btn>
      </v-col>
      <v-col align="center">
        <v-btn variant="text" class="navButtons">Submit proposal</v-btn>
      </v-col>
      <v-col align="center">
        <v-btn class="connectButton" @click="connectWrapper">
          {{ state.status ? state.address : "Connect Wallet" }}
        </v-btn>
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
                @click="openDialog(bounty)"
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
                @click="openDialog(bounty)"
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
                @click="openDialog(bounty)"
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

    <div class="text-center">
      <v-dialog v-model="dialog" max-width="60%">
        <v-carousel
          height="400"
          hide-delimiter-background
          show-arrows="hover"
          class="cardElements"
          hide-delimiters
        >
          <v-carousel-item cover>
            <v-row>
              <v-col>
                <v-row class="ml-2 mt-1">
                  <v-col>
                    <h3>Agreement Terms:</h3>
                  </v-col>
                </v-row>
                <v-row class="ml-1 mr-1">
                  <v-col>
                    {{ selectedBounty.legalTerms }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item cover>
            <v-row class="justify-center ml-8 mt-2 mb-0">
              <v-col>
                <h3 class="description">Disclamer:</h3>
              </v-col>
            </v-row>
            <v-row class="justify-center ml-8">
              <v-col class="pt-0">
                <p class="description">
                  It's reponsability of the proposal creator to verify the
                  address before settle the agreement
                </p>
              </v-col>
            </v-row>
            <v-row class="justify-content ml-8 mt-4">
              <v-col>
                <h2 class="description">
                  Open proposals for {{ selectedBounty.protocol }}:
                </h2>
              </v-col>
            </v-row>
            <v-row
              class="tableCard"
              v-for="proposal in selectedBounty.proposals"
              :key="proposal.id"
            >
              <v-col align="center">
                <v-row class="justify-center">
                  <v-col
                    class="cardElements"
                    style="background-color: #c6c4c4; align-self: center"
                  >
                    {{ proposal.address }}</v-col
                  >
                  <v-col
                    class="cardElements ml-1"
                    cols="1"
                    style="background-color: #c6c4c4; align-self: center"
                  >
                    {{ proposal.symbol }}
                  </v-col>
                  <v-col
                    class="cardElements ml-1"
                    cols="1"
                    style="background-color: #c6c4c4; align-self: center"
                  >
                    {{ proposal.amount }}
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      class="cardElements"
                      style="background-color: #c6c4c4"
                      @click="settleBounty(bounty)"
                      >Settle</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import connect from "../composables/connect/index";
  export default {
    name: "HomeView",
    setup: () => {
      const { connectWalletConnect, disconnectWallet, state } = connect();
      const connectUserWallet = async () => {
        await connectWalletConnect();
      };
      const disconnectUser = async () => {
        await disconnectWallet();
      };
      return {
        connectUserWallet,
        disconnectUser,
        state,
      };
    },
    data: () => ({
      dialog: false,
      selectedBounty: {},
      openBounties: [
        {
          date: "25/10/22",
          protocol: "Ape Factory DeFi",
          bounty: "100 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          creatorAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          id: 1,
          legalTerms:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ex augue, suscipit ut congue sit amet, iaculis sed augue. In fringilla in odio cursus tristique. Etiam venenatis finibus arcu, sed fermentum leo. Phasellus id finibus mi. Nulla leo eros, rhoncus vel commodo sed, sollicitudin nec quam. Mauris ut nibh eros. Phasellus vitae dignissim felis. Vestibulum eu eleifend nibh.Integer consequat vehicula justo nec tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin facilisis imperdiet neque in hendrerit. Donec finibus lectus ac dolor facilisis scelerisque. Aliquam mattis nisl enim, sit amet mollis sapien tincidunt at. Duis elementum vitae nisi et pretium. Integer feugiat mauris non tristique lobortis.Vivamus ac tellus sed ligula accumsan dictum at at diam. Nulla sit amet massa eget nisl eleifend mattis in in augue. Duis eget accumsan risus. Quisque ac quam id tellus vulputate laoreet sed a risus. Aliquam sed diam purus. Maecenas in lacus pharetra, sagittis leo at, fringilla leo. Praesent vestibulum, odio ut hendrerit semper, arcu felis facilisis dolor, vel pretium dolor nulla sagittis urna. Donec consequat vehicula ante, non semper dui scelerisque vel. Sed ut magna eu quam tristique mattis. Cras facilisis pulvinar fringilla. Pellentesque placerat diam ut justo pharetra convallis.",
          proposals: [
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WETH",
              amount: 33,
              id: 1,
            },
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WBTC",
              amount: 2,
              id: 2,
            },
          ],
        },
        {
          date: "29/10/22",
          protocol: "Cow DEX",
          bounty: "25 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          creatorAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          id: 2,
          legalTerms:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ex augue, suscipit ut congue sit amet, iaculis sed augue. In fringilla in odio cursus tristique. Etiam venenatis finibus arcu, sed fermentum leo. Phasellus id finibus mi. Nulla leo eros, rhoncus vel commodo sed, sollicitudin nec quam. Mauris ut nibh eros. Phasellus vitae dignissim felis. Vestibulum eu eleifend nibh.Integer consequat vehicula justo nec tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin facilisis imperdiet neque in hendrerit. Donec finibus lectus ac dolor facilisis scelerisque. Aliquam mattis nisl enim, sit amet mollis sapien tincidunt at. Duis elementum vitae nisi et pretium. Integer feugiat mauris non tristique lobortis.Vivamus ac tellus sed ligula accumsan dictum at at diam. Nulla sit amet massa eget nisl eleifend mattis in in augue. Duis eget accumsan risus. Quisque ac quam id tellus vulputate laoreet sed a risus. Aliquam sed diam purus. Maecenas in lacus pharetra, sagittis leo at, fringilla leo. Praesent vestibulum, odio ut hendrerit semper, arcu felis facilisis dolor, vel pretium dolor nulla sagittis urna. Donec consequat vehicula ante, non semper dui scelerisque vel. Sed ut magna eu quam tristique mattis. Cras facilisis pulvinar fringilla. Pellentesque placerat diam ut justo pharetra convallis.",
          proposals: [
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WETH",
              amount: 33,
              id: 1,
            },
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WBTC",
              amount: 2,
              id: 2,
            },
          ],
        },
        {
          date: "02/10/22",
          protocol: "Cow DEX",
          bounty: "10 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          creatorAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          id: 3,
          legalTerms:
            "Lorem <br/> ipsum dolor sit amet, consectetur adipiscing elit. Fusce ex augue, suscipit ut congue sit amet, iaculis sed augue. In fringilla in odio cursus tristique. Etiam venenatis finibus arcu, sed fermentum leo. Phasellus id finibus mi. Nulla leo eros, rhoncus vel commodo sed, sollicitudin nec quam. Mauris ut nibh eros. Phasellus vitae dignissim felis. Vestibulum eu eleifend nibh.Integer consequat vehicula justo nec tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin facilisis imperdiet neque in hendrerit. Donec finibus lectus ac dolor facilisis scelerisque. Aliquam mattis nisl enim, sit amet mollis sapien tincidunt at. Duis elementum vitae nisi et pretium. Integer feugiat mauris non tristique lobortis.Vivamus ac tellus sed ligula accumsan dictum at at diam. Nulla sit amet massa eget nisl eleifend mattis in in augue. Duis eget accumsan risus. Quisque ac quam id tellus vulputate laoreet sed a risus. Aliquam sed diam purus. Maecenas in lacus pharetra, sagittis leo at, fringilla leo. Praesent vestibulum, odio ut hendrerit semper, arcu felis facilisis dolor, vel pretium dolor nulla sagittis urna. Donec consequat vehicula ante, non semper dui scelerisque vel. Sed ut magna eu quam tristique mattis. Cras facilisis pulvinar fringilla. Pellentesque placerat diam ut justo pharetra convallis.",
          proposals: [
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WETH",
              amount: 33,
              id: 1,
            },
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WETH",
              amount: 33,
              id: 2,
            },
          ],
        },
        {
          date: "02/10/22",
          protocol: "Sushi DAO",
          bounty: "30 ETH",
          contractAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          creatorAddress: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
          id: 4,
          legalTerms:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ex augue, suscipit ut congue sit amet, iaculis sed augue. In fringilla in odio cursus tristique. Etiam venenatis finibus arcu, sed fermentum leo. Phasellus id finibus mi. Nulla leo eros, rhoncus vel commodo sed, sollicitudin nec quam. Mauris ut nibh eros. Phasellus vitae dignissim felis. Vestibulum eu eleifend nibh.Integer consequat vehicula justo nec tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin facilisis imperdiet neque in hendrerit. Donec finibus lectus ac dolor facilisis scelerisque. Aliquam mattis nisl enim, sit amet mollis sapien tincidunt at. Duis elementum vitae nisi et pretium. Integer feugiat mauris non tristique lobortis.Vivamus ac tellus sed ligula accumsan dictum at at diam. Nulla sit amet massa eget nisl eleifend mattis in in augue. Duis eget accumsan risus. Quisque ac quam id tellus vulputate laoreet sed a risus. Aliquam sed diam purus. Maecenas in lacus pharetra, sagittis leo at, fringilla leo. Praesent vestibulum, odio ut hendrerit semper, arcu felis facilisis dolor, vel pretium dolor nulla sagittis urna. Donec consequat vehicula ante, non semper dui scelerisque vel. Sed ut magna eu quam tristique mattis. Cras facilisis pulvinar fringilla. Pellentesque placerat diam ut justo pharetra convallis.",
          proposals: [
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WETH",
              amount: 33,
              id: 1,
            },
            {
              address: "0xACDB303129dD772DCd717bf75b8667A06C00089A",
              symbol: "WBTC",
              amount: 2,
              id: 2,
            },
          ],
        },
      ],
    }),
    methods: {
      settleBounty(bounty) {
        bounty;
        let provider = window.ethereum;
        console.log("testing provider", provider);

      },
      openDialog(bounty) {
        this.selectedBounty = bounty;
        this.dialog = true;
      },
      connectWrapper() {
        if (this.state.status == true) this.disconnectUser();
        else this.connectUserWallet();
      },
    },
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
