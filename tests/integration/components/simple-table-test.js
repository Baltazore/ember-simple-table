import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table', 'Integration | Component | simple table', {
  integration: true
});

test('it renders with simple data', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('tableData', [{ foo: 'bar', baz: 'boo' }]);
  this.set('tableColumns', ['baz', 'foo']);

  this.render(hbs`{{simple-table tData=tableData tColumns=tableColumns}}`);

  assert.notEqual(this.$().text().trim(), '');
  assert.equal(this.$('table').length, 1, 'Creates table');
  assert.equal(this.$('thead').length, 1, 'Creates table header');
  assert.equal(this.$('tbody').length, 1, 'Creates table body');

  assert.equal(this.$('tr').length, 2, 'Creates table rows');

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
  this.set('tableColumns', ['baz', 'foo']);

  this.render(hbs`
    {{#simple-table tData=tableData tColumns=tableColumns as |table| }}
        {{table.header}}
        {{table.body}}
    {{/simple-table}}
  `);

  assert.notEqual(this.$().text().trim(), '');
  assert.equal(this.$('table').length, 1, 'Creates table');
  assert.equal(this.$('thead').length, 1, 'Creates table header');
  assert.equal(this.$('tbody').length, 1, 'Creates table body');

  assert.equal(this.$('tr').length, 2, 'Creates table rows');

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
  this.set('tableColumns', ['baz', 'foo']);

  this.render(hbs`
    {{#simple-table tData=tableData tColumns=tableColumns as |table| }}
        {{table.header}}

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

  assert.equal(this.$('tr').length, 2, 'Creates table rows');

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
  this.set('tableColumns', ['baz', 'foo']);

  this.render(hbs`
    {{#simple-table tData=tableData tColumns=tableColumns as |table| }}
        {{table.header}}

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

  assert.equal(this.$('tr').length, 2, 'Creates table rows');

  assert.equal(this.$('th').length, 2, 'Creates table header cell');
  assert.equal(this.$('th:first').text().trim(), 'Baz');
  assert.equal(this.$('th:last').text().trim(), 'Foo');

  assert.equal(this.$('td').length, 2, 'Creates table cell');
  assert.equal(this.$('td:first').text().trim(), 'boo');
  assert.equal(this.$('td:last').text().trim(), 'bar');
});
