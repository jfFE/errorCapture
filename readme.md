#### 功能介绍

本工具为针对前端js异常所涉及的一个工具类库

#### 目录解析

文件夹|功能
------|------
dist|编译后文件存放目录
src|源码存放目录

#### 项目构建

>npm run build

#### 使用示例

```
//传递一个回调函数，在回调中获取错误信息，上报给后台
new Ec(function(errData){
    console.log(errData)
})

{
    errorMesg: '', //错误信息
    errorTip: '', //错误类型
    errorFile: '', //错误文件路径名称
    errorLine: '', //错误代码行
    errorColum: '', //错误代码列
    userAgent: { //用户代理信息
    },
    errorTime: '', //发生错误的事件
    userLocation: '', //发生错误所处地点
    domTarget: '' //触发错误的dom元素
}
```