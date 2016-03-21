import { simpleTableSortingEnabled } from 'dummy/helpers/simple-table-sorting-enabled';
import { module, test } from 'qunit';

module('Unit | Helper | simple table sorting enabled');

test('it works with false', function(assert) {
  let column = { sortable: false };
  let result = simpleTableSortingEnabled([column]);
  assert.equal(result, false);
});

test('it works with null', function(assert) {
  let column = { sortable: null };
  let result = simpleTableSortingEnabled([column]);
  assert.equal(result, true);
});

test('it works with undefined', function(assert) {
  let column = { sortable: undefined };
  let result = simpleTableSortingEnabled([column]);
  assert.equal(result, true);
});

test('it works with true', function(assert) {
  let column = { sortable: true };
  let result = simpleTableSortingEnabled([column]);
  assert.equal(result, true);
});

test('it works with empty object', function(assert) {
  let column = { };
  let result = simpleTableSortingEnabled([column]);
  assert.equal(result, true);
});
