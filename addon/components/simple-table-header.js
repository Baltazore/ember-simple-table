import Ember from 'ember';
import layout from '../templates/components/simple-table-header';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',

  init() {
    this._super(...arguments);
    this.set('cells', Ember.A());
  },

  didRemoveElement() {
    // Teardown cells links
    this.set('cells', Ember.A());
  },

  columnKeys: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      if (Ember.isArray(columns)) {
        return columns;
      } else {
        return Object.keys(columns);
      }
    }
  }),

  headerRow: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      if (Ember.isArray(columns)) {
        return columns.reduce((headerRow, column) => {
          headerRow[column] = Ember.String.capitalize(column);
          return headerRow;
        }, {});
      } else {
        return columns;
      }
    }
  }),

  actions: {
    addCell(cell) {
      this.get('cells').addObject(cell);
    },

    sortPerformed(id) {
      let targetCells = this.get('cells').filter((cell) => cell.id !== id);
      targetCells.forEach((cell) => cell.resetSorting());
    },

    sortBy(args) {
      let sortAction = this.get('sortAction');
      let sortBy = this.get('sortBy');

      if (sortBy) {
        return sortBy(args);
      } else {
        return sortAction(args);
      }
    }
  }
});
