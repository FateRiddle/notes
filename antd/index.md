```
Warning: getFieldDecorator will override value, so please don't set value directly and use setFieldsValue to set it.
```

解决方法：应该将自定义控件的中的 value 属性删除。然后在 getFieldDecorator 的时候，设置 initialValue。
