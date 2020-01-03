import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Box from './box';
import ErrorBoundary from './errorBoundary';
import ErrorComp from './errorComp';
import SelectBox from './selectBox';
import WrapBox from './wrapBox';
import ChangeDom from './changDom';
import InsertDom from './insertDom';
import FixInsertDom from './fixInsertDom';
import CreateContext from './createContext';

const render = function render() {
    ReactDOM.render(
        <div>
            <CreateContext />
            <FixInsertDom />
            <InsertDom />
            <ChangeDom />
            <WrapBox />
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
