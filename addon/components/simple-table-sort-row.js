import { computed, get } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from '../templates/components/simple-table-sort-row';

export default Component.extend({
  layout,
  tagName: 'caption',

  criteria: A([]),

  sorts: computed('criteria.[]', {
    get() {
      let criteria = get(this, 'criteria');

      return criteria.filterBy('order');
    }
  }),

  actions: {
    removeSort(item) {
      get(this, 'removeSortOption')(item);
    },

    reorderCriteria(items) {
      get(this, 'reorderCriteria')(items);
    }
  }
});
