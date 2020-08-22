<template>
  <div class="container">
    <Header></Header>
    <section class="content">
      <ContentHeader :title="country.name" :search="false" :image="country.flag"></ContentHeader>
      <div class="center" v-if="loading">{{language.loading}}</div>
      <div class="content-information-container">
        <div class="content-information" v-for="(value,name) in country" v-bind:key="name">
          <div class="information-title">{{language[name]?language[name]:name}}</div>
          <div class="information-detail">{{findDataTypeAndReturnValue(value)}}</div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import ContentHeader from './ContentHeader'
import {language} from '../language.js'

export default {
  name: 'Country',
  components: {ContentHeader, Footer, Header},
  methods: {
    findShowedCountries () {
      let page = this.$route.params.page
      if (!page) {
        page = 1
      }
      this.showedCountries = this.countries.filter((d, index) => { return index >= ((page - 1) * this.perPageItemCount) && index < (page * this.perPageItemCount) })
      this.pageCount = Math.ceil((this.countries.length / this.perPageItemCount))
    },
    useObject (object) {
      return JSON.stringify(object)
        .replace(/{|}|"|\[|\]/g, ' ')
        .replace(/,/g, '\n')
    },
    findDataTypeAndReturnValue (data) {
      if (data === '' || data === null) {
        return '-'
      }
      const type = typeof data
      if (type === 'string' || type === 'number') {
        return data
      } else if (type === 'object') {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            return '-'
          }
          if (typeof data[0] === 'object') {
            let result = ''
            data.map(d => {
              result += this.useObject(d)
            })
            return result
          }
          return data.join(', ')
        } else {
          return this.useObject(data)
        }
      }
    }
  },
  data () {
    return {
      country: {},
      language: language,
      loading: true
    }
  },
  created () {
    fetch(`https://restcountries.eu/rest/v2/alpha/${this.$route.params.id}`).then(response => {
      return response.json()
    }).then(response => { this.country = response; this.loading = false })
  }
}
</script>
