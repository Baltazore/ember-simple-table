import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      data: [
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' }
      ],
      longData: [
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' },
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' },
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' },
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' },
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' },
        { foo: 'bar1', baz: 'boo1' },
        { foo: 'bar2', baz: 'boo2' },
        { foo: 'bar3', baz: 'boo3' },
        { foo: 'bar4', baz: 'boo4' }
      ],
      columns: [
        { key: 'foo', name: "Foo", sortable: true, class: '' },
        { key: 'baz', name: "Baz", sortable: false, class: '' }
      ]
    };
  }
});
