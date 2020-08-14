<template>
  <div class="header">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="~assets/logo.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout"
        >退出</el-button
      >
    </el-header>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {};
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    /**退出 */
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>
<style lang="less" scoped>
/**设置头部颜色 */
.header {
  width: 100%;
}

/*设置头部 */
.el-header {
  width: 100%;
  height: 59px;
  color: white;
  background-color: #363d40;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    width: 100%;
    align-items: center;
    img {
      border-radius: 50%;
      width: 25px;
      margin-left: 10px;
    }
    span {
      margin-left: 15px;
    }
  }
}
</style>
