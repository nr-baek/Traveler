import { useEffect, useState } from 'react';
import Register from '../../components/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  register,
  initializeForm,
} from '../../redux/modules/auth';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, registerCheck } = useSelector(({ auth }) => ({
    form: auth.register,
    registerCheck: auth.registerCheck,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const { id, password, nickname } = form;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ id, password, nickname }));
  };

  // store에서 auth.register 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    // 정상적인 회원가입 처리
    if (registerCheck === true) {
      history.push('/login');
    } 
    else if (registerCheck === 'input blank') {
      setError('빈 칸을 모두 입력하세요.');
    }
    // 중복 계정이 존재할 때 처리
    else if (registerCheck === 'overlap') {
      setError('이미 존재하는 ID입니다.');
    } 
    // 비밀번호와 비밀번호 확인 입력값이 다를 때 처리
    else if (registerCheck === 'password validation fail') {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
    } 
    // 비정상적인 회원가입 응답에 대한 처리
    else if (registerCheck === 'register fail') {
      setError('회원가입 실패');
    }
  }, [registerCheck, dispatch, history, error]);

  return (
    <Register
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
