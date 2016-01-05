import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('simple-table-body', 'Integration | Component | simple table body', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('table', Ember.Object.create({
    rows: [{ foo: 'bar', baz: 'boo' }],
    columns: ['foo', 'baz']
  }));
  this.render(hbs`{{simple-table-body table=table}}`);

  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#simple-table-body table=table as |row|}}
        <td> {{ row.foo }} </td>
        <td> {{ row.baz }} </td>
    {{/simple-table-body}}
  `);

  assert.notEqual(this.$().text().trim(), '');
});
