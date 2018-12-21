<template>

  <v-app id='application'>

    <v-toolbar app class='elevation-0' style='background-color: #008066'>
      <v-btn icon dark @click='toggleMenu'> <v-icon>menu</v-icon> </v-btn>

      <img src='./assets/logo@2x.png'
           @click='navigateTo("LandingPage")'
           height=60
           style='margin-left:32px; margin-top:0px; cursor: pointer'>
      <img src='./assets/2x/text-logo@2x.png' height=50 style='margin-left: 20px'/>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-chip
          v-if="$route.name=='image'"
          label
          slot='activator'
          @click.native='$store.commit("toggleLibrary")'
          v-bind:style="{backgroundColor: targetColor, color: textColor}">
          {{targetScientificName}}
        </v-chip>
        <span>Current annotation target—click to change</span>
      </v-tooltip>

        <v-btn
          v-if="annotationMode"
          @click.native='returnToMap()'>
          <v-icon left>navigation</v-icon>
          Map
        </v-btn>
        <v-btn
          primary
          v-if="$route.name=='map'"
          @click.native="$router.push({name: 'maps'})">
          <v-icon left>navigation</v-icon>
          Maps
        </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style='top:90px'
      >

      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://s.gravatar.com/avatar/aab3611bede0682b0e2272b6fcdd6aaa?s=80">
          </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>
          <h3>Matthew J. Lewis</h3>
        </v-list-tile-title>
      </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="navigateTo(item.routeName)"
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
    </v-content>
    <target-library></target-library>
  </v-app>

</template>

<script>
import TargetLibrary from "./components/TargetLibrary";
export default {
  components: { TargetLibrary },
  name: "App",

  watch: {
    $route() {
      $("#zoombox").remove();
      $(".zoomContainer").remove();
    }
  },

  data() {
    return {
      drawer: false,
      items: [
        { title: "Map Annotation", icon: "map", routeName: "maps" },
        { title: "Neural Network Training", icon: "device_hub" },
        { title: "Performance Evaluation", icon: "timeline" },
        { title: "Library", icon: "library_books", routeName: "library" },
        { title: "System Status", icon: "insert_chart" },
        { title: "Settings", icon: "settings" }
      ]
    };
  },

  methods: {
    toggleMenu() {
      this.drawer = !this.drawer;
    },

    colorMap(color) {
      if (color) {
        function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
              }
            : null;
        }
        var rgb = hexToRgb(color);
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;
        if (r * 0.299 + g * 0.587 + b * 0.114 > 127) {
          return "#000000";
        } else {
          return "#ffffff";
        }
      } else {
        return "#000000";
      }
    },

    navigateTo(routeName) {
      if (routeName == "library") {
        this.$store.commit("toggleLibrary");
        this.toggleMenu();
      } else {
        this.$router.push({ name: routeName });
      }
    },

    returnToMap() {
      router.push({
        name: "map",
        params: { mapId: this.$store.state.mapId }
      });
    }
  },

  computed: {
    annotationMode() {
      return this.$store.state.annotationMode;
    },
    targetScientificName() {
      return this.$store.state.target.scientific_name;
    },
    targetColor() {
      return this.$store.state.target.color_code;
    },
    textColor() {
      return this.colorMap(this.targetColor);
    }
  },

  mounted() {
    this.$store.dispatch("getTargets");
  }
};
</script>

<style>
html,
body {
  margin: 0;
  margin-top: -18px;
  background-color: #fafafa;
}
#application {
  text-align: center;
  margin-top: 10px;
  margin-bottom: -125px;
}
.logo {
  color: #ffffff;
  margin-left: 15px;
}
</style>
