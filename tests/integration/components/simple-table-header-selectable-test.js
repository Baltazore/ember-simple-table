import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-header-selectable', 'Integration | Component | simple table header selectable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{simple-table-header-selectable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#simple-table-header-selectable}}
      template block text
    {{/simple-table-header-selectable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
