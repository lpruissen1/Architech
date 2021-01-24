<template>
  <div class="hello">
    <h1>Test text: {{ Test }}</h1>
  </div>
</template>

<script>
import customIndexApi from '@/web/services/api/CustomIndices';

export default {
  name: 'CustomPortfolio',

  data() {
    return {
      Test: 'Cow',
    };
  },

  created() {
    customIndexApi.GetIndex('600deb884ad5e6f94aefddb1')
      .then((index) => {
        window.console.log(index);
        this.Test = index.Test;
      });
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 40px 0 0;
  align-self: center;
}
</style>
