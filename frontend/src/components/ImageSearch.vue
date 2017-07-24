<template>
  <div class="imageSearch">
    <h1>Flickr image search:</h1>
    <div class="searchField">
      <input type="text" v-model="searchString" placeholder="Type to search for images" autofocus />
    </div>
    <loader v-bind:show="isLoading" /> 
    <div class="images" v-infinite-scroll="getMoreData" infinite-scroll-disabled="isLoading" infinite-scroll-distance="50">
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
import flickrApi from '@/services/flickrApi';
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
      if (!this.searchString) {
        return;
      }
      
      this.isLoading = true;
      let current = this.searchString;
      
      flickrApi.searchImages(this.searchString, this.page)
        .then(response => {
          if (this.searchString === current) {
            this.items = [...this.items, ...response.data];  
          } else {
            this.items = [response.data];
          }
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
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
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
}

.searchField input  {
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
  background-size: cover;
}

.image:hover {
  opacity: 1;
}

</style>
