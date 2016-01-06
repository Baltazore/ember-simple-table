import Ember from 'ember';
import layout from '../templates/components/simple-table-header';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',

  didReceiveAttrs() {
    let table = this.getAttr('table');

    this.set('columns', table.columns);
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
        columns: this.get('columns')
      });
    }
  })

});
