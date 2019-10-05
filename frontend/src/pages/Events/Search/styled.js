import styled from 'styled-components';

export const Input = styled.input``;

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 62px;
  border-radius: 16px;
  box-shadow: 0 4px 16px 0 #ededed;
  background-color: #ffffff;
  z-index: 3;
  width: calc(100% - 20px);
  margin-left: 10px;
  padding: 0 2.4rem;

  .search-icon {
    margin-left: auto;
  }

  .close-icon {
    position: absolute;
    right: 8px;
    cursor: pointer;
  }

  input {
    color: #353b54;

    font-size: 1.6rem;
    border: 0;
    width: 250px;

    &::placeholder {
      color: #353b54;
    }
  }

  &.filled,
  &.focused {
    background-color: rgba(43, 53, 102, 0.4);
  }
`;
