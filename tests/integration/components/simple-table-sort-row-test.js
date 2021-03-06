import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table sort row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{simple-table-sort-row}}`);

    assert.dom('caption').hasText('');

    // Template block usage:
    await render(hbs`
      {{#simple-table-sort-row}}
        template block text
      {{/simple-table-sort-row}}
    `);

    assert.dom('caption').hasText('template block text');
  });
});
