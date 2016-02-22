import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  classNames: ['sortable'],
  classNameBindings: ['sortingOrder'],
  attributeBindings: ['rowspan', 'colspan'],
  sortingOrder: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let row = this.get('row');
    let dataKey = this.get('dataKey');
    let dataValue = this.get('dataValue');

    if (row && !dataValue) {
      this.set('dataValue', row[dataKey]);
    }
  },

  click() {
    let sortBy = this.get('sortBy');
    let sortAction = this.get('sortAction');
    let key = this.get('dataKey');

    if (sortBy) {
      return sortBy(key);
    } else if (sortAction) {
      return sortAction(key);
    } else {
      // Throw error
      console.log('set sortBy action on simple-table-cell');
      return true;
    }
  }
});
