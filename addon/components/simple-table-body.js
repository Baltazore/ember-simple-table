import Ember from 'ember';
import layout from '../templates/components/simple-table-body';

export default Ember.Component.extend({
  layout,
  tagName: 'tbody',

  columnKeys: Ember.computed('columns', {
    get() {
      let columns = this.get('columns');
      if (Ember.isArray(columns)) {
        return columns;
      } else {
        return Object.keys(columns);
      }
    }
  })
});
