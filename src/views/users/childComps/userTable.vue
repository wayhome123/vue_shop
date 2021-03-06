<template>
  <div class="userTable">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容"
                  v-model="userInfo.query"
                  clearable
                  @clear="getUserList">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="getUserList" />
        </el-input>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary"
                   @click="isDialogShow = true">
          添加用户
        </el-button>
        <!-- 添加用户 -->
        <add-user-dialog :isDialogShow="isDialogShow"
                         @dialogClose="dialogClose" />
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table :data="userList"
              style="width: 100%"
              border
              stripe>
      <el-table-column type="index"
                       label="序号"
                       width="50px" />
      <el-table-column prop="username"
                       label="姓名" />
      <el-table-column prop="email"
                       label="邮箱" />
      <el-table-column prop="mobile"
                       label="电话" />
      <el-table-column prop="role_name"
                       label="角色" />
      <el-table-column prop="mg_state"
                       label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     @click="showEditDialogs(scope.row.id)">
          </el-button>
          <!-- 删除按钮 -->
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     @click="removeUserById(scope.row.id)">
          </el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark"
                      content="分配角色"
                      placement="top"
                      :enterable="false">
            <el-button type="warning"
                       icon="el-icon-setting"
                       size="mini"
                       @click="setRole(scope.row)">
            </el-button>
          </el-tooltip>
          <!-- 修改用户对话框 -->
          <edit-user-dialog :showEditDialog="showEditDialog"
                            @closeEditDialog="closeEditDialog"
                            :editForm="editForm"
                            @editSuccess="editSuccess" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="userInfo.pagenum"
                   :page-sizes="[1, 2, 5, 10]"
                   :page-size="userInfo.pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
//网络请求模块
import {
  getUserList,
  changeUserState,
  searchUsers,
  deleteUsers,
} from "network/http";
import addUserDialog from "./operateUser/addUserDialog";
import editUserDialog from "./operateUser/editUserDialog.vue";

export default {
  name: "table",
  data() {
    return {
      userInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        pagesize: 4,
      },
      userList: [],
      total: 0,
      // 添加用户对话框
      isDialogShow: false,
      showEditDialog: false,
      //查询到的用户信息
      editForm: {},
    };
  },
  computed: {},
  components: {
    addUserDialog,
    editUserDialog,
  },
  created() {
    this.getUserList();
  },
  mounted() {},
  methods: {
    //获取用户数据
    getUserList() {
      getUserList(this.userInfo).then((res) => {
        if (res.meta.status !== 200)
          return this.$message.error("获取用户列表失败");
        this.userList = res.data.users;
        this.total = res.data.total;
      });
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.userInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.userInfo.pagenum = newPage;
      this.getUserList();
    },
    //状态按钮改变
    userStateChanged(userInfo) {
      changeUserState(userInfo.id, userInfo.mg_state).then((res) => {
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          this.$message.error("用户状态更新失败");
        } else {
          this.$message.success("更新用户状态成功");
        }
      });
    },
    //点击“取消”按钮或“确认”按钮后关闭添加用户对话框
    dialogClose() {
      this.isDialogShow = false;
    },
    //点击编辑按钮展示“编辑对话框”
    showEditDialogs(id) {
      //查询用户信息
      this.showEditDialog = true;
      searchUsers(id).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("查询用户信息失败");
        }
        this.editForm = res.data;
      });
    },
    //关闭编辑对话框
    closeEditDialog() {
      this.showEditDialog = false;
    },
    //编辑用户成功后的操作
    editSuccess() {
      this.showEditDialog = false;
      this.getUserList();
    },
    //删除用户
    removeUserById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUsers(id).then((res) => {
            if (res.meta.status != 200) {
              return this.$message.error("删除用户失败");
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>
