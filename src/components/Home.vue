<template>
  <div class="container">
    <Header></Header>
    <section class="content">
      <ContentHeader :title="title" v-on:SearchChanged="handleSearch"></ContentHeader>
      <div class="center" v-if="loading">{{loadingText}}</div>
      <div class="countries" >
        <div class="country" v-for="country in showedCountries" v-bind:key="country.name">
          <div class="country-img"><router-link :to= "`country/${country.alpha3Code.toLowerCase()}`"><img :src="country.flag"/></router-link ></div>
          <div class="country-name"><h3><router-link :to= "`country/${country.alpha3Code.toLowerCase()}`">{{country.name}} ({{country.nativeName}})</router-link></h3></div>
        </div>
      </div>
      <Pagination :page="page" :total-page="pageCount"></Pagination>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import ContentHeader from './ContentHeader'
import {language} from '../language.js'
import Pagination from './Pagination'

export default {
  name: 'Home',
  components: {Pagination, ContentHeader, Footer, Header},
  methods: {
    findShowedCountries () {
      let page = parseInt(this.$route.params.page)
      if (!page) {
        page = 1
      }
      this.page = page
      this.showedCountries = this.countries.filter((d, index) => { return index >= ((page - 1) * this.perPageItemCount) && index < (page * this.perPageItemCount) })
      this.pageCount = Math.ceil((this.countries.length / this.perPageItemCount))
    },
    handleSearch (value) {
      if (value && value !== '') {
        this.pageCount = 0
        this.showedCountries = this.countries.filter(e => e.name.toLowerCase().includes(value.toLowerCase()) || e.nativeName.toLowerCase().includes(value.toLowerCase()))
      } else {
        this.findShowedCountries()
      }
    }
  },
  watch: {
    $route: function () {
      this.findShowedCountries()
    }
  },
  data () {
    return {
      title: language.title,
      loadingText: language.loading,
      countries: [],
      showedCountries: [],
      pageCount: 0,
      perPageItemCount: 50,
      page: 1,
      loading: true
    }
  },
  created () {
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      return response.json()
    }).then(response => { this.countries = response; this.findShowedCountries(); this.loading = false })
  }
}
</script>
