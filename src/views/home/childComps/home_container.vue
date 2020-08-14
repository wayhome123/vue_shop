<template>
  <div class="homeContainer">
    <!-- 头部 -->
    <homeHeader />
    <el-container>
      <!-- 侧边栏 -->
      <homeAside />
      <!-- 主要内容区域 -->
      <homeMain />
    </el-container>
  </div>
</template>

<script>
import homeHeader from './home_header';
import homeAside from './home_aside';
import homeMain from './home_main';

export default {
  name: 'homeContainer',
  data() {
    return {};
  },
  computed: {},
  components: {
    homeHeader,
    homeAside,
    homeMain,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.homeContainer {
  width: 100%;
  height: 100%;
}

/**设置字体颜色 */
.el-container {
  height: 100%;
  color: white;
}
</style>
