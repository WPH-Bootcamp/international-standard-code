import axiosInstance from '@/api';

export const login = async (username: string, password: string) => {
  try {
    const res = await axiosInstance.post('/auth/login', {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
