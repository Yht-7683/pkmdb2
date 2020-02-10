<template>
  <div>
    <div class="image"><img src="../../static/图鉴/logo1.png" height="65px" width="120px" style="float: left"/>
      <img src="../../static/图鉴/logo2.png" height="60px" width="200px" style="float: right"/>
      <h2> 欢迎来到pokemon的世界</h2>
      </div>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#128b6b"
    text-color="#fff"
    active-text-color="#ffd04b" router>
    <el-menu-item index="home">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">商店</template>
      <el-menu-item index="shop">购买精灵球</el-menu-item>
      <el-menu-item index="buyexp">购买经验</el-menu-item>
    </el-submenu>
    <el-menu-item index="mypokemon">我的精灵</el-menu-item>
    <el-menu-item index="get">捕捉</el-menu-item>
    <el-menu-item ><a href="https://pokemon.alexonsager.net/zh" style="text-decoration:none">杂交大师</a></el-menu-item>
    <el-dropdown style="margin-right:25px;margin-top: 20px;color: white; float: right">
      <i class="el-icon-setting" style="margin-right: 0px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a @click="out">退出登录</a></el-dropdown-item>
        <el-dropdown-item>项目地址</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'my',
      activeIndex2: '1'
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    out () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.image{
  height: 70px;
  width: auto;
  border-top: #128b6b 3px solid;
  border-right: #128b6b 3px solid;
  border-left: #128b6b 3px solid;
  background-color: rgba(106,216,236,50);
}

</style>
