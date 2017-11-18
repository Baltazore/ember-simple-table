import { computed } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from '../templates/components/simple-table-sort-row';

export default Component.extend({
  layout,
  tagName: 'caption',

  criteria: A([]),

  sorts: computed('criteria.[]', {
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
