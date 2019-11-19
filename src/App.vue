<script>
import Navbar from './components/layout/navbar'
import Sidebar from './components/layout/sidebar'

export default {
  name: 'app',
  components: { Navbar, Sidebar }
}
</script>

<template>
    <div id="app" v-bind:class="$route.name">
        <div v-if="['Login', 'Register','ForgotPass'].indexOf($route.name) == -1" id="wrapper">
            <navbar/>
            <sidebar/>
        </div>
        <router-view/>
    </div>
</template>
