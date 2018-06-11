import React from 'react';
import ReactDom from 'react-dom';

export default class DifferentParent extends React.PureComponent {
    box = React.createRef();

    componentDidMount() {
        console.log('react 的行为是获取的父元素是一致的', this.box.current.parentElement.offsetHeight);
        setTimeout(() => {
            console.log('async', this.box.current.parentElement.offsetHeight);
        }, 100);
    }
    render() {
        return <div ref={this.box}>box</div>;
    }
}
