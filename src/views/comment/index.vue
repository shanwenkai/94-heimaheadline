<template>
 <el-card>
    <bread-crumb slot="header">
       <template slot="title">
         评论列表
         </template>
    </bread-crumb>
    <el-table :data="list">
       <!-- 使用el-table-column作为列 -->
       <!-- prop 表示显示的字段 label表示表头 -->
       <el-table-column prop="title" width="600"  label="标题"></el-table-column>
       <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
       <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
       <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
       <el-table-column  label="操作">
          <!-- 可以放组件 -->
          <template slot-scope="obj">
              <el-button  size="small" type='text'>修改</el-button>
              <el-button  @click="openOrClose(obj.row)" size="small" type='text'>{{obj.row.comment_status ? "关闭" : "打开"}}</el-button>
          </template>

       </el-table-column>
    </el-table>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [{ id: 1, name: '望京', date: '2020' }]
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        method: 'put',
        params: {
          response_type: 'comment'
        }

      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '打开 ' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开 '
      this.$confirm(`是否确定${mess}`).then(() => {
        this.$axios({
          url: '/comments/status',
          params: {
            article_id: row.id
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => {
          this.$message.succes(`${mess}评论成功`)
          this.getComment()
        }).catch(() => {
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
