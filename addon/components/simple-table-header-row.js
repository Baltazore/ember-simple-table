import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',
  trClass: null,
  thClass: null,
  columnsArray: null,

  sortingCriteria: { key: null, order: null },

  didReceiveAttrs({oldAttrs, newAttrs}) {
    this._super(...arguments);

    if (!oldAttrs || oldAttrs.columns !== newAttrs.columns) {
      let columns      = this.get('columns');
      let columnsArray = columns.map((item) => {
        if ( Ember.isArray(item)) {
          return Ember.A(item);
        } else {
          return Ember.A([ item ]);
        }
      });
      this.set('columnsArray', columnsArray);
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
