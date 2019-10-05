import styled from 'styled-components';

export const Percentage = styled.span`
  font-size: 1.6rem;
  font-weight: 800;

  margin-left: auto;
`;

export const Container = styled.div`
  box-shadow: ${({ theme }) => theme.shadow.main};
  padding: 3.2rem 1.6rem;
  border-radius: 1.6rem;
  background-color: #fff;

  .visual {
    align-items: center;
  }

  ${props =>
    props.severity &&
    `
    g {
      fill: ${props.theme.palette[props.severity]}
    }

    ${Percentage} {
      color: ${props.theme.palette[props.severity]}
    }
  `}
`;

export const Name = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 800;
  color: #353b54;
  margin-top: 1.9rem;
`;
