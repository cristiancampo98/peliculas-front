<template>
  <div class="">
    <CinemaListing />
  </div>
</template>

<script>
// @ is an alias to /src
import CinemaListing from "@/components/CinemaListing.vue";

export default {
  name: "Home",
  components: {
    CinemaListing,
  },
};
</script>
