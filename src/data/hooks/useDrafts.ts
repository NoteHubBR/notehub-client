import { useContext } from 'react';
import { UserDraftsContext } from '../contexts';

export const useDrafts = () => useContext(UserDraftsContext);