import Ember from 'ember';
import layout from '../templates/components/simple-table-header';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',

  didReceiveAttrs() {
    let table = this.getAttr('table');

    this.set('columns', table.columns);
    this.set('sortAction', table.sortAction);
    this._super(...arguments);
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
        sortAction: this.actions.sortBy.bind(this)
      });
    }
  }),

  actions: {
    sortBy(args) {
      let sortAction = this.get('sortAction');
      let sortBy = this.getAttr('sortBy');

      if (sortAction) {
        return sortAction(args);
      } else {
        return sortBy(args);
      }
    }
  }

});
