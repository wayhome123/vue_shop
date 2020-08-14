<template>
  <div class="card">
    <!-- 卡片 -->
    <el-card>
      <slot name="table"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'card',
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
//卡片
.el-card {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
}
</style>
