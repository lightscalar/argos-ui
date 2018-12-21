<template>

  <v-card class='text-sm-left'>
    <v-card-text>
      <h3>Map Details</h3>
    </v-card-text>
    <v-divider></v-divider>

    <v-list dense light>
      <v-list-tile>
        <v-list-tile-content>Start Time:</v-list-tile-content>
        <v-list-tile-content class="align-end grey--text text--darken-1">
          {{ map.start }}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>End Time:</v-list-tile-content>
        <v-list-tile-content class="align-end grey--text text--darken-1">
          {{ map.end }}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Altitude:</v-list-tile-content>
        <v-list-tile-content class="align-end grey--text text--darken-1">
          {{ map.altitude}} ft
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Latitude:</v-list-tile-content>
        <v-list-tile-content class="align-end grey--text text--darken-1">
          {{ map.lat }}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Longitude:</v-list-tile-content>
        <v-list-tile-content class="align-end grey--text text--darken-1">
          {{map.lon}}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Number of Images:</v-list-tile-content>
        <v-list-tile-content class="align-end grey--text text--darken-1">
          {{ map.nb_images}}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-card>

</template>

<script>
// import Component from "../component_location"

export default {

  components: {},

  props: ['map'],

  data () {
    return {
    }
  },

  watch: {

  },

  methods: {

  },

  computed: {

  },

  mounted () {
  }
}

</script>

<style>

</style>
