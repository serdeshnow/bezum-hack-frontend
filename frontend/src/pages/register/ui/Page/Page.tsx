import { FC } from 'react';
import { RegistrationForm } from '@widgets/Form/Form.tsx';
// import './Page.scss';

export const RegisterPage: FC = () => {
  return (
    <section className="Page">
      <RegistrationForm/>
    </section>
  );
};
