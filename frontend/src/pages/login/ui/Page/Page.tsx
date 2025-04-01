import { FC } from 'react';
import  s from './Page.module.scss';
import { LoginForm } from '@widgets/LoginForm/LoginForm.tsx';

export const LoginPage: FC = () => {
  return (
    <section className={s.login}>
      <LoginForm/>
    </section>
  );
};
