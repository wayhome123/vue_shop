<template>
  <div class="main">
    <!-- 主体区域 -->
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'main',
  data() {
    return {};
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}

/**主要内容区域 */
.el-main {
  height: 100%;
  background-color: #eaedf1;
  color: black;
}
</style>
