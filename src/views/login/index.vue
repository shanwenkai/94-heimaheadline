<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单  需要绑定model属性-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin:20px">
        <!-- // 设置字段名 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input v-model="loginForm.code" style="width:200px" placeholder="请输入验证码"></el-input>
          <!-- 放置一个按钮 -->
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 是否同意点击 -->
          <el-checkbox v-model="loginForm.checked" >我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单的登录数据
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      // 定义表单验证规则
      loginRules: {
        // required 为 true 表示必填
        mobile: [{ required: true, message: '您的手机号码你不能为空' }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入手机号的格式'
        }], // 手机号码规则
        code: [{ required: true, message: '您的手机号码你不能为空' }, {
          pattern: /^\d{6}$/,
          message: '请输入验证码的格式'
        }], // 验证码规则
        checked: [{
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('您必须同意我们的条款'))
          }
          // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
          // new Error(错误信息) 就是我们提示的错误信息
        }] // 是否勾选规则
      }
    }
  },
  methods: {
    login () {
      //    this.$refs.loginForm 获取的就是el-form的对象实例
      // 第一种 回调函数 isOK, fields(没有校验通过的字段)
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法
      // 第二种方式 promise
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          method: 'post'
        }).then(result => {
          window.localStorage.setItem('user-token', result.data.token)
          this.$router.push('/home')
        }).catch(() => {
          this.$message.error('用户名或密码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url(../../assets/img/dee204e23d9a4ec5b173b3287d747596.jpg);
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        width: 200px;
      }
    }
  }
}
</style>
