import React from 'react';
import ReactDom from 'react-dom';

export default class ErrorComp extends React.PureComponent {
    render() {
        return <div>{this.props.person.name}</div>;
    }
}
