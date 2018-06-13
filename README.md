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
// dist/ReactIE.js 84

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

3.  组件中包含<option>元素的时候，如果组件被再次 render，在 ie7、ie8 下面报错

```
export default class SelectBox extends React.PureComponent {
    data = [{ name: 'a', text: 'aaaa' }, { name: 'b', text: 'bbbb' }, { name: 'c', text: 'cccc' }];
    state = {
        current: 0,
    };
    handlerChange = e => {
        console.log(e.currentTarget.value);
        const index = e.currentTarget.value;
        this.setState({
            current: index,
        });
    };

    handlerClick = e => {
        console.log(e.currentTarget);
        const index = e.currentTarget.getAttribute('value');
        this.setState({
            current: index,
        });
    };
    render() {
        const data = this.data;
        const { current } = this.state;
        return (
            <div>
                <div>
                    {data.map((item, index) => (
                        <span
                            key={index}
                            style={{
                                display: 'inline-block',
                                padding: 5,
                                border: '1px solid #f00',
                                margin: 5,
                                cursor: 'pointer',
                            }}
                            value={index}
                            onClick={this.handlerClick}>
                            {item.name}
                        </span>
                    ))}
                </div>
                <select>
                    <option value="0">a</option>
                    <option value="1">b</option>
                    <option value="2">c</option>
                </select>
                <div>{data[current].text}</div>
            </div>
        );
    }
}
```

`SCRIPT87: 参数无效。报错代码如下`

```
  function insertElement(fiber) {
      var dom = fiber.stateNode,
          parent = fiber.parent;
      try {
          var insertPoint = fiber.forwardFiber ? fiber.forwardFiber.stateNode : null;
          var after = insertPoint ? insertPoint.nextSibling : parent.firstChild;
          if (after == dom) {
              return;
          }
          if (after === null && dom === parent.lastChild) {
              return;
          }
          Renderer.inserting = fiber.tag === 5 && document.activeElement;
          parent.insertBefore(dom, after);
          Renderer.inserting = null;
      } catch (e) {
          throw e;
      }
  }
```

执行到

parent.insertBefore(dom, after); 出错，出错时

parent 为 DispHTMLOptionElement

dom 为 DispHTMLDOMTextNode

after 为 DispHTMLDOMTextNode
