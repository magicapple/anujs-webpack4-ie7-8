import React from 'react';
import ReactDom from 'react-dom';
import DifferentParent from './differentParent';

export default class Box extends React.PureComponent {
    componentDidMount() {
        console.log('box componentDidMount trigger');
    }
    render() {
        return (
            <div style={{ width: 400, height: 400 }}>
                <DifferentParent />
            </div>
        );
    }
}
