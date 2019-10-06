import styled from 'styled-components';

import Event from 'assets/images/event.png';

export const EventWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;
  background-color: white;
`;

export const EventHeader = styled.div`
  height: 30rem;
  background-image: url(${Event});
  background-repeat: no-repeat;
  background-size: 100% auto;
`;

export const Icons = styled.div`
  display: flex;
  width: 100%;
  padding: 4.1rem 3.6rem 0 3.6rem;

  .heart {
    margin-left: auto;
  }

  svg {
    margin-right: 1.8rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const EventContent = styled.div`
  padding: 4.1rem 2.4rem 0 2.4rem;

  max-height: calc(100vh - 38.3rem);
  overflow-y: auto;
`;

export const EventName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const Stat = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;

  &.date {
    path {
      fill: ${({ theme }) => theme.palette.primary.main};
    }
    span {
      font-weight: bold;
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  span {
    display: inline-block;
    font-size: 1.2rem;
    margin-left: 0.8rem;
  }
`;

export const Divider = styled.div`
  height: 0.1rem;
  opacity: 0.2;
  background-color: #979797;

  margin: 3.5rem 0 3.1rem 0;
`;

export const AboutTitle = styled.h6`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 3rem 0 2rem 0;
`;

export const Description = styled.p`
  font-size: 1.4rem;
`;

export const Sticky = styled.div`
  box-shadow: 0 4px 16px 0 #ededed;
  background-color: #ffffff;
  padding: 2.2rem 2.8rem;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const Button = styled.button`
  appearance: none;
  border-radius: 24px;
  font-size: 1.4rem;
  font-weight: 800;
  background-color: white;
  border: solid 1px ${({ theme }) => theme.palette.primary.main};

  width: 100%;
  padding: 1rem 0 1.1rem 0;

  &.joined {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: white;
  }
`;
