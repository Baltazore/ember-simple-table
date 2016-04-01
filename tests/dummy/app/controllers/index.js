import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sort(criteria) {
      console.log('sorting with criteria', criteria);
    },

    sortFoo(criteria) {
      console.log('sorting Foo column with criteria', criteria);
    },

    sortBaz(criteria) {
      console.log('sorting Baz column with criteria', criteria);
    },

    selectAllRows() {
      console.log('All Rows Selected');
    },

    selectRow(row) {
      debugger;
      console.log(`Selected row ${row}`);
    }
  }
});
