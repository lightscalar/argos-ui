<template>

  <v-layout row justify-center>
    <v-dialog v-model="targetEditorIsOpen" persistent max-width="500px">
      <v-card>
        <v-card-title style='background-color: #008066; color=#ffffff'>
          <span v-if='editMode' class="headline" style='color: white'>Edit Target</span>
          <span v-else class="headline" style='color: white'>New Target</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  outline
                  :items="['Tree', 'Shrub', 'Graminoid', 'Forb', 'N/A']"
                  label="Plant Physiognomy"
                  required
                  v-model='target.physiognomy'
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  outline
                  :items='categories'
                  label="Category"
                  required
                  v-model='target.category'
                  ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Scientific Name"
                  hint="E.g., Phragmites australis subsp americanus"
                  outline
                  v-model='target.scientific_name'
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Common Name"
                  outline
                  v-model='target.common_name'
                  hint="E.g., Reed"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Target Code"
                  outline
                  v-model='target.codes'
                  hint="E.g., PA (note: case insensitive)">
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model='target.color_code'
                  outline
                  label='Annotation Color'>
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <input
                  style='height: 58px; width: 100%'
                  type='color'
                  value = '#ffcc33'
                  v-model='target.color_code'>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" flat @click.native="deleteTarget">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog()">Close</v-btn>
          <v-btn
            v-if='editMode'
            color="blue darken-1"
            flat
            @click.native="updateTarget">Update
          </v-btn>
          <v-btn
            v-else
            color="blue darken-1"
            flat
            @click.native="createTarget">Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// import Component from "../component_location"

export default {
  components: {},

  props: [],

  data() {
    return {
      categories: [
        "Native",
        "Invasive",
        "Biological Feature",
        "Physical Feature",
        "Animal Wildlife",
        "Man-made Feature"
      ]
    };
  },

  watch: {},

  methods: {
    closeDialog() {
      this.$store.commit('toggleEditor')
    },
    updateTarget () {
      this.$store.dispatch('updateTarget', this.target)
      this.$store.commit('toggleEditor')
    },
    createTarget() {
      this.target.codes = [this.target.codes]  // because codes is array
      this.$store.dispatch('createTarget', this.target)
      this.$store.commit('toggleEditor')
    },
    deleteTarget() {
      this.$store.dispatch('deleteTarget', this.target)
      this.$store.commit('toggleEditor')
    }
  },

  computed: {
    targetEditorIsOpen () {
      return this.$store.state.targetEditorIsOpen
    },
    target () {
      return this.$store.state.target
    },
    editMode () {
      return this.$store.state.editMode
    }
  },

  mounted() {}
};
</script>

<style>
</style>
