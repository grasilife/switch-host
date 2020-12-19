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
          <div class="list" v-if="tabState == 'switch'">
            <a-list bordered :data-source="gatewayList">
              <a-list-item slot="renderItem" slot-scope="item">
                <div>{{ item.name }}</div>
                <div>
                  <a-switch
                    :checked="item.address == switchkey"
                    checked-children="开"
                    un-checked-children="关"
                    @change="envSwitchChange(item)"
                  />
                </div>
              </a-list-item>
            </a-list>
          </div>
          <div class="list" v-if="tabState == 'blackList'">
            <a-table
              :columns="blackListColumns"
              :data-source="blackList"
              :pagination="false"
              bordered
              rowKey="domin"
            >
            </a-table>
          </div>
          <div class="list" v-if="tabState == 'gateway'">
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
                    {{ handleText }}
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
            <a-table
              :columns="columns"
              :data-source="gatewayList"
              :pagination="false"
              bordered
              rowKey="name"
            >
              <div slot="operation" slot-scope="record">
                <template>
                  <div class="handle" style="float:left;padding-right:12px;">
                    <a-button
                      type="primary"
                      size="small"
                      @click="gatewayEdit(record)"
                    >
                      编辑
                    </a-button>
                  </div>
                  <div class="handle">
                    <a-button
                      type="danger"
                      size="small"
                      @click="gatewayRemove(record)"
                    >
                      删除
                    </a-button>
                  </div>
                </template>
              </div>
            </a-table>
          </div>
          <div class="list" v-if="tabState == 'host'"></div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Storage } from "./utils/storage";
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
      blackList: [],
      blackListColumns: [
        {
          title: "domain白名单",
          dataIndex: "domain",
          ellipsis: true,
          align: "center"
        }
      ],
      editName: "",
      handleText: "添加",
      columns: [
        {
          title: "网关名称",
          dataIndex: "name",
          ellipsis: true,
          align: "center"
        },
        {
          title: "网关地址",
          dataIndex: "address",
          ellipsis: true,
          align: "center"
        },
        {
          title: "操作",
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
          name: "灰度环境",
          address: "124.250.113.18"
        },
        {
          name: "测试环境",
          address: "120.52.32.211"
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

  mounted() {
    if (Storage.get("gatewayList")) {
      this.gatewayList = Storage.get("gatewayList");
    }
    if (Storage.set("blackList")) {
      this.blackList = Storage.set("blackList");
    }
  },

  destroyed() {},

  methods: {
    getPacScript() {
      var script = "";
      let results = this.list.filter(it => it.enable);
      for (var i = 0; i < results.length; i++) {
        let info = results[i];
        script += i === 0 ? "if" : "else if";
        if (info.domain.indexOf("/") > 0) {
          script +=
            '(shExpMatch(url, "http://' +
            info.domain +
            '") || shExpMatch(url, "https://' +
            info.domain +
            '"))';
        } else if (info.domain.indexOf("*") > -1) {
          script += '(shExpMatch(host, "' + info.domain + '"))';
        } else {
          script += '(host == "' + info.domain + '")';
        }
        script += '{return "PROXY ' + info.target + '; DIRECT";}\n';
      }
      if (script) script += 'else { return "DIRECT"; }';

      let data = `
function FindProxyForURL(url,host){
  if(shExpMatch(url, "http:*") || shExpMatch(url, "https:*")){
    ${script}
  } else {
    return "DIRECT";
  }
}
      `;
      return data;
    },
    setPacScript() {
      //   var script = "";
      //   //核心函数,如果符合条件就走带来
      //   if (this.switchState == true) {
      //     //我们对该网站开启代理
      //     script +=
      //       'if(shExpMatch(url, "http://' +
      //       '") || shExpMatch(url, "https://' +
      //       '"))';
      //     script += '{return "PROXY ' + info.target + '; DIRECT";}\n';
      //   }
      //   let data = `
      //          function FindProxyForURL(url,host){
      //          if(shExpMatch(url, "http:*") || shExpMatch(url, "https:*")){
      //          ${script}
      //          } else {
      //          return "DIRECT";
      //        }
      //          }
      //   `;
      //   return data;
    },
    setProxy(enable) {
      if (enable === undefined) {
        enable = Storage.get("enable");
        if (enable === "") enable = true;
        else if (enable === false) return;
      } else {
        Storage.set("enable", enable);
      }
      // let defaultMode = Storage.get('defaultMode') || 'DIRECT'
      let config = enable
        ? { mode: "pac_script", pacScript: { data: this.getPacScript() } }
        : { mode: "system" };
      window.chrome.proxy.settings.set({ scope: "regular", value: config });
      // this.refreshDataForBk()
    },
    gatewayEdit(record) {
      this.handleText = "编辑";
      console.log(record, "id, record");
      this.ruleForm.name = record.name;
      this.ruleForm.address = record.address;
      this.editName = record.name;
    },
    gatewayRemove(record) {
      console.log(record, "id, record");
      let target = null;
      for (let i = 0; i < this.gatewayList.length; i++) {
        if (record.name == this.gatewayList[i].name) {
          target = i;
          break;
        }
      }
      console.log(target, "target");
      if (target != null) {
        console.log(this.gatewayList, target, "jahuhauhuauh");
        this.gatewayList.splice(target, 1);
      }
      Storage.set("gatewayList", this.gatewayList);
    },
    submitForm(formName) {
      console.log(formName, "formName");
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            ...this.ruleForm,
            state: false
          };
          let target = null;
          for (let i = 0; i < this.gatewayList.length; i++) {
            //校验名称是否重复
            if (this.ruleForm.name == this.gatewayList[i].name) {
              //名称重读
              target = i;
              this.$message.error("网关名称重复, 请修改名称");
              break;
            }
          }
          if (target == null) {
            if (this.handleText == "添加") {
              this.gatewayList.push(obj);
              this.ruleForm.name = "";
              this.ruleForm.address = "";
            } else {
              for (let i = 0; i < this.gatewayList.length; i++) {
                if (this.editName == this.gatewayList[i].name) {
                  this.gatewayList[i].name = this.ruleForm.name;
                  this.gatewayList[i].address = this.ruleForm.address;
                  this.handleText = "添加";
                  this.$message.success("编辑成功");
                  this.ruleForm.name = "";
                  this.ruleForm.address = "";
                  break;
                }
              }
            }
          }
          Storage.set("gatewayList", this.gatewayList);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    envSwitchChange(item) {
      this.switchkey = item.address;
      for (let i = 0; i < this.gatewayList.length; i++) {
        if (item.name == this.gatewayList[i].name) {
          this.gatewayList[i].state = true;
        } else {
          this.gatewayList[i].state = false;
        }
      }
      Storage.set("gatewayList", this.gatewayList);
    },
    switchChange() {
      let thisp = this;
      console.log(this.switchState);
      //将该域名加到白名单
      let domain = document.domain;
      if (this.switchState == true) {
        let obj = {
          domain: domain
        };
        console.log(this.blackList, "this.blackList");
        //重复的就不添加了
        let target = null;
        for (let i = 0; i < thisp.blackList.length; i++) {
          if (domain == thisp.blackList[i].domain) {
            target = i;
          }
        }
        if (target == null) {
          thisp.blackList.push(obj);
        }
      }
      Storage.set("blackList", this.blackList);
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
