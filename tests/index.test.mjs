import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('plurality reference', () => {
  assert.deepEqual(api.plurality(['a', 'b'], ['b', 'b', 'a']), [
    { candidate: 'b', score: 2 },
    { candidate: 'a', score: 1 },
  ]);
});
test('tie no hidden winner', () => {
  assert.deepEqual(
    api.plurality(['z', 'a'], ['z', 'a']).map((x) => x.candidate),
    ['a', 'z'],
  );
});
test('zero support', () => {
  assert.equal(api.plurality(['a', 'b'], ['a'])[1].score, 0);
});
test('unsafe IDs safe Map', () => {
  assert.equal(api.plurality(['__proto__', 'constructor'], ['__proto__'])[0].score, 1);
});
test('invalid choices', () => {
  assert.throws(() => api.plurality(['a', 'b'], ['c']));
  assert.throws(() => api.plurality(['a', 'a'], ['a']));
  assert.throws(() => api.plurality(['a', 'b'], []));
});
test('conservation', () => {
  const choices = Array.from({ length: 100 }, (_, i) => (i % 3 ? 'a' : 'b'));
  assert.equal(
    api.plurality(['a', 'b'], choices).reduce((s, x) => s + x.score, 0),
    100,
  );
});
