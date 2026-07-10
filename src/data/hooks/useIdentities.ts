import { useContext } from 'react';
import UserIdentitiesContext from '../contexts/UserIdentitiesContext';

export const useIdentities = () => useContext(UserIdentitiesContext);