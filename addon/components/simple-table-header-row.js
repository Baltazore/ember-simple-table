import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';

export default Ember.Component.extend({
  layout,
  tagName: 'thead',

  sortingCriteria: Ember.A([]),

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
