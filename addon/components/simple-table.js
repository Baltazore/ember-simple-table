import Ember from 'ember';
import layout from '../templates/components/simple-table';

const { A: emberA } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'table',

  sorting: Ember.computed('sortingCriteria.[]', {
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

  tRows: Ember.computed.sort('tData', 'sorting'),

  actions: {
    sortBy(key) {
      let sortAction = this.get('sortAction');

      this._setOrderForColumn(key);

      if (sortAction) {
        let criteria = this.get('sortingCriteria');
        sortAction(criteria);
      }
    },

    removeSortOption(criteria) {
      let sortCriteria = this.get('sortingCriteria');

      let oldCritera = sortCriteria.find((key) => criteria.key);
      Ember.set(oldCriteria, 'order', null);
    },

    setNewCriteria(criteria) {
      this.set('sortingCriteria', criteria);
    }
  },

  _setOrderForColumn(sortingKey) {
    let oldOrder = null;
    let criteria = this.get('sortingCriteria');
    let oldCriteria = criteria.find(({ key }) => key === sortingKey);

    oldOrder = Ember.get(oldCriteria, 'order');
    criteria.removeObject(oldCriteria);

    let newOrder = this._toggleSortingOrder(oldOrder);
    Ember.set(oldCriteria, 'order', newOrder);
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
