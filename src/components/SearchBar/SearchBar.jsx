import { useRef } from 'react';
import styled from "styled-components";
import { SROnly } from '../common';

const SearchContainer = styled.div`
  width: 35%;
  height: 40px;
  border-radius: 25px;
  border: 2px solid var(--primary);
  background: var(--surface-dark);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const SearchInput = styled.input`
  height: 100%;
  flex: 1;
  padding: 0 10px 0 20px;
  font-size: 1rem;
  border: none;
  background-color: var(--background-dark);
  color: var(--text-dark);

  &:focus {
    outline: none;
  } 
`;

const SearchButton = styled.button`
  height: 100%;
  flex: 0.1;
  border: none;
  font-size: 1.2rem;
  background-color: var(--surface-dark);
  color: var(--primary);
  transition: text-shadow 0.15s linear;
  border-radius: 0 25px 25px 0px;

  &:hover {
    cursor: pointer;
    text-shadow: 0px 0px 5px var(--primary);
  }
`;

const SearchBar = () => {
  const searchBarRef = useRef(null);

  const focusHandler = () => {
    if(searchBarRef) {
      searchBarRef.current.style.transition = "box-shadow 0.15s linear";
      searchBarRef.current.style.boxShadow = "0px 0px 10px var(--primary)";
    }
  }

  const blurHandler = () => {
    if (searchBarRef) {
      searchBarRef.current.style.boxShadow = null;
    }
  }

  return (
    <SearchContainer ref={searchBarRef}>
      <SearchInput
        type="search"
        placeholder="Search"
        name="search"
        onFocus={focusHandler}
        onBlur={blurHandler}
        spellCheck
      />
      <SearchButton>
        <SROnly>Search</SROnly>
        <i className="fa-solid fa-magnifying-glass"></i>
      </SearchButton>
    </SearchContainer>
  );
}

export default SearchBar;