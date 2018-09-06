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
        const div = document.getElementById(`list_${last}`);
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
                        <div key={index} id={`list_${index}`}>
                            {item}:<span id={`box_${index}`}>0</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
