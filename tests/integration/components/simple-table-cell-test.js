import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | simple table cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with sorting arrow', async function(assert) {
    this.set('column', { key: 'baz', name: "Baz" });
    this.set('sorting', [{ key: 'baz', order: 'asc'}]);

    await render(hbs`
      {{simple-table-cell columns=column sortingCriteria=sorting }}
    `);

    assert.equal(findAll('.sortable').length, 1, 'Creates sortable class cell');
    assert.equal(findAll('th').length, 1, 'Creates th cell');
    assert.equal(findAll('i.sort-arrow').length, 1, 'Creates sorting arrow cell');
    assert.equal(find('th span').textContent.trim(), 'Baz');
  });

  test('it renders without sorting arrow', async function(assert) {
    this.set('column', { key: 'baz', name: "Baz", sortable: false });
    this.set('sorting', [{ key: 'baz', order: 'asc'}]);

    await render(hbs`
      {{simple-table-cell columns=column sortingCriteria=sorting }}
    `);

    assert.equal(findAll('.sortable').length, 0, 'Creates sortable class cell');
    assert.equal(findAll('th').length, 1, 'Creates th cell');
    assert.equal(findAll('i').length, 0, 'Not creates sorting arrow cell');
    assert.equal(find('th span').textContent.trim(), 'Baz');
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

    assert.equal(findAll('th').length, 1, 'Creates th cell');
    assert.equal(findAll('th span').length, 2, 'Creates 2 span in 1 cell');
    assert.equal(this.$('th span:first').text().trim(), 'Baz');
    assert.equal(this.$('th span:last').text().trim(), 'Foo');
  });
});
