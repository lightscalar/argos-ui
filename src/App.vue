<template>

  <v-app id='app'>

    <v-toolbar app class='elevation-0' style='background-color: #008066'>
      <v-btn icon dark @click='toggleMenu'> <v-icon>menu</v-icon> </v-btn>

      <img src='./assets/logo@2x.png'
           @click='toggleMenu'
           height=68
           style='margin-left:32px; margin-top:-4px; cursor: pointer'>
      <h1 class='logo' >ARGOS | Automated RecoGnition Of Species</h1>
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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style='top:90px'
      >
      <v-list class="pa-1">
        <v-list-tile avatar>

          <v-list-tile-content>
            <v-list-tile-title><h2>Available Options</h2></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click=""
          >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-footer app style='background-color: #008066; height:40px'>
        <small class='white--text' style='margin-left:55px; margin-top: 3px'>
          Copyright 2018, Michigan Aerospace Corporatation. Ann Arbor, MI.
        </small>
      </v-footer>
    </v-content>
  </v-app>

</template>

<script>
export default {
  name: "App",
  data() {
    return {
      codeColor: "#f3f3f3",
      textColor: "#000000",
      drawer: true,
      items: [
        { title: "Map Annotation", icon: "map" },
        { title: "Neural Network Training", icon: "device_hub" },
        { title: "Performance Evaluation", icon: "timeline" },
        { title: "Library", icon: "library_books" }
      ]
    };
  },
  methods: {
    toggleMenu() {
      console.log("Toggling the menu.");
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  margin-top: -18px;
}
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
