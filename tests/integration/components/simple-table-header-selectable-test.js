import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header-selectable', 'Integration | Component | simple table header selectable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('columns', ['foo', 'baz']);

  this.render(hbs`{{simple-table-header-selectable columns=columns}}`);

  assert.equal(this.$().text().trim(), '');
});
