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
    <a-table
      :columns="columns"
      :data-source="gatewayList"
      :pagination="false"
      bordered
      rowKey="id"
    >
      <div slot="operation" slot-scope="record">
        <template>
          <div class="handle" style="float:left;padding-right:12px;">
            <a-button type="primary" @click="gatewayEdit(record)">
              修改
            </a-button>
          </div>
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
      editId: "",
      handleText: "添加",
      columns: [
        // {
        //   title: "id",
        //   dataIndex: "id",
        //   ellipsis: true,
        //   align: "center"
        // },
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
          width: 180,
          scopedSlots: { customRender: "operation" },
          fixed: "right",
          align: "center"
        }
      ],
      gatewayList: [
        {
          name: "灰度环境",
          address: "124.250.113.18",
          id: "wgGdIBNcRtVnNWfuU5IF3h1Dql4hzLLf"
        },
        {
          name: "测试环境",
          address: "120.52.32.211",
          id: "3ZXNGcFIrCmRPjxKA8WX5qgAH5s_6YD0"
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
    console.log(Hash.create(32), "generateHash");
    if (Storage.get("gatewayList")) {
      this.gatewayList = Storage.get("gatewayList");
    }
  },

  destroyed() {},

  methods: {
    gatewayEdit(record) {
      this.handleText = "修改";
      console.log(record, "id, record");
      this.ruleForm.name = record.name;
      this.ruleForm.address = record.address;
      this.editId = record.id;
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
      this.$refs[formName].validate(valid => {
        //id为列表唯一key
        if (valid) {
          if (this.handleText == "添加") {
            let obj = {
              ...this.ruleForm,
              state: false,
              id: Hash.create(32)
            };
            this.gatewayList.push(obj);
            this.ruleForm.name = "";
            this.ruleForm.address = "";
          } else {
            //修改
            for (let i = 0; i < this.gatewayList.length; i++) {
              if (this.editId == this.gatewayList[i].id) {
                this.gatewayList[i].name = this.ruleForm.name;
                this.gatewayList[i].address = this.ruleForm.address;
                this.handleText = "添加";
                this.$message.success("修改成功");
                this.ruleForm.name = "";
                this.ruleForm.address = "";

                break;
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
