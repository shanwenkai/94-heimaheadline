<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <!-- 使用el-table-column作为列 -->
      <!-- prop 表示显示的字段 label表示表头 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 可以放组件 -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status ? "关闭" : "打开"}}</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-row type='flex' justify="center" align="middle" style="height:80px">
      <!-- 分页组件 total 总页码  每页多少条-->
      <el-pagination background layout="prev, pager, next"
       :current-page="page.currentPage"
       :total="page.total"
       :page-size="page.pageSize"
       @current-change="changePage"
       ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0,
        currentPage: 10,
        pageSize: 10
      },
      list: [

      ],
      loading: false // 控制laoding遮罩层的显示
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage

      this.getComment()
    },
    getComment () {
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '打开 ' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开 '
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        })
          .then(() => {
            this.$message.succes(`${mess}评论成功`)
            this.getComment()
          })
          .catch(() => {
            this.$message.error(`${mess}评论失败`)
          })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
