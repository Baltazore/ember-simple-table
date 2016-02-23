import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',
  trClass: null,
  thClass: null,
  columns: null,

  sortingCriteria: { key: null, order: null },

  didReceiveAttrs({oldAttrs, newAttrs}) {
    this._super(...arguments);

    if (!oldAttrs || oldAttrs.columns !== newAttrs.columns) {
      let columns = this.get('columns');
      let columnKeys = Object.keys(columns);
      let sortableHash = {};
      let classesHash = {};
      let headerRow = {};

      columnKeys.forEach((key) => {
        sortableHash[key] = columns[key].sortable;
        classesHash[key] = columns[key].class;
        headerRow[key] = columns[key].columns;
      });

      this.set('columnKeys', columnKeys);
      this.set('sortableHash', sortableHash);
      this.set('classesHash', classesHash);
      this.set('headerRow', headerRow);
    }
  },

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
      // Do nothing if column is not sortable
      if (!this.get(`columns.${key}.sortable`)) {
        return true;
      }

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
