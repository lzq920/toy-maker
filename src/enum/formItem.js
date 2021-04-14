export default [{
  title: '手机号输入组件',
  config: {
    componentName: 'form-input-tel',
    description: '手机号输入组件',
    required: true,
    disabled: false,
    readonly: false,
    name: 'mobile',
    maxlength: 11,
    pattern: '^1[3-9]\\d{9}',
    placeholder: '请输入手机号',
    styles: {
      width: '100%',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      border: '1px solid #ccc'
    }
  }
}, {
  title: '文本输入组件',
  config: {
    componentName: 'form-input-text',
    description: '文本输入组件',
    required: true,
    disabled: false,
    readonly: false,
    name: 'text',
    maxlength: 10,
    minlength: 0,
    placeholder: '请输入文本',
    styles: {
      width: '100%',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      border: '1px solid #ccc'
    }
  }
},
{
  title: '邮箱输入组件',
  config: {
    componentName: 'form-input-email',
    description: '邮箱输入组件',
    required: true,
    disabled: false,
    readonly: false,
    name: 'email',
    placeholder: '请输入邮箱地址',
    styles: {
      width: '100%',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      border: '1px solid #ccc'
    }
  }
}, {
  title: '数字输入组件',
  config: {
    componentName: 'form-input-number',
    description: '数字输入组件',
    required: true,
    disabled: false,
    readonly: false,
    name: 'number',
    placeholder: '请输入数字',
    max: 99,
    min: 18,
    styles: {
      width: '100%',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      border: '1px solid #ccc'
    }
  }
},
{
  title: '文本域输入组件',
  config: {
    componentName: 'form-input-textarea',
    description: '文本域输入组件',
    required: true,
    disabled: false,
    readonly: false,
    name: 'textarea',
    maxlength: 10,
    minlength: 0,
    placeholder: '请输入文本',
    styles: {
      width: '100%',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      border: '1px solid #ccc'
    }
  }
},
{
  title: '提交按钮组件',
  config: {
    componentName: 'form-input-submit',
    description: '提交按钮组件',
    styles: {
      width: '100%',
      height: 50,
      backgroundColor: 'green',
      color: 'white',
      fontSize: 20
    }
  }
}]
