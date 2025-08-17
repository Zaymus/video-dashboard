import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

const HeaderContainer = styled.div`
  width: 100vw;
  height: var(--header-height);
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