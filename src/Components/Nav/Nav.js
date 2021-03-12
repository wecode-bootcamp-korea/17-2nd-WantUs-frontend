import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import NavDetail from './NavDetail';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscBell } from 'react-icons/vsc';
import { RiAccountCircleFill } from 'react-icons/ri';
import BoardContext from '../../BoardContext';
import LoginButton from './LoginButton';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      hovervalue: '',
      profileDrop: false,
    };
  }
  componentDidMount() {
    this.getCategoryData();
  }

  getCategoryData = () => {
    fetch('/data/navData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          category: data.data,
        });
      });
  };

  handleCategoryMouseHover = e => {
    this.setState({
      hovervalue: e.target.innerText,
    });
  };

  goToMain = () => {
    this.props.history.push('/');
  };

  goToCV = () => {
    this.props.history.push('/cv');
  };

  goToLoginMain = () => {
    this.props.history.push('/newintro');
  };

  goToExplore = () => {
    this.props.history.push('/explore');
  };

  handleProfile = () => {
    this.setState({
      profileDrop: !this.state.profileDrop,
    });
  };

  goToProfile = path => {
    if (!sessionStorage.getItem('access_token')) {
      alert('로그인이 필요한 서비스 입니다.');
      return;
    }

    this.props.history.push(`/${path}`);
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <>
        <NavContainer>
          {this.state.profileDrop && (
            <DropDownMenu>
              <ul>
                <li onClick={() => this.goToProfile('mypage')}>MY 원트어스</li>
                <li onClick={() => this.goToProfile('myprofile')}>프로필</li>
              </ul>
            </DropDownMenu>
          )}
          <NavmainBox>
            <NavLogo
              onMouseEnter={this.handleCategoryMouseHover}
              onClick={this.goToLoginMain}
            >
              <span>wantus</span>
            </NavLogo>
            <TextBox>
              <Menu
                onClick={this.goToExplore}
                onMouseEnter={this.handleCategoryMouseHover}
              >
                탐색
              </Menu>
              <Menu onMouseEnter={this.handleCategoryMouseHover}>
                커리어 성장
              </Menu>
              <Menu onClick={this.goToMain}>직군별 연봉</Menu>
              <Menu onClick={this.goToCV}>이력서</Menu>
              <Menu onClick={this.goToMain}>매치업</Menu>
              <Menu onClick={this.goToMain}>프리랜서</Menu>
            </TextBox>
            <IconBox>
              <Button>
                <AiOutlineSearch size="24" />
              </Button>
              <Button>
                <VscBell size="24" />
              </Button>
              <Button onClick={this.handleProfile}>
                <RiAccountCircleFill size="24" />
              </Button>
              {!sessionStorage.getItem('access_token') ? (
                <LoginButton />
              ) : (
                <span onClick={() => sessionStorage.removeItem('access_token')}>
                  Log out
                </span>
              )}
              <Button>
                <CompanyService>기업서비스</CompanyService>
              </Button>
            </IconBox>
          </NavmainBox>
        </NavContainer>
        {this.state.hovervalue === '탐색' && (
          <NavDetail
            categoryTitle={this.state.category}
            onMouseEnter={this.handleCategoryMouseHover}
            onMouseLeave={this.handleCategoryMouseHover}
          />
        )}
      </>
    );
  }
}

export default withRouter(Nav);

const DropDownMenu = styled.div`
  position: absolute;
  top: 49px;
  left: 60%;
  width: 120px;
  border: 1px solid #e1e2e3;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: inherit;

  li {
    padding: 15px 10px;
    border-top: 1px solid #e1e2e3;
    text-align: center;
    cursor: pointer;
  }
`;

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 100%;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid lightgray;
  z-index: 1000;
`;

const NavmainBox = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  width: 74px;
  font-size: 23px;
  font-weight: bold;
  margin-right: 30px;
  cursor: pointer;
`;

const TextBox = styled.div`
  height: 21px;
  font-size: 14px;
  line-height: 20px;

  li {
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin: 0 20px;
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  height: 21px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyService = styled.button`
  width: 90px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e1e2e3;
  border-radius: 15px;
  outline: none;
  background-color: white;
  color: #666;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`;

const Button = styled.button`
  background: white;
  border: none;
  outline: none;
  margin: 0 5px;
  cursor: pointer;
`;

const Menu = styled.li`
  &:hover {
    border-bottom: solid 2px gray;
    height: 37px;
    z-index: 2010;
  }

  &:active {
    border-bottom: solid 2px #2d5bff;
    height: 37px;
    z-index: 2010;
  }
`;
