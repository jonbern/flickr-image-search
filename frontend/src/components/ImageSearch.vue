<template>
  <div class="imageSearch">
    <h1>Flickr image search:</h1>
    <div class="searchField">
      <input type="text" v-model="searchString" placeholder="Type to search for images" autofocus />
    </div>
    <loader v-bind:show="isLoading" /> 
    <div class="images" v-infinite-scroll="getMoreData" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
      <div v-for="item in items" v-bind:key="item.id">
        <div class="image"
             v-bind:style="{ 'background-image': 'url(' + item.url + ')' }" 
             v-on:click="navigateToImage(item.id)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import router from 'vue-router';

export default {
  name: 'imageSearch',
  data() {
    return {
      searchString: '',
      items: [],
      page: 1,
      isLoading: false
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
        this.isLoading = true;
        let url = `http://localhost:8088/api/images?search=${this.searchString}&page=${this.page}`;
        axios.get(url)
          .then(response => {
            this.items = [...this.items, ...response.data];
            this.isLoading = false;
          })
          .catch(error => {
            console.log(error);
            this.isLoading = false;
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
    },
    navigateToImage(id) {
      this.$router.push({ name: 'ImageDetails', params: { id } })
    }
  }
}
</script>

<style scoped>
 h1 {
  margin-bottom: 0.25em;
} 

.imageSearch {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
}

.searchField {
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 2em;
}

.searchField input  {
  width: 450px;
  outline: 0;
  height: 2.5em;
  padding: 0 0.25em;
  font-size: 1em;
  border: 0;
  border-bottom: 2px solid rgba(0, 105, 255, 0.50);
}

.images {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
}

.image {
  width: 250px;
  height: 250px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s;
}

.image:hover {
  opacity: 1;
}

</style>