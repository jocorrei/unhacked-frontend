<template>
  <v-app>
    <v-main>
      <HomeView/>
    </v-main>
  </v-app>
</template>

<script>
import HomeView from '@/views/Home.vue'
import connect from './composables/connect/index';
import {onMounted} from "vue";

export default {
  name: 'App',

  components: {
    HomeView,
  },
  setup: () => {
    const { autoConnect} = connect();
     onMounted(async () => {
      await autoConnect()
    })
  },
  data: () => ({
    //
  }),
}
</script>
