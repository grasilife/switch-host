<template>
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
          placeholder="请输入URL"
        />
      </a-form-model-item>
      <a-form-model-item class="buttonStyle">
        <a-button type="primary" @click="submitForm('ruleForm')">
          添加网址
        </a-button>
        <a-button type="primary" @click="autoSubmitForm" class="addStyle">
          添加当前URL到白名单
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table
      :columns="columns"
      :data-source="whiteList"
      :pagination="false"
      bordered
      rowKey="id"
    >
      <div slot="operation" slot-scope="record">
        <template>
          <div class="handle">
            <a-button type="danger" @click="gatewayRemove(record)">
              删除
            </a-button>
          </div>
        </template>
      </div>
    </a-table>
  </div>
</template>

<script>
import { Hash } from "@/utils/generateHash";
import { mapState } from "vuex";
import { Proxy } from "@/utils/proxy";
export default {
  name: "WhiteList",

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
    return {
      editId: "",
      handleText: "添加",
      columns: [
        {
          title: "Domain",
          dataIndex: "name",
          ellipsis: true,
          align: "center"
        },
        {
          title: "操作",
          ellipsis: true,
          width: 120,
          scopedSlots: { customRender: "operation" },
          fixed: "right",
          align: "center"
        }
      ],
      ruleForm: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入URL",
            trigger: ["blur", "change"]
          },
          {
            type: "url",
            message: "请输入正确的url地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      layout: {
        labelCol: { span: 1 },
        wrapperCol: { span: 18 }
      }
    };
  },

  computed: {
    ...mapState({
      whiteList: state => {
        return state.views.app.whiteList;
      },
      switchIndex: state => {
        return state.views.app.switchIndex;
      },
      proxyList: state => {
        return state.views.app.proxyList;
      },
      switchState: state => {
        return state.views.app.switchState;
      }
    })
  },

  watch: {
    whiteList(val) {
      console.log(val, "valvalvalvalval");
      //这个列表发生变化,就重新设置代理
      let list = [];
      for (let i = 0; i < val.length; i++) {
        let obj = {
          isOpen: true,
          domain: val[i].name,
          ip: this.switchIndex.address
        };
        console.log(obj, "objobjobjobj");
        list.push(obj);
      }

      this.$store.commit("views/app/updateProxyList", list);
      this.doProxy(this.proxyList);
    }
  },

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    doProxy(hostList) {
      if (this.switchState) {
        Proxy.setProxy(hostList);
      } else {
        Proxy.cancelProxy();
      }
    },
    autoSubmitForm() {
      window.chrome.tabs.getSelected(null, function(tab) {
        console.log(tab, "urlurlurl");
        let domain = this.getDomain(tab.url).domain;
        this.add(domain);
        this.$message.success("Domain添加成功");
      });
    },
    gatewayRemove(record) {
      this.$store.commit("views/app/whiteListRemove", record);
    },
    getDomain(url) {
      let domain = "";
      let st = url.split("//")[1];
      console.log(st, "ststst");
      let domainAndport = st.split("/")[0];
      if (domainAndport.includes(":")) {
        domain = domainAndport.split(":")[0];
      } else {
        domain = domainAndport;
      }
      console.log(domain, "domain");

      return domain;
    },
    add(domain) {
      console.log(domain, "domaindomaindomain");
      let obj = {
        name: domain,
        id: Hash.create(32)
      };
      console.log(obj, "obj");
      let target = null;

      for (let i = 0; i < this.whiteList.length; i++) {
        //校验名称是否重复
        if (domain == this.whiteList[i].name) {
          //名称重读
          target = i;
          break;
        }
      }
      if (target == null) {
        this.$store.commit("views/app/whiteListAdd", obj);
        this.ruleForm.name = "";
        this.$message.success("Domain添加成功");
      } else {
        this.$message.error("白名单中已经存在该Domain,不用再添加");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //id为列表唯一key
        if (valid) {
          //将url转换为domain
          console.log(formName, "formName");
          let domain = this.getDomain(this.ruleForm.name);
          this.add(domain);
          this.$emit("submit", this.whiteList);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.addGateway {
  padding: 0px 0px 12px 0px;
  .buttonStyle {
    float: right;
    margin-right: 0px;
  }
  .addStyle {
    margin-left: 6px;
  }
  .handle {
    padding-right: 12px;
    //   float: left;
  }
}
</style>
