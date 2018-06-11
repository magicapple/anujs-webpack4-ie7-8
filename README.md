# anujs-webpack4-ie7-8

基于 anujs 和 webpack4 兼容 ie7-8 的配置

该 webpack.config 只考虑了对 ie7 ie8 进行配置。

## 使用方法

```
// 安装依赖
npm i

// 开启 development 模式
npm start

// 开启 production 模式
npm run buildPreview

// 开启 使用 react库的开发模式

// 浏览器访问
http://127.0.0.1:8087/production.html
```

## anujs 1.4.2 发现的一些问题

1.  在 webpack 的 `production` mode 下面，代码执行有错误，(chrome 66，ie7，ie8)

```
dist/ReactIE.js 84
function miniCreateClass(ctor, superClass, methods, statics) {
    var className = ctor.name || String(ctor).match(/^function\s(\w+)/)[1];
    var Ctor = Function("superClass", "ctor", "return function " + className + " (props, context) {\n            superClass.apply(this, arguments); \n            ctor.apply(this, arguments);\n      }")(superClass, ctor);
    Ctor.displayName = className;
    var fn = inherit(Ctor, superClass);
    extend(fn, methods);
    if (statics) {
        extend(Ctor, statics);
    }
    return Ctor;
}
```

2.  在使用 ref 的时候，表现和 react 不一致

```
export default class DifferentParent extends React.PureComponent {
    box = React.createRef();

    componentDidMount() {
        console.log('react 的行为是获取的父元素高度是一致的，anujs是不一致的，', this.box.current.parentElement.offsetHeight);
        setTimeout(() => {
            console.log('async', this.box.current.parentElement.offsetHeight);
        }, 100);
    }
    render() {
        return <div ref={this.box}>box</div>;
    }
}
```
