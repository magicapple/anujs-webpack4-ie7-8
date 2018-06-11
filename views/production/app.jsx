import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Box from './box';

const render = function render() {
    ReactDOM.render(
        <div>
            <div>hello anu!</div>
            <Box />
        </div>,
        document.getElementById('root'),
    );
};

render();
