import * as actionTypes from "../consts/actionTypes";

export function getVentas(param1, param2) {
  return {
    type: actionTypes.GET_VENTAS,
    payload: {param1 , param2}
  };
}

export function postVenta(param) {
  return {
    type: actionTypes.POST_VENTAS,
    payload: param,
  };
}

