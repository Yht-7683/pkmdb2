<!--界面头部-->
<!--suppress ALL -->
<template>
  <el-header style="text-align: right; font-size: 12px;margin-top: 0px ">
    <div class="image"><img src="../../static/图鉴/logo1.png" height="65px" width="120px" style=" z-index:99; float: left"/></div>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a @click="out">退出登录</a></el-dropdown-item>
        <el-dropdown-item>项目地址</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{name}}</span>
    <img src="../../static/图鉴/logo2.png" height="60px" width="200px" style="float: right"/>
  </el-header>
</template>

<script>
  export default {
    data () {
      return {
        name: JSON.parse(window.localStorage.getItem('user')).name
      }
    },
    methods: {
      out (){
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .el-header {
    position: absolute;
    right: 0px;
    margin-left: 0px;
    width: 100vw;
    background-color:rgb(30,211,173);
    color: #333;
    line-height: 60px;
    height: 60px;
    box-shadow: 0px 0px 10px #babfbf;
  }
</style>
