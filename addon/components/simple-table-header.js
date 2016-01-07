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

  headerRow: Ember.computed('columns', {
    get() {
      return this.get('columns').reduce(
        (headerRow, column) => {
          headerRow[column] = Ember.String.capitalize(column);
          return headerRow;
        }, {}
      );
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
