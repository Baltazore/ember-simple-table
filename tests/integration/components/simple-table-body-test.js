import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with simple component', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('rows', [{ foo: 'bar', baz: 'boo' }]);
    this.set('columns', ['foo', 'baz']);

    await render(hbs`{{simple-table-body columns=columns rows=rows}}`);


    assert.notEqual(find('tbody').textContent.trim(), '');
    assert.dom('tbody').exists({ count: 1 });
  });

  test('it renders with block usage', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('rows', [{ foo: 'bar', baz: 'boo' }]);
    this.set('columns', ['foo', 'baz']);

    // Template block usage:
    await render(hbs`
      {{#simple-table-body columns=columns rows=rows as |row|}}
          <td> {{ row.foo }} </td>
          <td> {{ row.baz }} </td>
      {{/simple-table-body}}
    `);

    assert.notEqual(find('tbody').textContent.trim(), '');
    assert.dom('tbody').exists({ count: 1 });
  });
});

