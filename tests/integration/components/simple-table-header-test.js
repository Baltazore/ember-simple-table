import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header', 'Integration | Component | simple table header', {
  integration: true
});

test('renders for simple data header row with 2 cells', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('keys', ['foo', 'baz']);
  this.set('rowData', { foo: 'bar', baz: 'boo' });

  this.render(hbs`{{simple-table-header rowData=rowData keys=keys}}`);

  assert.equal(this.$('tr').length, 1, 'Creates 1 header row');
  assert.equal(this.$('th').length, 2, 'Creates 2 header cells');
});

test('it renders', function(assert) {
  this.set('keys', ['foo', 'baz']);
  this.set('rowData', { foo: 'bar', baz: 'boo' });

  this.render(hbs`
    {{#simple-table-header}}
        template block text
    {{/simple-table-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
