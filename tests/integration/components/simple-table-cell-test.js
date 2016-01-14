import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-cell', 'Integration | Component | simple table cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set('header', { row: { foo: 'Foo' } });
  this.set('dataKey', 'foo');
  this.render(hbs`{{simple-table-cell header=header dataKey=dataKey}}`);

  assert.equal(this.$().text().trim(), 'Foo');
  assert.equal(this.$('th').length, 1, 'Creates 1 cell');
  assert.equal(this.$('.sortable').length, 1, 'Add .sortable class to cell');
});
