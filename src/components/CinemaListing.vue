<template>
  <div>
    <FilterFilm @films="setFilms" />
    <Categories v-on:category_id="getCategory" class="ml-10" />
    <div
      class="grid grid-cols-4 gap-4 justify-center md:mx-56 mt-8"
      v-if="films.length"
    >
      <div class="col-span-1" v-for="(film, key) in films" :key="key">
        <Film :film="film" />
      </div>
    </div>
    <div v-else>
      <div class="col-span-4">
        <h3 class="font-bold text-2xl">No hay resultados.</h3>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import Film from "@/components/Film.vue";
import Categories from "@/components/Categories.vue";
import FilterFilm from "@/components/Filter.vue";
export default {
  components: {
    Film,
    Categories,
    FilterFilm,
  },
  data() {
    return {
      films: [],
      default_path: "/films",
    };
  },
  mounted() {
    this.getFilms();
  },
  methods: {
    getFilms(id = null) {
      if (id != null) {
        this.default_path = "/getFilmsByCat" + "/" + id;
      }
      if (typeof id === "string") {
        this.default_path = "/films";
      }
      axios.get(this.default_path).then((res) => {
        this.films = res.data;
      });
    },
    getCategory(id) {
      this.getFilms(id);
    },
    setFilms(data) {
      this.films = data;
    },
  },
};
</script>
