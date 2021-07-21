<template>
  <div class="border border-gray-100 p-2">
    <h3 class="font-bold text-2xl">{{ film.title }}</h3>
    <img :src="GetCaratula" alt="Caratula" class="h-72 flex px-6" />
    <p class="mt-4 text-lg text-justify px-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat fugit
      qui beatae!
    </p>
    <div class="text-3xl">
      <i class="far fa-eye-slash" v-if="show" @click="show = false"></i>
      <i class="far fa-eye" v-else @click="show = true"></i>
    </div>
    <span
      v-if="film.novelty"
      class="text-sm bg-blue-600 rounded-md text-white p-1"
      >Novedad</span
    >
    <!-- component -->
    <!-- This is an example component -->
    <div class="flex justify-center items-center">
      <div class="flex items-center mt-2 mb-4">
        <svg
          class="mx-1 w-4 h-4 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          v-for="(star, key) in stars"
          :key="key"
          :class="rating(star)"
          @click="setStar(star)"
        >
          <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
export default {
  props: {
    film: Object,
  },
  data() {
    return {
      stars: 5,
      show: false,
    };
  },
  computed: {
    GetCaratula() {
      return "http://peliculas-api.test/" + this.film.caratula;
    },
  },
  methods: {
    setStar(value) {
      const data = {
        rating: value,
        film_id: this.film.id,
      };
      axios.post("/rating", data).then((res) => {
        console.log(res.data);
      });
    },
    rating(star) {
      return star <= this.film.total ? "fill-current text-yellow-500" : "";
    },
  },
};
</script>
