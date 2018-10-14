import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table header row', function(hooks) {
  setupRenderingTest(hooks);

  test('renders for simple data header row with 2 cells from object', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.set('columns', [
      { key: 'foo', name: 'Foo', sortable: true },
      { key: 'abc', name: 'ABC', sortable: false },
      [
        { key: 'baz', name: 'Baz', sortable: true },
        { key: 'bar', name: 'Bar', sortable: true }
      ]
    ]);

    await render(hbs`{{simple-table-header-row columns=columns}}`);

    assert.equal(findAll('.sortable').length, 3, 'Creates 3 sortable class cells');
  });

  test('sortable column by default', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"
    assert.expect(4);

    this.set('sortAction', function ( ) {
      assert.ok('Sort action called');
      return true;
    });
    this.set('columns', [{ key: 'foo', name: 'Foo' }]);

    await render(hbs`{{simple-table-header-row columns=columns sortAction=sortAction}}`);

    assert.equal(findAll('.sortable').length, 1, 'Creates sortable class on cell');
    assert.equal(findAll('.asc').length, 0, 'Initial sorting on column not set');
    assert.equal(findAll('.desc').length, 0, 'Initial sorting on column not set');

    await click('span');
  });

  test('it could be sortable by multiple columns', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"
    assert.expect(5);

    this.set('sortAction', function ( ) {
      assert.ok('Sort action called');
      return true;
    });

    this.set('columns', [
      { key: 'foo', name: 'Foo' },
      { key: 'baz', name: 'Baz' }
    ]);

    await render(hbs`{{simple-table-header-row columns=columns sortAction=sortAction}}`);

    assert.equal(findAll('.sortable').length, 2, 'Creates 2 sortable class cells');
    assert.equal(findAll('.asc').length, 0, 'Initial sorting on each column not set');
    assert.equal(findAll('.desc').length, 0, 'Initial sorting on each column not set');

    this.$('span:first').click();
    this.$('span:last').click();
  });
});
