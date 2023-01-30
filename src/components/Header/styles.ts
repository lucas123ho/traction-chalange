import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  padding: 1.2rem 1.6rem;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  height: 6rem;
  box-shadow: 0px 0px 10px rgba(0,0,0,.3);
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6rem;
`;

export const LogoContainer = styled.picture`
  width: 13.5rem;
  height: 2.2rem;
`;

export const DropdownButton = styled.button`
  color: ${({ theme }) => theme.link};
  font-weight: 500;
  text-align: left;
  color: ${({ theme }) => theme.highlight};
`;

export const DropdownButtonTitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.white};
`;
