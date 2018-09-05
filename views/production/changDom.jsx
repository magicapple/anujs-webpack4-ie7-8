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
