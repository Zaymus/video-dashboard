import styled from "styled-components";
import SearchBar from "../SearchBar/";
import { NavLink } from "react-router";

const HeaderContainer = styled.div`
  width: 100%;
  padding: 0 15px;
  height: var(--header-height);
  background: var(--background-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary);
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;

  a {
    color: var(--primary);
    text-decoration: none;
    transition: text-shadow 150ms linear;
    
    &:active {
      color: var(--primary);
    }

    &:visitied {
      color: var(--primary);
    }

    &:hover {
      text-shadow: 0px 0px 10px var(--primary);
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NavLink to="/">Video Dashboard</NavLink>
      <SearchBar />
    </HeaderContainer>
  );
}

export default Header;