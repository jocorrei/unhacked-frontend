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
        <v-btn class="connectButton"> Connect Wallet </v-btn>
      </v-col>
    </v-row>
    <v-row class="card">
      <v-col align="center" style="color: white">
        <v-row>
          <v-col align="center" style="align-self: center" cols="2">
            <v-img
              src="@/assets/unhacked_logo.png"
              :aspectRatio="16 / 9"
              class="img"
            ></v-img>
          </v-col>
          <v-col>
            <v-row>
              <v-col style="align-self: center">
                <v-row>
                  <v-col align="start">
                    <h1 class="title">UnHacked</h1>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col align="start" class="pt-0">
                    <h3>
                      A decentralized platform for hackers to settle disputes
                    </h3>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "HomeView",

    data: () => ({
      text: "",
    }),
    methods: {
      show(e) {
        console.log("emitted event", e);
      },
    },
  };
</script>

<style scoped>
  .img {
    background-color: white;
    border-radius: 23px;
    width: 200px;
    height: 130px;
  }
  .description {
  }

  .title {
    font-weight: 400;
    font-size: 100px;
    height: 130px;
  }
  .card {
    margin-left: 15%;
    margin-right: 15%;
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
