import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Redux */
import {
  fetchMessagesAction,
  sendMessageAction
} from "./reducers/messagesReducer";
/* Components */
import Message from "./Components/Message";
import Form from "./Components/Form";
import Button from "./Components/Button";
import { device } from "./media";

const Container = styled.div`
  /* Display & Box Model */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Styling */
  background-color: #1bd4ff;
  background-image: linear-gradient(119deg, #1bd4ff 40%, #2127ff 100%);
`;

const ChatContainer = styled.div`
  /* Display & Box Model */
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-flow: column;
  /* Styling */
  border-radius: 2rem;
  background-color: white;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  @media ${device.laptop} {
    /* Display & Box Model */
    width: 70vw;
    height: 70vh;
  }
`;

const Chats = styled.div`
  /* Display & Box Model */
  width: 100%;
  padding: 2rem;
  flex: 7;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  /* Styling */
  background-color: transparent;
`;

const FormContainer = styled.div`
  /* Display & Box Model */
  width: 100%;
  padding: 1rem;
  flex: 1;
  /* Styling */
  border-top: 2px solid #f0f0f0;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  @media ${device.laptop} {
    /* Display & Box Model */
    padding: 1.5rem 3rem;
  }
`;

const NameContainer = styled.div`
  /* Display & Box Model */
  width: 100%;
  padding: 0 5rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  /* Styling */
  background-color: #121028;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;

const NameInput = styled.input`
  /* Display & Box Model */
  display: block;
  box-sizing: border-box;
  padding: 2rem;
  height: 40px;
  width: 100%;
  /* Styling */
  border: 0px;
  border-bottom: 2px solid #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: white;
  outline: 0;
  background: transparent;
  transition: border-color 0.2s;
  /* Text */
  font-size: 2.5rem;
  @media ${device.laptop} {
    /* Display & Box Model */
    width: 50%;
    /* Text */
    font-size: 3.5rem;
  }
`;

function App() {
  const dispatch = useDispatch();

  const { messages } = useSelector(state => ({
    messages: state.messages.messages
  }));

  const [formValues, setFormValues] = useState({ name: "", message: "" });

  useEffect(() => {
    dispatch(fetchMessagesAction());
  }, []);

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const newFormValues = { ...formValues };
    newFormValues[name] = value;
    setFormValues(newFormValues);
  };

  const onSubmit = event => {
    event.preventDefault();
    const { name, message } = formValues;
    dispatch(sendMessageAction(name, message));
    const newFormValues = { ...formValues };
    newFormValues.message = "";
    setFormValues(newFormValues);
  };

  return (
    <Container>
      <ChatContainer>
        <NameContainer>
          <NameInput
            name="name"
            onChange={onChange}
            placeholder="Name"
            value={formValues.name}
          />
        </NameContainer>
        <Chats>
          {messages.map(message => (
            <Message
              key={message.id}
              message={message}
              refresh={() => dispatch(fetchMessagesAction())}
            />
          ))}
        </Chats>
        <FormContainer>
          <Form onSubmit={onSubmit}>
            <div style={{ flex: 1 }}>
              <Form.Input
                name="message"
                onChange={onChange}
                placeholder="Message"
                value={formValues.message}
              />
            </div>
            <Button borderRadius="50%" width="6rem" height="6rem" margin="0">
              <i
                className="fas fa-paper-plane"
                style={{ fontSize: "2.5rem" }}
              />
            </Button>
          </Form>
        </FormContainer>
      </ChatContainer>
      <ToastContainer
        position="top-center"
        autoClose={1800}
        hideProgressBar
        newestOnTop
        closeOnClick
        transition={Zoom}
      />
    </Container>
  );
}

export default App;
