import { A } from '@ember/array';
import Component from '@ember/component';
import layout from '../templates/components/simple-table-header-row';

export default Component.extend({
  layout,
  tagName: 'thead',

  sortingCriteria: A([]),

  actions: {
    sortBy(key) {
      let sortAction = this.get('sortAction');
      let sortBy     = this.get('sortBy');

      if (sortBy) {
        return sortBy(key);
      } else {
        return sortAction(key);
      }
    }
  }
});
