import { simpleTableSortingClass } from 'dummy/helpers/simple-table-sorting-class';
import { module, test } from 'qunit';

module('Unit | Helper | simple table sorting class');

// Replace this with your real tests.
test('it works for key and order', function(assert) {
  let column = 'foo';
  let criteria = { key: column, order: 'desc'};

  let result = simpleTableSortingClass([criteria, column]);
  assert.equal(result, 'desc');

  criteria.order = 'asc';
  result = simpleTableSortingClass([criteria, column]);
  assert.equal(result, 'asc');
});

test('it works for key and order by default', function(assert) {
  let column = 'bar';
  let criteria = { key: 'foo', order: 'desc'};

  let result = simpleTableSortingClass([criteria, column]);
  assert.equal(result, '');

  criteria.order = 'asc';
  result = simpleTableSortingClass([criteria, column]);
  assert.equal(result, '');
});
