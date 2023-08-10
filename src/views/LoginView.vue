<template>
  <div class="both">
    <div class="column">
      <el-row :gutter="28" class="center-row">
        <el-col :span="80">
          <el-card shadow="hover">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
              class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="Save1()">保存账号密码</el-button>
                <el-button type="danger" @click="ClearRecords">清空记录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style>
.center-row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.both {
  width: 100%;
      height: 100%;
      background: url("../assets/img/3.jpeg");
      background-size:100% 100%;
      
      position: fixed;
      top: 0;
      left: 0;
}
</style>

<script>

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }

        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUsername && savedPassword) {
      this.ruleForm.username = savedUsername;
      this.ruleForm.password = savedPassword;
      this.ruleForm.checkPass = savedPassword;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          var loading = {
            username: "",
            password: ""
          };
          loading.username = this.ruleForm.username;
          loading.password = this.ruleForm.password;
          console.log(loading)
          fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, body: JSON.stringify(loading)
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              if ("error" in data) {
                this.$notify({
                  title: "登录失败",
                  message: "用户名或密码错误",
                  type: "warning"
                });
              } else {
                this.$notify({
                  title: "登录成功",
                  message: "登陆成功",
                  type: "success"
                });
                window.localStorage.setItem("loginUser", JSON.stringify(data.user))
                window.localStorage.setItem("token", data.token)
                this.$confirm('是否保存账号密码？', '提示', {
                  confirmButtonText: '保存',
                  cancelButtonText: '不保存',
                  type: 'warning'
                })
                  .then(() => {
                    // 用户点击了保存按钮
                    // 执行保存账号密码的操作
                    // 将用户名和密码保存到本地存储中
                    localStorage.setItem('savedUsername', this.ruleForm.username);
                    localStorage.setItem('savedPassword', this.ruleForm.password);
                    this.$message.success('账号密码已保存');
                  })
                  .catch(() => {
                    // 用户点击了不保存按钮
                    // 取消保存账号密码的操作
                  });
                this.$router.replace({ path: "/" })
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    Save1() {
      const { username, password } = this.ruleForm;
      localStorage.setItem('savedUsername', username);
      localStorage.setItem('savedPassword', password);
      alert('账号密码已保存！');
    },
    ClearRecords() {
      localStorage.removeItem('savedUsername');
      localStorage.removeItem('savedPassword');
      this.ruleForm.username = '';
      this.ruleForm.password = '';
      this.ruleForm.checkPass = '';
      this.$message.success('记录已清空');
    },
  }
}
</script>