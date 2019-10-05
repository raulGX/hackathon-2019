import React from 'react';
import * as PropTypes from 'prop-types';

import getWrapperBestPosition from '../../helpers';
import MatDOMWrapper from '../DomWrapper';

import StyledMatDropdownWrapper from './styled';

export default class DropdownWrapperHelper extends React.PureComponent {
  state = {
    style: {}
  };

  constructor(props) {
    super(props);

    this.ref = null;
    this.onSetRefHandler = this.onSetRefHandler.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    if (document.body.offsetHeight > window.innerHeight) {
      document.body.style.paddingRight = '15px';
    }
    this.setStyle();
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  onSetRefHandler(ref) {
    this.ref = ref;
  }

  setStyle() {
    const { triggerElement } = this.props;
    this.setState({
      style: getWrapperBestPosition(triggerElement, this.ref, 'bottom').style
    });
  }

  render() {
    const { className, onClose, children } = this.props;
    const { style } = this.state;

    return (
      <MatDOMWrapper onClose={onClose}>
        <StyledMatDropdownWrapper className={className} style={style} ref={this.onSetRefHandler}>
          {children}
        </StyledMatDropdownWrapper>
      </MatDOMWrapper>
    );
  }
}

DropdownWrapperHelper.propTypes = {
  triggerElement: PropTypes.oneOfType([PropTypes.object, PropTypes.element]).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

DropdownWrapperHelper.defaultProps = {
  className: 'mat-dropdown-wrapper'
};
