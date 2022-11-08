import axios from 'axios';

export const getItem = () => axios.get('/api/getItem');
export const getName = () => axios.get('/api/getName');
