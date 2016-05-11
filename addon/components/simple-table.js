import Ember from 'ember';
import layout from '../templates/components/simple-table';

export default Ember.Component.extend({
  layout,
  tagName: 'table',

  sortingCriteria: [],

  tRows: Ember.computed.sort('tData', 'sortingCriteria'),

  actions: {
    sortBy(criteria) {
      let sortAction = this.get('sortAction');

      if (sortAction) {
        sortAction(criteria);
      } else {
        this.set('sortingCriteria', criteria);
      }
    }
  }

});
