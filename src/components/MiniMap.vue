<template>

  <div id='mapHolder'>
    <img
      id='currentMap'
      class='map'
      :src='imageLocation(map.path_to_map)'>
  </div>

</template>

<script>
// import Component from "../component_location"

export default {
  components: {},

  props: ['map'],

  data() {
    return {};
  },

  watch: {},

  methods: {
    imageLocation(path_to_map) {
      return this.imageServerUrl + "/" + path_to_map;
    },
  },

  computed: {
    imageServerUrl() {
      return this.$store.state.imageServerUrl;
    },
  },

  mounted() {
    this.$store.dispatch('getMap', this.$store.state.mapId)
  }
};
</script>

<style scoped>
.map {
  max-width: 100%;
  max-height: 800px;
  cursor: pointer;
}
</style>
