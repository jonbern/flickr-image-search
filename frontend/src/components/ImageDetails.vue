<template class="imageDetails">
  <div >
    <h2>{{title}}</h2>
    <div class="main">
      <section class="image" v-bind:style="{ 'background-image': 'url(' + url + ')' }">
      </section>
      <section class="metadata">
        <div v-if="description">
          <div class="description" v-html="description" />
        </div>
        <div>
          <span class="date">Uploaded: {{posted}}</span>
        </div>
        <div>
          <tag-list v-bind:tags="tags"></tag-list>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import flickrApi from '@/services/flickrApi';

export default {
  name: 'imageDetails',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: '',
      description: '',
      posted: '',
      tags: [],
      url: ''
    }
  },
  activated() {
    flickrApi.getImageDetails(this.id)
      .then(response => {
        let { title, description, posted, tags, url } = response.data;
        this.title = title;
        this.description = description;
        this.posted = posted;
        this.tags = tags;
        this.url = url;
      })
      .catch(error => {
        console.log(error);
      });
  },
  deactivated() {
    this.url = '';
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.metadata {
  width: 18em;
  overflow-x: hidden;
  padding: 0 1em;

}

.metadata > div {
  padding-bottom: 1em;
}

.description {
  margin: 0;
  max-height: 15em;
  overflow-y: auto;
}

.date {
  font-size: 0.8em;
}

.image {
  width: 100%;
  height: 500px;
  background-size: cover;
}

</style>