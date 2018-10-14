import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table cell item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{simple-table-cell-item}}`);

    assert.equal(find('span').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#simple-table-cell-item}}
        <h1>template block text</h1>
      {{/simple-table-cell-item}}
    `);

    assert.equal(find('h1').textContent.trim(), 'template block text');
  });
});
