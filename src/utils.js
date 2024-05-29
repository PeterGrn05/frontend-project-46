import _ from 'lodash';

function getDifferentObject(obj1, obj2) {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return allKeys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    const action = getAction(key, oldValue, newValue);
    return action;
  });

  function getAction(key, oldValue, newValue) {
    if (!_.has(obj2, key)) {
      return {
        action: 'deleted',
        key,
        oldValue,
      };
    }
    if (!_.has(obj1, key)) {
      return {
        action: 'added',
        key,
        newValue,
      };
    }
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        action: 'nested',
        key,
        children: getDifferentObject(oldValue, newValue),
      };
    }
    if (oldValue !== newValue) {
      return {
        action: 'changed',
        key,
        oldValue,
        newValue,
      };
    }
    return {
      action: 'unchanged',
      key,
      oldValue,
    };
  }
}

export default getDifferentObject;
