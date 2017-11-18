import { A } from '@ember/array';
import Component from '@ember/component';
import get from '@ember/object/get';
import layout from '../templates/components/simple-table-header-row';

export default Component.extend({
  layout,
  tagName: 'thead',

  sortingCriteria: A([]),

  actions: {
    sortBy(key) {
      let sortAction = get(this, 'sortAction');
      let sortBy = get(this, 'sortBy');

      if (sortBy) {
        return sortBy(key);
      } else {
        return sortAction(key);
      }
    }
  }
});
