import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const SelectedFiltersWrapper = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-wrap: wrap;
  min-height: 5.2rem;

  padding-bottom: 1.5rem;

  .arrow-collapse {
    transition: transform
      ${({ theme }) =>
        `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`};
  }

  &.divider {
    border-bottom: solid 1px ${({ theme }) => theme.palette.text.primary54};

    .arrow-collapse {
      transform: rotate(180deg);
    }
  }

  .selected-filter {
    margin-right: ${({ theme }) => theme.spacing(0.15)}rem;
    margin-bottom: 1rem;
  }

  .close-icon {
    position: absolute;
    right: ${props => props.theme.spacing(0.05)}rem;
  }
`;

export const ClearFiltersButton = styled(Button)`
  && {
    text-transform: inherit;
    color: ${({ theme }) => theme.palette.primary.dark};
    margin-bottom: 1rem;
  }
`;

export const FiltersList = styled.div`
  margin-left: 1rem;
  max-width: calc(100% - 4.8rem);

  & > .no-filters-label {
    line-height: 3.5rem;
    color: ${({ theme }) => theme.palette.text.primary60};
  }
`;
