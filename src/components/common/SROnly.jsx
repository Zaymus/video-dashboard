import styled from "styled-components"

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0); /* Legacy property for Internet Explorer */
  clip-path: inset(50%);
  white-space: nowrap;
`;

const SROnly = ({ children, ...props }) => {
  return <ScreenReaderOnly {...props}>{children}</ScreenReaderOnly>
}

export default SROnly;