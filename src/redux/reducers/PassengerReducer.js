import * as types from '../actions/actionTypes';
import initialState from './initialState';
export default function UpdateSelectedPaxIdReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case types.ADD_TO_PAX_SEATMAP: {
      const newPassengeSeatMap = state.passengerSeatMap.filter(
        passenger => passenger.paxId !== action.payload.paxId
      );
      return {
        ...state,
        passengerSeatMap: [
          ...newPassengeSeatMap,
          {
            paxId: action.payload.paxId,
            seatNo: action.payload.seatNo,
            wheelChair: action.payload.wheelChair,
            infantFacility: action.payload.infantFacility,
          },
        ],
      };
    }

    case types.REMOVE_FROM_PAX_SEATMAP: {
      const newPassengeSeatMap = state.passengerSeatMap.filter(
        passenger => passenger.paxId !== action.payload.paxId
      );
      return {
        ...state,
        passengerSeatMap: newPassengeSeatMap,
      };
    }

    case types.CLEAR_PAX_SEATMAP: {
      console.log(state);
      const seatMap = [];
      return { ...state, passengerSeatMap: seatMap };
    }

    default:
      return state;
  }
}
