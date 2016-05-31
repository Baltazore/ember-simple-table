import Ember from 'ember';
import layout from '../templates/components/simple-table-sort-row';

export default Ember.Component.extend({
  layout,
  tagName: 'caption',

  criteria: null,

  sorts: Ember.computed('criteria.[]', {
    get() {
      let criteria = this.get('criteria');

      return criteria.filterBy('order');
    }
  }),

  actions: {
    removeSort(criteria) {
      this.get('removeSortOption')(criteria);
    },

    setNewCriteria(items) {
      this.get('setNewCriteria')(items);
    }
  }
});
