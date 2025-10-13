import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/auth.service';
import { loginSchema, type LoginFormData } from '@/lib/validator/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface LoginDataInterface {
  username: string;
  password: string;
}

const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginDataInterface) =>
      login(data.username, data.password),
    onSuccess: (res) => {
      // redirect to app
      const { token } = res; //token dari API
      localStorage.setItem('token', token);
    },
    onError: (err) => {
      //   show message error
      console.log('error: ', err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const handlerLogin = (data: LoginDataInterface) => {
    loginMutation.mutate(data);
  };

  return {
    handlerLogin,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
};

export default useLogin;
