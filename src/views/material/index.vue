<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
   <el-row type="flex" justify="end">
      <el-upload :show-file-list="false"  :http-request="uploadImg" action="">
      <el-button type="primary" size="small">
        上传素材
      </el-button>
    </el-upload>
   </el-row>
    <el-tabs v-model="activeName" @tab-click='changeTab'>
      <el-tab-pane name="all" label="全部">
        <div class="img-list">
          <el-card class='img-card' v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i @click="collectOrcancel(item)" :style="{color: item.is_collectd ? 'red' : 'black'}" class="el-icon-star-on"> </i>
              <i @click="delMaterial(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane name="collect" label="收藏">
          <div class="img-list">
          <el-card class='img-card' v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">

            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination background
        :total="page.total"
        :current-page="page.currentPage"
         :page-size="page.pageSize"
         layout="prev,pager,next"
         @current-change="changePage"
        >
        </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      list: [], // 接收素材数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    delMaterial (row) {
      this.$confirm('你确定要删除该图片吗', '提示').then(() => {
        this.$axios({
          url: `/user/images/${row.id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    },
    collectOrcancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    // 改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签方法
    changeTab () {
      this.page.currentPage = 1 // 重置回第一页
      this.getMaterial() // 调用获取数据方法
    },
    // 获取素材的方法
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect' // 传false是获取所有的数据 传true是获取收藏数据
        }
      }).then(result => {
        this.list = result.data.results // 获取图片数据 有可能是 全部 也由可能是收藏
        this.page.total = result.data.total_count // 总条数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 220px;
    height: 240px;
    margin: 20px 40px;
    position: relative;
      img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background:#f4f5f6;
      height: 30px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
