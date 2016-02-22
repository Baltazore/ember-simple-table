import Ember from 'ember';

export function simpleTableSortingClass([{ order, key }, column]/*, hash*/) {
  if (key || order) {
    return key === column ? order : '';
  }
}

export default Ember.Helper.helper(simpleTableSortingClass);
