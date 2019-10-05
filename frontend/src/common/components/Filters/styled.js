import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

import { Column } from 'common/styles/shared';

export const FiltersWrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 3rem;

  ${Column} {
    margin-right: 6rem;
    .category {
      color: ${({ theme }) => theme.palette.text.primary60};
    }

    .blank-checkbox {
      fill: ${({ theme }) => theme.palette.text.primary54};
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    color: ${({ theme }) => theme.palette.text.primary54};
  }
`;
