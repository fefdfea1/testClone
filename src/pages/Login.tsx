import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button';
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate()
  const clickLoginButton = () => {
    navigate('/');
    console.log('login');
  };

  return (
  <>
    <div className="shadow-md rounded-xl p-8 w-[400px] h-[500px] mx-auto my-4 flex items-center">
      <div className=''>
      <Input width=''
          inputTitle={'이메일'} placeholder={'Email'} warning={''} type={'email'} />
        <Input 
            width=''
            inputTitle={'비밀번호'} placeholder={'Password'} warning={''} type={'password'}  />
          <AiOutlineEyeInvisible className="absolute left-10 text-xl mx-4" />
        <Button onClick={clickLoginButton} style={"btn btn-outline btn-primary w-80 m-2 text-base"} text={'로그인'}/>

      </div>

    </div>
  </>
  );
}
