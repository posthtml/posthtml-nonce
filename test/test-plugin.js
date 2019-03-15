import test from 'ava';
import posthtml from 'posthtml';
import parser from 'posthtml-parser';
import isPromise from 'is-promise';
import nanoid from 'nanoid';
import plugin from '../src';

function processing(html, options) {
  return posthtml()
    .use(plugin(options))
    .process(html);
}

test('plugin must be function', t => {
  t.true(typeof plugin === 'function');
});

test('should return reject', async t => {
  const error = await t.throwsAsync(plugin({tags: '', nonce: '123'})());
  t.is(error.message, 'tags must be Array');
});

test('should return promise', t => {
  t.true(isPromise(processing('')));
});

test('should add nanoid to style links', async t => {
  const id = nanoid();
  const input = '<link rel="stylesheet" href="style.css">';
  const html = (await processing(input, {tags: ['link'], nonce: id})).html;
  const nonce = parser(html)[0].attrs.nonce;
  t.truthy(nonce);
  t.is(nonce, id);
});
