import Ember from 'ember';
import layout from '../templates/components/simple-table';

const { A: emberA, computed, get, set } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'table',

  sorting: computed('sortingCriteria.[]', {
    get() {
      return this.get('sortingCriteria')
        .filterBy('order')
        .map(({ key, order }) => `${key}:${order}`);
    }
  }),

  sortingCriteria: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let columns = this.get('tColumns');
    let criteria = columns.reduce((reducer, item) => {
      if (Ember.isArray(item)) {
        item.forEach((i) => {
          reducer.pushObject({ key: i.key, name: i.name, order: null });
        });
      } else {
        reducer.pushObject({ key: item.key, name: item.name, order: null });
      }
      return reducer;
    }, emberA([]));

    this.set('sortingCriteria', criteria);
  },

  tRows: computed.sort('tData', 'sorting'),

  actions: {
    sortBy(key) {
      let sortAction = get(this, 'sortAction');

      this._setOrderForColumn(key);

      if (sortAction) {
        let criteria = get(this, 'sortingCriteria');
        sortAction(criteria);
      }
    },

    removeSortOption(item) {
      let sortCriteria = get(this, 'sortingCriteria');
      let oldCriteria = sortCriteria.find(({ key }) => key === get(item, 'key'));
      sortCriteria.removeObject(oldCriteria);
      set(oldCriteria, 'order', null);
      sortCriteria.pushObject(oldCriteria);
    },

    reorderCriteria(newOrder) {
      let criteria = get(this, 'sortingCriteria');
      let reordered = newOrder.map((item) => {
        return criteria.find(({ key }) => key === get(item, 'key'));
      });

      criteria.removeObjects(reordered);
      criteria.pushObjects(reordered);
    }
  },

  _setOrderForColumn(sortingKey) {
    let oldOrder = null;
    let criteria = get(this, 'sortingCriteria');
    let oldCriteria = criteria.find(({ key }) => key === sortingKey);

    oldOrder = get(oldCriteria, 'order');
    criteria.removeObject(oldCriteria);

    let newOrder = this._toggleSortingOrder(oldOrder);
    set(oldCriteria, 'order', newOrder);
    criteria.pushObject(oldCriteria);
  },

  _toggleSortingOrder(order) {
    switch(order) {
    case null:
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
    }
  }
});
