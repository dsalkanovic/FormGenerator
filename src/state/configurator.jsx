import { CONFIGURATOR_SET_STATUS } from './actions';

const defaultState = {
    status: 'pristine'
};

/**
 * State mapper.
 * @param {object} state
 * @param {string} action
 */
export default function(state = defaultState, action) {
    switch (action.type) {
        case CONFIGURATOR_SET_STATUS:
            return { ...state, status: action.data };

        default:
            return state;
    }
}
