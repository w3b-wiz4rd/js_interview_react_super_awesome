import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  /* Display & Box Model */
  display: block;
  padding: ${props => props.padding || "10px 15px"};
  margin: ${props => props.margin || "0 auto"};
  width: ${props => props.width || "auto"};
  height: ${props => props.height || "auto"};
  /* Styling */
  background-color: #1bd4ff;
  background-image: linear-gradient(119deg, #1bd4ff 40%, #2127ff 100%);
  color: white;
  border: none;
  border-radius: 2rem;
  /* Text */
  font-size: 1.5rem;
  border-radius: ${props => props.borderRadius || "2rem"};
`;

Button.defaultProps = {
  disabled: false
};

Button.propTypes = {
  disabled: PropTypes.bool
};

Button.displayName = "Button";

export default Button;
