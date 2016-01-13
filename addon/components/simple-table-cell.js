import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  classNameBindings: ['sortingOrder'],
  attributeBindings: ['rowspan', 'colspan'],

  didReceiveAttrs() {
    let header = this.getAttr('header');
    let dataValue = this.getAttr('dataValue');

    if (header && header.row) {
      let data = header.row;
      let dataKey = this.getAttr('dataKey');
      let dataValueComputed = data[dataKey];
      this.set('dataValue', dataValueComputed);
      this.set('sortAction', header.sortAction);
    } else if (dataValue) {
      this.set('dataValue', dataValue);
    } else {
      // Throw error
      console.log('set dataValue on simple-table-cell');
      console.log('header', header);
      console.log('dataValue', dataValue);
    }

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
    let sortAction = this.get('sortAction');
    let sortBy   = this.getAttr('sortBy');
    let criteria = `${this.getAttr('dataKey')}:${this.get('sortingOrder')}`;

    if (sortAction) {
      return sortAction(criteria);
    } else if (sortBy) {
      return sortBy(criteria);
    } else {
      // Throw error
      console.log('set sortBy action on simple-table-cell');
      return true;
    }
  }
});
