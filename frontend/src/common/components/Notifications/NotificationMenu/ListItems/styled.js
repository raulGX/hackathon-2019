import styled from 'styled-components';

export { NotificationList, ListItem, Bullet, TextGroup };

const NotificationList = styled.ul`
  margin: 0;
  padding: 0;
  max-height: 12.8rem;
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 6.4rem;
`;

const Bullet = styled.div`
  background-color: ${({ theme, color }) => theme.palette[color].main};
  flex-shrink: 0;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin: 0 2.4rem;
`;

const TextGroup = styled.div`
  & > .date {
    color: ${({ theme }) => theme.palette.text.primary60};
  }
`;
