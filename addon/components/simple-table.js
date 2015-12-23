import Ember from 'ember';
import layout from '../templates/components/simple-table';

export default Ember.Component.extend({
  // jscs:disable
  layout: layout,
  // jscs:enable

  tagName: 'table',

  didReceiveAttrs() {
    let data = this.getAttr('tableData');
    let columns = this.getAttr('tableColumns');

    this.set('bodyRows', data);
    this.set('columns', columns);

    this._super(...arguments);
  },

  headerRow: Ember.computed('columns', {
    get() {
      let headerRow = {};
      this.get('columns').forEach((column) => {
        headerRow[column] = Ember.String.capitalize(column);
      });

      return headerRow;
    }
  })

});
