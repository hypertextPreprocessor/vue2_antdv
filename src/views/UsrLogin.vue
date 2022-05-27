<script>
import { defineComponent, onMounted, h, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { login } from "@api";
import img1 from "@img/bg1.jpeg";
import img2 from "@img/w2.jpg";
import img3 from "@img/w3.jpg";
import "swiper/less";
import "swiper/css/effect-fade";
import "swiper/less/autoplay";
import { Form } from "ant-design-vue";
import { useRouter } from "vue-router";
import verifyPoints from "@coms/verify/verifyPoints";
export default defineComponent({
  setup(props, { expose }) {
    const formRef = ref();
    const verifyModal = ref(false);
    const renew = ref(null);
    const useForm = Form.useForm;
    const formState = reactive({
      username: "",
      password: "",
      remember: false,
    });
    const rules = reactive({
      username: [
        {
          required: true,
          message: "请输入登录账号",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
    });
    const { validate, validateInfos } = useForm(formState, rules);
    const router = useRouter();
    function submitForm() {
      validate()
        .then(() => {
          verifyModal.value = true;
        })
        .catch((err) => {
          console.log(err);
          console.log(validateInfos.username);
        });
    }
    var dynamicTopVal = ref("20%");
    const { t } = useI18n();
    function adjustLayOut() {
      var value =
        window.document.documentElement.clientHeight / 2 -
        document.querySelector(".login_panel").clientHeight / 2;
      dynamicTopVal.value = value + "px";
    }
    onMounted(() => {
      window.onresize = function () {
        adjustLayOut();
      };
      adjustLayOut();
      console.log(props);
    });
    var imgs = [img1, img2, img3];
    var swiperItemStyle = [];
    for (var i = 0; i < imgs.length; i++) {
      swiperItemStyle.push({
        height: window.document.documentElement.clientHeight + "px",
        background: "url(" + imgs[i] + ") no-repeat center center/cover",
        backgroundColor: "rgba(0,0,0,0.6)",
        filter: "brightness(0.5)",
      });
    }
    expose({ t, EffectFade, swiperItemStyle, formState, dynamicTopVal });
    return () =>
      h(
        <a-layout-content>
          <div class="login_container">
            <div class="login_panel" style={{ top: dynamicTopVal.value }}>
              <div class="formarea">
                <h3 style={{ textAlign: "center" }}>{t("login.panelTitle")}</h3>
                <a-form
                  ref={formRef}
                  model={formState}
                  name="login"
                  label-col={{ span: 6 }}
                  wrapper-col={{ span: 18 }}
                  label-align="right"
                  rule={rules}
                >
                  <a-form-item
                    label="用户名"
                    name="username"
                    {...validateInfos.username}
                  >
                    <a-input v-model:value={formState.username}></a-input>
                  </a-form-item>
                  <a-form-item
                    label="密码"
                    name="password"
                    {...validateInfos.password}
                  >
                    <a-input-password
                      v-model:value={formState.password}
                    ></a-input-password>
                  </a-form-item>
                  <a-form-item
                    wrapper-col={{ offset: 6, span: 18 }}
                    name="remember"
                  >
                    <a-checkbox v-model:checked={formState.remember}>
                      记住我
                    </a-checkbox>
                  </a-form-item>
                  <a-form-item wrapper-col={{ offset: 0, span: 24 }}>
                    <a-button
                      type="primary"
                      size="large"
                      block
                      onClick={submitForm}
                    >
                      登录
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </div>
            <Swiper
              loop={true}
              modules={[EffectFade, Autoplay]}
              autoplay={{
                delay: 2500,
              }}
              effect="fade"
              slides-per-view="1"
              space-between={50}
            >
              {swiperItemStyle.map((item) => (
                <SwiperSlide style={item}></SwiperSlide>
              ))}
            </Swiper>
          </div>
          <a-modal
            v-model:visible={verifyModal.value}
            width={410}
            title="请完成安全验证"
            okText="刷新"
            cancelText="取消"
            onOk={() => {
              renew.value.refresh();
            }}
          >
            <verifyPoints
              captcha-type="clickWord"
              img-size={{ width: "362px", height: "162px" }}
              ref={renew}
              onError={(r) => {
                console.log(r);
              }}
              onSuccess={(res) => {
                verifyModal.value = false;
                login({
                  username: formState.username,
                  password: formState.password,
                  code: res,
                }).then((res) => {
                  if (res.code == 1) {
                    router.push({ path: "/main-common" });
                  }
                });
              }}
            />
          </a-modal>
        </a-layout-content>
      );
  },
});
</script>
<style scoped>
body,
html {
  padding: 0;
  margin: 0;
}
.login_container {
  position: relative;
  width: 100%;
}
.login_panel {
  position: absolute;
  right: 5%;
  top: 20%;
  z-index: 2;
  width: 362px;
  height: 466px;
  background: linear-gradient(180deg, #ff9e029c, #e40005db);
  box-shadow: 1px 3px 4px 5px #724748cc;
  border-radius: 6px;
}
.formarea {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
}
</style>
