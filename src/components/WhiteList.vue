<template>
  <div class="WhiteList">
    <div class="form">
      <a-form-model ref="ruleForm" layout="inline" :rules="rules">
        <a-form-model-item prop="name" class="formStyle">
          <a-input
            v-model="ruleForm.url"
            autocomplete="off"
            placeholder="请输入domin"
            style="width:220px;"
          />
        </a-form-model-item>
        <div class="buttonStyle">
          <a-button type="primary" @click="submitForm('ruleForm')">
            手动添加
          </a-button>
        </div>
        <div class="buttonStyle">
          <a-button type="primary" @click="submitForm('ruleForm')">
            自动添加当前网址
          </a-button>
        </div>
      </a-form-model>
    </div>

    <a-table
      :columns="whiteListColumns"
      :data-source="whiteList"
      :pagination="false"
      bordered
      rowKey="domian"
    >
    </a-table>
  </div>
</template>

<script>
import { Hash } from "@/utils/generateHash";
import { Storage } from "@/utils/storage";
export default {
  name: "WhiteList",

  props: {},

  mixins: [],

  components: {},

  data() {
    return {
      ruleForm: {
        domian: ""
      },
      rules: {
        domian: [
          {
            required: true,
            message: "请输入domin",
            trigger: ["blur", "change"]
          }
        ]
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      whiteList: [],
      whiteListColumns: [
        {
          title: "domain白名单",
          dataIndex: "domian",
          ellipsis: true,
          align: "center"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    if (Storage.get("whiteList")) {
      this.whiteList = Storage.get("whiteList");
    }
  },

  destroyed() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //id为列表唯一key
        if (valid) {
          let obj = {
            ...this.ruleForm,
            id: Hash.create(32)
          };
          let target = null;
          for (let i = 0; i < this.whiteList.length; i++) {
            //校验名称是否重复
            if (this.ruleForm.name == this.whiteList[i].domian) {
              //名称重读
              target = this.whiteList[i];
              break;
            }
          }
          if (target == null) {
            this.gatewayList.push(obj);
            this.ruleForm.domian = "";
          } else {
            this.$message.error("domin已经存在白名单中");
          }
          Storage.set("whiteList", this.whiteList);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.WhiteList {
  .ant-form {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="less" rel="stylesheet/less" scoped>
.WhiteList {
  .form {
    width: 100%;
    height: 42px;
    .formStyle {
      width: 236px;
      float: left;
    }
    .buttonStyle {
      float: left;
      padding-left: 6px;
      height: 42px;
      line-height: 42px;
    }
  }
}
</style>
