import { sort } from '@ember/object/computed';
import Component from '@ember/component';
import { A as emberA, isArray } from '@ember/array';
import { set, get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/simple-table';

export default Component.extend({
  layout,
  tagName: 'table',

  defaultSorting: null, // injected

  sortingCriteria: computed('tColumns', {
    get() {
      let columns = this.get('tColumns');
      return columns.reduce((reducer, item) => {
        if (isArray(item)) {
          item.forEach((i) => {
            reducer.pushObject({ key: i.key, name: i.name, order: null });
          });
        } else {
          reducer.pushObject({ key: item.key, name: item.name, order: null });
        }
        return reducer;
      }, emberA([]));
    }
  }),

  sorting: computed('sortingCriteria.[]', 'tData.[]', 'defaultSorting', {
    get() {
      let sortingCriteria = this.get('sortingCriteria')
        .filterBy('order')
        .map(({ key, order }) => `${key}:${order}`);

      let defaultSorting = get(this, 'defaultSorting');
      if (!isEmpty(defaultSorting)) {
        sortingCriteria.push(defaultSorting);
      }

      return sortingCriteria;
    }
  }),

  tRows: sort('tData', 'sorting'),

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
    let oldPosition = null;
    let criteria = get(this, 'sortingCriteria');
    let oldCriteria = criteria.find(({ key }) => key === sortingKey);

    let oldOrder = get(oldCriteria, 'order');
    // Save oldPosition only if we already sorted by this column previously
    if (oldOrder) {
      oldPosition = criteria.indexOf(oldCriteria);
    }
    criteria.removeObject(oldCriteria);

    let newOrder = this._toggleSortingOrder(oldOrder);
    set(oldCriteria, 'order', newOrder);
    if (oldPosition !== null) {
      criteria.insertAt(oldPosition, oldCriteria);
    } else {
      criteria.pushObject(oldCriteria);
    }
  },

  _toggleSortingOrder(order) {
    switch (order) {
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
