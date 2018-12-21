<template>

  <v-card>
    <v-card-title>
      <h3>Ground Truth Present</h3>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class='text-sm-left'>
      <div v-for='truth in truths'>
        <v-chip
          @click='setTarget(truth.scientific_name)'
          :color='truth.color_code'>
          &nbsp;&nbsp;
        </v-chip>
        <a @click='setTarget(truth.scientific_name)'>
          <i>{{truth.scientific_name}}</i> ({{truth.common_name}})
        </a>
      </div>
    </v-card-text>
    <v-card-text v-if='truths.length==0'>
      <p>No Ground Truth in Image</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if='$route.name=="image"' >
      <v-switch
        :label="modeDescription"
        v-model="groundTruthMode"
        ></v-switch>
      <v-tooltip bottom>
      <v-btn
        slot='activator'
        icon
        @click.native='deleteLast'><v-icon>backspace</v-icon></v-btn>
      <span>Delete last annotation</span>
      </v-tooltip>
      <v-tooltip bottom>
      <v-btn
        icon
        slot='activator'
        @click.native='deleteAll'><v-icon>delete</v-icon></v-btn>
      <span>Delete all annotations for this image</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>

</template>

<script>
// import Component from "../component_location"

export default {
  components: {},

  props: ["truths"],

  data() {
    return {};
  },

  watch: {},

  methods: {
    setTarget(scientific_name) {
      console.log("Annotation target set to " + scientific_name);
      for (var i = 0; i < this.$store.state.targets.length; i++) {
        if (this.$store.state.targets[i].scientific_name == scientific_name) {
          this.$store.commit("setTarget", this.$store.state.targets[i]);
        }
      }
    },
    deleteAll() {
      console.log("Deleting all annotations.");
      this.$emit("delete");
    },
    deleteLast() {
      this.$emit("last");
    }
  },

  computed: {
    groundTruthMode: {
      get: function() {
        return this.$store.state.groundTruthMode;
      },
      set: function(value) {
        return this.$store.commit("setGroundTruthMode", value);
      }
    },
    modeDescription() {
      if (this.groundTruthMode) {
        return "Ground Truth Mode";
      } else {
        return "Image Annotation Mode";
      }
    },
    annotationMode() {
      return this.$store.state.annotationMode;
    }
  },

  mounted() {
    console.log(this.truths);
  }
};
</script>

<style>
</style>
