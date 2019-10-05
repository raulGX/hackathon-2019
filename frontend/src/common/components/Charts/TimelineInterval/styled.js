import styled from 'styled-components';

export const StyledTimelineInterval = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  height: ${({ height }) => height || 'auto'};

  .time {
    color: ${({ theme }) => theme.palette.text.primary60};
    line-height: 3rem;
  }
`;
