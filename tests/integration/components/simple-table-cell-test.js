import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('simple-table-cell', 'Integration | Component | simple table cell', {
  integration: true
});

test('it renders with sorting arrow', function(assert) {
  this.set('column', { items: { key: 'baz', name: "Baz" } });
  this.set('sorting', [{ key: 'baz', order: 'asc'}]);

  this.render(hbs`
    {{simple-table-cell columns=column sortingCriteria=sorting }}
  `);

  assert.equal(this.$('.sortable').length, 1, 'Creates sortable class cell');
  assert.equal(this.$('th').length, 1, 'Creates th cell');
  assert.equal(this.$('i.sort-arrow').length, 1, 'Creates sorting arrow cell');
  assert.equal(this.$('th span').text().trim(), 'Baz');
});

test('it renders without sorting arrow', function(assert) {
  this.set('column', { items: { key: 'baz', name: "Baz", sortable: false } });
  this.set('sorting', [{ key: 'baz', order: 'asc'}]);

  this.render(hbs`
    {{simple-table-cell columns=column sortingCriteria=sorting }}
  `);

  assert.equal(this.$('.sortable').length, 0, 'Creates sortable class cell');
  assert.equal(this.$('th').length, 1, 'Creates th cell');
  assert.equal(this.$('i').length, 0, 'Not creates sorting arrow cell');
  assert.equal(this.$('th span').text().trim(), 'Baz');
});

test('it renders 2 spans for complex header cell', function(assert) {
  this.set('column', { hasMultipleColumns:true, items: [
    { key: 'baz', name: "Baz", sortable: false },
    { key: 'foo', name: "Foo" }
  ] });
  this.set('sorting', [{ key: 'baz', order: 'asc'}]);

  this.render(hbs`
    {{simple-table-cell columns=column sortingCriteria=sorting }}
  `);

  assert.equal(this.$('th').length, 1, 'Creates th cell');
  assert.equal(this.$('th span').length, 2, 'Creates 2 span in 1 cell');
  assert.equal(this.$('th span:first').text().trim(), 'Baz');
  assert.equal(this.$('th span:last').text().trim(), 'Foo');
});
