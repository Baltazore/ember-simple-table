import Ember from 'ember';
import layout from '../templates/components/simple-table';

export default Ember.Component.extend({
  layout,
  tagName: 'table',

  init() {
    this.set('sortingCriteria', []);

    this._super(...arguments);
  },
  didReceiveAttrs() {
    let data = this.getAttr('tableData');
    let columns = this.getAttr('tableColumns');

    this.set('tData', data);
    this.set('tColumns', columns);

    this._super(...arguments);
  },

  tRows: Ember.computed.sort('tData', 'sortingCriteria'),

  sorting: Ember.observer('sortingCriteria', function() {
    console.log(this.get('sortingCriteria'));
    return this.get('tData');
  }),

  table: Ember.computed('tRows', 'tColumns', 'sortingCriteria', {
    get() {
      return Ember.Object.create({
        rows: this.get('tRows'),
        columns: this.get('tColumns'),
        sortBy: this.actions.sortBy
      });
    }
  }),

  actions: {
    sortBy(criteria) {
      this.set('sortingCriteria', [criteria]);
      console.log(this.get('sortingCriteria'));
      return this.get('sortingCriteria');
    }
  }

});
