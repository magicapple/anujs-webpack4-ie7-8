import React from 'react';
import ReactDom from 'react-dom';

export default class Box extends React.PureComponent {
    render() {
        const { title } = this.props.content;
        return <div>{title} async load box</div>;
    }
}
