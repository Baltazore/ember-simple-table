import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const columnAsString = (elems) => elems.flatMap(e => e.textContent).join('');

module('Integration | Component | simple table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with simple data', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('tableData', [
      { foo: 'bar1', baz: 'boo1' },
      { foo: 'bar2', baz: 'boo2' }
    ]);
    this.set('tableColumns', [
      { key: 'baz', name: "Baz", sortable: false, class: '' },
      { key: 'foo', name: "Foo", sortable: true, class: '' }
    ]);

    await render(hbs`{{simple-table tData=tableData tColumns=tableColumns}}`);

    assert.dom('table').exists({ count: 1 }, 'Creates table');
    assert.dom('thead').exists({ count: 1 }, 'Creates table header');
    assert.dom('tbody').exists({ count: 1 }, 'Creates table body');

    assert.dom('th').exists({ count: 2 }, 'Creates table header cell');
    assert.dom('th:first-child').hasText('Baz');
    assert.dom('th:last-child').hasText('Foo');

    assert.dom('td').exists({ count: 4 }, 'Creates table cell');
    assert.dom('tr:first-child td:first-child').hasText('boo1');
    assert.dom('tr:last-child td:last-child').hasText('bar2');
  });

  test('it renders with simple data and yield table data', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('tableData', [{ foo: 'bar', baz: 'boo' }]);
    this.set('tableColumns', [
      { key: 'baz', name: "Baz", sortable: false, class: '' },
      { key: 'foo', name: "Foo", sortable: true, class: '' }
    ]);

    await render(hbs`
      {{#simple-table tData=tableData tColumns=tableColumns as |table| }}
          {{table.header-row}}
          {{table.body}}
      {{/simple-table}}
    `);

    assert.notEqual(find('table').textContent.trim(), '');
    assert.dom('table').exists({ count: 1 }, 'Creates table');
    assert.dom('thead').exists({ count: 1 }, 'Creates table header');
    assert.dom('tbody').exists({ count: 1 }, 'Creates table body');

    assert.dom('th').exists({ count: 2 }, 'Creates table header cell');
    assert.dom('th:first-child').hasText('Baz');
    assert.dom('th:last-child').hasText('Foo');

    assert.dom('td').exists({ count: 2 }, 'Creates table cell');
    assert.dom('td:first-child').hasText('boo');
    assert.dom('td:last-child').hasText('bar');
  });

  test('it renders with simple data and yield table data', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('tableData', [{ foo: 'bar', baz: 'boo' }]);
    this.set('tableColumns', [
      { key: 'baz', name: "Baz", sortable: false, class: '' },
      { key: 'foo', name: "Foo", sortable: true, class: '' }
    ]);

    await render(hbs`
      {{#simple-table tData=tableData tColumns=tableColumns as |table| }}
          {{table.header-row}}

          <tbody>
              {{#each table.rows as |row| }}
                  <tr>
                      <td> {{row.baz}} </td>
                      <td> {{row.foo}} </td>
                  </tr>
              {{/each}}
          </tbody>
      {{/simple-table}}
    `);

    assert.notEqual(find('table').textContent.trim(), '');
    assert.dom('table').exists({ count: 1 }, 'Creates table');
    assert.dom('thead').exists({ count: 1 }, 'Creates table header');
    assert.dom('tbody').exists({ count: 1 }, 'Creates table body');

    assert.dom('th').exists({ count: 2 }, 'Creates table header cell');
    assert.dom('th:first-child').hasText('Baz');
    assert.dom('th:last-child').hasText('Foo');

    assert.dom('td').exists({ count: 2 }, 'Creates table cell');
    assert.dom('td:first-child').hasText('boo');
    assert.dom('td:last-child').hasText('bar');
  });

  test('it renders with simple data and apply AlltSorting', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('tableData', [
      { foo: 3, baz: 'bca' },
      { foo: 1, baz: 'abc' },
      { foo: 2, baz: 'cab' }
    ]);
    this.set('tableColumns', [
      { key: 'foo', name: "Number" },
      { key: 'baz', name: "String" }
    ]);

    await render(hbs`
      {{simple-table tData=tableData tColumns=tableColumns defaultSorting='foo:desc' }}
    `);

    assert.dom('th').exists({ count: 2 }, 'Creates table header cell');
    assert.dom('th:first-child').hasText('Number');
    assert.dom('th:last-child').hasText('String');

    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '321', 'Sorted by Number desc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'bcacababc', 'Not sorted by String');
  });

  test('it renders with simple data and apply multi-columns sort', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('tableData', [
      { foo: 3, baz: 'bca' },
      { foo: 1, baz: 'abc' },
      { foo: 2, baz: 'cab' }
    ]);
    this.set('tableColumns', [
      { key: 'foo', name: "Number" },
      { key: 'baz', name: "String" }
    ]);

    await render(hbs`
      {{simple-table tData=tableData tColumns=tableColumns }}
    `);

    assert.dom('th').exists({ count: 2 }, 'Creates table header cell');
    assert.dom('th:first-child').hasText('Number');
    assert.dom('th:last-child').hasText('String');

    await click('th:first-child span');
    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '123', 'Sorted by Number asc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'abccabbca', 'Not sorted by String');

    await click('th:last-child span');
    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '123', 'Sorted by Number asc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'abccabbca', 'Not sorted by String');

    await click('th:first-child span');
    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '321', 'Sorted by Number desc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'bcacababc', 'Sorted by String asc');
  });
});
