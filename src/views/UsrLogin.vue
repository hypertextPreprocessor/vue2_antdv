
<script>
  import { defineComponent, onMounted,h,reactive } from 'vue';
  import {LayoutContent,Form,FormItem,Input,InputPassword,Checkbox,Button} from 'ant-design-vue';
  import {useI18n} from 'vue-i18n';
  import { EffectFade,Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import img1 from '@img/w1.jpeg';
  import img2 from '@img/w2.jpg';
  import img3 from '@img/w3.jpg';
  import 'swiper/less';
  import 'swiper/css/effect-fade';
  import 'swiper/less/autoplay';
  export default defineComponent({
    setup(props,{expose}){
      const formState = reactive({
        username:"",password:"",remember:false
      });
      const {t} = useI18n();
      onMounted(()=>{
        console.log(props);
      });
      var imgs = [img1,img2,img3];
      var swiperItemStyle=[];
      for(var i=0;i<imgs.length;i++){
        swiperItemStyle.push({
          height:window.document.documentElement.clientHeight+"px",
          background:"url("+imgs[i]+") no-repeat center center/cover",
          backgroundColor:"rgba(0,0,0,0.6)",
          filter:"brightness(0.5)"
        })
      }
      expose({t,EffectFade,swiperItemStyle,formState});
      return ()=>h(
         <LayoutContent>
            <div class="login_container">
              <div class="login_panel">
                <div class="formarea">
                  <h3 style={{textAlign:"center"}}>{t("login.panelTitle")}</h3>
                  <Form
                    model={formState}
                    name="login"
                    label-col={{span:6}}
                    wrapper-col={{span:18}}
                  >
                      <FormItem label="用户名" name="username">
                        <Input v-model:value={formState.username}></Input>
                      </FormItem>
                      <FormItem label="密码" name="password">
                        <InputPassword v-model:value={formState.password}></InputPassword>
                      </FormItem>
                      <FormItem name="remember" wrapper-col={{offset:6,span:18}}>
                        <Checkbox v-model:checked={formState.remember}>记住我</Checkbox>
                      </FormItem>
                      <FormItem wrapper-col={{offset:6,span:18}}>
                          <Button type="primary">登录</Button>
                      </FormItem>
                  </Form>
                </div>
              </div>
              <Swiper
                loop="true"
                modules={[EffectFade,Autoplay]}
                autoplay={{
                  delay: 2500
                }}
                effect="fade"
                slides-per-view="1"
                space-between="50"
              >
              {swiperItemStyle.map((item)=><SwiperSlide><div style={item}></div></SwiperSlide>)}
              </Swiper>
            </div>
         </LayoutContent>
      );
    }
  });
</script>
<style>
  body,html{
    padding:0;
    margin:0;
  }
  .login_container{
    position:relative;
    width:100%;
  }
  .login_panel{
    position:absolute;
    right:5%;
    top:20%;
    z-index:2;
    width: 362px;
    height: 466px;
    background:linear-gradient(180deg, #ff9e029c, #e40005db);
    box-shadow: 1px 3px 4px 5px #724748cc;
    border-radius: 6px;
  }
  .formarea{
    padding:10px;
  }
</style>