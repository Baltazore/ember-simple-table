import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/simple-table-body';

export default Component.extend({
  layout,
  tagName: 'tbody',

  columnKeys: computed('columns', {
    get() {
      let columns = this.get('columns');
      if (isArray(columns)) {
        if (columns[0].key) {
          return columns.map((item) => item.key);
        } else {
          return columns;
        }
      } else {
        return Object.keys(columns);
      }
    }
  })
});
