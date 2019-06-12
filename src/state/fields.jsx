import { FIELDS_SET_FIELD } from './actions';

const defaultState = {
    list: undefined
};

/**
 * State mapper.
 * @param {object} state
 * @param {string} action
 */
export default function(state = defaultState, action) {
    switch (action.type) {
        case FIELDS_SET_FIELD:
            return { ...state, list: action.data };

        default:
            return state;
    }
}
