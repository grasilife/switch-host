<template>
  <div class="page-popup">
    <div class="titleContiner">
      <img src="../assets/切换.png" alt="" class="image" />
      <div class="title">环境切换</div>
      <div class="switch">
        <a-switch
          v-model="switchState"
          checked-children="开"
          un-checked-children="关"
          @change="switchChange"
        />
      </div>
    </div>
    <a-card :bordered="false" class="card">
      <div>
        <div class="tabContainer">
          <a-tabs @change="tabClick" v-model="tabState">
            <a-tab-pane key="switch" tab="切换"> </a-tab-pane>
            <a-tab-pane key="blackList" tab="白名单"> </a-tab-pane>
            <a-tab-pane key="gateway" tab="网关"> </a-tab-pane>
            <a-tab-pane key="host" tab="host"> </a-tab-pane>
          </a-tabs>
        </div>
        <div class="container">
          <div class="list" v-show="tabState == 'switch'">
            <a-list bordered :data-source="list">
              <a-list-item slot="renderItem" slot-scope="item">
                <div>{{ item.label }}</div>
                <div>
                  <a-switch
                    :checked="item.value == switchkey"
                    checked-children="开"
                    un-checked-children="关"
                    @change="envSwitchChange(item)"
                  />
                </div>
              </a-list-item>
            </a-list>
          </div>
          <div class="list" v-show="tabState == 'blackList'">
            <img src="../assets/logo.png" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
          <div class="list" v-show="tabState == 'gateway'">
            <div class="addGateway">
              <a-form-model
                ref="ruleForm"
                layout="inline"
                :model="ruleForm"
                :rules="rules"
              >
                <a-form-model-item prop="name">
                  <a-input
                    v-model="ruleForm.name"
                    autocomplete="off"
                    placeholder="轻输入网关名称"
                  />
                </a-form-model-item>
                <a-form-model-item prop="address">
                  <a-input
                    v-model="ruleForm.address"
                    autocomplete="off"
                    placeholder="轻输入网关ip"
                  />
                </a-form-model-item>
                <a-form-model-item class="buttonStyle">
                  <a-button type="primary" @click="submitForm('ruleForm')">
                    添加
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
            <a-table
              :columns="columns"
              :data-source="gatewayList"
              :pagination="false"
              bordered
              rowKey="id"
            >
              <div slot="operation" slot-scope="">
                <template>
                  <div class="handle" style="float:left;padding-right:12px;">
                    <a-button type="primary" size="small">
                      编辑
                    </a-button>
                  </div>
                  <div class="handle">
                    <a-button type="danger" size="small">
                      删除
                    </a-button>
                  </div>
                </template>
              </div>
            </a-table>
          </div>
          <div class="list" v-show="tabState == 'host'"></div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "Home",

  props: {
    data: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },

  mixins: [],

  components: {},

  data() {
    let validatePass = (rule, value, callback) => {
      let regexp = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
      let valdata = value.split(",");
      let isCorrect = true;
      if (valdata.length) {
        for (let i = 0; i < valdata.length; i++) {
          if (regexp.test(valdata[i]) == false) {
            isCorrect = false;
          }
        }
      }

      if (value === "") {
        callback(new Error("请输入ip地址"));
      } else if (!isCorrect) {
        callback(new Error("请输入正确的ip地址"));
      } else {
        callback();
      }
    };
    return {
      columns: [
        {
          title: "网关名称",
          dataIndex: "name",
          key: "name",
          ellipsis: true,
          align: "center"
        },
        {
          title: "网关地址",
          dataIndex: "address",
          key: "address",
          ellipsis: true,
          align: "center"
        },
        {
          title: "操作",
          dataIndex: "operation",
          ellipsis: true,
          width: 140,
          scopedSlots: { customRender: "operation" },
          fixed: "right",
          align: "center"
        }
      ],
      ruleForm: {
        name: "",
        address: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入网关名称",
            trigger: "blur"
          }
        ],
        address: [{ required: true, validator: validatePass, trigger: "blur" }]
      },
      layout: {
        labelCol: { span: 1 },
        wrapperCol: { span: 10 }
      },
      switchkey: "online",
      switchState: false,
      tabState: "switch",
      gatewayList: [
        {
          name: "localhost",
          address: "127.0.0.1",
          id: 0
        }
      ],
      list: [
        {
          label: "正式环境",
          value: "online"
        },
        {
          label: "灰度环境",
          value: "gray"
        },
        {
          label: "测试环境",
          value: "dev"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    submitForm(formName) {
      console.log(formName, "formName");
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            ...this.ruleForm,
            id: this.gatewayList.length
          };
          this.gatewayList.push(obj);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    envSwitchChange(item) {
      this.switchkey = item.value;
    },
    switchChange() {
      console.log(this.switchState);
    },
    tabClick() {
      console.log(this.tabState);
    }
  }
};
</script>
<style lang="less"></style>
<style lang="less" rel="stylesheet/less" scoped>
.page-popup {
  width: 520px;
  //   height: 500px;
  background: #e8eaec;
  padding: 0px 8px 8px 8px;
  .titleContiner {
    height: 52px;
    padding: 8px 0px 0px 0px;

    width: 100%;
    // float: left;
    .image {
      width: 32px;
      height: 32px;
      float: left;
    }
    .title {
      height: 32px;
      line-height: 32px;
      float: left;
      padding: 0px 12px 0px 12px;
    }
    .switch {
      height: 32px;
      float: right;
      line-height: 32px;
    }
  }
  .card {
    // height: calc(100% - 60px);
    width: 100%;
    overflow: auto;
    // float: left;
    .tabContainer {
      height: 52px;
      width: 100%;
    }
    .container {
      //   height: calc(100% - 52px);
      width: 100%;
      .title {
        text-align: left;
      }
    }
  }
  .addGateway {
    padding: 0px 0px 12px 0px;
    .buttonStyle {
      float: right;
      margin-right: 0px;
    }
    .handle {
      padding-right: 12px;
      //   float: left;
    }
  }
}
</style>
