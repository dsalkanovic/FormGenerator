import {
    CONFIGURATOR_SELECT_ITEM,
    CONFIGURATOR_REMOVE_ITEM,
    CONFIGURATOR_SHOW_PROPERTIES,
    CONFIGURATOR_SET_PAGES,
    CONFIGURATOR_SET_GROUPS,
    CONFIGURATOR_SET_FIELDS
} from './actions';
import { TEST_PAGES } from '../testData';

const defaultState = {
    selected: {},
    form: undefined,
    pages: TEST_PAGES
};

/**
 * State mapper.
 * @param {object} state
 * @param {string} action
 */
export default function(state = defaultState, action) {
    switch (action.type) {
        // Select item to display properties
        case CONFIGURATOR_SELECT_ITEM:
            return { ...state, selected: { page: action.page, group: action.group, field: action.field } };

        // Assign pages
        case CONFIGURATOR_SET_PAGES:
            return { ...state, pages: action.pages };
        // Assign groups
        case CONFIGURATOR_SET_GROUPS:
            const sgPages = state.pages.map(p => (p.id === action.page.id ? { ...p, groups: action.groups } : p));
            return { ...state, pages: sgPages };
        // Assign fields
        case CONFIGURATOR_SET_FIELDS:
            const sfPages = state.pages.map(p => {
                return p.id === action.page.id
                    ? {
                          ...p,
                          groups: p.groups.map(g => {
                              return g.id === action.group.id ? { ...g, fields: action.fields } : g;
                          })
                      }
                    : p;
            });
            return { ...state, pages: sfPages };

        default:
            return state;
    }
}

export const setPages = pages => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_PAGES, pages });
};
export const setGroups = (page, groups) => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_GROUPS, page, groups });
};
export const setFields = (page, group, fields) => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_FIELDS, page, group, fields });
};

export const selectItem = (page, group, field) => async dispatch => {
    dispatch({ type: CONFIGURATOR_SELECT_ITEM, page, group, field });
};

//
// --------------------------------------------------------
//

export const removeItem = () => async dispatch => {
    dispatch({ type: CONFIGURATOR_REMOVE_ITEM });
};

export const showProperties = (page, group, field) => async dispatch => {
    dispatch({ type: CONFIGURATOR_SHOW_PROPERTIES, page, group, field });
};

export const setForm = form => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_PAGES, form });
};
