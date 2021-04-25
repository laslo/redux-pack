import {RESET_STATUS} from './statusReducer';
export const RESET_ERROR = 'RESET_ERROR';

const errorReducer = (state = {}, action) => {
    switch (action.type){
        case RESET_STATUS:
            return {
                ...state,
                [action.requestName]: null,
            };
        case RESET_ERROR:
            return {
                ...state,
                [action.requestName]: {
                    ...state[action.requestName],
                    [action.property]: null
                },
            };
        default:
            const {type, error} = action;
            const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
            if (!matches) return state;

            const [, requestName, requestState] = matches;
            return {
                ...state,
                [requestName]: 'REQUEST' === requestState ? {} :
                    !!error &&  !!error.data ? error.data : {}
            };
    }
};
export default errorReducer;

export const createErrorSelector = (action) => (state) => {
    return !!state.error[action] ? state.error[action] : {};
};