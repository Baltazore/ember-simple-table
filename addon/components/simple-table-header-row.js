import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',
  columnsArray: null,

  sortingCriteria: Ember.Object.create({}),

  didReceiveAttrs({oldAttrs, newAttrs}) {
    this._super(...arguments);

    if (!oldAttrs || oldAttrs.columns !== newAttrs.columns) {
      let columns      = this.get('columns');
      let columnsArray = this._processColumns(columns);
      this.set('columnsArray', columnsArray);
    }
  },

  actions: {
    sortBy(key) {
      let sortAction = this.get('sortAction');
      let sortBy     = this.get('sortBy');

      this._setOrderForColumn(key);

      let criteria = this._formatedCriteria();

      if (sortBy) {
        return sortBy(criteria);
      } else {
        return sortAction(criteria);
      }
    }
  },

  _processColumns(columns) {
    return columns.map((item) => {
      if (Ember.isArray(item)) {
        let { style, classes } = item[0];
        return { hasMultipleColumns: true, items: item, style, classes };
      } else {
        let { style, classes } = item;
        return { hasMultipleColumns: false, items: item, style, classes };
      }
    });
  },

  _setOrderForColumn(sortingKey) {
    let criteria = this.get('sortingCriteria');

    let oldOrder = criteria.get(sortingKey);
    let newOrder = this._toggleSortingOrder(oldOrder);
    criteria.set(sortingKey, newOrder);
   
    return newOrder;
  },

  _toggleSortingOrder(order) {
    switch(order) {
    case null:
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
    }
  },

  _formatedCriteria() {
    let criteria = this.get('sortingCriteria');
    let orderKeys = Object.keys(criteria);

    return orderKeys.map((orderKey) => {
      let order = criteria.get(orderKey);
      if (order) {
        return `${orderKey}:${order}`;
      }
    });
  }

});
