<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <div> Architech </div>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <HomePage msg="Hope you have a great day =)"/>
    </main>
    <br/>
    <main>
      <CustomPortfolio/>
    </main>
  </div>
</template>

<script>
import HomePage from './web/components/HomePage.vue';
import CustomPortfolio from './web/components/CustomPortfolio.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    CustomPortfolio,
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
  border: 10px solid #000000;
}

.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
</style>
