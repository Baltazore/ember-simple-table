import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',
  columnsArray: null,

  sortingCriteria: Ember.A([]),

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

      if (sortBy) {
        return sortBy(key);
      } else {
        return sortAction(key);
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
  }
});
