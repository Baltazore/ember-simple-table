import Ember from 'ember';
import layout from '../templates/components/simple-table-cell-item';

const { get, computed } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: "",
  column: null,
  criteria: null,

  sortable: computed('column', {
    get() {
      return get(this, 'column.sortable') === false ? false : true;
    }
  }),

  sortOrder: computed('column', 'criteria.[]', {
    get() {
      let columnKey = get(this, 'column.key');
      let criteria = get(this, 'criteria').find(({ key }) => key === columnKey);

      return get(criteria, 'order');
    }
  }),

  actions: {
    sortBy(key) {
      return get(this, 'sortAction')(key);
    }
  }

});
