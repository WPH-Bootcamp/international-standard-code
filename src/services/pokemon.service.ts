import axiosInstance from '@/api';

export const getAllPokemons = async () => {
  try {
    const res = await axiosInstance.get('/pokemon');
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};
