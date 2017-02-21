import React from 'react';
import cx from 'classnames';

const classes = ({intent, disabled}) =>
  cx('f6 f5-ns fw6 dib ba b--black-20 ph3 ph4-ns pv2 pv3-ns br2 no-underline', {
    grow: !disabled,
    pointer: !disabled,
    'o-30': disabled,
    'bg-blue white': intent === 'primary'
  });

const Button = ({ intent, disabled, children, ...props }) => (
  <button
    {...props}
    className={classes({intent, disabled})}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  intent: React.PropTypes.oneOf(['primary'])
};

export default Button;

export const PrimaryButton = (props) => <Button {...props} intent="primary" />;
