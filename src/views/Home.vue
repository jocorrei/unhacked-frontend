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
        <v-btn variant="text" class="navButtons" @click="openProposalDialog"
          >Submit proposal</v-btn
        >
      </v-col>
      <v-col align="center">
        <v-btn class="connectButton" @click="connectWallet">
          {{
            selectedAccount
              ? selectedAccount.slice(0, 8) + "..."
              : "Connect Wallet"
          }}
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
    <v-row style="margin-top: 50px" v-if="selectedAccount">
      <v-col align="center" class="mb-0">
        <h3 class="description" style="color: white">Open Bounties</h3>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0" v-if="selectedAccount">
      <v-col class="ma-0 pa-0">
        <v-row
          class="tableCard"
          v-for="(bounty, index) in openBounties"
          :key="index"
          style="color: white"
        >
          <v-col align="center">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-row class="justify-center">
                  <v-col
                    @click="openDialog(bounty, index)"
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
                    @click="openDialog(bounty, index)"
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
                    @click="openDialog(bounty, index)"
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
                  Bounty proposals can receive multiple applications. It is the
                  protocol’s duty to do its research and accept which bounty is
                  legitimate. In the unlikely event that you accept a wrongful
                  bounty, you are receiving and sending money with actors not
                  involved in the hack. In this case, the origin of the funds
                  cannot be guaranteed.
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
              v-for="(proposal, index) in selectedBounty.proposals"
              :key="index"
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
                      :loading="settleLoading"
                      class="cardElements"
                      style="background-color: #c6c4c4"
                      @click="settleBounty(selectedBounty, index)"
                      >{{ spendCondition ? "Settle" : "Approve" }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog v-model="proposalDialog" max-width="60%">
        <div
          class="cardElements"
          style="
            background-color: #c6c4c4;
            align-self: center;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          "
        >
          <v-row>
            <v-col>
              <h3 class="description ml-1 mt-2">Create a proposal:</h3>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col>
              <v-text-field
                v-model="refundAddress"
                label="Address to refund when agreement is settled"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="refundAmount"
                label="Amount of the bounty"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="refundToken"
                label="Refund token address"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="refundTitle"
                label="Name of the organization"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea v-model="legalDescription" label="Legal Terms" />
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0" style="text-align-last: right">
            <v-col class="mb-2 pa-0">
              <v-btn
                :loading="proposalLoading"
                class="connectButton"
                style="font-size: 15px"
                @click="createProposal"
              >
                Create Proposal
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import ERC20ABI from "@/abi/ERC20abi.json";
  import UNHACKEDABI from "@/abi/UnhackedInsurance.json";
  import Web3 from "web3";
  import moment from "moment";
  export default {
    name: "HomeView",
    data: () => ({
      chainId: null,
      settleLoading: false,
      unhackedContract: UNHACKEDABI,
      erc20Contract: ERC20ABI,
      proposalLoading: false,
      proposalDialog: false,
      dialog: false,
      selectedBounty: {},
      refundTitle: "",
      refundAddress: "",
      refundAmount: "",
      refundToken: "",
      legalDescription: "",
      selectedAccount: "",
      spendCondition: false,
      unHackedAddress: {
        1: "0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498",
        43113: "0x5B85812dA1C35B29e10935551360C5daa6f80Dc4",
        100: "0xD7C9fb30A9719A37dB1b4a2981B8d562D8FBE55B",
      },
      openBounties: [],
    }),
    methods: {
      async createProposal() {
        this.proposalLoading = true;
        let provider = this.connectWallet();
        provider;
        const web3 = new Web3(window.ethereum);
        const unhacked = new web3.eth.Contract(
          this.unhackedContract.abi,
          this.unHackedAddress[`${this.chainId}`]
        );
        unhacked.methods
          .createBounty(
            this.refundAmount + "000000",
            this.refundToken,
            this.refundAddress,
            this.refundTitle,
            this.legalDescription
          )
          .send({ from: this.selectedAccount })
          .then(() => {
            let payload = {
              date: moment().format("L"),
              legalTerms: this.legalDescription,
              bounty: this.refundAmount + " USDC",
              protocol: this.refundTitle,
            };
            this.openBounties.push(payload);

            this.refundAmount = "";
            this.refundToken = "";
            this.refundAddress = "";
            this.refundTitle = "";
            this.legalDescription = "";

            this.proposalLoading = false;
            this.proposalDialog = false;
          });
      },
      openProposalDialog() {
        this.proposalDialog = true;
      },
      async connectWallet() {
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
          //Metamask is installed
          provider
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
              this.selectedAccount = accounts[0];
              let web3 = new Web3(window.ethereum);
              web3.eth.getChainId().then((r) => {
                this.chainId = r;
                if (this.openBounties.length === 0) {
                  const unhacked = new web3.eth.Contract(
                    this.unhackedContract.abi,
                    this.unHackedAddress[`${this.chainId}`]
                  );
                  unhacked.methods
                    .getBountyList()
                    .call()
                    .then((r) => {
                      r.forEach((bounty) => {
                        console.log(bounty);
                        let payload = {
                          legalTerms: bounty[6],
                          date: moment().format("L"),
                          protocol: bounty[5],
                          bounty: bounty[2].slice(0, -6) + " USDC",
                          paymentToken: bounty[3],
                        };
                        this.openBounties.push(payload);
                        console.log(payload);
                      });
                      console.log(r);
                    });
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return provider;
      },
      async settleBounty(bounty, index) {
        this.settleLoading = true;
        let provider = this.connectWallet();
        provider;
        let web3 = new Web3(window.ethereum);
        let erc20Address = bounty.proposals[index].address;
        let erc20 = new web3.eth.Contract(this.erc20Contract.abi, erc20Address);
        let unHacked = new web3.eth.Contract(
          this.unhackedContract.abi,
          this.unHackedAddress[`${this.chainId}`]
        );

        if (this.spendCondition == false) {
          erc20.methods
            .approve(
              this.unHackedAddress[`${this.chainId}`],
              bounty.proposals[index].amount + "000000"
            )
            .send({ from: this.selectedAccount })
            .then(() => {
              this.spendCondition = true;
              this.settleLoading = false;
            });
        } else {
          console.log("testing index", index);
          unHacked.methods
            .acceptBountyRequest(3, index)
            .send({ from: this.selectedAccount })
            .then(() => {
              this.settleLoading = false;
              this.dialog = false;
            });
        }
      },
      async openDialog(bounty, index) {
        let web3 = new Web3(window.ethereum);
        let unHacked = new web3.eth.Contract(
          this.unhackedContract.abi,
          this.unHackedAddress[`${this.chainId}`]
        );
        unHacked.methods
          .getBountyRequestList(index)
          .call()
          .then((r) => {
            if (r.lenght !== 0) {
              this.selectedBounty.proposals = [];
              this.selectedBounty.legalTerms = bounty.legalTerms;
              r.forEach((proposal) => {
                let payload = {
                  amount: proposal[1].slice(0, -6),
                  symbol: "USDC",
                  address: proposal[2],
                };
                this.selectedBounty.proposals.push(payload);
              });
              this.dialog = true;
            }
          })
          .finally(() => {
            console.log("end");
          });
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
