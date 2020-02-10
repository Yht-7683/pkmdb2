<!--精灵图鉴界面-->
<template>
  <div>
    <el-table
      :data="userdate" style=" z-index:-1;"  v-loading="loading" >
      <el-table-column
        label="图鉴序号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="外观"
        prop="img">
        <template slot-scope="scope">
          <el-image
            style="width: 65px; height: 65px"
            :src="scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="名字"
        prop="name">
      </el-table-column>
      <el-table-column
        label="属性"
        prop="type">
      </el-table-column>
      <el-table-column
        label="特性"
        prop="ability">
      </el-table-column>
      <el-table-column
        label="等级"
        prop="lv">
      </el-table-column>
      <el-table-column
        label="获得时间"
        prop="meetTime">
      </el-table-column>
      <el-table-column
        label="其他介绍"
        prop="others">
      </el-table-column>
      <el-table-column
        align="right" width="200px">
        <template slot="header" slot-scope="scope">
          <el-button slot="append" icon="el-icon-search" type="success" plain @click="find"></el-button><el-input
          v-model="search" size="mini" style="width:120px; float:left"
          placeholder="输入关键字搜索"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" type="success"  plain round>查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1" :current-page="currentPage1">
      </el-pagination>
    </div> <img src="../../static/图鉴/logo2.png" height="80px" width="230px" style="float: right;margin-top: 65vh; z-index:9999"/>
    <!---->
    <el-dialog title="详细信息" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="user">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="user.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="外观" :label-width="formLabelWidth">
          <el-image
            style="width: 65px; height: 65px"
            :src="user.img"></el-image>
        </el-form-item>
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="等级" :label-width="formLabelWidth">
          <el-input v-model="user.lv" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="user.type" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="特性" :label-width="formLabelWidth">
          <el-input v-model="user.ability" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="其他介绍" :label-width="formLabelWidth">
          <el-input v-model="user.others" type="textarea" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">看完了！</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      user: {
        id: '',
        name: '',
        img: '',
        type: '',
        ability: '',
        lv: '',
        meetTime: '',
        others: ''
      },
      search: '',
      list: [],
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      pageSize: 5,
      formLabelWidth: '80px',
      userdate: [],
      loading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      // console.log(JSON.parse(window.localStorage.getItem('user')).id)
      postRequest('/api/public/getPkmBag', {
        searchParam: JSON.parse(window.localStorage.getItem('user')).id
      }).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          this.craetep()
          this.loading = false
          // console.log(this.list)
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
      })
    },
    craetep () {
      this.userdate = []
      let from = (this.currentPage1 - 1) * this.pageSize
      let to = this.currentPage1 * this.pageSize
      for (; from < to; from++) {
        if (this.list[from]) {
          // console.log(this.list[from])
          this.userdate.push(this.list[from])
        }
      }
      this.total = this.list.length
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      this.user.id = row.id
      this.user.name = row.name
      this.user.lv = row.lv
      this.user.img = row.img
      this.user.type = row.type
      this.user.ability = row.ability
      this.user.others = row.others
      console.log(index, row)
    },
    find () {
      this.loading = true
      postRequest('api/public/getPkmBagById', {
        userid: JSON.parse(window.localStorage.getItem('user')).id,
        pokemon: this.search
      }).then((result) => {
        if (result.data.code === 200) {
          this.list = result.data.data
          this.craetep()
          this.loading = false
          // console.log(this.list2)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      // console.log(this.search)
    },
    handleSizeChange1: function (pageSize) {
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function (currentPage) {
      this.currentPage1 = currentPage
      this.currentChangePage(this.list, currentPage)
    }, // 分页方法（重点）
    currentChangePage (list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      let to = currentPage * this.pageSize
      this.userdate = []
      for (; from < to; from++) {
        if (list[from]) {
          this.userdate.push(list[from])
        }
      }
    }

  }
}
</script>
<style scoped>
  .el-table{
    height: 70vh;
    position: absolute;
    top: 180px;
    margin-left: 10px;
    box-shadow: 0px 0px 10px #babfbf;
    width: 98%;
  }
  .pagination{
    position: absolute;
    bottom: 17vh;
    right: 40vw;
  }
</style>
