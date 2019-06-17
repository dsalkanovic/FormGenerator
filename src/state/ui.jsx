import { UI_SET_DIMENSIONS } from './actions';

const defaultState = {
    screen: { width: 0, height: 0 },
    panel: { height: 0 }
};

/**
 * State mapper.
 * @param {object} state
 * @param {string} action
 */
export default function(state = defaultState, action) {
    switch (action.type) {
        case UI_SET_DIMENSIONS:
            return { ...state, ...action.data };

        default:
            return state;
    }
}

export const setDimensions = rect => async dispatch => {
    const screen = { width: window.innerWidth, height: window.innerHeight };
    const topOffset = rect ? rect.top : 0;
    const panel = { height: screen.height - topOffset - 70 };

    dispatch({ type: UI_SET_DIMENSIONS, data: { screen, panel } });
};
