<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <div> "Hello" </div>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <HomePage msg="Lick my hairy taint"/>
    </main>
  </div>
</template>

<script>
import HomePage from './web/components/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
  },
};
</script>

<style>
body {
  background :  linear-gradient(to bottom, #555, #999);
  background-attachment : fixed;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
main {
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  width: 1024px;
  min-height: 300px;
}

.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
</style>
