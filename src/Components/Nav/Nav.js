import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import NavDetail from './NavDetail';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscBell } from 'react-icons/vsc';
import { RiAccountCircleFill } from 'react-icons/ri';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      hovervalue: '',
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

  render() {
    return (
      <>
        <NavContainer>
          <NavLogo onMouseEnter={this.handleCategoryMouseHover}>
            <span>wantus</span>
          </NavLogo>
          <TextBox>
            <Menu
              onClick={this.goToMain}
              onMouseEnter={this.handleCategoryMouseHover}
            >
              탐색
            </Menu>
            <Menu onMouseEnter={this.handleCategoryMouseHover}>
              커리어 성장
            </Menu>
            <Menu onClick={this.goToMain}>직군별 연봉</Menu>
            <Menu onClick={this.goToMain}>이력서</Menu>
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
            <Button>
              <RiAccountCircleFill size="24" />
            </Button>
            <Button>
              <CompanyService>기업서비스</CompanyService>
            </Button>
          </IconBox>
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
`;

const NavLogo = styled.div`
  width: 74px;
  height: 21px;
  font-size: 23px;
  font-weight: bold;
  margin-left: 50px;
`;

const TextBox = styled.div`
  height: 21px;
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
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
`;

const CompanyService = styled.button`
  padding: 0 10px;
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
    height: 33.5px;
    z-index: 2010;
  }

  &:active {
    border-bottom: solid 2px #2d5bff;
    height: 33.5px;
    z-index: 2010;
  }
`;
