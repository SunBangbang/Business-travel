<template>
  <div class="home">
    <div class="top-nav">列表页</div>
    <div class="content">
      <template v-if="list.length > 0">
        <div class="listItem" v-for="(item, index) in list" :key="index">
          <div class="time">
            <div style="margin-bottom: 2px;">入店时间： {{item.start_time}}</div>
            <div>离店时间： {{item.end_time}}</div>
          </div>
          <div class="money">￥{{item.money}}</div>
        </div>
      </template>
      <template v-else>
        <div class="none">暂无数据</div>
      </template>
    </div>
  </div>
</template>

<script>
import { getRelease } from "@/apis/index";
export default {
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 5
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getRelease().then(res => {
        if (res.data.status == 1) {
          this.list = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  /*height: 100vh;*/
  background-color: #f4f4f4;
  overflow: hidden;
  margin-bottom: 80px;
  .top-nav {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 666;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #eb2211;
  }
  .content {
    margin-top:60px;
    .listItem {
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      margin-bottom: 7px;
      .time {
        font-size: 14px;
        color: #7f7f7f;
      }
      .money {
        color: red;
        font-size: 18px;
      }
      .none {
        text-align: center;
        padding: 20px;
      }
    }
  }
}
</style>