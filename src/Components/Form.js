import styled from "styled-components";
import Input from "./Input";

const Form = styled.form`
  /* Display & Box Model */
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || "0"};
`;
Form.Input = Input;

export default Form;
