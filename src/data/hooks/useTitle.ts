import { useContext } from 'react';
import TitleContext from '../contexts/TitleContext';

export const useTitle = () => useContext(TitleContext);