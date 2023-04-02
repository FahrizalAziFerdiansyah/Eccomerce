export const dispatchLoading = (dispatch, type, page) => {
  return dispatch({
    type: type,
    payload: {
      loading: page > 1 ? false : true,
      moreLoading: page > 1 ? true : false,
      data: false,
      dataPagination: [],
      errorMessage: false,
    },
  });
};

export const dispatchMoreLoading = (dispatch, type) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      moreLoading: true,
      data: false,
      dataPagination: [],
      errorMessage: false,
    },
  });
};

export const dispatchSuccess = (
  dispatch,
  type,
  result,
  pagination,
  refresh,
) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      moreLoading: false,
      data: result,
      dataPagination: pagination ? result.data : [],
      errorMessage: false,
      refresh: refresh,
    },
  });
};

export const dispatchError = (dispatch, type, error) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      moreLoading: false,
      data: false,
      dataPagination: [],
      errorMessage: error,
    },
  });
};
