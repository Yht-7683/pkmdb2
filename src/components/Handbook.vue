<!--精灵图鉴界面-->
<template>
  <div>
<el-table border
  :data="userdate"
  style="width: 85%">
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
    label="其他介绍"
    prop="others">
  </el-table-column>
  <el-table-column
    align="right" width="200px">
    <template slot="header" slot-scope="scope">
      <el-button slot="append" icon="el-icon-search" type="primary" @click="find" plain></el-button><el-input
      v-model="search" size="mini" style="width:120px; float:left"
      placeholder="输入关键字搜索"></el-input>
    </template>
    <template slot-scope="scope">
      <el-button
        size="mini"
        @click="handleEdit(scope.$index, scope.row)" type="primary" plain round>编辑</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)" plain round>删除</el-button>
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
  </div>
    <!---->
    <el-dialog title="修改精灵信息" :visible.sync="dialogTableVisible" width="30%">
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
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="user.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特性" :label-width="formLabelWidth">
          <el-input v-model="user.ability" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="其他介绍" :label-width="formLabelWidth">
          <el-input v-model="user.others" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="upUser">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
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
        others: ''
      },
      search: '',
      list: [],
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      pageSize: 6,
      formLabelWidth: '80px',
      userdate: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllPokemon', {}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          this.craetep()
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
      this.user.img = row.img
      this.user.type = row.type
      this.user.ability = row.ability
      this.user.others = row.others
      // console.log(index, row)
    },
    find () {
      console.log(this.search)
      postRequest('api/public/searchPokemon', {
        searchParam: this.search
      }).then((result) => {
        if (result.data.code === 200) {
          this.list = []
          this.list = result.data.data
          this.craetep()
          this.$message(`${result.data.msg}`)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    upUser () {
      let upuser = {
        id: this.user.id,
        name: this.user.name,
        img: this.user.img,
        type: this.user.type,
        ability: this.user.ability,
        others: this.user.others
      }
      postRequest('/api/public/upPokemon/', upuser).then((result) => {
        console.log(result)
        if (result.data.code === 200) {
          this.$message(`${result.data.msg}`)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible = false
      this.fetchData()
      // this.$message({
      //   message: '修改了！',
      //   type: 'success'
      // })
    },
    handleDelete (index, row) {
      this.$message.error('权限不够，无法删除')
      console.log(index, row)
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
    height: 85vh;
    position: absolute;
    top: 100px;
    width: 79vw;
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
.pagination{
position: absolute;
bottom: 10vh;
right: 40vw;
}
</style>
