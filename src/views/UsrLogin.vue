<template>
<section class="user">
  <div class="user_options-container">
    <div class="user_options-text">
      <div class="user_options-unregistered">
        <h2 class="user_unregistered-title">{{t("login.yzt")}}</h2>
        <p class="user_unregistered-text">{{t("login.yztDesc")}}</p>
        <button class="user_unregistered-signup" ref="signupButton">{{t("login.change")}}</button>
      </div>

      <div class="user_options-registered">
        <h2 class="user_registered-title">{{t("login.panelTitle")}}</h2>
        <p class="user_registered-text">{{t("login.psldesc")}}</p>
        <button class="user_registered-login" ref="loginButton">{{t("login.change")}}</button>
      </div>
    </div>
    <!--密码登录方式-->
    <div class="user_options-forms" ref="userOptionsForms">
      <div class="user_forms-login">
        <h2 class="forms_title">{{t("login.panelTitle")}}</h2>
        <form class="forms_form">
          <fieldset class="forms_fieldset">
            <div class="forms_field">
              <input type="text"  v-model="userName" :placeholder='t("login.m.phone")' class="forms_field-input" required autofocus />
            </div>
            <div class="forms_field">
              <input type="password" v-model="password" :placeholder='t("login.m.pwd")' class="forms_field-input" required />
            </div>
            <div class="forms_field" style="display:flex;flex-flow:row nowrap;">
              <input type="text" v-model="validateCode" :placeholder='t("login.m.vcd")' class="forms_field-input" required/>
              <img :src="validateCodeUrl" @click="imgCodeGen" style="cursor: pointer;"/>
            </div>
          </fieldset>
          <div class="forms_buttons" style="justify-content:flex-end;">
            <!--<button type="button" class="forms_buttons-forgot">Forgot password?</button>-->
            <input type="button" :value='t("login.loginBtn")' class="forms_buttons-action" @click="loginByPwd">
          </div>
        </form>
      </div>
      <div class="user_forms-signup">
        <h2 class="forms_title">{{t("login.yzt")}}</h2>
        <form class="forms_form">
          <fieldset class="forms_fieldset">
            <div class="forms_field">
              <input type="text" v-model="userName" :placeholder='t("login.s.phone")' class="forms_field-input" required />
            </div>
            <div class="forms_field" style="display:flex;flex-flow:row nowrap;">
              <input type="text" v-model="smsCode" :placeholder='t("login.s.sms")' class="forms_field-input" required />
              <a-button type="primary" style="width:100px;color:#ffffff;background:#e8716d;" @click="getSmsCode" :disabled="canGetCode">{{ btnText }}</a-button>
            </div>
            <div class="forms_field" style="display:flex;flex-flow:row nowrap;">
              <input type="text" v-model="validateCode" :placeholder='t("login.s.imgc")' class="forms_field-input" required />
              <img :src="validateCodeUrl" @click="imgCodeGen" style="cursor: pointer;"/>
            </div>
          </fieldset>
          <div class="forms_buttons">
            <input type="button" :value='t("login.loginBtn")' class="forms_buttons-action" @click="loginBySms">
          </div>
        </form>
      </div>
    </div>
  </div>
  <a-modal :maskClosable="false" :cancelText='t("login.popModal.cancelText")' :okText='t("login.popModal.okText")' v-model:visible="visible" :title='t("login.popModal.title")' @ok="handleOk" @cancel="handleCancel">
    <a-form
      ref="formRef"
      :model="formState"
    >
      <a-form-item
        label=""
        name="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <a-input-password v-model:value="formState.password" :placeholder='t("login.popModal.p1")'/>
      </a-form-item>
      <a-form-item
        label=""
        name="rePassword"
        :rules="[
          { required: true, message: '密码不能为空' },
          {validator:repassValidate}
        ]"
      >
        <a-input-password v-model:value="formState.rePassword" :placeholder='t("login.popModal.p2")'/>
      </a-form-item>
    </a-form>
  </a-modal>
