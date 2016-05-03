import Ember from 'ember';
import layout from '../templates/components/simple-table-header';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',
  columns: null,
  sortingCriteria: { key: null, order: null },

  columnKeys: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      if (Ember.isArray(columns)) {
        return columns;
      } else {
        return Object.keys(columns);
      }
    }
  }),

  headerRow: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      if (Ember.isArray(columns)) {
        return columns.reduce((headerRow, column) => {
          headerRow[column] = Ember.String.capitalize(column);
          return headerRow;
        }, {});
      } else {
        return columns;
      }
    }
  }),

  orderForColumn(sortingKey) {
    let { key, order } = this.get('sortingCriteria');

    if (sortingKey === key) {
      if (order === 'asc') {
        return 'desc';
      } else if (order === 'desc') {
        return 'asc';
      }
    } else {
      // Default to desc order
      return 'desc';
    }
  },

  actions: {
    sortBy(key) {
      let sortAction = this.get('sortAction');
      let sortBy     = this.get('sortBy');

      let order    = this.orderForColumn(key);
      let criteria = `${key}:${order}`;

      this.set('sortingCriteria', { key, order });

      if (sortBy) {
        return sortBy(criteria);
      } else {
        return sortAction(criteria);
      }
    }
  }
});
