import React from 'react';
import ReactDom from 'react-dom';

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
