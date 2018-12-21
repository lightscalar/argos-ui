<template>

  <v-layout row>

    <v-flex>
      <img src='../assets/2x/logo-extended@2x.png' width='70%' class='splash'/>
    </v-flex>

  </v-layout>

</template>

<script>
// import Component from "../component_location"

export default {
  components: {},

  props: [],

  data() {
    return {};
  },

  watch: {},

  methods: {},

  computed: {},

  mounted() {
    window.scrollTo(0, 0);
    this.$store.commit("setAnnotationMode", false)
  }
};
</script>

<style>
h1 {
  font-weight: normal;
}
img.splash {
  border-style: solid;
  border-width: 1px;
  border-color: #008066;
  margin-top: 50px;
}
</style>
