<template>
  <div class="hello">
    <h1>Welcome to the Flickr search engine</h1>
    <input type="text" v-model="searchString" placeholder="Type here please" autofocus />
    <div v-infinite-scroll="getMoreData" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
      <div v-for="item in items" v-bind:key="item.id">{{item}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';

export default {
  name: 'main',
  data() {
    return {
      searchString: '',
      items: [],
      page: 1
    }
  },
  watch: {
    searchString: function () {
      this.getDataDebounced();
    }
  },
  methods: {
    getData() {
      if (this.searchString) {
        let url = `http://localhost:8088/api/images?search=${this.searchString}&page=${this.page}`;
        console.log(url);
        axios.get(url)
          .then(response => {
            this.items = [...this.items, ...response.data];
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getDataDebounced: debounce(function() {
      this.page = 1;
      this.items = [];
      this.getData();
    }, 250),
    getMoreData() {
      this.page++;
      this.getData();
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
