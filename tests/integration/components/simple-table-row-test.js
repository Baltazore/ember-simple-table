import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-row', 'Integration | Component | simple table row', {
  integration: true
});

test('renders for simple data row with 2 cells', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set('keys', ['foo', 'baz']);
  this.set('rowData', { foo: 'bar', baz: 'boo' });

  this.render(hbs`{{simple-table-row rowData=rowData keys=keys}}`);

  assert.equal(this.$('tr').length, 1, 'Creates 1 row');
  assert.equal(this.$('td').length, 2, 'Creates 2 cells');
});

test('renders for simple data header row with 2 cells', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set('keys', ['foo', 'baz']);
  this.set('rowData', { foo: 'bar', baz: 'boo' });

  this.render(hbs`{{simple-table-row rowData=rowData keys=keys isHeader=true}}`);

  assert.equal(this.$('tr').length, 1, 'Creates 1 header row');
  assert.equal(this.$('th').length, 2, 'Creates 2 header cells');
});
