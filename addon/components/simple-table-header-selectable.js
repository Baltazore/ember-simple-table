import get from '@ember/object/get';
import layout from '../templates/components/simple-table-header-selectable';
import BaseHeaderRow from './simple-table-header-row';

export default BaseHeaderRow.extend({
  layout,

  checkBoxComponent: null, // injected component for first column
  isAllSelected: null, // injected

  actions: {
    selectAll() {
      let selectAllAction = get(this, 'selectAllAction');
      if (selectAllAction) {
        return selectAllAction();
      } else {
        // TOOD: Better Ember warn
        // console.warn('Set `selectAllAction` for simpleTableHeaderSelectable');
        return true;
      }
    }
  }
});
