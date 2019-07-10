<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button @click="sendMsg" size="mini" round>发送验证码</el-button>
          <span class="satatus">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{error}}</div>
          <a href="#" class="f1" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "blank",
  data() {
    return {
      error: "",
      statusMsg: "",
      ruleForm: {
        name: "",
        pwd: "",
        cpwd: "",
        email: "",
        code: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            type: "string",
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        pwd: [{ required: true, message: "创建密码", trigger: "blur" }],
        cpwd: [
          { required: true, message: "确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    sendMsg: function() {
      let self = this;
      let namePass;
      let emailPass;
      this.$refs["ruleForm"].validateField("name", valid => {
        namePass = valid;
      });
      this.$refs["ruleForm"].validateField("email", valid => {
        emailPass = valid;
      });
      if (!namePass && !emailPass) {
        self.$axios
          .post("/users/verify", {
            username: window.encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200) {
              if (data.code === 0) {
                let count = 60
                self.timerid = setInterval(() => {
                  self.statusMsg = `验证码已发送，剩余${count--}秒`
                  if (count===0) {
                    clearInterval(self.timerid)
                  }
                }, 1000);
              } else {
                self.statusMsg = data.msg;
              }
            } else {
              self.statusMsg = `服务器出错，错误代码：${status}`;
            }
          });
      }
    },
    register: function() {
      let self = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.$axios
            .post("/users/signup", {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: self.ruleForm.pwd,
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data.code === 0) {
                  location.href = '/login'
                } else {
                  self.error = data.msg;
                }
              } else {
                self.error = `服务器出错，错误代码：${status}`;
              }
              setTimeout(() => {
                self.error = ''
              }, 1500);
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
