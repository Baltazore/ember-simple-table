import { htmlSafe } from '@ember/string';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/simple-table-cell';

export default Component.extend({
  layout,
  tagName: 'th',

  classNameBindings: ['columnsClass'],
  attributeBindings: ['rowspan', 'colspan', 'columnsStyle:style'],

  columnsClass: computed('columns.classes', {
    get() {
      let columns = this.get('columns');
      let column = isArray(columns) ? columns[0] : columns;
      return htmlSafe(column.classes);
    }
  }),
  columnsStyle: computed('columns.style', {
    get() {
      let columns = this.get('columns');
      let column = isArray(columns) ? columns[0] : columns;
      return htmlSafe(column.style);
    }
  }),

  actions: {
    sortBy(key) {
      return this.get('sortAction')(key);
    }
  }

});
