<!--用户背包-->
<template>
  <div>
    <div v-if="dialogTableVisible1">
    <el-table
              :data="userdate"
      style="width: 85%;">
      <el-table-column align="center"
        label="用户ID"
        prop="id">
      </el-table-column>
      <el-table-column align="center"
        label="用户名"
        prop="name">
      </el-table-column>
      <el-table-column align="center"
        label="拥有精灵数量"
        prop="pkmNum">
      </el-table-column>
      <el-table-column align="center"
        label="拥有道具数量"
        prop="ballNum">
      </el-table-column>
      <el-table-column align="center"
        >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索" style="width:180px;float:left"/><el-button slot="append"  icon="el-icon-search" @click="find">查找</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)" type="primary" plain round>查看精灵详细</el-button>
          <el-button
            @click="handleEdit2(scope.$index, scope.row)" type="success" plain round>查看道具详细</el-button>
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
    </div>
    <!---->
    <el-table v-if="dialogTableVisible2" height="83vh"  :data="list2"
              style="width: 80%">
      <el-table-column align="center"
        label="精灵ID"
        prop="id">
      </el-table-column>
      <el-table-column align="center"
        label="精灵名"
        prop="name">
      </el-table-column>
      <el-table-column align="center"
        label="外观"
        prop="img">
        <template slot-scope="scope">
          <el-image
            style="width: 65px; height: 65px"
            :src="scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="等级"
        prop="lv">
      </el-table-column>
      <el-table-column align="center"
        label="获得时间"
        prop="meetTime">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search2"
            size="mini"
            placeholder="输入关键字搜索"/><el-button slot="append" icon="el-icon-search" @click="findpk"></el-button>
          <el-button slot="append" @click=" reset" > 返回</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            @click="deletep(scope.$index, scope.row)" type="danger" plain round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-dialog title="道具信息" :visible.sync="dialogTableVisible3" width="30%">
        <el-form :model="user">
          <el-form-item label="精灵球" :label-width="formLabelWidth">
            <el-input-number v-model="num1" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="超级球" :label-width="formLabelWidth">
          <el-input-number v-model="num2" :min="0"></el-input-number>
        </el-form-item>
          <el-form-item label="高级球" :label-width="formLabelWidth">
            <el-input-number v-model="num3" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="究极球" :label-width="formLabelWidth">
          <el-input-number v-model="num4" :min="0"></el-input-number>
        </el-form-item>
          <el-form-item label="大师球" :label-width="formLabelWidth">
            <el-input-number v-model="num5" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="up">确 定</el-button>
          <el-button @click="dialogTableVisible3 = false">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      dialogTableVisible1: true,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      total: null,
      currentPage1: 1,
      pageSize: 7,
      formLabelWidth: '120px',
      user: {
        id: '',
        name: '',
        pkmNum: '',
        ballNum: ''
      },
      pokemon: {
        id: '',
        name: '',
        img: '',
        lv: '',
        meetTime: ''
      },
      userid: '',
      username: '',
      list: [],
      list2: [],
      search: '',
      search2: '',
      userdate: [],
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllBag', {}).then((result) => {
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
      this.dialogTableVisible1 = false
      this.dialogTableVisible2 = true
      this.username = row.id
      postRequest('api/public/getPkmBag', {
        searchParam: row.id
      }).then((result) => {
        if (result.data.code === 200) {
          this.list2 = result.data.data
          // console.log(this.list2)
        } else if (result.data.code === -1) {
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleEdit2 (index, row) {
      this.userid = row.id
      this.dialogTableVisible3 = true
      postRequest('api/public/getBallBag', {
        searchParam: row.id
      }).then((result) => {
        if (result.data.code === 200) {
          // console.log(result.data.data)
          this.num1 = result.data.data.num1
          this.num2 = result.data.data.num2
          this.num3 = result.data.data.num3
          this.num4 = result.data.data.num4
          this.num5 = result.data.data.num5
        } else if (result.data.code === -1) {
        }
      }).catch(e => {
        console.log(e)
      })
    },
    reset () {
      this.dialogTableVisible2 = false
      this.dialogTableVisible1 = true
      this.list2 = []
      this.userdate2 = []
      this.fetchData()
    },
    up () {
      this.dialogTableVisible3 = false
      postRequest('api/public/upBall_pack', {
        userid: this.userid,
        ball1: this.num1,
        ball2: this.num2,
        ball3: this.num3,
        ball4: this.num4,
        ball5: this.num5
      }).then((result) => {
        if (result.data.code === 200) {
          this.fetchData()
          // console.log(this.list2)
        } else if (result.data.code === -1) {
        }
      }).catch(e => {
        console.log(e)
      })
      this.$message({
        message: '修改了！',
        type: 'success'
      })
      this.userid = ''
    },
    find () {
      postRequest('api/public/searchBag', {
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
    findpk () {
      postRequest('api/public/getPkmBagById', {
        userid: this.username,
        pokemon: this.search2
      }).then((result) => {
        if (result.data.code === 200) {
          this.list2 = []
          this.list2 = result.data.data
          // console.log(this.list2)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    deletep (index, row) {
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
    height: 83vh;
    position: absolute;
    left: 0;
    top: 110px;
    /*width: 95vw;*/
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .pagination{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
  .block{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
</style>
