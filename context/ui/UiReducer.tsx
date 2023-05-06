
import { UiState } from './';

type UiActionType = 
        | { type: '[Ui] - ToddleMenu'}

export const UiReducer =(state: UiState, action: UiActionType ):UiState => {
    switch (action.type) {
        case '[Ui] - ToddleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        default:
            return state;
    }

}