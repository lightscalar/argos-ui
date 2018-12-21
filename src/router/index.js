import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/components/LandingPage";
import Maps from "@/components/Maps";
import Map from "@/components/Map";
import Image from "@/components/Image";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/maps",
      name: "maps",
      component: Maps
    },
    {
      path: "/maps/:mapId",
      name: "map",
      component: Map,
      props: true
    },
    {
      path: "/images/:imageId",
      name: "image",
      component: Image,
      props: true
    }
  ]
});
