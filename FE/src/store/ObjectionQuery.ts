import { IssueType } from 'IssueTypes';
import { atom } from 'recoil';

const ObjectionQuery = atom<{valid: boolean, data: IssueType[]}>({
  key: 'ObjectionQuery',
  default: {
    valid: true,
    data: []
  },
});

export { ObjectionQuery };
