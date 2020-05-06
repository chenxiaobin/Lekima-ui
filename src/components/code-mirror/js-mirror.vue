<template>
  <div class="js-mirror">
    <div class="js-mirror-config">
      <codemirror v-if="isLoad" v-model="markCode" :options="cmOptions"></codemirror>
    </div>
    <div class="js-mirror-validate">
      <le-button type="primary" size="mini" @click="onValidate">函数校验</le-button>
      <le-button class="js-mirror-sure" type="primary" size="mini" @click="onSave" v-if="isButton">保存</le-button>
    </div>
    <div v-if="validate.alertType" class="js-mirror-alert" :class="validate.alertType === 'success' ? 'js-mirror-success' : 'js-mirror-error'">
      <div class="js-alert__content">
        <span class="js-alert__title">{{validate.validateMessage}}</span>
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
 * 基础组件，js函数展示框
 * @example ../../docs/code-mirror/js.md
 * @displayName Js Mirror
 */
export default {
  name: 'leJsMirror',
  model: {
    event: 'js-save-nobtn',
    prop: 'code'
  },
  props: {
    /**
     * js片段字符串
     */
    code: {
      type: [String]
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
        // tabSize: 2,
        // lineWrapping: true,
        // mode: 'text/x-vue',
        // theme: 'default',
        // lineNumbers: true,
        // line: true

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
        let result = Utils.str2fn(this.markCode)
        this.onValidate()

        if (typeof result !== 'string') {
          this.$emit('js-save-nobtn', result().toString())
        }
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
      this.markCode = code
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

      let result = Utils.str2fn(this.markCode)

      if (typeof result === 'string') {
        this.validate.alertType = 'error'
        this.validate.validateMessage = '函数不合法，请检查: ' + result
      } else {
        this.validate.alertType = 'success'
        this.validate.validateMessage = '校验通过'
      }
    },
    onSave () {
      /**
       * 保存确认
       */
      let result = Utils.str2fn(this.markCode)
      this.onValidate()

      if (typeof result !== 'string') {
        this.$emit('js-save', result().toString())
      }
    }
  }
}
</script>
<style>
.js-mirror{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.js-mirror-config{
  width: 100%;
  height: calc(100% - 40px);
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.js-mirror-config .vue-codemirror,
.js-mirror-config .CodeMirror{
  height: 100%;
  z-index: 0;
}
.js-mirror-validate{
  width: calc(100% - 10px);
  height: 25px;
  padding: 5px 0;
  margin: 0 5px;
  text-align: right;
  border-top: 1px solid #dddddd;
}
.js-mirror-sure{
  display: inline-block;
  margin-left: 10px!important;
}
.js-mirror-alert{
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
.js-alert__title{
  margin-left: 10px;
}
.js-mirror-success{
  background-color: #f0f9eb;
  color: #67C23A;
}
.js-mirror-error{
  background-color: #fef0f0;
  color: #F56C6C;
}
</style>
