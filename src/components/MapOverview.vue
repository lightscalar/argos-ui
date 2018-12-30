<template>

  <div id='mapHolder'>
    <img
       id='currentMap'
       v-on:load='updateGroundTruth'
       class='map'
       :src='imageLocation(map.path_to_map)'>
  </div>

</template>

<script>
// import Component from "../component_location"

export default {
  components: {},

  props: ["map"],

  data() {
    return {
      selectedX: 0,
      selectedY: 0,
      imgHeight: 0,
      imgWidth: 0
    };
  },

  watch: {
    map: function() {
      this.updateGroundTruth();
      this.bindImageClick();
    },
    $route: function() {
      this.bindImageClick();
    }
  },

  methods: {
    bindImageClick() {
      $(document).unbind("click");
      $(document).bind("click", "#currentMap", this.imageClicked);
    },

    selectSite() {
      var site = {
        map_id: this.map.map_id,
        col_frac: this.selectedX / this.imgWidth,
        row_frac: this.selectedY / this.imgHeight
      };
      this.$store.dispatch("selectSite", site);
    },

    imageLocation(path_to_map) {
      console.log(path_to_map);
      return this.imageServerUrl + "/" + path_to_map;
    },

    updateGroundTruth() {
      $(".ground-truth").remove();
      var truths = this.truths;
      var width = $("#currentMap").width();
      var height = $("#currentMap").height();
      console.log("Height of image is: " + height);
      for (var k = 0; k < truths.length; k++) {
        var row = parseInt((truths[k].alpha * height));
        var col = parseInt((truths[k].beta * width));
        var id = col + "gt" + row;
        var div =
          "<div id=" +
          id +
          " class='ground-truth' style='cursor: pointer; pointer-events: auto'></div>";
        $("#mapHolder").append(div);
        $("#" + id).css({ "background-color": truths[k].color_code });
        $("#" + id).css({ position: "absolute" });
        $("#" + id).css({ "border-radius": "50%" });
        $("#" + id).css({ height: "10px" });
        $("#" + id).css({ width: "10px" });
        $("#" + id).css({ top: row - 5 });
        $("#" + id).css({ left: col - 5 });
      }
    },

    imageClicked(e) {
      console.log("Clicked that image, yeah.");
      if (e.pageX != undefined) {
        this.imgHeight = $("#currentMap").height();
        this.imgWidth = $("#currentMap").width();
        // Compensate for the image offset!!
        this.selectedX = e.pageX - $("#currentMap").offset().left;
        this.selectedY = e.pageY - $("#currentMap").offset().top;
        // Ensure we cannot annotate outside of the image.
        if (
          this.selectedX > 0 &&
          this.selectedX < this.imgWidth &&
          this.selectedY > 0 &&
          this.selectedY < this.imgHeight
        ) {
          this.selectSite();
          //  this.addTag();
        }
      }
    }
  },

  computed: {
    truths() {
      return this.$store.state.nearby_truth;
    },
    imageServerUrl() {
      return this.$store.state.imageServerUrl;
    },
  },

  mounted() {
    // debugger;
  }
};
</script>

<style scoped>
.map {
  max-width: 800px;
  max-height: 800px;
  cursor: pointer;
}
.ground-truth {
  cursor: pointer !important;
}
#mapHolder {
  position: relative;
  display: inline-block;
}
#currentMap {
  position: relative;
}
</style>
