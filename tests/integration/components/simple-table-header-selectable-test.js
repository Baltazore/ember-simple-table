import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header-selectable', 'Integration | Component | simple table header selectable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('columns', [
    { key: 'foo', name: 'Foo' },
    { key: 'baz', name: 'Baz' }
  ]);

  this.render(hbs`{{simple-table-header-selectable columns=columns}}`);

  assert.notEqual(this.$().text().trim(), '');
});
