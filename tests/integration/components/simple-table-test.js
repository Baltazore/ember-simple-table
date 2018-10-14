import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
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

    assert.notEqual(find('table').textContent.trim(), '');
    assert.equal(findAll('table').length, 1, 'Creates table');
    assert.equal(findAll('thead').length, 1, 'Creates table header');
    assert.equal(findAll('tbody').length, 1, 'Creates table body');

    assert.equal(findAll('th').length, 2, 'Creates table header cell');
    assert.equal(this.$('th:first').text().trim(), 'Baz');
    assert.equal(this.$('th:last').text().trim(), 'Foo');

    assert.equal(findAll('td').length, 4, 'Creates table cell');
    assert.equal(this.$('td:first').text().trim(), 'boo1');
    assert.equal(this.$('td:last').text().trim(), 'bar2');
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
    assert.equal(findAll('table').length, 1, 'Creates table');
    assert.equal(findAll('thead').length, 1, 'Creates table header');
    assert.equal(findAll('tbody').length, 1, 'Creates table body');

    assert.equal(findAll('th').length, 2, 'Creates table header cell');
    assert.equal(this.$('th:first').text().trim(), 'Baz');
    assert.equal(this.$('th:last').text().trim(), 'Foo');

    assert.equal(findAll('td').length, 2, 'Creates table cell');
    assert.equal(this.$('td:first').text().trim(), 'boo');
    assert.equal(this.$('td:last').text().trim(), 'bar');
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
    assert.equal(findAll('table').length, 1, 'Creates table');
    assert.equal(findAll('thead').length, 1, 'Creates table header');
    assert.equal(findAll('tbody').length, 1, 'Creates table body');

    assert.equal(findAll('th').length, 2, 'Creates table header cell');
    assert.equal(this.$('th:first').text().trim(), 'Baz');
    assert.equal(this.$('th:last').text().trim(), 'Foo');

    assert.equal(findAll('td').length, 2, 'Creates table cell');
    assert.equal(this.$('td:first').text().trim(), 'boo');
    assert.equal(this.$('td:last').text().trim(), 'bar');
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

    assert.equal(findAll('th').length, 2, 'Creates table header cell');
    assert.equal(this.$('th:first').text().trim(), 'Number');
    assert.equal(this.$('th:last').text().trim(), 'String');

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

    assert.equal(findAll('th').length, 2, 'Creates table header cell');
    assert.equal(this.$('th:first').text().trim(), 'Number');
    assert.equal(this.$('th:last').text().trim(), 'String');

    this.$('th:first span').click();
    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '123', 'Sorted by Number asc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'abccabbca', 'Not sorted by String');

    this.$('th:last span').click();
    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '123', 'Sorted by Number asc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'abccabbca', 'Not sorted by String');

    this.$('th:first span').click();
    assert.equal(columnAsString(findAll('tbody td:nth-child(odd)')), '321', 'Sorted by Number desc');
    assert.equal(columnAsString(findAll('tbody td:nth-child(even)')), 'bcacababc', 'Sorted by String asc');
  });
});
