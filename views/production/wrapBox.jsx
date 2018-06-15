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
