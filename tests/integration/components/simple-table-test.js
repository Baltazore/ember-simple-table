import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table', 'Integration | Component | simple table', {
  integration: true
});

test('it renders with simple data', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('tableData', [{ foo: 'bar', baz: 'boo' }]);
  this.set('tableColumns', [
    { key: 'baz', name: "Baz", sortable: false, class: '' },
    { key: 'foo', name: "Foo", sortable: true, class: '' }
  ]);

  this.render(hbs`{{simple-table tData=tableData tColumns=tableColumns}}`);

  assert.notEqual(this.$().text().trim(), '');
  assert.equal(this.$('table').length, 1, 'Creates table');
  assert.equal(this.$('thead').length, 1, 'Creates table header');
  assert.equal(this.$('tbody').length, 1, 'Creates table body');

  assert.equal(this.$('th').length, 2, 'Creates table header cell');
  assert.equal(this.$('th:first').text().trim(), 'Baz');
  assert.equal(this.$('th:last').text().trim(), 'Foo');

  assert.equal(this.$('td').length, 2, 'Creates table cell');
  assert.equal(this.$('td:first').text().trim(), 'boo');
  assert.equal(this.$('td:last').text().trim(), 'bar');
});

test('it renders with simple data and yield table data', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('tableData', [{ foo: 'bar', baz: 'boo' }]);
  this.set('tableColumns', [
    { key: 'baz', name: "Baz", sortable: false, class: '' },
    { key: 'foo', name: "Foo", sortable: true, class: '' }
  ]);

  this.render(hbs`
    {{#simple-table tData=tableData tColumns=tableColumns as |table| }}
        {{table.header-row}}
        {{table.body}}
    {{/simple-table}}
  `);

  assert.notEqual(this.$().text().trim(), '');
  assert.equal(this.$('table').length, 1, 'Creates table');
  assert.equal(this.$('thead').length, 1, 'Creates table header');
  assert.equal(this.$('tbody').length, 1, 'Creates table body');

  assert.equal(this.$('th').length, 2, 'Creates table header cell');
  assert.equal(this.$('th:first').text().trim(), 'Baz');
  assert.equal(this.$('th:last').text().trim(), 'Foo');

  assert.equal(this.$('td').length, 2, 'Creates table cell');
  assert.equal(this.$('td:first').text().trim(), 'boo');
  assert.equal(this.$('td:last').text().trim(), 'bar');
});

test('it renders with simple data and yield table data', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('tableData', [{ foo: 'bar', baz: 'boo' }]);
  this.set('tableColumns', [
    { key: 'baz', name: "Baz", sortable: false, class: '' },
    { key: 'foo', name: "Foo", sortable: true, class: '' }
  ]);

  this.render(hbs`
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

  assert.notEqual(this.$().text().trim(), '');
  assert.equal(this.$('table').length, 1, 'Creates table');
  assert.equal(this.$('thead').length, 1, 'Creates table header');
  assert.equal(this.$('tbody').length, 1, 'Creates table body');

  assert.equal(this.$('th').length, 2, 'Creates table header cell');
  assert.equal(this.$('th:first').text().trim(), 'Baz');
  assert.equal(this.$('th:last').text().trim(), 'Foo');

  assert.equal(this.$('td').length, 2, 'Creates table cell');
  assert.equal(this.$('td:first').text().trim(), 'boo');
  assert.equal(this.$('td:last').text().trim(), 'bar');
});

test('it renders with simple data and apply multi-columns sort', function(assert) {
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

  this.render(hbs`
    {{simple-table tData=tableData tColumns=tableColumns }}
  `);

  assert.equal(this.$('th').length, 2, 'Creates table header cell');
  assert.equal(this.$('th:first').text().trim(), 'Number');
  assert.equal(this.$('th:last').text().trim(), 'String');

  this.$('th:first span').click();
  assert.equal(this.$('tbody td:nth-child(odd)').text(), '123', 'Sorted by Number asc');
  assert.equal(this.$('tbody td:nth-child(even)').text(), 'abccabbca', 'Not sorted by String');

  this.$('th:last span').click();
  assert.equal(this.$('tbody td:nth-child(odd)').text(), '132', 'Sorted by Number asc');
  assert.equal(this.$('tbody td:nth-child(even)').text(), 'abcbcacab', 'Sorted by String asc');

  this.$('th:first span').click();
  assert.equal(this.$('tbody td:nth-child(odd)').text(), '321', 'Sorted by Number desc');
  assert.equal(this.$('tbody td:nth-child(even)').text(), 'bcacababc', 'Sorted by String asc');
});
