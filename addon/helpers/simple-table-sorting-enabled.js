import Ember from 'ember';

export function simpleTableSortingEnabled([ { sortable } ]/*, hash*/) {
  return sortable === false ? false : true;
}

export default Ember.Helper.helper(simpleTableSortingEnabled);
