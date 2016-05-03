import layout from '../templates/components/simple-table-header-selectable';
import BaseHeaderRow from './simple-table-header-row';

export default BaseHeaderRow.extend({
  layout,

  isAllSelected: null, // injected

  actions: {
    selectAll() {
      let selectAllAction = this.get('selectAllAction');
      if (selectAllAction) {
        return selectAllAction();
      } else {
        console.log('Set `selectAllAction` for simpleTableHeaderSelectable');
        return true;
      }
    }
  }
});
