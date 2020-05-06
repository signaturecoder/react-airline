import * as types from './actionTypes';

export function AddToPaxSeatMap(paxId, seatNo, wheelChair, infantFacility) {
  return {
    type: types.ADD_TO_PAX_SEATMAP,
    payload: {
      paxId,
      seatNo,
      wheelChair,
      infantFacility,
    },
  };
}

export function UpdatePaxSeatMap(paxId, seatNo) {
  return {
    type: types.UPDATE_PAX_SEATMAP,
    payload: {
      paxId,
      seatNo,
    },
  };
}

export function RemoveFromPaxSeatMap(paxId) {
  return {
    type: types.REMOVE_FROM_PAX_SEATMAP,
    payload: {
      paxId,
    },
  };
}

export function ClearPaxSeatMap() {
  return { type: types.CLEAR_PAX_SEATMAP };
}
