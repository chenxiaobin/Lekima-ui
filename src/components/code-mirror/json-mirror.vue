<template>
  <div class="json-mirror">
    <div class="json-mirror-config">
      <codemirror v-if="isLoad" v-model="markCode" :options="cmOptions"></codemirror>
    </div>
    <div class="json-mirror-validate">
      <le-button type="primary" size="mini" @click="onValidate">Json校验</le-button>
      <le-button class="json-mirror-sure" type="primary" size="mini" @click="onSave" v-if="isButton">保存</le-button>
    </div>
    <div v-if="validate.alertType" class="json-mirror-alert" :class="validate.alertType === 'success' ? 'json-mirror-success' : 'json-mirror-error'">
      <div class="json-alert__content">
        <span class="json-alert__title">{{validate.validateMessage}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import leButton from '../button'
import Utils from '../../utils/utils2'

/**
 * 基础组件，json代码展示框
 * @example ../../docs/code-mirror/json.md
 * @displayName Json Mirror
 */
export default {
  name: 'leJsonMirror',
  model: {
    event: 'json-save-nobtn',
    prop: 'code'
  },
  props: {
    /**
     * json片段，可以是JSON.stringify转换后的字符串
     */
    code: {
      type: [Object, String]
      // required: true
    },
    isButton: {
      type: Boolean,
      default: true
    }
  },
  components: { codemirror, leButton },
  data () {
    return {
      isLoad: true,
      cmOptions: {
        tabSize: 2,
        lineNumbers: true,
        line: true,
        theme: 'default',
        language: 'text/javascript',
        autofocus: false,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: false, // 长文本是否换行
        foldGutter: false, // 是否可折叠
        indentUnit: 2, // 代码缩进单位
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        extraKeys: { 'Ctrl': 'autocomplete' } // 快捷键绑定，代码自动补全
      },
      type: 'default',
      markCode: '',
      validate: {
        alertType: null,
        validateMessage: ''
      }
    }
  },
  watch: {
    code () {
      this.buildCode()
    },
    markCode () {
      if (!this.isButton) {
        this.$emit('json-save-nobtn', JSON.parse(this.markCode))
      }
    }
  },
  mounted () {
    this.buildCode()
  },
  methods: {
    buildCode () {
      this.handleCodeChange()
      let code = this.code
      if (typeof code === 'string') {
        code = JSON.parse(code)
      }
      this.markCode = JSON.stringify(code, null, 2)
    },
    handleCodeChange () {
      this.isLoad = false
      this.$nextTick(() => {
        this.isLoad = true
      })
    },
    // 校验
    onValidate () {
      // file.validateMessage = ''
      this.$set(this.validate, 'validateMessage', '')
      if (!this.markCode) {
        return
      }
      var reg = /("([^\\\\"]*(\\.)?)*")|('([^\\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g
      let content = this.markCode.replace(reg, function (word) { // 去除注释后的文本
        return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? '\n' : word
      })

      let vresult = Utils.parseJson(content)
      if (vresult !== true) {
        this.validate.alertType = 'error'
        this.validate.validateMessage = vresult[0].message
      }
      if (!this.validate.validateMessage) {
        this.validate.alertType = 'success'
        this.validate.validateMessage = '校验通过'
      }
    },
    onSave () {
      /**
       * 保存确认
       */
      this.$emit('json-save', JSON.parse(this.markCode))
    }
  }
}
</script>
<style>
.json-mirror{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.json-mirror-config{
  width: 100%;
  height: calc(100% - 40px);
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.json-mirror-config .vue-codemirror,
.json-mirror-config .CodeMirror{
  height: 100%;
  z-index: 0;
}
.json-mirror-validate{
  width: calc(100% - 10px);
  height: 25px;
  padding: 5px 0;
  margin: 0 5px;
  text-align: right;
  border-top: 1px solid #dddddd;
}
.json-mirror-sure{
  display: inline-block;
  margin-left: 10px!important;
}
.json-mirror-alert{
  position:absolute;
  left: 0;
  width: 100%;
  height: 35px;
  bottom: 40px;
  border-radius: 4px;
  line-height: 35px;
  font-size: 13px;
  background-color: #fef0f0;
  color: #F56C6C;
}
.json-alert__title{
  margin-left: 10px;
}
.json-mirror-success{
  background-color: #f0f9eb;
  color: #67C23A;
}
.json-mirror-error{
  background-color: #fef0f0;
  color: #F56C6C;
}
</style>
