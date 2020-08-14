<template>
  <div class="login-wrapper">
    <div class="login-box">
      <!-- 头像开始 -->
      <div class="avatar_box">
        <img src="~assets/logo.jpg"
             alt="头像" />
      </div>
      <!-- 头像结束 -->
      <!--输入区域开始 -->
      <el-form class="login_form"
               ref="loginFormRef"
               :model="loginForm"
               :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input prefix-icon="fa fa-user"
                    v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-lock"
                    v-model="loginForm.password"
                    type="password"></el-input>
        </el-form-item>
        <!-- 输入区域结束 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登录</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { toLogin } from 'network/http';
export default {
  name: 'login',
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
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
    //重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //登录
    login() {
      this.$refs.loginFormRef.validate((validate) => {
        if (validate) {
          toLogin(
           this.loginForm
          ).then((res) => {
            const status = res.meta.status;
            const token = res.data.token;
            if (status == 200) {
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 800,
              });
             window.sessionStorage.setItem("token",token);
             this.$router.push("/home")
            } else {
              this.$message({
                message: '登录失败',
                type: 'error',
                duration: 800,
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: #264a6b;
}

//登录框
.login-box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  left: 50%;
  top: 57%;
  transform: translate(-50%, -50%);
  bottom: 0;
  width: 70%;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>
