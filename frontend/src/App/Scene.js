import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: center;
  &:hover {
    background-color: hotpink;
  }
`;

function Scene({ children }) {
  return <Container>{children}</Container>;
}

export default Scene;
