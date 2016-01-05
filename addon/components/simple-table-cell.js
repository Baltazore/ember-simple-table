import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  classNameBindings: ['sortingOrder'],

  didReceiveAttrs() {
    let data = this.getAttr('data');
    let dataKey = this.getAttr('dataKey');
    let dataValue = data[dataKey];

    this.set('dataValue', dataValue);
    this.set('sortingOrder', null);

    this._super(...arguments);
  },

  toggleSortingOrder() {
    if (this.get('sortingOrder') === 'asc') {
      this.set('sortingOrder', 'desc');
    } else if (this.get('sortingOrder') === 'desc') {
      this.set('sortingOrder', 'asc');
    } else {
      // Default to desc order
      this.set('sortingOrder', 'desc');
    }
  },

  click() {
    this.toggleSortingOrder();
    this.attrs.sortBy(`${this.getAttr('dataKey')}:${this.get('sortingOrder')}`);
  }
});
