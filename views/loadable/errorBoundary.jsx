import React from 'react';
import ReactDom from 'react-dom';

export default class ErrorBoundary extends React.PureComponent {
    state = {
        haseError: false,
    };
    componentDidCatch(error, info) {
        console.log(error);
        console.log('--------');
        console.log(info);
        this.setState({
            haseError: true,
        });
    }
    render() {
        if (this.state.haseError) {
            return <div>this components has a error!</div>;
        } else {
            return this.props.children;
        }
    }
}
