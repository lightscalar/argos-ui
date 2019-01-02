import Vue from "vue";
import Vuex from "vuex";
import api from "../api/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Lists
    mapList: [],
    imageList: [],
    targets: [],
    annotations: [],
    colorMap: {},

    // Map stuff.
    map: {
      site: "",
      // path_to_map: "2018/08/03/st_johns_marsh/66/maps/map_small.jpg"
      path_to_map: "cogs.gif"
    },
    mapId: "",
    imageId: "",
    target: {
      scientific_name: "Frangula alnus",
      color_code: "#95d0fc",
      common_name: "Glossy Buckthorn",
      category: "Invasive",
      physiognomy: "Shrub",
      codes: ["FA"]
    },
    targetScientificName: "Frangula alnus",
    targetColor: "#95d0fc",
    nearby_truth: [],
    unique_truth: [],
    nearby_truth_image: [],
    unique_truth_image: [],
    path_to_image: "cogs.gif",
    ref_image_rows: 0,
    ref_image_cols: 0,

    // Modal control variables.
    annotationMode: false,
    groundTruthMode: false,
    libraryIsOpen: false,
    targetEditorIsOpen: false,
    editMode: true,

    // Species variables.
    imageLocation: "",
    imageServerUrl: process.env.IMAGE_API,

    // Image details.
    latitude: 0,
    longitude: 0,
    altitude: 0,
    orientation: 0,

    // emptySpecies: JSON.parse(JSON.stringify(emptySpecies)),
    // emptyPlant: $.extend(true, {}, emptySpecies),
    targetPlantName: "Click Here to Set Plant Species",
    annotationColor: "#f3f3f3",

    plantList: [],

    plantsByStructure: {
      tree: [],
      shrub: [],
      graminoid: [],
      forb: []
    },

    // Flight data/images/etc.
    imageList: [],
    image: { ground_truth: [] },
    colorMap: {},

    // Sample images.
    sampleImages: []
  },

  mutations: {
    setGroundTruthMode(state, value) {
      state.groundTruthMode = value;
    },

    setMapList(state, maps) {
      state.mapList = maps;
    },

    setMap(state, map) {
      state.map = map.map;
      state.mapId = map.map_id;
      state.nearby_truth = map.truth.nearby;
      state.unique_truth = map.truth.unique;
    },

    setImageList(state, tileList) {
      state.imageList = tileList;
      router.push({ name: "image", params: { imageId: tileList[0] } });
    },

    setImage(state, tilePackage) {
      console.log(tilePackage.truth);
      state.nearby_truth_image = tilePackage.truth.nearby;
      state.unique_truth_image = tilePackage.truth.unique;
      state.path_to_image = tilePackage.tile.path_to_tile;
      state.imageId = tilePackage.tile.tile_id;
      state.mapId = tilePackage.tile.map_id;
    },

    setNewImage(state, tilePackage) {
      state.nearby_truth_image = tilePackage.truth.nearby;
      state.unique_truth_image = tilePackage.truth.unique;
      state.path_to_image = tilePackage.tile.path_to_tile;
      state.imageId = tilePackage.tile.tile_id;
      state.mapId = tilePackage.tile.map_id;
      router.push({ name: "image", params: { imageId: state.imageId } });
    },

    setPathToImage(state, path_to_image) {
      state.path_to_image = path_to_image;
    },

    setAnnotationMode(state, isActive) {
      state.annotationMode = isActive;
    },

    setEditMode(state, isActive) {
      state.editMode = isActive;
    },

    setAnnotations(state, annotations) {
      state.annotations = annotations;
    },

    setTargets(state, targets) {
      state.targets = targets;
      state.colorMap = {};
      for (var k = 0; k < state.targets.length; k++) {
        state.colorMap[state.targets[k].scientific_name] =
          state.targets[k].color_code;
      }
    },

    setTarget(state, target) {
      state.target = target;
    },

    toggleLibrary(state) {
      state.libraryIsOpen = !state.libraryIsOpen;
    },

    toggleEditor(state) {
      state.targetEditorIsOpen = !state.targetEditorIsOpen;
    }
  },

  actions: {
    listMaps(context) {
      api.listResource("maps").then(function(resp) {
        context.commit("setMapList", resp.data);
      });
    },

    getMap(context, mapId) {
      api.getResource("maps", mapId).then(function(resp) {
        context.commit("setMap", resp.data);
      });
    },

    selectSite(context, site) {
      var mapId = site.map_id;
      var params = { beta: site.col_frac, alpha: site.row_frac };
      api.getResourceAndQuery("map-images", mapId, params).then(function(resp) {
        var data = resp.data;
        context.commit("setImageList", data);
      });
    },

    listImages(context) {
      api.listResource("images").then(function(resp) {
        context.commit("setImageList", resp.data);
      });
    },

    getImage(context, id) {
      api.getResource("images", id).then(function(resp) {
        context.commit("setImage", resp.data);
      });
    },

    navigateFromTile(context, direction) {
      context.commit('setPathToImage', 'cogs.gif')
      var params = { direction: direction };
      var tile_id = context.state.imageId
      api.getResourceAndQuery("tiles", tile_id, params).then(function(resp) {
        context.commit("setNewImage", resp.data);
      });
    },

    getTargets(context) {
      api.listResource("targets").then(function(resp) {
        context.commit("setTargets", resp.data);
      });
    },

    updateTarget(context, target) {
      target.id = target.scientific_name;
      api.putResource("targets", target).then(function(resp) {
        context.commit("setTargets", resp.data);
        context.commit("setTarget", target);
      });
    },

    createTarget(context, target) {
      api.postResource("targets", target).then(function(resp) {
        context.commit("setTargets", resp.data);
        context.commit("setTarget", target);
      });
    },

    deleteTarget(context, target) {
      api
        .deleteResource("targets", target.scientific_name)
        .then(function(resp) {
          context.commit("setTargets", resp.data);
          context.commit("setTarget", resp.data[0]);
        });
    },

    getAnnotations(context, imageId) {
      api.getResource("annotations", imageId).then(function(resp) {
        context.commit("setAnnotations", resp.data);
      });
    },

    saveAnnotation(context, annotation) {
      api.postResource("annotations", annotation).then(function(resp) {
        context.commit("setAnnotations", resp.data);
      });
    },

    deleteAnnotations(context, imageId) {
      api.deleteResource("annotations", imageId).then(function(resp) {
        context.commit("setAnnotations", resp.data);
      });
    },

    deleteAnnotation(context, annotationId) {
      api.deleteResource("annotation", annotationId).then(function(resp) {
        context.commit("setAnnotations", resp.data);
      });
    },

    createGroundTruth(context, truth) {
      api.postResource("truths", truth);
    },

    deleteGroundTruth(context, imageId) {
      api.deleteResource("truths", imageId);
    }
  }
});
