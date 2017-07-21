<template>
  <div class="imageDetails">
    <p>Image details shall come here: {{id}}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'imageDetails',
  props: {
    id: {
      type: String
    }
  }
}
</script>