# 📘 REDUX THUNK – COMPLETE NOTES

## 🧠 1. What is Redux Thunk?

👉 Redux Thunk is a **_middleware_**
👉 It allows you to **dispatch functions instead of plain objects**

### 🔴 Normal Redux (without thunk)

```javascript
dispatch({ type: "FETCH_PRODUCTS" }); // only object allowed
```

### ✅ With Thunk

```javascript
dispatch((dispatch) => {
  // async code allowed
});
```

👉 Now you can:

- call APIs
- run async code
- dispatch multiple actions

## 🎯 2. Why do we need Thunk?

👉 Redux reducers must be **pure functions**

❌ **Cannot do:**

```javascript
fetch("API"); // ❌ not allowed in reducer
```

👉 So we need a place for:

- API calls
- async logic

👉 That place = Thunk middleware

### 🔄 3. Flow of Thunk

```
Component
        ↓
dispatch(function)
        ↓
Thunk middleware
        ↓
function executes
        ↓
dispatch actions inside
        ↓
Reducer updates state
```

## 🧩 4. Basic Thunk Structure

```javascript
const myThunk = () => (dispatch, getState) => {
  // async logic
};
```

### 🧠 Parameters

| Parameter  | Meaning              |
| ---------- | -------------------- |
| dispatch() | send action          |
| getState   | access current state |

## 🚀 5. Real Example (API Call)

```javascript
// standard middleware definition, with 3 nested functions:
// 1) Accepts `{dispatch, getState}`
// 2) Accepts `next`
// 3) Accepts `action`
const thunkMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // If the "action" is actually a function instead...
    if (typeof action === "function") {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(dispatch, getState);
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action);
  };
```

## 🔄 6. Execution Flow

1. Component mounts
2. dispatch(fetchProductsData())
3. thunk runs
4. loading action dispatch
5. API call
6. success → update data
7. error → update error

## 📦 7. Using in Component

```javascript
useEffect(() => {
  dispatch(fetchProductsData());
  dispatch(fetchCartItemsData());
}, []);
```

## 🧠 8. getState() usage

```javascript
export const exampleThunk = () => (dispatch, getState) => {
  const state = getState();

  if (state.cartItems.list.length > 0) {
    console.log("Cart not empty");
  }
};
```

## ⚠️ 9. Rules of Thunk

✔ Can dispatch multiple actions <br>
✔ Can run async code <br>
✔ Cannot mutate state directly

## ❌ 10. Common Mistakes

### ❌ 1. Wrong payload

```javascript
dispatch(loadCartItems(data)); // ❌
```

#### ✔ Fix:

```javascript
dispatch(loadCartItems(data.products));
```

### ❌ 2. No error handling

👉 always use `.catch()`

### ❌ 3. Calling thunk incorrectly

```javascript
dispatch(fetchProductsData); ❌
```

#### ✔ Correct:

```javascript
dispatch(fetchProductsData()); // ✅
```

## 🧠 11. Thunk vs Normal Action

| Feature           | Normal Action | Thunk    |
| ----------------- | ------------- | -------- |
| Type              | Object        | Function |
| Async             | ❌            | ✅       |
| Multiple dispatch | ❌            | ✅       |

## 🔥 12. Thunk vs Custom Middleware

| Feature    | Thunk     | Custom Middleware |
| ---------- | --------- | ----------------- |
| Complexity | Easy      | Hard              |
| Control    | Medium    | Full              |
| Use case   | Most apps | Advanced apps     |

## 💡 13. Best Practices

### ✔ Keep thunk separate from component

### ✔ Handle loading + success + error

### ✔ Keep actions simple

### ✔ Use meaningful names

## 🚀 14. Advanced Pattern

```javascript
export const apiCall = (url) => async (dispatch) => {
  try {
    dispatch({ type: "API_START" });

    const res = await fetch(url);
    const data = await res.json();

    dispatch({ type: "API_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "API_ERROR", payload: err });
  }
};
```

## 🎯 15. One-Line Summary

👉 **Redux Thunk allows async logic inside Redux using functions instead of objects**

## 🎤 INTERVIEW QUESTIONS (VERY IMPORTANT)

### 🔥 Basic Questions

#### 1. What is Redux Thunk?

👉 Middleware that allows dispatching functions for async logic

#### 2. Why is Thunk used?

👉 To handle async operations like API calls

#### 3. What does a thunk return?

👉 A function

#### 4. What are the parameters of thunk?

👉 dispatch and getState

### 🔥 Intermediate Questions

#### 5. Can you dispatch multiple actions in thunk?

👉 Yes

#### 6. Difference between thunk and reducer?

- 👉 Thunk = async logic
- 👉 Reducer = pure function

#### 7. Where should API calls be placed?

👉 Inside thunk (or middleware)

### 🔥 Advanced Questions

#### 8. Thunk vs Saga vs Middleware?

👉

```
Thunk → simple async
Middleware → full control
Saga → complex async flows
```

#### 9. What happens when you dispatch a function?

👉 Thunk middleware intercepts and executes it

#### 10. Can thunk access state?

👉 Yes → using `getState()`

### 🧠 Final Understanding

```
Component → dispatch thunk
Thunk → API call
Thunk → dispatch result
Reducer → update state
UI → re-render
```
