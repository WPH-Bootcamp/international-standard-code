/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input';
import useLogin from './useLogin';

const Login = () => {
  const { handlerLogin, register, handleSubmit, errors, isSubmitting } =
    useLogin();

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handlerLogin)}>
        <div className="">
          <label htmlFor="username">username</label>
          {/* @ts-ignore */}
          <Input type="text" id="username" {...register('username')} />
          <p className="text-red-500">{errors.username?.message}</p>
        </div>
        <div className="">
          <label htmlFor="password">password</label>
          {/* @ts-ignore */}
          <Input type="password" id="password" {...register('password')} />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        <Button disabled={isSubmitting} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
