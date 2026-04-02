export function myCreateStore(reducer) {
  let callFun = true;

  let state;
  let listeners = [];

  const store = {
    dispatch: (action) => {
      state = reducer(state, action);

      if (callFun)
        listeners.forEach((listener) => {
          listener();
        });
    },
    getState: () => {
      return state;
    },

    subscribe: (listener) => {
      listeners.push(listener);
      return function () {
        const listenerIndex = listeners.findIndex(
          (reisteredListeners) => reisteredListeners === listener,
        );

        listeners.splice(listenerIndex, 1);
      };
    },


  };

  store.dispatch({ type: "@@INIT" });

  return store;
}
