import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table header selectable', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('columns', [
      { key: 'foo', name: 'Foo' },
      { key: 'baz', name: 'Baz' }
    ]);

    await render(hbs`{{simple-table-header-selectable columns=columns}}`);

    assert.notEqual(find('thead').textContent.trim(), '');
  });
});
