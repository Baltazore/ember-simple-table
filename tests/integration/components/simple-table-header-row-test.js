import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header-row', 'Integration | Component | simple table header row', {
  integration: true
});

test('renders for simple data header row with 2 cells from array', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('columns', ['foo', 'baz']);

  this.render(hbs`{{simple-table-header-row columns=columns}}`);

  assert.equal(this.$('tr').length, 1, 'Creates 1 header row');
  assert.equal(this.$('th').length, 2, 'Creates 2 header cells');
});

test('renders for simple data header row with 2 cells from object', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('columns', { foo: 'Foo', baz: 'Baz' });

  this.render(hbs`{{simple-table-header-row columns=columns}}`);

  assert.equal(this.$('tr').length, 1, 'Creates 1 header row');
  assert.equal(this.$('th').length, 2, 'Creates 2 header cells');
});

test('renders for simple data header row with 2 cells from object', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('columns', {
    foo: { columns: ['Foo'], sortable: true, class: 'rowspan' },
    baz: { columns: ['Baz'], sortable: false, class: '' }
  });

  this.render(hbs`{{simple-table-header-row columns=columns}}`);

  assert.equal(this.$('tr').length, 1, 'Creates 1 header row');
  assert.equal(this.$('th').length, 2, 'Creates 2 header cells');
  assert.equal(this.$('.rowspan').length, 1, 'Creates 1 rowspan class cells');
  assert.equal(this.$('.sortable').length, 1, 'Creates 1 sortable class cells');
});
