import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';
import Header from './simple-table-header';

export default Header.extend({
  layout,
  trClass: null,
  thClass: null,

  sortableHash: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      let columnKeys = Object.keys(columns);

      return columnKeys.reduce((sortableHash, key) => {
        sortableHash[key] = columns[key].sortable;
        return sortableHash;
      }, {});
    }
  }),

  classesHash: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      let columnKeys = Object.keys(columns);

      return columnKeys.reduce((classesHash, key) => {
        classesHash[key] = columns[key].class;
        return classesHash;
      }, {});
    }
  }),

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
