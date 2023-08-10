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

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button type="primary">注册</el-button>
              </el-form-item>
              <el-button @click="Save1()">保存账号密码</el-button>
              <el-button type="danger" @click="ClearRecords">清空记录</el-button>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="column">
      <h1>自然选择号欢迎您登舰</h1>
      <p>如果你没有账号，你可以注册一个账号</p>
      <a href="#" text-de>注册</a>
    </div>
  </div>
</template>
<style>
/* @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css'); */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
}

body:after {
  /* content: "";
  position: fixed;
  inset: 0;
  background-color: #010101;
  width: 60%;
  height: 100vh;
  clip-path: polygon(0 100%, 0 0, 100% 0, 70% 100%);
  z-index: -1; */
}

.both {
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 10px 50px -30px black;
  width: 1200px;
  border-radius: 30px;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto auto;
}

.both a {
  text-decoration: none;
  color: #010101;
}

.both .column {
  padding: 4rem;
}

.both .column:last-child {
  background: url("../assets/bizhi.webp") center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.both .column:last-child:after {
  content: "";
  position: absolute;
  background: linear-gradient(80deg, white, rgba(255, 255, 255, 0.1333333333));
  inset: 0;
}

.both .column:last-child * {
  z-index: 1;
}

.both .column:last-child a {
  display: inline-block;
  padding: 12px 30px;
  font-size: 16px;
  border: 2px solid #010101;
  color: black;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3;
  font-weight: 600;
}

.both .column:last-child a:hover {
  background-color: #010101;
  color: white;
}

.both .column:last-child {
  text-align: center;
}

.both h1 {
  margin-bottom: 15px;
}

.both .form-element {
  width: 100%;
  border: none;
  background-color: white;
  padding: 20px 30px;
  font-size: 18px;
  border-radius: 50px;
  transition: box-shadow 0.2s;
}

.both .form-element:focus {
  outline: none;
  box-shadow: 0 0 0 2px #010101;
}

.both input[type=checkbox] {
  accent-color: #010101;
  width: 16px;
  height: 16px;
}

.both form {
  margin-top: 3rem;
}

.both form>* {
  margin-top: 1rem;
}

.both form button {
  background-color: #010101;
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.2s;
}

.both form button:active {
  scale: 0.95;
  background-color: black;
}

.both form .form-check-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-left: 5px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-buttons {
  display: flex;
  gap: 1rem;
}

.social-buttons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  font-size: 22px;
  color: white;
  background-color: green;
}

.social-buttons a.wechat {
  background-color: #06ca5c;
}

.social-buttons a.QQ {
  background-color: #55acee;
}

.social-buttons a.github {
  background-color: #111;
}

.social-buttons a:hover {
  scale: 0.95;
}

@media (max-width: 992px) {
  .both {
    display: block;
    width: 500px;
    text-align: center;
  }

  .both .column:last-child {
    display: none;
  }

  .flex {
    flex-direction: column;
    gap: 1rem;
  }

  .social-buttons {
    justify-content: center;
  }
}

/*# sourceMappingURL=login.css.map */
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