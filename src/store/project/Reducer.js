/* eslint-disable linebreak-style */

import { GET } from './Types';

const initialState = {
  projects: [
    {
      id: 0, name: 'Du an 1', start: '12-10-2020', finishDate: '20-10-2020', state: 'Hoan thanh', hanhDong: 'lala',
    },
    {
      id: 1, name: 'Du an 1', start: '12-10-2020', finishDate: '20-10-2020', state: 'Hoan thanh', hanhDong: 'lala',
    }, {
      id: 2, name: 'Du an 1', start: '12-10-2020', finishDate: '20-10-2020', state: 'Hoan thanh', hanhDong: 'lala',
    }, {
      id: 3, name: 'Du an 1', start: '12-10-2020', finishDate: '20-10-2020', state: 'Hoan thanh', hanhDong: 'lala',
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
