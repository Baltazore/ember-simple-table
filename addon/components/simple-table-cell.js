import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',

  classNameBindings: ['columnsClass'],
  attributeBindings: ['rowspan', 'colspan', 'columnsStyle:style'],

  columnsClass: Ember.computed.alias('columns.classes'),
  columnsStyle: Ember.computed('columns.style', {
    get() {
      return Ember.String.htmlSafe(this.get('columns.style'));
    }
  }),

  actions: {
    sortBy(key) {
      return this.get('sortAction')(key);
    }
  }

});
