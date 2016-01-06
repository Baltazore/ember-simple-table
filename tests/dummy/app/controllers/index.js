import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sort(criteria) {
      console.log('sorting with criteria', criteria);
    }
  }
});
