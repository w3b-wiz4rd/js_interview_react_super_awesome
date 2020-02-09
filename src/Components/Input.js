import React from "react";
import styled from "styled-components";

const Field = styled.div`
  /* Positioning */
  position: relative;
  /* Display & Box Model */
  padding: 1rem;
  margin: ${props => props.margin || "0"};
  width: ${props => props.width || "auto"};
`;

const Input = styled.input`
  /* Display & Box Model */
  display: block;
  box-sizing: border-box;
  border-radius: 3rem;
  width: 100%;
  padding: 1.5rem;
  /* Styling */
  border: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  outline: 0;
  background: transparent;
  transition: border-color 0.2s;
  height: 40px;
  /* Text */
  font-size: 1.5rem;
`;

const ErrorMessage = styled.span`
  /* Display & Box Model */
  display: block;
  margin-top: 1rem;
  /* Styling */
  color: #f44336;
  /* Text */
  font-size: 1.2rem;
  text-align: right;
`;

const InputField = ({
  width,
  margin,
  label,
  error,
  onChange,
  onFocus,
  name,
  value,
  placeholder,
  type,
  disabled
}) => {
  return (
    <>
      <Field width={width} margin={margin}>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className={error ? "error" : ""}
          disabled={disabled}
        />
      </Field>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default InputField;
