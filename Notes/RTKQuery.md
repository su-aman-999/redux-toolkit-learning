# RTK Query

## Introduction

### RTK Query is a tool inside Redux Toolkit that helps you fetch and manage data from a server easily. It automatically stores data (caching), updates it when needed, and handles loading/error states, so you don’t have to write a lot of extra code.

## Key Features

### 1. 📦 Automatic Caching

- Data ek baar fetch hua → cache me store ho jata hai
- Same request dubara → API call nahi, direct cache use

👉 Result: **fast app + less API calls**

### 2. 🔄 Auto Refetch (Smart Updates)

- invalidatesTags use karke data automatically refresh hota hai
- Manual refetch likhne ki zaroorat nahi

👉 Result: **data always fresh**

### 3. ⚡ Less Boilerplate Code

- Redux me normally: actions + reducers + thunk likhna padta hai
- RTK Query me sirf endpoints define karte ho

👉 Result: **kam code, easy maintenance**

### 4. 🚀 Built-in Loading & Error Handling

```javascript
const { data, isLoading, isError } = useGetTasksQuery();
```

👉 Tumhe alag se loading/error state manage nahi karna padta

### 5. 🔁 Automatic Re-fetching Triggers

- Window focus
- Network reconnect
- Argument change

👉 Result: real-time feel without extra code

### 6. 🎯 Optimistic Updates Support

- UI instantly update ho jata hai
- Better user experience (no delay feel)

### 7. 🧩 Tight Redux Integration

- Redux Toolkit ka part hai
- Alag library install karne ki need nahi

### 8. 🧠 Centralized API Logic

- Sare API endpoints ek jagah defined
- Clean architecture

## How to Use

### 1. Install `npm install @reduxjs/toolkit react-redux`

### 2. Create Endpoint

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todoApi = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),

  //*Tags: Tags RTK Query me automatic data refresh ka system hai.
  //?tagTypes: define karta hai kaun-kaun se tags use honge (allowed labels list)
  tagTypes: ["Tasks"],

  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `tasks`,

      transformResponse: (tasks) => [...tasks].reverse(),

      //?providesTags → batata hai query ne kaunsa data/tag provide (cache me store) kiya
      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),

      //?invalidatesTags → batata hai kaunsa tag outdated hai, jisse RTK Query refetch trigger karta hai
      invalidatesTags: ["Tasks"],

      //?🔥 Optimistic Update
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...task });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),

      invalidatesTags: ["Tasks"],

      //?🔥 Optimistic Update
      async onQueryStarted(
        { id, ...updatedTask },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const taskIndex = draft.findIndex((el) => el.id === id);

            draft[taskIndex] = { ...draft[taskIndex], ...updatedTask };
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Tasks"],

      //?🔥 Optimistic Update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const taskIndex = draft.findIndex((el) => el.id === id);

            if (taskIndex !== -1) draft.splice(taskIndex, 1);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export default todoApi;

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = todoApi;
```

### 2. Add the service to your store

```javascript
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import todoApi from "./apiSlice";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [todoApi.reducerPath]: todoApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (gDM) => gDM().concat(todoApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export default store;
```

### 3. Wrap your application with the `Provider`

```javascript
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <p>Contact Us</p>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
```

### How to use with Hooks

```javascript
import { useState } from "react";
import Task from "./TaskItem";
import { Link } from "react-router-dom";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "./apiSlice";

export default function Home() {
  const { data: tasksList, isError, isLoading, error } = useGetTasksQuery();

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [newTask, setNewTask] = useState("");

  return (
    <div>
      <h2>My Tasks</h2>

      {/* Add Task Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const task = {
            value: newTask,
            completed: false,
          };

          addTask(task);
          setNewTask("");
        }}
      >
        <input
          type="text"
          placeholder="Add a new task"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          required
        />
        <button type="submit">Add</button>
      </form>

      {/* Task List */}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>{error?.error || "Something went wrong"}</p>
        ) : (
          tasksList.map((task) => (
            <Task
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>

      {/* Navigation */}
      <Link to="contact">Contact</Link>
    </div>
  );
}
```

## Optimistic Update

### UI ko turant update kar dena, bina server response ka wait kiye

```javascript
async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...task });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
```

### 🔍 Line-by-line explanation

#### 1. Hook entry point

```javascript
async onQueryStarted(task, { dispatch, queryFulfilled })
```

- Runs as soon as mutation starts (before server response)
- `task` → data you are sending (new task)
- `dispatch` → Redux dispatch
- `queryFulfilled` → a Promise for the API call

#### 2. Optimistic cache update

```javascript
const patchResult = dispatch(
  todoApi.util.updateQueryData("getTasks", undefined, (draft) => {
    draft.unshift({ id: crypto.randomUUID(), ...task });
  }),
);
```

- `updateQueryData("getTasks", undefined, ...)`
  - Targets cached data of `getTasks` query
  - `undefined` → no query params
- `draft`
  - A **mutable copy** of cached tasks (Immer-powered)
- `draft.unshift(...)`
  - Adds new task at the start of list
- `crypto.randomUUID()`
  - Temporary ID (since server hasn’t responded yet)

#### 3. Store patch reference

```javascript
const patchResult = ...
```

- This stores a reference to the change
- Used later for **undo (rollback)**

#### 4. Wait for server response

```javascript
await queryFulfilled;
```

- Waits for API call to complete
- If success → do nothing (UI already updated)

#### 5. Error handling (rollback)

```javascript
catch {
  patchResult.undo();
}
```

- If API fails:
  - Undo the optimistic update
  - Remove the task from UI
