import { FC } from 'react';
import { RegistrationForm } from '@widgets/Form/Form.tsx';
import  s from './Page.module.scss';

export const RegisterPage: FC = () => {
  return (
    <section className={s.register}>
      <RegistrationForm/>
    </section>
  );
};
