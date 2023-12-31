import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

import { useMutation } from 'react-query';
import { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const postLogin = useMutation(
    'login',
    () =>
      fetch('api/customers/login', {
        method: 'POST',
      }),
    {
      onSuccess: res => {
        console.log('RES', res);
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  console.log({ useMutation });

  const clickLoginButton = () => {
    postLogin.mutate();
  };

  return (
    <>

      <div className="shadow-md rounded-xl p-8 mx-auto my-4 flex-col items-center flex-col items-center md:w-[400px] min-h-[400px] sm:w-[340px]">
        <div className="">
          <Input
            inputLabel={'이메일'}
            placeholder={'Email'}
            type={'email'}
            value={email}
            onInputChange={handleEmailChange}
          />
          <Input
            inputLabel={'비밀번호'}
            placeholder={'Password'}
            type={'password'}
            value={password}
            onInputChange={handlePasswordChange}
          />
          <AiOutlineEyeInvisible className="absolute left-10 text-xl mx-4" />
          <Button
            clickHandler={() => clickLoginButton()}
            style={'btn btn-outline btn-primary m-2 text-base w-full'}
            text={'로그인'}
          />
          <div>
            <a className="text-base text-sm">아직 회원이 아니신가요? 회원가입하기</a>
          </div>

        </div>
      </div>
    </>
  );
};
