import { Schema, Document, model } from 'mongoose';
import cloneDeep from 'clone-deep';

const League = new Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  managing: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  admins: {
    type: Array,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    default: 'private',
  },
  adminAccessToken: {
    type: String,
  },
  userAccessToken: {
    type: String,
  },
  options: {
    type: Object,
    required: true,
  },
  teams: {
    type: Array,
    required: true,
  },
  rounds: {
    type: Array,
    required: true,
  },
  standings: {
    type: Array,
    required: true,
  },
});

League.methods.compareFunction = function (a, b, i = 0) {
  const sortingPriority = this.options.sortingPriority;
  const firstItem = a[sortingPriority[i]];
  const secondItem = b[sortingPriority[i]];

  if (sortingPriority.length < i) {
    return 0;
  }

  console.log('a', firstItem, 'b', secondItem, sortingPriority[i], i);
  if (typeof firstItem === 'string') {
    return firstItem.localeCompare(secondItem);
  }

  const sort = firstItem - secondItem;
  console.log('sort', sort);
  if (sort !== 0) {
    return sort;
  }

  return this.compareFunction(a, b, i + 1);
};

League.methods.sortStandings = function () {
  const comparatorFunction = this.compareFunction.bind(this);
  const oldStandings = cloneDeep(this.standings);
  const newStandings = oldStandings.sort(comparatorFunction);
  this.standings = newStandings;
  console.log('********************* NEW STANDINGS', newStandings);
};

export default model<Document>('League', League);
