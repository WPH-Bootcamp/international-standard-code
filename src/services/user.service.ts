import axiosInstance from '@/api';

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
