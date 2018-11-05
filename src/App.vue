<template>

  <v-app id='app'>

    <v-toolbar app class='elevation-0' style='background-color: #008066'>

      <img src='./assets/logo@2x.png' height=100 style='margin-left:32px; margin-top:23px'>
      <h1 class='logo'>ARGOS | Automated RecoGnition Of Species</h1>
      <v-spacer></v-spacer>

      <!-- <h1 class='white--text'>Target Species { &nbsp; </h1> -->

      <v-tooltip bottom>
      <v-chip
        label
        @click.native="openLibrary"
        slot='activator'
        v-bind:style="{backgroundColor: codeColor, color: textColor}">
        Frangula Alnus
      </v-chip>
        <span>Current annotation species—click to change</span>
      </v-tooltip>

    </v-toolbar>



  <div id="app">
    <router-view/>
  </div>
  </v-app>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {margin: 0; height: 100%; overflow: hidden; margin-top:-18px}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.logo {
  color: #ffffff;
  margin-left: 15px;
}
.overlay: {
  opacity: 0.5;
  position: absolute;
  color: blue;
  left: 100px;
  top: 100px;
  width: 100px;
  height: 100px;
}
</style>
