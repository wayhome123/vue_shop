<template>
  <div class="aside">
    <el-aside :width="isCollapse ? '64px' : '150px'">
      <div class="toggle-button" @click="fold">≡</div>
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="$route.path"
      >
        <!-- 一级菜单 -->
        <el-submenu
          :index="item.id + ''"
          v-for="(item, index) in menuList"
          :key="item.id"
        >
          <template slot="title">
            <i :class="icons[index]"></i>
            <span>{{ item.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            :index="'/' + item.path"
            v-for="itemList in item.children"
            :key="itemList.id"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ itemList.authName }}</span>
            </template></el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { getMenuList } from 'network/http';
export default {
  name: 'aside',
  data() {
    return {
      menuList: [],
      icons: [
        'fa fa-user',
        'fa fa-lock',
        'fa fa-briefcase',
        'fa fa-wpforms',
        'fa fa-database',
      ],
      isCollapse: false,
    };
  },
  computed: {},
  components: {},
  created() {
    this.getMenuList();
  },
  mounted() {},
  methods: {
    /**获取菜单列表 */
    getMenuList() {
      getMenuList().then((res) => {
        if (res.meta.status !== 200)
          return this.$message.error(res.meta.msg);
        this.menuList = res.data;
      });
    },
    //点击侧边按钮折叠
    fold() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>
/**侧边栏 */
.el-aside {
  overflow: hidden;
  transition: 0.45s;
  background-color: #333744;
  text-align: center;
  height: 100%;
  .el-submenu .el-menu-item {
    min-width: auto;
  }
  .el-menu {
    transition: 0.45s;
    width: 100%;
    border-right: none;
    .el-submenu {
      transition: 0.45s;
      width: 100%;
      .fa {
        margin-right: 5px;
        color: white;
        text-align: center;
      }
    }
  }
}

/**侧边栏按钮 */
.toggle-button {
  background-color: #545c64;
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
