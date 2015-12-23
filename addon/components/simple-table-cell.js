import Ember from 'ember';
import layout from '../templates/components/simple-table-cell';

export default Ember.Component.extend({
  // jscs:disable
  layout: layout,
  // jscs:enable

  didReceiveAttrs() {
    let data = this.getAttr('data');
    let dataKey = this.getAttr('dataKey');
    let dataValue = data[dataKey];

    this.set('dataValue', dataValue);

    this._super(...arguments);
  }

});
