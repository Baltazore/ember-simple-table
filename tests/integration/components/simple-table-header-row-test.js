import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header-row', 'Integration | Component | simple table header row', {
  integration: true
});

test('renders for simple data header row with 2 cells from object', function(assert) {
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

  this.render(hbs`{{simple-table-header-row columns=columns}}`);

  assert.equal(this.$('.sortable').length, 3, 'Creates 3 sortable class cells');
});

test('sortable column by default', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  assert.expect(4);

  this.set('sortAction', function ( ) {
    assert.ok('Sort action called');
    return true;
  });
  this.set('columns', [{ key: 'foo', name: 'Foo' }]);

  this.render(hbs`{{simple-table-header-row columns=columns sortAction=sortAction}}`);

  assert.equal(this.$('.sortable').length, 1, 'Creates sortable class on cell');
  assert.equal(this.$('.asc').length, 0, 'Initial sorting on column not set');
  assert.equal(this.$('.desc').length, 0, 'Initial sorting on column not set');

  this.$('span').click();
});

test('it could be sortable by multiple columns', function(assert) {
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

  this.render(hbs`{{simple-table-header-row columns=columns sortAction=sortAction}}`);

  assert.equal(this.$('.sortable').length, 2, 'Creates 2 sortable class cells');
  assert.equal(this.$('.asc').length, 0, 'Initial sorting on each column not set');
  assert.equal(this.$('.desc').length, 0, 'Initial sorting on each column not set');

  this.$('span:first').click();
  this.$('span:last').click();
});
