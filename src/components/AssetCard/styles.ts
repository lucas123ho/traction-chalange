import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const Name = styled.div`
  font-weight: 600;
`;

export const CoverImage = styled.img`
  height: 15rem;
  object-fit: cover;
  object-position: center;
`;

export const ModelContainer = styled.div`
  position: absolute;
  top: 2.4rem;
  left: -0.6rem;
  text-transform: uppercase;
`;