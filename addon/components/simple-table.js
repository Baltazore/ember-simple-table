import Ember from 'ember';
import layout from '../templates/components/simple-table';

export default Ember.Component.extend({
  layout,
  tagName: 'table',
  sortingCriteria: null,

  init() {
    this._super(...arguments);
    this.set('sortingCriteria', []);
  },

  didReceiveAttrs() {
    let data = this.getAttr('tableData');
    let columns = this.getAttr('tableColumns');
    let sortAction = this.getAttr('sortAction');

    if (sortAction) {
      this.set('sortBy', sortAction);
    } else {
      this.set('sortBy', this.actions.sortBy);
    }

    this.set('tData', data);
    this.set('tColumns', columns);

    this._super(...arguments);
  },

  tRows: Ember.computed.sort('tData', 'sortingCriteria'),

  table: Ember.computed('tRows', 'tColumns', {
    get() {
      return Ember.Object.create({
        rows: this.get('tRows'),
        columns: this.get('tColumns'),
        sortBy: this.get('sortBy')
      });
    }
  }),

  actions: {
    sortBy(criteria) {
      this.set('sortingCriteria', null);
      this.set('sortingCriteria', [criteria]);
      console.log(this.get('sortingCriteria'));
      return this.get('sortingCriteria');
    }
  }

});
