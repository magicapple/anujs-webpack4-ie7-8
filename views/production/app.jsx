import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Box from './box';
import ErrorBoundary from './errorBoundary';
import ErrorComp from './errorComp';
import SelectBox from './selectBox';

const render = function render() {
    ReactDOM.render(
        <div>
            <div>hello anu!</div>
            <SelectBox />
            <Box />
            <ErrorBoundary>
                <ErrorComp />
            </ErrorBoundary>
        </div>,
        document.getElementById('root'),
    );
};

render();
