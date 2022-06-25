import querystring from "query-string";

const PREFIX = "http://localhost:5000";

const req = (url, options = {}) => {
  const { body } = options;

  return fetch((PREFIX + url).replace(/\/\/$/, ""), {
    ...options,
    body: body ? JSON.stringify(body) : null,
    headers: {
      ...options.headers,
      ...(body
        ? {
            "Content-Type": "application/json",
          }
        : null),
    },
  }).then((res) =>
    res.ok
      ? res.json()
      : res.text().then((message) => {
          throw new Error(message);
        })
  );
};

export const notePdfUrl = (id) => {
  window.open(PREFIX + `/note/pdf/${id}`, "_blank");
};

export const getNotes = ({ age, search, page } = {}) => {
  const query = querystring.stringify({ age, search, page });

  return new Promise((resolve) => {
    req(`/note/list?${query}`, { method: "GET" }).then((data) => {
      resolve(data);
    });
  });
};

export const createNote = (title, text, html) => {
  return new Promise((resolve) => {
    req("/note/create", { method: "POST", body: { title, text, html } }).then((data) => {
      resolve({ _id: data._id });
    });
  });
};

export const getNote = (id) => {
  return new Promise((resolve) => {
    req(`/note/${id}`).then((data) => {
      resolve(data);
    });
  });
};

export const archiveNote = (id) => {
  return new Promise((resolve) => {
    req(`/note/archive/${id}`, { method: "POST" }).then((data) => {
      resolve(data);
    });
  });
};

export const unarchiveNote = (id) => {
  return new Promise((resolve) => {
    req(`/note/unarchive/${id}`, { method: "POST" }).then((data) => {
      resolve(data);
    });
  });
};

export const editNote = (id, title, text, html) => {
  return new Promise((resolve) => {
    req(`/note/${id}`, { method: "POST", body: { title, text, html } }).then((data) => {
      resolve(data);
    });
  });
};

export const deleteNote = (id) => {
  return new Promise((resolve) => {
    req(`/note/delete/${id}`, { method: "POST" }).then((data) => {
      resolve(data);
    });
  });
};

export const deleteAllArchived = () => {
  return new Promise((resolve) => {
    resolve({});
  });
};
