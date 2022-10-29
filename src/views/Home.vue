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
      <v-col align="center"> <v-btn>Connect Wallet</v-btn> </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "HomeView",

    data: () => ({
      text: "",
    }),
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
