<template>
  <div class="content-header">
    <div class="content-header-title">
      <img :src="image" width="50" height="50" v-if="image"/>
      <h2>{{title}}</h2>
    </div>
    <div class="content-header-search" v-if="search">
      <input type="text" placeholder="Search" v-model="query" v-on:keyup="handleSearch"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentHeader',
  data () {
    return {
      query: ''
    }
  },
  props: {
    title: {
      type: String

    },
    search: {
      type: Boolean,
      default: true
    },
    image: {
      type: Boolean | String,
      default: false
    }
  },
  methods: {
    handleSearch (data) {
      this.query = data.target.value
      this.$emit('SearchChanged', this.query)
    }
  }
}
</script>

<style scoped>

</style>
