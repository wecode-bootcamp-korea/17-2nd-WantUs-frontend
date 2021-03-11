import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../Styles/theme';
import { FaRegEnvelope, FaComment, FaApple, FaGoogle } from 'react-icons/fa';
import { SERVER, KAKAOLOGIN } from '../../config';

const KakaoInit = ({ history }) => {
  Kakao.init('16d72c2ad8d1c5e1a9f98c6812b1a63e');
};

const Login = () => {
  const [isModalOpen, setModalOpen] = useState(true);

  const handleModal = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    KakaoInit();
  }, []);

  const handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: auth => {
        fetch(`${KAKAOLOGIN}`, {
          method: 'GET',
          headers: { Authorization: auth.access_token },
        })
          .then(res => res.json())
          .then(result => {
            if (result.message === 'SUCCESS') {
              sessionStorage.setItem('access_token', result.accessToken);
              this.props.history.push('/');
              alert('로그인 성공');
            } else {
              alert('로그인 실패');
            }
          });
      },
      fail: error => {
        alert(JSON.stringify(error));
      },
    });
  };

  return (
    <LoginWrapper isModalOpen={isModalOpen}>
      <Modal>
        <ModalHeader>
          <h3>wantus</h3>
          <span onClick={handleModal}>x</span>
        </ModalHeader>
        <ModalBody>
          <h1>
            직장인을 위한
            <br />
            커리어 플랫폼, 원트어스!
          </h1>
          <h2>
            커리어 성장과 행복을 위한 여정
            <br />
            지금 원티드에서 시작하세요.
          </h2>
          <Form>
            <label for="email-input">
              이메일
              <input
                type="email"
                id="email-input"
                placeholder="이메일을 입력해 주세요."
              />
              <Button bgColor={'#3366ff'} color={'white'}>
                <FaRegEnvelope className="icon" color={'white'} />
                이메일로 시작하기
              </Button>
              <span>or</span>
            </label>
          </Form>
          <Button
            bgColor={'#f9dc02'}
            color={'#361d1c'}
            onClick={handleKakaoLogin}
          >
            <FaComment className="icon" color={'#361d1c'} />
            카카오톡으로 시작하기
          </Button>
          <Button>
            <FaApple className="icon" />
            Apple로 시작하기
          </Button>
          <Button>
            <FaGoogle className="icon" />
            Google로 시작하기
          </Button>
          <footer>
            <P>
              걱정마세요! 여러분의 지원 활동은 SNS에 노출되지 않습니다. <br />
              회원가입 시 <span>개인정보 처리방침</span>과 <span>이용약관</span>
              을 확인하였으며, 동의합니다.
            </P>
          </footer>
        </ModalBody>
      </Modal>
    </LoginWrapper>
  );
};

export default withRouter(Login);

const LoginWrapper = styled.div`
  display: ${props => (props.isModalOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #00000080;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-height: calc(100vh - 150px);
  background-color: ${theme.white};
  border-radius: 5px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  width: 400px;
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;

  h3 {
    font-size: 24px;
  }

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #828282;
    font-size: 30px;
    font-weight: 300;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  text-align: center;

  h1 {
    color: ${theme.fontColor};
    font-size: 26px;
    font-weight: 600;
    line-height: 1.54;
  }

  h2 {
    margin-top: 16px;
    color: #666666;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }
`;

const Form = styled.div`
  text-align: center;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #767676;
    font-size: 14px;
    font-weight: 400;

    input {
      margin: 15px 0 20px 0;
      width: 100%;
      height: 50px;
      padding: 0 15px;
      border: 1px solid #e1e2e3;
      border-radius: 5px;
      color: #333333;
      font-size: 15px;

      &::placeholder {
        color: #a1a1a1;
      }
    }

    span {
      display: block;
      margin: 0 auto 10px;
      color: #969696;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.color ? props.color : '#737373')};
  background-color: ${props => (props.bgColor ? props.bgColor : 'white')};
  border: ${props => (props.bgColor ? 'none' : '1px solid #e1e2e3')};
  border-radius: 27px;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }

  .icon {
    position: relative;
    top: -1px;
    margin-right: 5px;
    color: ${props => (props.color ? props.color : '#737373')};
  }
`;

const P = styled.p`
  margin-top: 20px;
  color: #999999;
  font-size: 12px;
  line-height: 18px;

  span {
    color: #3336ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;
