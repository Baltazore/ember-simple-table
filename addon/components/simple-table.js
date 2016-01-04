import Ember from 'ember';
import layout from '../templates/components/simple-table';

export default Ember.Component.extend({
  layout,
  tagName: 'table',

  sortingCriteria: [],

  didReceiveAttrs() {
    let data = this.getAttr('tableData');
    let columns = this.getAttr('tableColumns');

    this.set('tData', data);
    this.set('columns', columns);

    this._super(...arguments);
  },

  bodyRows: Ember.computed.sort('tData', 'sortingCriteria'),

  headerRow: Ember.computed('columns', {
    get() {
      let headerRow = {};

      this.get('columns').forEach((column) => {
        headerRow[column] = Ember.String.capitalize(column);
      });

      return headerRow;
    }
  }),

  actions: {
    sortBy(sortingCriteria) {
      this.set('sortingCriteria', sortingCriteria);
    }
  }

});
