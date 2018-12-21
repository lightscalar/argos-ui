<template>

  <v-timeline align-top>
    <v-timeline-item
      v-for="(map, i) in mapList"
      color="grey darken-1"
      icon="map"
      :key="i"
      fill-dot
      >
      <span slot="opposite">
        <h1 style='color: #008066' class='display-2'>
          {{map.datetime}} at {{map.time}}
        </h1>
      </span>
      <v-card
        @click.native='visitMap(map)'
        color="grey darken-1"
        dark
        hover
        >
        <v-card-title class="title" >
          {{map.site.replace(/_/g, ' ').toUpperCase()}} — {{map.altitude}} ft
          <v-spacer></v-spacer>
        </v-card-title>
        <v-responsive style='background-color: white'>

          <v-container>
            <v-layout>
              <v-flex xs4 style='color: black' class='text-xs-left'>
                <map-details :map='map'></map-details>
              </v-flex>
              <v-flex xs8>
                <img :src='imageLocation(map.path_to_map)' class='map'>
              </v-flex>
            </v-layout>
          </v-container>

        </v-responsive>
      </v-card>
    </v-timeline-item>
  </v-timeline>

</template>

<script>
// import Component from "../component_location"
import MapDetails from "./MapDetails"

export default {
  components: {MapDetails},

  props: [],

  data() {
    return {};
  },

  watch: {},

  methods: {
    imageLocation(path_to_image) {
      return this.imageServerUrl + "/" + path_to_image;
    },
    visitMap(map) {
      this.$router.push({ name: "map", params: { mapId: map.map_id } });
    }
  },

  computed: {
    mapList() {
      return this.$store.state.mapList;
    },
    imageServerUrl() {
      return this.$store.state.imageServerUrl;
    }
  },

  mounted() {
    this.$store.dispatch("listMaps");
    window.scrollTo(0, 0);
    this.$store.commit("setPathToImage", 'cogs.gif') // clear the image
  }
};
</script>

<style scoped>
.map {
  max-width: 400px;
  max-height: 400px;
  cursor: pointer;
}
</style>
