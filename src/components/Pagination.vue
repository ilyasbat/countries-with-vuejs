<template>
  <div class="pagination">
    <div :class="paginationClass(n)" v-for="n in totalPage" :key="n" >
      <router-link :to="`/${n}`">{{n}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    paginationClass (n) {
      let _class = 'pagination-link'
      if (this.page === n) {
        _class += ' active'
      }
      return _class
    }
  }
}
</script>

<style scoped>

</style>
