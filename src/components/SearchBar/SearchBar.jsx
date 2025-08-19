import { useRef, useState } from 'react';
import styled from "styled-components";
import { SROnly } from '../common';
import useScreenSize from '../../hooks/useScreenSize';

const Container = styled.div`
  background: var(--background-dark);
  display: flex;
  align-items: center;
`;

const DesktopContainer = styled(Container)`
  width: 35%;
  height: 40px;
  padding-left: 10px;
  border-radius: 25px;
  border: 2px solid var(--primary);
  overflow: hidden;
`;

const MobileContainer = styled(Container)`
  height: 37px;
  width: 37px;
  position: fixed;
  right: 0;
  top: 19px;
  padding: 0 15px;
  justify-content: flex-end;
  transition: width 300ms linear 250ms;

  &.expanded {
    width: calc(100vw - 30px);
  }
`;

const InputWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.8;

  &.hidden {
    display: none;
  }
`;

const BackButton = styled.div`
  position: relative;
  left: 37px;
  width: 37px;
  height: 37px;
  background-color: var(--surface-dark);
  border-radius: 25px;
  box-shadow: 0px 0px 5px var(--primary);
  color: var(--primary);
  
  transition: transform 150ms linear, left 150ms linear 200ms;

  &.close {
    transform: rotate(180deg);
  }

  &.open {
    left: 0;
    transform: rotate(0deg);
  }

  i {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  height: 100%;
  width: calc(100% - 20px);
  padding: ${props => props.ismobile ? '1px 37px 1px 5px' : '1px 5px'};
  border-radius: 0 25px 25px 0;
  font-size: 1rem;
  border: none;
  background-color: ${props => props.ismobile ? 'var(--surface-dark)' : 'var(--background-dark)'};
  color: var(--text-dark);
  
  transition: width 300ms linear 250ms, padding 300ms linear 250ms;

  &.collapsed {
    width: 0;
    padding: 1px 1px 1px 5px;
  }
  
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  position: ${props => props.ismobile ? 'fixed' : 'initial'};
  height: ${props => props.ismobile ? '37px' : '100%'};
  width: ${props => props.ismobile ? '37px' : '20%'};
  padding: 0;
  border: none;
  font-size: 1.2rem;
  background-color: var(--surface-dark);
  color: var(--primary);
  transition: text-shadow 0.15s linear;
  border-radius: ${props => props.ismobile ? '25px' : '0 25px 25px 0px'};
  box-shadow: 0px 0px 5px var(--primary);
  z-index: 100;

  &:hover {
    cursor: pointer;
    text-shadow: ${props => props.ismobile ? 'none' : '0px 0px 5px var(--primary)'};
  }
`;

const SearchButton = ({ ismobile=false, onClick }) => {
  return (
    <SearchBtn ismobile={ismobile} onClick={onClick} data-testid="search-button" >
      <SROnly>${ismobile ? 'Open search bar' : 'Search'}</SROnly>
      <i className="fa-solid fa-magnifying-glass" />
    </SearchBtn>
  );
}

const DesktopSearchBar = () => {
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
    <DesktopContainer ref={searchBarRef}>
      <SearchInput
        type="search"
        placeholder="Search"
        name="search"
        onFocus={focusHandler}
        onBlur={blurHandler}
        spellCheck
      />
      <SearchButton />
    </DesktopContainer>
  );
}

const MobileSearchBar = () => {
  const [ expanded, setExpanded ] = useState(false);
  const [ hideSearch, setHideSearch ] = useState(true);
  
  const buttonClickHandler = () => {
    setHideSearch(false);
    if (!expanded) {
      setExpanded(true);
    }
  };

  const backClickHandler = () => {
    setExpanded(false);
    setTimeout(() => {
      setHideSearch(true);
    }, 500);
  }

  return (
    <MobileContainer className={expanded ? 'expanded' : null}>
        <SearchBarWrapper id="searchBarWrapper" className={hideSearch ? 'hidden' : null}>
          <BackButton
            data-testid="back-button"
            id="back-button"
            className={expanded ? 'open' : 'close'}
            onClick={() => backClickHandler()}
            aria-hidden={!expanded}
          >
            <i class={`fa-solid fa-chevron-left`} />
            <SROnly>Close search bar</SROnly>
          </BackButton>
          <InputWrapper>
            <SearchInput
              id="search-input"
              type="search"
              placeholder="Search"
              name="search"
              spellCheck
              ismobile
              aria-hidden={!expanded}
              className={!expanded ? 'collapsed' : null}
            />
          </InputWrapper>
        </SearchBarWrapper>
        <SearchButton ismobile onClick={() => buttonClickHandler()} />
    </MobileContainer>
  );
}

const SearchBar = () => {
  const {screenSize, SCREEN_SIZES} = useScreenSize();

  return (
    <>
      {[SCREEN_SIZES.DESKTOP, SCREEN_SIZES.TABLET].includes(screenSize) ? <DesktopSearchBar /> : <MobileSearchBar />}
    </>
  );
}

export default SearchBar;