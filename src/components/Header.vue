<template>
  <header>
    <div class="title">
      <img src="../images/world.svg" width="32" height="32"/>
      <router-link to="/">{{ language.title }}</router-link>
    </div>
    <nav>
      <ul>
        <li><img src="../images/github.svg" width="16" height="16"/> <a href="https://github.com/ilyasbat">{{language.github}}</a></li>
        <li><img src="../images/youtube.svg" width="16" height="16"/><a href="https://www.youtube.com/channel/UCfNGJmeuzO-KHHALUeFeyWw"> {{language.youtube}}</a></li>

      </ul>
    </nav>
  </header>
</template>

<script>
import {language} from '../language'

export default {
  name: 'Header',
  data () {
    return {
      language: language
    }
  }
}
</script>

<style scoped>

</style>
