/**
 * This module exports a stateless reusable external link component
 * ============
 * @module perinext/components/Link
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a link as a pure component
 * @param {object} props
 * @param {string} props.to - the url to point to
 * @param {array} props.children - children elements of the component
 * @return {ReactElement} component - the component
 */
const Link = ({
  to,
  children
}) => <a href={to} target="blank">{children}</a>;

/**
 * Component's properties types
 */
Link.propTypes = {
  /**
   * url to point to
   */
  to: PropTypes.string,
  /**
   * children react elements
   */
  children: PropTypes.array
};

export default Link;
