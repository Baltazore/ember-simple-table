import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  classNames: ['sortable'],
  classNameBindings: ['sortingOrder'],
  attributeBindings: ['rowspan', 'colspan'],
  sortingOrder: null,

  init() {
    this._super(...arguments);

    this.get('addCell')(Ember.Object.create({
      id: `${this}`,
      resetSorting: this.get('resetSorting').bind(this)
    }));
  },

  resetSorting() {
    this.set('sortingOrder', null);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let row = this.get('row');
    let dataValue = this.get('dataValue');

    if (row && !dataValue) {
      let dataKey = this.get('dataKey');
      let dataValueComputed = row[dataKey];
      this.set('dataValue', dataValueComputed);
    }
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
    // Talk to header that sorting started
    this.get('sortPerformed')(`${this}`);

    let sortBy = this.get('sortBy');
    let criteria = `${this.get('dataKey')}:${this.get('sortingOrder')}`;
    let sortAction = this.get('sortAction');

    if (sortBy) {
      return sortBy(criteria);
    } else if (sortAction) {
      return sortAction(criteria);
    } else {
      // Throw error
      console.log('set sortBy action on simple-table-cell');
      return true;
    }
  }
});
