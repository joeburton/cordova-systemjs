'use strict';

// NOTE: This file is to help with development and should not be included in production.
// $node server.js - to start a local server.

const express = require('express');
const path = require('path');

const app = express();
const appDir = 'www';

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use(`/${appDir}/js`, express.static(path.join(__dirname, `${appDir}/js`)));
app.use(`/${appDir}/css`, express.static(path.join(__dirname, `${appDir}/css`)));
app.use(`/${appDir}/img`, express.static(path.join(__dirname, `${appDir}/img`)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `/${appDir}/index.html`));
});

app.listen(8080);
