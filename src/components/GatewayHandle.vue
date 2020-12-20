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
</template>

<script>
import { Hash } from "@/utils/generateHash";
import { Storage } from "@/utils/storage";
export default {
  name: "GatewayHandle",

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
      }
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    if (Storage.get("gatewayList")) {
      this.gatewayList = Storage.get("gatewayList");
    }
  },

  destroyed() {},

  methods: {
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
        //id为列表唯一key
        if (valid) {
          let obj = {
            ...this.ruleForm,
            state: false,
            id: Hash.create(32)
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
          this.$emit("submit", this.gatewayList);
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
  .handle {
    padding-right: 12px;
    //   float: left;
  }
}
</style>
