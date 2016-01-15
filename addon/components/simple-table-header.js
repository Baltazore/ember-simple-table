import Ember from 'ember';
import layout from '../templates/components/simple-table-header';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',

  init() {
    this._super(...arguments);
    this.set('cells', Ember.A());
  },

  didReceiveAttrs() {
    let table = this.getAttr('table');

    this.set('columns', table.columns);
    this.set('sortAction', table.sortAction);
    this._super(...arguments);
  },

  didRemoveElement() {
    // Teardown cells links
    this.set('cells', Ember.A());
  },

  addCell(cell) {
    this.get('cells').addObject(cell);
  },

  sortPerformed(id) {
    let targetCells = this.get('cells').filter((cell) => cell.id !== id);
    targetCells.forEach((cell) => cell.resetSorting());
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

  header: Ember.computed('headerRow', 'columns', 'sortBy', {
    get() {
      return Ember.Object.create({
        row: this.get('headerRow'),
        sortAction: this.get('sortBy').bind(this),
        addCell: this.get('addCell').bind(this),
        sortPerformed: this.get('sortPerformed').bind(this)
      });
    }
  }),

  sortBy(args) {
    let sortAction = this.get('sortAction');
    let sortBy = this.getAttr('sortBy');

    if (sortAction) {
      return sortAction(args);
    } else {
      return sortBy(args);
    }
  }
});
