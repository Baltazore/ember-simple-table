import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  layout,
  tagName: 'th',

  classNameBindings: ['columnsClass'],
  attributeBindings: ['rowspan', 'colspan', 'columnsStyle:style'],

  columnsClass: Ember.computed('columns.classes', {
    get() {
      let columns = this.get('columns');
      let column = Ember.isArray(columns) ? columns[0] : columns;
      return Ember.String.htmlSafe(column.classes);
    }
  }),
  columnsStyle: Ember.computed('columns.style', {
    get() {
      let columns = this.get('columns');
      let column = Ember.isArray(columns) ? columns[0] : columns;
      return Ember.String.htmlSafe(column.style);
    }
  }),

  actions: {
    sortBy(key) {
      return this.get('sortAction')(key);
    }
  }

});
