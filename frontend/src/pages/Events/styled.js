import styled from 'styled-components';

export const EventsWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;

  border-radius: 16px 16px 0 0;
  box-shadow: 0 4px 8px 0 #ededed;
  background-color: #ffffff;

  transition: top 0.3s ease;

  padding: 0 2.4rem;

  &.on-swiping {
    transition: none;
    overflow-y: visible;
  }
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 340px);
  overflow-y: auto;

  .event {
    flex-shrink: 0;
    padding: 2.4rem 0;

    &:first-child {
      border-radius: 16px 16px 0 0;
    }

    border-bottom: solid 1px rgba(151, 151, 151, 0.2);
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
