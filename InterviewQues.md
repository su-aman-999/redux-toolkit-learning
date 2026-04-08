# 🚀 Redux & Redux Toolkit Interview Questions (Part 1)

## ❓ Is Redux synchronous or asynchronous?

👉 Redux itself is **synchronous** <br>
👉 Async operations are handled via middleware (like thunk)

## ❓ How does Redux internally work?

Redux follows a strict flow:

> Component → dispatch → action → reducer → store → UI update

- `dispatch()` sends action
- Reducer calculates new state
- Store updates
- UI re-renders

##❓ How does Redux detect state changes?

👉 Redux uses reference comparison (===)

- If state reference changes → UI updates
- If same reference → no re-render

### ❌ Wrong (Mutating state

`state.count++;`

### ✅ Correct (Immutable update)

`return { ...state, count: state.count + 1 };`

## ❓ What is Redux?

Redux is a **state management library** used to manage global state in applications (especially React apps). <br>
👉 It follows Single Source of Truth

## ❓ What are the core concepts of Redux?

There are 3 main concepts:

- Store → holds the state
- Action → describes what happened
- Reducer → updates the state

## ❓ What is an Action?

An action is a plain JavaScript object with a `type` property.
`{ type: "INCREMENT" }`

## ❓ What is a Reducer?

A reducer is a pure function that takes state and action, and returns new state.

```javascript
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
};
```

## ❓ What is the Store?

Store is where the entire app state is stored.

```javascrpt
const store = createStore(counterReducer);
```

## ❓ What is dispatch?

`dispatch` is used to send actions to the reducer.

```javascript
store.dispatch({ type: "INCREMENT" });
```

## ❓ Difference between Redux and Context API

| Redux                    | Context API         |
| ------------------------ | ------------------- |
| Best for large apps      | Best for small apps |
| Middleware support       | No middleware       |
| Powerful debugging tools | Limited             |
| More boilerplate         | Less boilerplate    |

## ❓ What is Redux Toolkit (RTK)?

Redux Toolkit is the official recommended way to write Redux logic.
<br>
👉 It reduces boilerplate and simplifies code

## ❓ Why use Redux Toolkit?

- Less boilerplate
- Built-in best practices
- Includes tools like:
  - createSlice
  - configureStore
  - createAsyncThunk

## ❓ What is createSlice?

It combines actions + reducers in one place.

```javascript
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
```

## ❓ What is createAsyncThunk?

Used to handle async operations like API calls.

```javascript
export const fetchData = createAsyncThunk("data/fetch", async () => {
  const res = await fetch("/api");
  return res.json();
});
```

## ❓ What is Immer in Redux Toolkit?

Redux Toolkit uses **Immer internally**
👉 It allows writing "mutating" logic but keeps state immutable

```javascript
state.value += 1; // safe in RTK
```

## ❓ Difference between createSlice and reducer

| createSlice            | reducer          |
| ---------------------- | ---------------- |
| Auto generates actions | Manual actions   |
| Less code              | More boilerplate |

## ❓ What are selectors?

Functions to extract data from store.

```javascript
const selectCount = (state) => state.counter.value;
```

## ❓ What is useSelector and useDispatch?

- `useSelector` → read state
- `useDispatch` → send action

```javascript
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();
```

## ❓Why must reducer be pure functions?

Because Redux depands on predictable state updats

👉 Pure function means:

- No API calls
- No side effect
- Same input → same output

## ❓Why immutability ims important?

- Predictable state
- Easy debugging
- Performance optimization
