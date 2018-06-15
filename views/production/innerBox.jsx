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
