import styled from 'styled-components';

export const EventsWrapper = styled.div`
  position: fixed;
  z-index: 3;
  display: flex;
  flex-direction: column;

  border-radius: 16px;
  box-shadow: 0 4px 8px 0 #ededed;
  background-color: #ffffff;
  overflow-y: auto;

  transition: top 0.3s ease;
  height: calc(100vh - 211px);
  &.on-swiping {
    transition: none;
    overflow-y: visible;
  }

  .event {
    flex-shrink: 0;
    border-radius: 16px 16px 0 0;
  }
`;

export const SwipeHandler = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

export const Indicator = styled.span`
  margin: 1.6rem auto;
  width: 80px;
  height: 4px;
  border-radius: 2px;
  background-color: #e5e5e5;
`;
