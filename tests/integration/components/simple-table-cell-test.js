import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with sorting arrow', async function(assert) {
    this.set('column', { key: 'baz', name: "Baz" });
    this.set('sorting', [{ key: 'baz', order: 'asc'}]);

    await render(hbs`
      {{simple-table-cell columns=column sortingCriteria=sorting }}
    `);

    assert.dom('.sortable').exists({ count: 1 }, 'Creates sortable class cell');
    assert.dom('th').exists({ count: 1 }, 'Creates th cell');
    assert.dom('i.sort-arrow').exists({ count: 1 }, 'Creates sorting arrow cell');
    assert.dom('th span').hasText('Baz');
  });

  test('it renders without sorting arrow', async function(assert) {
    this.set('column', { key: 'baz', name: "Baz", sortable: false });
    this.set('sorting', [{ key: 'baz', order: 'asc'}]);

    await render(hbs`
      {{simple-table-cell columns=column sortingCriteria=sorting }}
    `);

    assert.dom('.sortable').doesNotExist('Creates sortable class cell');
    assert.dom('th').exists({ count: 1 }, 'Creates th cell');
    assert.dom('i').doesNotExist('Not creates sorting arrow cell');
    assert.dom('th span').hasText('Baz');
  });

  test('it renders 2 spans for complex header cell', async function(assert) {
    this.set('column', [
      { key: 'baz', name: "Baz", sortable: false },
      { key: 'foo', name: "Foo" }
    ]);
    this.set('sorting', [{ key: 'baz', order: 'asc'}]);

    await render(hbs`
      {{simple-table-cell columns=column sortingCriteria=sorting }}
    `);

    assert.dom('th').exists({ count: 1 }, 'Creates th cell');
    assert.dom('th span').exists({ count: 2 }, 'Creates 2 span in 1 cell');
    assert.dom('th span:first-child').hasText('Baz');
    assert.dom('th span:last-child').hasText('Foo');
  });
});
