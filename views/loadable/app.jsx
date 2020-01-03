import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Loadable from 'react-loadable';
import ErrorBoundary from './errorBoundary';
import ErrorComp from './errorComp';

const LoadaBox = Loadable({
    loader: () => import('./box'),
    loading() {
        return <div>Loading...</div>;
    },
});

const render = function render() {
    ReactDOM.render(
        <div>
            <h1>head</h1>
            <LoadaBox content={{ title: 'apple' }} />
            <div>foot</div>
            <ErrorBoundary>
                <ErrorComp />
            </ErrorBoundary>
        </div>,
        document.getElementById('root'),
    );
};

render();
