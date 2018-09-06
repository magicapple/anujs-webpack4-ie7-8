import React from 'react';
import ReactDom from 'react-dom';

export default class FixInsertDom extends React.PureComponent {
    state = {
        list: [],
    };
    componentDidMount() {
        console.log('box componentDidMount trigger');
    }

    renderAd = () => {
        const { list } = this.state;
        console.log('==========');
        console.log(list.length - 1);
        const last = list[list.length - 1];
        const dom = document.createElement('div');
        dom.innerHTML = `ad_${last.id}`;
        const div = document.getElementById(`ad${last.id}`);
        console.log(div);
        div.appendChild(dom);
    };

    insertAd = () => {
        this.setState(
            {
                list: [...this.state.list, { id: this.state.list.length, type: 'ad' }],
            },
            () => {
                this.renderAd();
            },
        );
    };
    clickHandle = () => {
        this.setState(
            {
                list: [...this.state.list, { id: this.state.list.length, type: 'content' }],
            },
            () => {
                this.insertAd();
            },
        );
    };
    render() {
        const { list } = this.state;
        console.log(list);

        return (
            <div style={{ width: 800, border: '1px solid #f00', margin: 20 }}>
                <h1>修复在列表中插通过dom操作插入数据</h1>
                <button onClick={this.clickHandle}>点击增加数据</button>
                {list.map((item, index) => {
                    console.log(item.type);
                    return item.type === 'ad' ? (
                        <div key={index} id={`ad${index}`} style={{ border: '1px solid #f00', height: 20 }} />
                    ) : (
                        <div key={index} id={`list__${index}`}>
                            {item.id}:<span id={`box__${index}`}>0</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
