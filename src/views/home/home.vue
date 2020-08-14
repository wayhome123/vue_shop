<template>
  <div class="home">
    <container />
  </div>
</template>

<script>
import container from './childComps/home_container';
export default {
  name: 'home',
  data() {
    return {};
  },
  computed: {},
  components: { container },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
