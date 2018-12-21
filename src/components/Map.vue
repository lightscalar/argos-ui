<template>

  <v-layout fluid>
    <v-flex xs8 ma-3>
      <v-card class='elevation-3'>
        <v-card-title>
          <h3>
            {{map.site.replace(/_/g, ' ').toUpperCase()}} — {{map.altitude}} ft
          </h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-responsive>
          <map-overview  :map='map' :truths='nearby_truth'></map-overview>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs4 ma-3>
      <ground-truth :truths='unique_truth'></ground-truth>
      <br>
      <map-details :map='map'></map-details>
    </v-flex>
  </v-layout>


</template>

<script>
// import Component from "../component_location"
import MapDetails from "./MapDetails";
import GroundTruth from "./GroundTruth";
import MapOverview from "./MapOverview";

export default {
  components: { MapDetails, GroundTruth, MapOverview },

  props: ["mapId"],

  data() {
    return {};
  },

  watch: {},

  methods: {
    imageLocation(path_to_image) {
      return this.imageServerUrl + "/" + path_to_image;
    }
  },

  computed: {
    map() {
      return this.$store.state.map;
    },
    unique_truth() {
      return this.$store.state.unique_truth;
    },
    nearby_truth() {
      return this.$store.state.nearby_truth;
    },
    imageServerUrl() {
      return this.$store.state.imageServerUrl;
    }
  },

  mounted() {
    console.log('Map Mounted...')
    $('#image').off()
    $('#image').unbind()
    window.scrollTo(0, 0);
    this.$store.dispatch("getMap", this.mapId);
    console.log('Mounted Map.')
    this.$store.commit("setAnnotationMode", false)
    this.$store.commit("setPathToImage", 'cogs.gif')
  }
};
</script>

<style scoped>
.map {
  max-height: 800px;
  cursor: pointer;
}
</style>
