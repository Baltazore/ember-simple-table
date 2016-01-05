import Ember from 'ember';
import layout from '../templates/components/simple-table-body';

export default Ember.Component.extend({
  layout,
  tagName: 'tbody',

  didReceiveAttrs() {
    let table = this.getAttr('table');

    this.set('rows', table.rows);
    this.set('columns', table.columns);
    this._super(...arguments);
  }
});
