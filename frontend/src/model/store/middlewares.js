export const api = () => next => async action => {
  const { type, promise, ...rest } = action;
  if (!promise || !type) {
    next(action);
    return;
  }

  next({ type: `${type}_REQUEST`, ...rest });
  try {
    const result = await promise;
    next({ type: `${type}_SUCCESS`, ...rest, result });
  } catch (error) {
    console.error(error);
    next({ type: `${type}_FAILURE`, ...rest, error });
  }
};
