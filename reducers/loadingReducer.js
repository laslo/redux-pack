const loadingReducer = (state = {}, action) => {
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);
    if (!matches) {
        return state;
    }

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState === 'REQUEST',
    };
};
export default loadingReducer;

export const createLoadingSelector = (actions) => (state) => {
    // returns true only when all actions is not loading
    return actions.some((action) => state.loading[action]);
};