<template>
  <v-layout row justify-center>
    <v-dialog v-model="libraryIsOpen"
              fullscreen
              transition="dialog-bottom-transition">
      <v-toolbar dark style='background-color: #008066'>
        <v-btn icon dark @click.native="closeLibrary">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title style=''>Target Library ({{targets.length}})</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn slot='activator'
                 @click.native='newTarget'
                 class='mr-1'
                 icon
                 style='background-color:#ffffff; color: #008066'>
            <v-icon>add</v-icon></v-btn>
          <span>Add a new target</span>
        </v-tooltip>
      </v-toolbar>
      <v-layout>
        <v-flex xs12 ma-3 elevation-2>
          <v-card>
            <v-card-title>
              <h3>
                Annotation Targets
              </h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                >
              </v-text-field>
            </v-card-title>
            <v-divider></v-divider>

              <v-data-table
                :headers="headers"
                :items="targets"
                :search="search"
                >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    <v-btn :style=
                    '{backgroundColor: props.item.color_code,
                    color: textColor(props.item.color_code)}'
                      @click='setTarget(props.item)'
                    style='min-width: 330px'>
                      {{ props.item.scientific_name }}
                    </v-btn>
                  </td>
                  <td class="text-xs-left">{{ props.item.common_name }}</td>
                  <td class="text-xs-left">{{ props.item.physiognomy }}</td>
                  <td class="text-xs-left">{{ props.item.category }}</td>
                  <td class="text-xs-left">{{ props.item.codes[0] }}</td>
                  <td class="text-xs-left">{{ props.item.color_code }}</td>
                  <td class="text-xs-left">
                    <v-btn icon @click.native='editTarget(props.item)'>
                      <v-icon>edit</v-icon></v-btn>
                  </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>

          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
    <edit-target></edit-target>
  </v-layout>

</template>

<script>
// import Component from "../component_location"
import EditTarget from "./EditTarget";

export default {
  components: { EditTarget },

  props: [],

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Scientific Name",
          value: "scientific_name",
          align: "left",
          sortable: true
        },
        {
          text: "Common Name",
          value: "common_name",
          align: "left",
          sortable: true
        },
        {
          text: "Physiognomy",
          value: "physiognomy",
          align: "left",
          sortable: true
        },
        {
          text: "Category",
          value: "category",
          align: "left",
          sortable: true
        },
        {
          text: "Target Code",
          value: "codes[0]",
          align: "left",
          sortable: true
        },
        {
          text: "Annotation Color",
          value: "color_code",
          align: "left",
          sortable: false
        },
        {
          text: "Edit Plant",
          value: "",
          align: "left",
          sortable: false
        }
      ]
    };
  },

  watch: {},

  methods: {
    newTarget() {
      var newTarget = {
        scientific_name: "",
        common_name: "",
        codes: [],
        color_code: "",
        physiognomy: "Forb",
        category: "Native"
      };
      this.$store.commit("setEditMode", false)
      this.$store.commit("setTarget", newTarget);
      this.$store.commit("toggleEditor");
    },
    closeLibrary() {
      this.$store.commit("toggleLibrary");
    },
    textColor(color) {
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

    setTarget(target) {
      this.$store.commit("setTarget", target);
      this.$store.commit("toggleLibrary");
    },

    editTarget(target) {
      this.setTarget(target);
      this.$store.commit('setEditMode', true)
      this.$store.commit("toggleEditor");
    }
  },

  computed: {
    targets() {
      return this.$store.state.targets;
    },

    libraryIsOpen() {
      return this.$store.state.libraryIsOpen;
    }
  },

  mounted() {
    this.$store.dispatch("getTargets");
  }
};
</script>

<style>
</style>
