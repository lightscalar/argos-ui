<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs9 pa-2 >
        <div id="imageHolder">
          <img
            id='image'
            v-on:load='addZoom'
            class='image'
            :src='imageLocation'>
        </div>
      </v-flex>

      <v-flex xs3>
        <ground-truth
          v-on:delete='deleteAll'
          v-on:last='deleteLast'
          :truths='uniqueTruths'></ground-truth>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
// import Component from "../component_location"
import GroundTruth from "./GroundTruth";

export default {
  components: { GroundTruth },

  props: ["imageId"],

  data() {
    return { boxWidth: 50 };
  },

  watch: {
    nearbyTruths: function() {
      this.updateGroundTruth();
      this.updateAnnotations();
    },
    annotations: function() {
      this.updateAnnotations();
      this.updateGroundTruth();
    },
    imageLocation: function() {
      this.updateAnnotations();
      this.updateGroundTruth();
    },
    colorMap: function() {
      this.updateAnnotations();
    }
  },

  methods: {
    deleteAll() {
      if (this.groundTruthMode) {
        this.$store.dispatch("deleteGroundTruth", this.imageId);
        $(".post-field-truth").remove();
      } else {
        this.$store.dispatch("deleteAnnotations", this.imageId);
        $(".annotation").remove();
      }
    },
    deleteLast() {
      if (this.annotations.length > 0) {
        var annotation = this.annotations.pop();
        $("#" + annotation.element_id).remove();
        this.$store.dispatch("deleteAnnotation", annotation.annotation_id);
      }
    },
    addZoom() {
      var imageArr = this.imageLocation.split("/");
      if (imageArr[imageArr.length - 1] != "cogs.gif") {
        $("#image").elevateZoom({
          scrollZoom: true,
          tint: true,
          tintOpacity: 0.1
        });
        $(document).unbind("click");
        $(document).bind("click", "#zoomPicture", this.imageClicked);
      }
      this.updateGroundTruth();
      this.updateAnnotations();
    },

    imageClicked(e) {
      if (e.pageX != undefined) {
        var imgHeight = $("#image").height();
        var imgWidth = $("#image").width();
        // Compensate for the image offset!!
        this.selectedX = e.pageX - $("#image").offset().left;
        this.selectedY = e.pageY - $("#image").offset().top;
        // Ensure we cannot annotate outside of the image.
        if (
          this.selectedX > 0 &&
          this.selectedX < imgWidth &&
          this.selectedY > 0 &&
          this.selectedY < imgHeight
        ) {
          if (this.groundTruthMode) {
            this.addGroundTruth();
          } else {
            this.addAnnotation();
          }
        }
      }
    },

    addGroundTruth() {
      // Add a ground truth annotation.
      var imgHeight = $("#image").height();
      var imgWidth = $("#image").width();
      var truth = {};
      truth.alpha = this.selectedY / imgHeight;
      truth.beta = this.selectedX / imgWidth;
      truth.code = this.target.codes[0];
      truth.color_code = this.target.color_code;
      truth.scientific_name = this.target.scientific_name;
      truth.image_id = this.imageId;
      this.$store.dispatch("createGroundTruth", truth);
      this.plotGroundTruth(truth);
    },

    addAnnotation() {
      var imgHeight = $("#image").height();
      var imgWidth = $("#image").width();
      var id = parseInt(this.selectedX) + "-" + this.selectedY;
      $("#imageHolder").append("<div id=" + id + ' class="annotation"></div>');
      $("#" + id).css({ "background-color": this.target.color_code });
      $("#" + id).css({ opacity: 0.5 });
      $("#" + id).css({ position: "absolute" });
      $("#" + id).css({
        top: this.selectedY - this.boxWidth / 2,
        left: this.selectedX - this.boxWidth / 2
      });
      $("#" + id).css({ width: this.boxWidth, height: this.boxWidth });
      var elementId =
        parseInt((this.selectedX / imgWidth) * 10000) +
        "-" +
        parseInt((this.selectedY / imgHeight) * 10000);
      var annotateId = this.imageId + "-" + elementId;
      var annotation = {
        beta: this.selectedX / imgWidth,
        alpha: this.selectedY / imgHeight,
        scientific_name: this.$store.state.target.scientific_name,
        annotation_id: annotateId,
        element_id: elementId,
        tile_id: this.imageId
      };
      // this.annotations.push(annotation);
      this.$store.dispatch("saveAnnotation", annotation);
      // this.updateAnnotations()
    },

    updateAnnotations() {
      //$(".annotations").remove();
      for (var i = 0; i < this.annotations.length; i++) {
        this.plotAnnotation(this.annotations[i]);
      }
    },

    plotAnnotation(annotation) {
      var elementId = annotation.element_id;
      var color = this.colorMap[annotation.scientific_name];
      var imgHeight = $("#image").height();
      var imgWidth = $("#image").width();
      var row = annotation.alpha * imgHeight;
      var col = annotation.beta * imgWidth;
      $("#imageHolder").append(
        "<div id=" + elementId + ' class="annotation"></div>'
      );
      $("#" + elementId).css({ "background-color": color });
      $("#" + elementId).css({ opacity: 0.5 });
      $("#" + elementId).css({ position: "absolute" });
      $("#" + elementId).css({
        top: row - this.boxWidth / 2,
        left: col - this.boxWidth / 2
      });
      $("#" + elementId).css({ width: this.boxWidth, height: this.boxWidth });
    },

    plotGroundTruth(truth) {
      var width = $("#image").width();
      var height = $("#image").height();
      var row = parseInt(truth.alpha * height);
      var col = parseInt(truth.beta * width);
      var id = col + "gt" + row;
      var div =
        "<div id=" +
        id +
        " class='ground-truth' style='cursor: pointer; pointer-events: auto'></div>";
      $("#imageHolder").append(div);
      $("#" + id).css({ "background-color": truth.color_code });
      $("#" + id).css({ position: "absolute" });
      if (truth.type == "field_collection") {
        var radius = "50%"; // circles for field-collected truth
      } else {
        var radius = "0%"; // squares for post-field truth
        $("#" + id).addClass("post-field-truth");
      }
      $("#" + id).css({ "border-radius": radius });
      $("#" + id).css({ height: "18px" });
      $("#" + id).css({ width: "18px" });
      $("#" + id).css({ top: row - 9 });
      $("#" + id).css({ left: col - 9 });
    },

    updateGroundTruth() {
      $(".ground-truth").remove();
      var truths = this.nearbyTruths;
      for (var k = 0; k < truths.length; k++) {
        this.plotGroundTruth(truths[k]);
      }
    }
  },

  computed: {
    groundTruthMode() {
      return this.$store.state.groundTruthMode;
    },
    uniqueTruths() {
      return this.$store.state.unique_truth_image;
    },
    nearbyTruths() {
      return this.$store.state.nearby_truth_image;
    },
    imageLocation() {
      return (
        this.$store.state.imageServerUrl + "/" + this.$store.state.path_to_image
      );
    },
    colorMap() {
      return this.$store.state.colorMap;
    },
    target() {
      return this.$store.state.target;
    },
    annotations() {
      return this.$store.state.annotations;
    }
  },

  mounted() {
    this.$store.commit("setAnnotations", []);
    window.scrollTo(0, 0);
    this.$store.dispatch("getImage", this.imageId);
    this.$store.commit("setAnnotationMode", true);
    this.$store.dispatch("getAnnotations", this.imageId);
    $(".ground-truth").remove();
  }
};
</script>

<style>
.image {
  max-width: 100%;
  max-height: 800px;
}
#zoombox: {
  position: relative;
}
#imageHolder {
  position: relative;
  display: inline-block;
}
.lay: {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 100px;
  height: 100px;
  background-color: red;
}
.annotation {
}
</style>
