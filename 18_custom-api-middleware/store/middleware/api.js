//! Middleware Function
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
