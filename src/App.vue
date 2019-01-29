<template>
  <div id="app">
    <!-- This is the Navbar -->
    <Navbar/>
    <div class="container">
      <!-- This is where all the views will render -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components:{
    Navbar
  } 
}
</script>

<style>

</style>
