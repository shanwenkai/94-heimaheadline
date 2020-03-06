<template>
  <!-- //  默认二级组件 -->
  <div class="second-home">
        <el-carousel :interval="5000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://spro.so.com/searchthrow/api/midpage/throw?ls=s112c46189d&lm_extend=ctype:3&ctype=3&q=%E6%B5%B7%E8%B4%BC%E7%8E%8B&rurl=http%3A%2F%2Fp0.so.qhmsg.com%2Ft0103b4ad445444f243.jpg&img=http%3A%2F%2Fp0.so.qhmsg.com%2Ft0103b4ad445444f243.jpg&key=t0103b4ad445444f243.jpg&s=1583496503192',
        '../../assets/img/9a9d30e9d7d94cb1904ced3ddfb6d89f.jpg',
        '../../assets/img/t0103b4ad445444f243.jpg']
    }
  }
}
</script>

<style>
.second-home {
    background: url('../../assets/img/6J_m-hrpcmqv2751864.jpg');
    height: calc(100vh - 80px);
    background-size: cover;
}
</style>
