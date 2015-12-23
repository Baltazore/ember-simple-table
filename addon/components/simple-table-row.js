import Ember from 'ember';
import layout from '../templates/components/simple-table-row';

export default Ember.Component.extend({
  // jscs:disable
  layout: layout,
  // jscs:enable

  tagName: 'tr'
});
