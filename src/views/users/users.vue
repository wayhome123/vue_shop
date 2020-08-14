<template>
  <div class="users">
    <bread />
    <card>
      <template #table>
        <userTable />
      </template>
    </card>
  </div>
</template>

<script>
import bread from './childComps/bread';
import card from './childComps/card';
import userTable from './childComps/userTable.vue';

export default {
  name: 'users',
  data() {
    return {};
  },
  computed: {},
  components: {
    bread,
    card,
    userTable,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped></style>