</section>
</template>
<script setup>
import {ref, onMounted ,reactive} from 'vue';
import { useI18n } from 'vue-i18n';
import { message } from 'ant-design-vue';
import { useConfig } from '@store';
import { useRouter } from 'vue-router'
import {imgCode,/*getPublicKey,*/login,sendSmsCode,loginBySmsCode,setNewPassword} from "@api";
const formRef = ref();
const store = useConfig();
const signupButton = ref(null);
const loginButton = ref(null);
const userOptionsForms = ref(null);
const { t } = useI18n({ useScope: 'global'});
const validateCodeUrl = ref(null);
const validateCode = ref(null);
const validateCodeId = ref(null);
const smsCode = ref(null);
const btnText = ref("获取");
//const publicKey = ref(null);
//const rsaId = ref(null);
const userName = ref(null);
const password = ref(null);
const canGetCode = ref(false);
const smsId = ref(null);
const visible = ref(false);
var interval;
const router = useRouter();
const formState = reactive({
  password:undefined,
  rePassword:undefined
});
const onFinish = () => {
  formRef.value.validate().then(()=>{
    setNewPassword({password:formState.password,rePassword:formState.rePassword}).then(res=>{
      var {code} = res.data;
      if(code===1){
        routeToRoleList();
      }
    })
  })
};
async function repassValidate(_rule,value){
  if(formState.password !== value){
    return Promise.reject('两次输入的密码不一致');
  }else{
    return Promise.resolve();
  }
}
function imgCodeGen(){
  imgCode().then(c=>{
    validateCodeUrl.value = c[0];
    validateCodeId.value = c[1];
  });
}
function routeToRoleList(){
  router.push({name:"role"})
}
function getSmsCode(){
  if(userName.value==null || userName.value==""){
    message.error("手机号不能为空");
  }else if(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(userName.value)){
    canGetCode.value = true;
    if(interval)clearInterval(interval);
    var tick = 10;
    interval = setInterval(()=>{
      btnText.value= tick + 's';
      tick--;
      if(tick<0){
        canGetCode.value = false;
        clearInterval(interval);
        btnText.value= "获取";
      }
    },1000);
    //获取验证码
    sendSmsCode().then(({data})=>{
      var {code,data:D} = data;
      if(code===1){
        smsId.value = D;
      }
    })
  }else{
    message.error("手机号码输入有误");
  }
}
function handleOk(){
  onFinish();
}
function handleCancel(){
  routeToRoleList();
}
function loginBySms(){
  if(userName.value==null || userName.value==""){
    message.error("手机号不能为空");
  }else if(smsCode.value==null || smsCode.value==""){
    message.error("短信验证码不能为空");
  }else if(validateCode.value==null || validateCode.value==""){
    message.error("图形验证码不能为空");
  }else if(smsId.value==null){
    message.error("非法途径获取的验证码");
  }else{
    if(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(userName.value)){
      loginBySmsCode({
        userName:userName.value,
        smsCode:smsCode.value,
        smsId:smsId.value,
        validateCode:validateCode.value,
        validateCodeId:validateCodeId.value
      }).then(({data})=>{
        var {code,data:D} = data;
        if(code===1){
          store.userToken = D;
          sessionStorage.setItem("userToken",D);
          visible.value = true;
        }
      });
    }else{
      message.error("手机号码输入有误");
    }
  }
}
function loginByPwd(){
  if(userName.value==null || userName.value==""){
    message.error("手机号不能为空");
  }else if(password.value==null || password.value==""){
    message.error("密码不能为空");
  }else if(validateCode.value==null || validateCode.value==""){
    message.error("验证码不能为空");
  }else{
    if(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(userName.value)){
      login({
        userName:userName.value,
        password:password.value,
        validateCode:validateCode.value,
        validateCodeId:validateCodeId.value
      }).then(({data})=>{
        var {code,data:D} = data;
        if(code===1){
          store.userToken = D;
          sessionStorage.setItem("userToken",D);
          routeToRoleList();
        }
      })
      /*无需加密
      getPublicKey().then(res=>{
        var {code,data} = res.data;
        if(code==1){
          publicKey.value = data.publicKey;
          rsaId.value = data.rsaId;
          var publicKeyStr =`-----BEGIN PUBLIC KEY-----\n${data.publicKey}\n-----END PUBLIC KEY-----`;
        }
      })
      */

    }else{
      message.error("手机号码输入有误");
    }
  }
}
onMounted(()=>{
  imgCodeGen();
    /**
 * Add event listener to the "Sign Up" button
 */
signupButton.value.addEventListener('click', () => {
    userOptionsForms.value.classList.remove('bounceRight')
    userOptionsForms.value.classList.add('bounceLeft')
}, false)

/**
 * Add event listener to the "Login" button
 */
loginButton.value.addEventListener('click', () => {
    userOptionsForms.value.classList.remove('bounceLeft')
    userOptionsForms.value.classList.add('bounceRight')
}, false)
});
</script>
<style scoped>
/**
 * * General variables
 * */
/**
 * * General configs
 * */
 * {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type=submit] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * Page background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #ccc;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}
.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #e8716d;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #e14641;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
          animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
          animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
          animation: bounceRight 1s forwards;
}

/**
 * * Responsive 990px
 * */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }
  .user_options-forms .forms_buttons {
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
.user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>