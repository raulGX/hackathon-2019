import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

import StyledDomWrapper from './styled';

export default class DOMWrapperComponent extends React.PureComponent {
  state = {
    display: false
  };

  constructor(props) {
    super(props);

    this.onOverlayClickHandler = this.onOverlayClickHandler.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    if (document.body.offsetHeight > window.innerHeight) {
      document.body.style.paddingRight = '15px';
    }

    this.setState({
      display: true
    });
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  onOverlayClickHandler() {
    const { onClose } = this.props;
    this.setState({
      display: false
    });

    setTimeout(onClose, 225);
  }

  getClasses() {
    const { className } = this.props;
    const { display } = this.state;
    const classes = [className];
    if (display) {
      classes.push('display');
    }

    return classes.join(' ');
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(
      <StyledDomWrapper className={this.getClasses()}>
        <div className="overlay" onClick={this.onOverlayClickHandler} />
        {children}
      </StyledDomWrapper>,
      document.body
    );
  }
}

DOMWrapperComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

DOMWrapperComponent.defaultProps = {
  className: 'mat-dom-wrapper'
};
