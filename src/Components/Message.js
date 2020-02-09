import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import moment from "moment";
/* API */
import { deleteMessage, updateMessage } from "../api/chat";
/* Components */
import Input from "./Input";
import Button from "./Button";
/* Utils */
import { device } from "../media";
import { errorHandling } from "../errorHandling";

const Container = styled.div`
  /* Display & Box Model */
  width: 100%;
  min-height: 7rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  /* Styling */
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  @media ${device.laptop} {
    /* Display & Box Model */
    width: 40rem;
    min-height: 9rem;
  }
`;

const FormContainer = styled.div`
  /* Display & Box Model */
  width: 100%;
  padding: 0;
  flex: 1;
`;

const Form = styled.form`
  /* Display & Box Model */
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 0;
`;

const Name = styled.h1`
  /* Display & Box Model */
  margin-bottom: 1.5rem;
  /* Styling */
  color: gray;
  /* Text */
  font-size: 1.8rem;
  text-align: right;
`;

const Message = styled.p`
  /* Display & Box Model */
  flex: 1;
  /* Styling */
  color: gray;
  /* Text */
  font-size: 1.5rem;
`;

const Time = styled.p`
  /* Styling */
  color: gray;
  /* Text */
  font-size: 1.5rem;
  text-align: right;
`;

const Actions = styled.div`
  /* Text */
  font-size: 1.5rem;
  i {
    color: gray;
    font-size: 1.3rem;
    cursor: pointer;
  }
  .fas {
    margin-right: 1.5rem;
  }
`;

const Content = styled.div`
  /* Display & Box Model */
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1rem;
`;

function MessageContainer({ message, refresh }) {
  const [enableMessageEdit, setEnableMessageEdit] = useState({
    enable: false,
    messageId: ""
  });
  const [formValues, setFormValues] = useState({ message: "", name: "" });

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
    const { messageId } = enableMessageEdit;
    updateMessageById(messageId, name, message);
  };

  const enableMessageEditForm = message => {
    setEnableMessageEdit({ enable: true, messageId: message.id });
    const newFormValues = { ...formValues };
    newFormValues.message = message.text;
    newFormValues.name = message.name;
    setFormValues(newFormValues);
  };

  const deleteMessageById = id => {
    deleteMessage(id)
      .then(() => {
        toast.success("Message Deleted");
        refresh();
      })
      .catch(error => {
        errorHandling(error);
      });
  };

  const updateMessageById = (id, name, message) => {
    updateMessage(id, name, message)
      .then(() => {
        toast.success("Message Updated");
        setEnableMessageEdit({ enable: false, messageId: "" });
        refresh();
      })
      .catch(error => {
        errorHandling(error);
      });
  };

  return (
    <Container>
      <Name>{message.name}</Name>
      <Content>
        {!enableMessageEdit.enable ? <Message>{message.text}</Message> : null}
        <>
          {enableMessageEdit.enable ? (
            <FormContainer>
              <Form onSubmit={onSubmit}>
                <div style={{ flex: 1 }}>
                  <Input
                    name="message"
                    onChange={onChange}
                    placeholder="Message"
                    value={formValues.message}
                  />
                </div>
                <Button
                  borderRadius="50%"
                  width="3rem"
                  height="3rem"
                  margin="0"
                  padding="0"
                >
                  <i
                    className="fas fa-paper-plane"
                    style={{ fontSize: "1.5rem", color: "white", margin: 0 }}
                  />
                </Button>
              </Form>
            </FormContainer>
          ) : (
            <Actions>
              <i
                onClick={() => enableMessageEditForm(message)}
                className="fas fa-pen"
              />
              <i
                onClick={() => deleteMessageById(message.id)}
                className="far fa-trash-alt"
              />
            </Actions>
          )}
        </>
      </Content>
      <Time>{moment(message.dateEdited).format("DD/MM/YYYY, h:mm:ss a")}</Time>
    </Container>
  );
}

export default MessageContainer;
