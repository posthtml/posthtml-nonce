# posthtml-nonce

> A posthtml plugin create whitelist for specific inline scripts,styles,images,media using a cryptographic nonce 

[![Travis Build Status](https://img.shields.io/travis/GitScrum/posthtml-nonce.svg?style=flat-square&label=unix)](https://travis-ci.org/GitScrum/posthtml-nonce)[![node](https://img.shields.io/node/v/post-sequence.svg?maxAge=2592000&style=flat-square)]()[![npm version](https://img.shields.io/npm/v/posthtml-nonce.svg?style=flat-square)](https://www.npmjs.com/package/posthtml-nonce)[![Dependency Status](https://david-dm.org/gitscrum/posthtml-nonce.svg?style=flat-square)](https://david-dm.org/gitscrum/posthtml-nonce)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/GitScrum/posthtml-nonce.svg?style=flat-square)](https://coveralls.io/r/GitScrum/posthtml-nonce)

## Why?  
The HTTP [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) response header allows web site administrators to control resources the user agent is allowed to load for a given page. With a few exceptions, policies mostly involve specifying server origins and script endpoints. This helps guard against cross-site scripting attacks (XSS).  
> Used in conjunction with the `middleware`

## Install

```bash
npm i -S posthtml posthtml-nonce
```

> **Note:** This project is compatible with node v4+

## Usage

```js
import {readFileSync, writeFileSync} from 'fs';
import posthtml from 'posthtml';
import posthtmlCache from 'posthtml-nonce';

const html = readFileSync('input.html', 'utf8');

posthtml()
    .use(posthtmlCache(/* options */))
    .process(html)
    .then(result => {
        writeFileSync('output.html', result.html);
    });

```

## Example

input.html
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <img data-src="logo.svg" alt="">
    <script src="script.js"></script>
  </body>
<html>
```

output.html
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css?v=4f90d13a42">
  </head>
  <body>
    <img data-src="logo.svg?v=VlLqCweTvn_E1g3XXGMtM" alt="">
    <script src="script.js?v=93ce_Ltuub"></script>
  </body>
<html>
```
> *will be added nanoid to all the file link*

## Options

### `tags`
Type: `Array`  
Default: `['script', 'link']`  
Description: *You can also expand the list by adding the tags you need...*  

### `attributes`
Type: `Array`  
Default: `['src', 'href']`  
Description: *You can also expand the list by adding the attributes you need...*  
