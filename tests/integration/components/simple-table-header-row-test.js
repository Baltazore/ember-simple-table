import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header-row', 'Integration | Component | simple table header row', {
  integration: true
});

test('renders for simple data header row with 2 cells from object', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('columns', [
    { key: 'foo', name: 'Foo', sortable: true, class: 'rowspan' },
    { key: 'abc', name: 'ABC', sortable: false, class: 'rowspan' },
    [
      { key: 'baz', name: 'Baz', sortable: true },
      { key: 'bar', name: 'Bar', sortable: true }
    ]
  ]);

  this.render(hbs`{{simple-table-header-row columns=columns}}`);

  debugger;
  assert.equal(this.$('tr').length, 1, 'Creates 1 header row');
  assert.equal(this.$('th').length, 3, 'Creates 3 header cells');
  assert.equal(this.$('.rowspan').length, 2, 'Creates 2 rowspan class cells');
  assert.equal(this.$('.sortable').length, 3, 'Creates 3 sortable class cells');
});
