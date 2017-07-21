<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <span v-on:click="onClick()">Click me</span>
    <input type="text" v-model="searchString" placeholder="Type here please"  />
    <span>{{searchString}}</span>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div v-for="item in items" v-bind:key="item">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  beforeMount () {
    console.log('Maybe now is the right time to get the initial data?');
  },
  methods: {
    loadMore() {
      console.log('get more stuff!!');
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 25; i < j; i++) {
          this.items.push(i);
        }
        this.busy = false;
      }, 1000);
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchString: '',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20],
      onClick() {
        this.loadMore();
      },
      busy: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
