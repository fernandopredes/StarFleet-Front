import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';


const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const Menu: React.FC<{ logoSrc: string }> = ({ logoSrc }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = "/";
  };

  return (
    <MenuContainer>
      <Logo src={logoSrc} alt="Logo" onClick={() => navigate('/news')} />
      <Navigation>
        <NavItem to="/news">Ten Forward News</NavItem>
        <NavItem to="/explorations">Holodeck Explorations</NavItem>
        <NavItem to="/quiz">Quiz Name</NavItem>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Navigation>
    </MenuContainer>
  );
};

export default Menu;
