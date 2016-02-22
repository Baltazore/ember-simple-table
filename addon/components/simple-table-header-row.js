import Ember from 'ember';
import layout from '../templates/components/simple-table-header-row';
import Header from './simple-table-header';

export default Header.extend({
  layout,
  trClass: null,
  thClass: null
});
