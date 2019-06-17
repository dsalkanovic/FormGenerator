import { CONFIGURATOR_SELECT_ITEM, CONFIGURATOR_SET_FORM, CONFIGURATOR_SET_PAGES, CONFIGURATOR_SET_GROUPS, CONFIGURATOR_SET_FIELDS } from './actions';
import { TEST_PAGES } from '../testData';
import { FiledTypes } from '../models/definitions/fieldTypes';

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
        case CONFIGURATOR_SELECT_ITEM:
            // returning to root
            if (!action.item) return { ...state, selected: {} };

            // invalid item selected
            if (!action.item.type || !action.item.type.name) return state;

            let selected = { ...state.selected };
            switch (action.item.type.name) {
                case FiledTypes.Page.name:
                    selected = { page: action.item };
                    break;

                case FiledTypes.Group.name:
                    selected = { ...selected, group: action.item, field: undefined };
                    break;

                default:
                    selected = { ...selected, field: action.item };
                    break;
            }
            return { ...state, selected };

            

        case CONFIGURATOR_SET_FORM:
            return { ...state, form: action.form };

        case CONFIGURATOR_SET_PAGES:
            return { ...state, pages: action.pages };

        case CONFIGURATOR_SET_GROUPS:
            const sgPages = [...state.pages.map(p => (p.id === action.page.id ? { ...p, groups: action.groups } : p))];
            return { ...state, pages: sgPages };

        case CONFIGURATOR_SET_FIELDS:
            const sfPages = [
                ...state.pages.map(p =>
                    p.id === action.page.id ? { ...p, groups: p.groups.map(g => (g.id === action.group.id ? { ...g, fields: action.fields } : g)) } : p
                )
            ];
            return { ...state, pages: sfPages };

        default:
            return state;
    }
}

export const selectItem = item => async dispatch => {
    dispatch({ type: CONFIGURATOR_SELECT_ITEM, item });
};

export const setForm = form => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_PAGES, form });
};

export const setPages = pages => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_PAGES, pages });
};
export const setGroups = (page, groups) => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_GROUPS, page, groups });
};
export const setFields = (page, group, fields) => async dispatch => {
    dispatch({ type: CONFIGURATOR_SET_FIELDS, page, group, fields });
};
