<template>
  <div class="login">
    <h1>商旅伴侣</h1>
    <div class="user-info">
      <input placeholder="账号" type="text" v-model="phone" />
      <input placeholder="密码" type="password" v-model="password" />
      <div class="forget">
        <span>忘记密码？</span>
      </div>
    </div>
    <div class="user-btn">
      <button @click="toLogin">登录</button>
      <button @click="$router.push('/register')">注册</button>
    </div>
  </div>
</template>

<script>
import { login } from "@/apis/login";
import { Toast } from 'vant';
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    toLogin: function() {
      if (!this.phone) {
        Toast("请输入手机号");
        return false;
      }
      if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          this.phone
        )
      ) {
        Toast("手机号格式不正确");
        return false;
      }
      if (!this.password) {
        Toast("请输入密码");
        return false;
      }
      let params = {
        phone: this.phone,
        password: this.password
      };
      login(params).then(result => {
        if (result.data.status == 1) {
          localStorage.setItem("token", result.data.data.api_token);
          localStorage.setItem("userInfo", JSON.stringify(result.data.data));
          if (JSON.parse(localStorage.getItem("userInfo")).user_type == 1) {
            this.$router.push({
              name: "home"
            });
          } else if (
            JSON.parse(localStorage.getItem("userInfo")).user_type == 5
          ) {
            this.$router.push({
              name: "resave"
            });
          }
        } else {
          Toast(result.data.msg);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
  height: 100vh;
  background: url("../assets/login.jpg");
  background-size: cover;
  overflow: hidden;
  h1 {
    text-align: center;
    color: #fff;
    margin-top: 80px;
    text-shadow: 1px 4px 5px rgba(128, 128, 128, 0.3);
    letter-spacing: 2px;
  }
  .user-info {
    padding: 0 10%;
    text-align: center;
    margin: 60px 0 30px;
    input {
      border: none;
      outline: none;
      background-color: #fff;
      width: 80%;
      height: 40px;
      border-radius: 20px;
      padding: 0 10%;
      margin: 20px 0 10px;
      &::-webkit-input-placeholder {
        color: red;
      }
    }
  }
  .forget {
    text-align: right;
    span {
      color: #fff;
      border-bottom: 1px solid #fff;
      font-size: 12px;
    }
  }
  .user-btn {
    padding: 0 10%;
    display: flex;
    justify-content: space-between;

    button {
      border: none;
      outline: none;
      background-color: #fe9f5d;
      color: #fff;
      width: 100px;
      height: 36px;
      border-radius: 18px;
    }
  }
}
</style>
