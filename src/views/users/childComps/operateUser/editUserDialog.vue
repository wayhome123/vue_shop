<template>
  <div class="editUser">
    <el-dialog title="用户信息修改"
               :visible.sync="showEditDialog"
               width="50%"
               @close="editDialogClose">
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editFormRef"
               label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary"
                   @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { submitUsers } from "network/http";

export default {
  name: "editUser",
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
      editFormRules: {
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
  props: {
    showEditDialog: {
      type: Boolean,
      default: false,
    },
    editForm: {
      type: Object,
    },
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    closeEditDialog() {
      this.$emit("closeEditDialog");
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate((validate) => {
        if (!validate) return this.$message.error("提交失败");
        submitUsers(this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        }).then((res) => {
          if (res.meta.status != 200) {
            return this.$message.error("用户信息更新失败");
          }
          //发送监听事件，关闭编辑对话框并更新用户列表
          this.$emit("editSuccess");
          this.$message.success("用户信息更新成功");
        });
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
