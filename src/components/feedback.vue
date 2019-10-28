<template>
  <div class="s">
    <van-nav-bar class="topbar" title="提交截图" left-text left-arrow @click-left="$router.go(-1)" />
    <div class="s11 s22">
      <div class="s1">
        <h1>反馈信息</h1>
        <div class="s1_content cc">
          <van-field
            v-model="message"
            type="textarea"
            placeholder="请提交你需要反馈的信息或图片"
            rows="1"
            autosize
            style="margin-bottom: 30px"
          />
          <!--          <div style="padding: 10px 0 30px 0;">请提交你需要反馈的信息或图片</div>-->
          <van-uploader v-model="fileList" multiple :max-count="3" />
          <!--          <van-uploader multiple :max-count="3" :after-read="onRead" :accept="'image/*'"/>-->
        </div>
      </div>
      <van-button round type="danger" @click="postMessage">立即发送</van-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Uploader, Toast } from "vant";
export default {
  data() {
    return {
      fileList: [],
      message: "",
      images: [],
      token: ""
    };
  },
  watch: {
    fileList(val) {
      console.info("val", val);
    }
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
  methods: {
    postMessage() {
      if (!this.message && this.fileList.length == 0) {
        Toast.fail({
          message: "提交不能为空",
          duration: 1000
        });
        return;
      }
      this.images = [];
      this.fileList.forEach(item => {
        this.images.push(item.content);
      });
      axios
        .post(
          "api/user/feedback",
          qs.stringify({
            api_token: this.token,
            msg_mer: this.message,
            image: this.images,
            requirements_release_id: this.$route.params.id
          })
        )
        .then(result => {
          if (result.data.status == 1) {
            Toast.success(result.data.msg);
            this.fileList = [];
            this.message = "";
            this.$router.replace({
              name: "home"
            });
          } else {
            Toast.fail("提交失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    afterRead(file) {
      console.log(file);
    }
  }
};
</script>
<style scoped>
.topbar {
  background-color: #eb2312;
}

.van-cell {
  padding: 0;
  background-color: #ccc;
  border: none;
}

.van-nav-bar__title {
  color: #fff;
}

.van-icon-arrow-left:before {
  color: #fff;
}

.s {
  height: 667px;
  background-color: #e6e6e6;
}

.s1 h1 {
  background-color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 6px;
}

.s1_content {
  margin: 10px 15px;
  background-color: #ccc;
  border-radius: 6px;
}

.s1_content p {
  padding-top: 15px;
  padding-left: 10px;
  text-indent: 2em;
  line-height: 30px;
}

.s11 {
  /*height: 240px;*/
  height: auto;
  overflow: hidden;
  padding-bottom: 20px;
  background-color: #fff;
}

.s1_content {
  box-sizing: border-box;
  width: 300px;
  height: auto;
  /*text-align: center;*/
  /*line-height: 60px;*/
  margin-left: 36px;
  padding: 20px 15px 12px 15px;
  overflow: hidden;
}

.s11 {
  height: 150px;
}

.s1 {
  /*height: 200px;*/
  height: auto;
  overflow: hidden;
  padding-bottom: 10px;
}

/* .cc {
  height: 130px;
} */

.s22 {
  /*height: 260px;*/
  height: auto;
  overflow: hidden;
}

.van-button {
  width: 170px;
  margin-left: 95px;
}

.s3 {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
}

.btn {
  margin-left: 0px;
  width: 110px;
}

/* .van-uploader {
  width: 100px;
  height: 100px;
  float: left;
  margin-top: 30px;
  z-index: 999;
  background: url("../assets/upload.png");
  background-size: 100%;
} */
</style>
