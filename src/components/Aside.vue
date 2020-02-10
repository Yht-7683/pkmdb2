<!--侧边栏-->
<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['2', '3']" :default-active="onRoutes" :collapse="collapse"  background-color="rgb(5,255,203)" text-color="#fff" active-text-color="#000000" router>
      <el-menu-item index="my"><i class="el-icon-menu"></i>基本信息</el-menu-item >
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-picture-outline-round"></i>精灵管理</template>
        <el-menu-item-group>
          <el-menu-item index="handbook">精灵图鉴</el-menu-item>
          <el-menu-item><a @click="add">添加精灵</a></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="user">用户信息</el-menu-item>
          <el-menu-item index="bag">用户背包</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="ball"><i class="el-icon-shopping-bag-1"></i>道具管理</el-menu-item>
      <el-menu-item><i class="el-icon-more"></i><a @click="add" style="text-decoration:none; color: #f3f4f2">更多操作</a></el-menu-item>
    </el-menu>
    </el-aside>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    add () {
      alert('敬请期待！')
    }
  }
}
</script>

<style scoped>
  .el-aside{
    position: absolute;
    left: 0px;
    margin-top: 60px;
    box-shadow: 0px 0px 10px #babfbf;
    z-index:-1;
  }
  .el-menu{
    margin-left: 0px;
    height: 92vh
  }

</style>
