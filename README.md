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
npm run react

// 开启 使用 react库的生产模式
npm run reactPreview

// 浏览器访问
http://127.0.0.1:8087/production.html
```

## anujs 1.4.7 发现的一些问题（[已经在 1.4.8 修复了](https://github.com/RubyLouvre/anu/issues/348)）

1. React.createContext 无法通过 Provider  传入数据，这个问题是从 1.4.3 开始的，测试了 1.4.1 和 1.4.2 是可以的。

代码如下

```
import React from 'react';
import ReactDom from 'react-dom';

const ThemeContext = React.createContext('light');

export default class CreateContext extends React.Component {
    render() {
        // Use a Provider to pass the current theme to the tree below.
        // Any component can read it, no matter how deep it is.
        // In this example, we're passing "dark" as the current value.
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton(props) {
    // Use a Consumer to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    return <ThemeContext.Consumer>{theme => <Button {...props} theme={theme} />}</ThemeContext.Consumer>;
}

function Button(props) {
    return (
        <div>
            正确值应该是传入的dark，现在传入值为：
            <span style={{ color: 'red' }}>{props.theme}</span>
        </div>
    );
}
```

## anujs 1.4.6 发现的一些问题（作者建议[不使用dom操作](https://github.com/RubyLouvre/anu/issues/271#issuecomment-418786188)）

> 以下两个问题  采用了先增加容器数据，然后再插入 dom 的方式规避了，具体看 demo 里面

1. 在一个组件渲染完成后，通过 dom 操作改变了其中一部分的内容，然后再对组件进行更新，会导致 ie(ie7,8,9,10,11)报错，chrome 下面渲染结果和 react 不一致

代码如下

```
import React from 'react';
import ReactDom from 'react-dom';

export default class ChangeDom extends React.PureComponent {
    state = {
        list: [],
    };
    componentDidMount() {
        console.log('box componentDidMount trigger');
    }

    renderSpan = () => {
        const { list } = this.state;
        const last = list[list.length - 1];
        document.getElementById(`box${last}`).innerHTML = `update_${last}`;
    };
    clickHandle = () => {
        this.setState(
            {
                list: [...this.state.list, this.state.list.length],
            },
            () => {
                this.renderSpan();
            },
        );
    };
    render() {
        const { list } = this.state;

        return (
            <div style={{ width: 800, border: '1px solid #f00', margin: 20 }}>
                <h1>修改已有dom的内容导致ie下面出错</h1>
                <button onClick={this.clickHandle}>点击增加数据</button>
                {list.map((item, index) => {
                    return (
                        <div key={index} id={`list${index}`}>
                            {item}:<span id={`box${index}`}>0</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
```

1. 在一个组件渲染完成后，通过 dom 操作在其中插入了 dom 节点，然后再对组件进行更新，dom 的渲染顺序和 react 的渲染结果不符（chrome，ie 都有）

代码如下

```
import React from 'react';
import ReactDom from 'react-dom';

export default class InsertDom extends React.PureComponent {
    state = {
        list: [],
    };
    componentDidMount() {
        console.log('box componentDidMount trigger');
    }

    renderSpan = () => {
        const { list } = this.state;
        const last = list[list.length - 1];
        const dom = document.createElement('div');
        dom.innerHTML = `insert_${last}`;
        const div = document.getElementById(`list${last}`);
        div.parentElement.insertBefore(dom, div);
    };
    clickHandle = () => {
        this.setState(
            {
                list: [...this.state.list, this.state.list.length],
            },
            () => {
                this.renderSpan();
            },
        );
    };
    render() {
        const { list } = this.state;

        return (
            <div style={{ width: 800, border: '1px solid #f00', margin: 20 }}>
                <h1>在列表中插通过dom操作插入数据</h1>
                <button onClick={this.clickHandle}>点击增加数据</button>
                {list.map((item, index) => {
                    return (
                        <div key={index} id={`list${index}`}>
                            {item}:<span id={`box${index}`}>0</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
```

## anujs 1.4.3 发现的一些问题（已经在 1.4.4 修复了）

1.  使用 PureComponent 时，组件两次 setState 值不变并且父组件在此之前也进行过 setState，会导致该组件与其相邻的前面组件的 dom 节点位置互换 (chrom 67, ie7, ie8)

该问题出现需要满足如下几个条件:

> 1.  组件使用 PureComponent
> 2.  父组件进行过 setState（改不改变值都可以）
> 3.  子组件 setState，但是值跟上一次相同
> 4.  子组件前面存在相邻的组件

组件代码如下

```
// innerBox.jsx
import React from 'react';

class InnerBox extends React.PureComponent {
    state = {
        current: 0,
    };

    componentDidMount() {
        console.log('InnerBox render');
        setTimeout(() => {
            console.log('current跟上次不一样，一切正常');
            this.setState({ current: 1 });
        }, 500);
        setTimeout(() => {
            console.log('current跟上次一样，dom位置互换');
            this.setState({ current: 1 });
        }, 1000);
        setTimeout(() => {
            console.log('current跟上次不一样，dom位置复原');
            this.setState({ current: 2 });
        }, 1500);
        setTimeout(() => {
            console.log('current跟上次一样，dom位置互换');
            this.setState({ current: 2 });
        }, 2000);
    }

    render() {
        console.log('inner render trigger');
        return (
            <div style={{ border: '1px solid #f00', background: '#ffc' }}>
                <div style={{ height: 100 }}>内部组件</div>
            </div>
        );
    }
}

export default InnerBox;

// wrapBox

import React from 'react';
import InnerBox from './innerBox';

class WrapBox extends React.PureComponent {
    state = {
        value: 1,
    };

    componentDidMount() {
        console.log('WrapBox render');
        // 此处如果在组件创建以后，再次setState，会导致dom位置错误的现象发生
        setTimeout(() => {
            console.log('父容器state值改变');
            this.setState({
                value: 1,
            });
        }, 700);
    }

    /**
     * 渲染组件
     */
    render() {
        console.log('wrap render trigger');
        return (
            <div>
                <div style={{ border: '1px solid #0f0', background: '#cff', cursor: 'pointer' }}>标题区域1</div>
                <div style={{ border: '1px solid #0f0', background: '#cff', cursor: 'pointer' }}>标题区域2</div>
                <InnerBox />
                <div style={{ border: '1px solid #0f0', background: '#cff', cursor: 'pointer' }}>标题区域3</div>
            </div>
        );
    }
}

export default WrapBox;
```

## anujs 1.4.2 发现的一些问题（都已经在 1.4.3 修复了）

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
