import Ember from 'ember';
import layout from '../templates/components/simple-table-sort-row';

export default Ember.Component.extend({
  layout,
  tagName: 'caption',

  criteria: Ember.A([]),

  sorts: Ember.computed('criteria.[]', {
    get() {
      let criteria = this.get('criteria');

      return criteria.filterBy('order');
    }
  }),

  actions: {
    removeSort(item) {
      this.get('removeSortOption')(item);
    },

    reorderCriteria(items) {
      this.get('reorderCriteria')(items);
    }
  }
});
