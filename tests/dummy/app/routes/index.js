import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      tableData: [
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' }
      ],
      tableColumns: ['foo', 'baz']
    };
  }
});
