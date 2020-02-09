/*
--------------------------------------------------------------------------
 Chat
--------------------------------------------------------------------------
*/

import API from "./config";

export function getMessages() {
  return API({
    method: "get",
    url: "/comments"
  });
}

export function sendMessage(name, text) {
  return API({
    method: "post",
    url: "/comments",
    data: {
      name,
      text
    }
  });
}

export function deleteMessage(id) {
  return API({
    method: "delete",
    url: `/comment/${id}`
  });
}

export function updateMessage(id, name, text) {
  return API({
    method: "put",
    url: `/comment/${id}`,
    data: {
      name,
      text
    }
  });
}
