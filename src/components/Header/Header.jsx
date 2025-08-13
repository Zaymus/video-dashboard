import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

const HeaderContainer = styled.div`
  width: 100%;
  height: 75px;
  background: var(--background-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--primary);
  position: fixed;
  top: 0;
  left: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <SearchBar />
    </HeaderContainer>
  );
}

export default Header;