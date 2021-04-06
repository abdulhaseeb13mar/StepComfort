import ActionTypes from './ScActionTypes';

export const ScUserAction = (userinfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: userinfo,
    });
  };
};

export const ScsetCurrentProductAction = (productInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PRODUCT,
      payload: productInfo,
    });
  };
};

export const ScsetFavAction = (favItem) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_FAVOURITE,
      payload: favItem,
    });
  };
};

export const ScremoveFavAction = (itemId) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_FAVOURITE,
      payload: itemId,
    });
  };
};

export const ScaddCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
};

export const ScremoveCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_ITEM_CART,
      payload: item,
    });
  };
};

export const ScresetCart = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_CART,
    });
  };
};
