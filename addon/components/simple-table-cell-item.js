import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { A as emArray } from '@ember/array';
import layout from '../templates/components/simple-table-cell-item';

export default Component.extend({
  layout,
  tagName: "",
  column: null,
  criteria: emArray([]),

  sortable: computed('column', {
    get() {
      return get(this, 'column.sortable') === false ? false : true;
    }
  }),

  sortOrder: computed('column', 'criteria.[]', {
    get() {
      let columnKey = get(this, 'column.key');
      let criteria = get(this, 'criteria').find(({ key }) => key === columnKey);

      if (criteria) {
        return get(criteria, 'order');
      }
      return null;
    }
  }),

  actions: {
    sortBy(key) {
      return get(this, 'sortAction')(key);
    }
  }

});
