# 📘 CUSTOM API MIDDLEWARE (Redux) – SIMPLE + IN-DEPTH

## 🧠 1. What is Middleware?

👉 Middleware is a **function that runs between dispatch and reducer in redux**

```
dispatch(action)
   ↓
middleware
   ↓
reducer
   ↓
store update
```

👉 It can:

- read action
- modify action
- stop action
- run side effects (like API calls)

## 🎯 2. Why Custom API Middleware?

### ❌ Normal way (bad practice)

```javascript
useEffect(() => {
  fetch("API")
    .then(...)
}, []);
```

👉 Problems:

- API logic inside components ❌
- code becomes messy ❌
- not reusable ❌

### ✅ Better way (middleware)

👉 Move API logic to middleware

- ✔ clean components
- ✔ reusable logic
- ✔ centralized control

## 🧩 3. Middleware Structure

```javascript
const apiMiddleware = (store) => (next) => (action) => {
  // logic
  return next(action);
};
```

### 🧠 Breakdown

#### 🔹 `action`

👉 The object you dispatch

```javascript
dispatch({ type: "products/fetch" });
```

#### 🔹 `store`

👉 Gives access to:

```javascript
store.getState();
store.dispatch();
```

#### 🔹 `next`

👉 Passes action to next step

```javascript
next(action);
```

## 🚀 4. Basic API Middleware Example

```javascript
export const apiMiddleware = (store) => (next) => async (action) => {
  if (action.type === "products/fetch") {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      store.dispatch({
        type: "products/updateAllProducts",
        payload: data.products,
      });
    } catch (error) {
      store.dispatch({
        type: "products/fetchProductsError",
      });
    }
  }

  return next(action);
};
```

## 🔄 5. Flow Explanation

```
1. Component dispatches action
            ↓
2. Middleware catches it
            ↓
3. API call happens
            ↓
4. Success → new action dispatch
            ↓
5. Reducer updates state
            ↓
6. UI re-renders
```

## 📦 6. Action Design (Important Rule)

### ✔ Good:

```javascript
dispatch({ type: "products/fetch" });
```

### ❌ Bad:

```javascript
dispatch({
  type: "products/fetch",
  payload: {
    onSuccess: () => {}, // ❌ function
  },
});
```

👉 Redux requires **serializable data only**

## ⚠️ 7. Common Mistakes

### ❌ 1. Forgetting `next(action)`

👉 Action stops → reducer not called

### ❌ 2. Sending functions in payload

👉 Error: non-serializable value

### ❌ 3. Not adding middleware to store

👉 Middleware never runs

### ❌ 4. Not returning middleware array

## 🧠 8. Adding Middleware to Store

```javascript
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiMiddleware),
```

👉 This means:

- keep default middleware
- add your custom middleware

## 🔥 9. Real Project Flow

```
Component
    ↓
dispatch(fetchProducts)
    ↓
Middleware
    ↓
API call
    ↓
dispatch(success action)
    ↓
Reducer
    ↓
Store update
    ↓
UI updates
```

## ⚡ 10. Multiple API Handling

```javascript
switch (action.type) {
  case "products/fetch":
    // fetch products
    break;

  case "cart/fetch":
    // fetch cart
    break;
}
```

## 💡 11. Best Practices

### ✔ Keep actions simple

```javascript
{ type: onSuccess, payload: data.products }
```

### ✔ Handle API in middleware

```javascript
loadAllProducts: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
```

### ✔ Handle errors properly

```javascript
  fetchProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Someting went wronge!";
    },
```

### ✔ Manage loading state

```javascript
fetchProducts: (state) => {
  state.loading = true;
};
```

## 🆚 12. Middleware vs Thunk

| Feature    | Middleware    | Thunk       |
| ---------- | ------------- | ----------- |
| Complexity | High          | Easy        |
| Control    | Full control  | Limited     |
| Use case   | Advanced apps | Common apps |

## 🎯 13. When to Use?

Use Custom Middleware when:

- many APIs are used
- need centralized logic
- need full control

## 💥 14. One-Line Summary

### 👉 Custom API Middleware = a central place to handle all API calls in Redux

## 🚀 BONUS (Advanced Pattern)

```javascript
export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === "api/makeCall") {
      next(action); //use next for show of "api/makeCall" dispatch in redux devtools
      const { url, onStart, onSuccess, onError } = action.payload;
      dispatch({ type: onStart }); //use dispatch for loading state

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: onSuccess, payload: data.products }); // for store data in store
        })
        .catch((err) => {
          dispatch({ type: onError, payload: err }); // for API error handling
        });
    } else {
      next(action);
    }
  };

// Action Creator for "api/makeCall" dispatch
export const fetchData = (payload) => ({ type: "api/makeCall", payload });
```

## 🚀 REACT WORD EXAMPLE

- ### Dispatch Middleware Function

  ```javascript
  useEffect(() => {
    dispatch(
      fetchData({
        url: "https://dummyjson.com/products",
        onStart: fetchProducts().type,
        onSuccess: loadAllProducts().type,
        onError: fetchProductsError().type,
      }),
    );

    dispatch(
      fetchData({
        url: "https://dummyjson.com/carts/15",
        onStart: fetchCartItems().type,
        onSuccess: loadCartItems().type,
        onError: fetchCartItemsError().type,
      }),
    );
  }, []);
  ```

- ### Middleware Function

  ```javascript
  export const apiMiddleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
      if (action.type === "api/makeCall") {
        next(action);
        const { url, onStart, onSuccess, onError } = action.payload;
        dispatch({ type: onStart });

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            dispatch({ type: onSuccess, payload: data.products });
            console.log({ type: onSuccess, payload: data.products });
          })
          .catch((err) => {
            dispatch({ type: onError, payload: err });
          });
      } else {
        next(action);
      }
    };

  export const fetchData = (payload) => ({ type: "api/makeCall", payload });
  ```

- ### Store

  ```javascript
  import { apiMiddleware } from "./middleware/api";
  import reducerCart from "./slices/cartSlice";
  import reducerProducts from "./slices/productsSlice";
  import reducerWishList from "./slices/wishListSlice";
  import { configureStore } from "@reduxjs/toolkit";

  export const store = configureStore({
    reducer: {
      products: reducerProducts,
      cartItems: reducerCart,
      wishList: reducerWishList,
    },

    middleware: (getDefaultMidlleware) =>
      getDefaultMidlleware().concat(apiMiddleware),
  });
  ```
