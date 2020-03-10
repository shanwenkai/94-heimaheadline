<template>
  <el-card>

      <bread-crumb slot="header">
      <template slot="title">
          内容列表
      </template>

      </bread-crumb>
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态">
              <el-radio-group v-model="searchForm.status">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道类型:">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="日期范围:">
              <el-date-picker type="daterange" v-model="searchForm.dataRange">

              </el-date-picker>
          </el-form-item>
      </el-form>
      <el-row class="total" type="flex" align="middle">
        <span>共找到1000条复合条件的内容</span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <!-- 左侧内容 -->
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class="info">
              <span>{{item.title}}</span>
              <el-tag :type="item.status |filterType" class='tag' > {{ item.status | filterStatus }}</el-tag>
              <span class='date'>{{ item.pubdate }}</span>
            </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span><i class="el-icon-edit"></i> 修改</span>
          <span><i class="el-icon-delete"></i> 删除</span>
        </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5,
        channel_id: null,
        dataRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/20181028170355_xbdyg.jpg')
    }
  },

  filters: {
    filterStatus (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
        switch (value) {
        case 0 :
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
    }
  },

  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    },

    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>

      .total {
        height: 60px;
        border-bottom: 1px dashed #ccc;
      }
      // 对文章循环项进行样式的编写
       .article-item {
         display: flex;
         justify-content: space-between;
         padding: 20px  0;
         border-bottom: 1px solid #ccc;
         .left {
           display: flex;
           img {
             width: 180px;
             height: 100px;
             border-radius: 4px;
           }
           .info {
             display: flex;
             flex-direction: column;
             height: 100px;
             justify-content: space-around;
             margin-left: 10px;
             .date {
               color: #999;
               font-size:12px;
             }
             .tag {
               width: 60px;
             text-align: center;
             }
           }
         }
         .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
         }
       }

</style>
