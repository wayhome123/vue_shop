<template>
  <div class="addUser">
    <!-- 点击添加用户 -->
    <el-dialog title="提示"
               :visible.sync="isDialogShow"
               width="30%"
               @close="addDialogClose"
               :append-to-body="true">
      <!-- 添加用户表单 -->
      <el-form :model="addUser"
               :rules="addUserRules"
               ref="addUser"
               label-width="70px">
        <el-form-item label="账户"
                      prop="username">
          <el-input v-model="addUser.username" />
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="addUser.password" />
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addUser.email" />
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="addUser.mobile" />
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary"
                   @click="addUsers">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUsers } from "network/http";
export default {
  name: "addUser",
  props: {
    //添加用户对话框的显示与隐藏
    isDialogShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };

    //验证手机号的规则;
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      //添加用户
      addUser: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      addUserRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3-10个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "密码长度在6-16个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "手机号码不能为空" },
          {
            validator: checkMobile,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    //监听添加用户对话框的关闭事件
    addDialogClose() {
      this.$refs.addUser.resetFields();
    },
    //点击“取消”按钮或“确认”按钮后关闭添加用户对话框
    dialogClose() {
      this.$emit("dialogClose");
    },
    addUsers() {
      //点击“确定”按钮进行表单验证
      this.$refs.addUser.validate((validate) => {
        console.log(validate);
        if (!validate) return;
        //点击确定添加新用户
        addUsers(this.addUser)
          .then((res) => {
            console.log(res);
            if (res.meta.status !== 201) {
              console.log(this.addUser);
              console.log(res);
              this.$message.error("用户添加失败");
            } else {
              this.$message.success("添加用户成功");
              this.isDialogShow = false;
              //重新获取用户列表数据
              this.getUserList();
            }
          })
          .catch((err) => console.log(err));
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
