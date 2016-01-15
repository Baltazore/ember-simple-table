import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  classNames: ['sortable'],
  classNameBindings: ['sortingOrder'],
  attributeBindings: ['rowspan', 'colspan'],

  init() {
    this._super(...arguments);

    let header = this.getAttr('header');
    if (header) {
      header.addCell(Ember.Object.create({
        id: `${this}`,
        resetSorting: this.get('resetSorting').bind(this)
      }));
    }
  },

  didReceiveAttrs() {
    let header = this.getAttr('header');
    let dataValue = this.getAttr('dataValue');

    if (header) {
      if (header.row) {
        let data = header.row;
        let dataKey = this.getAttr('dataKey');
        let dataValueComputed = data[dataKey];
        this.set('dataValue', dataValueComputed);
      } else if (dataValue) {
        this.set('dataValue', dataValue);
      }

      this.set('sortAction', header.sortAction);
      this.set('sortPerformed', header.sortPerformed);
    }

    this.set('sortingOrder', null);

    this._super(...arguments);
  },

  resetSorting() {
    this.set('sortingOrder', null);
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
