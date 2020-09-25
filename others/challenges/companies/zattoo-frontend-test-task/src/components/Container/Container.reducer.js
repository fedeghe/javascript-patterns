
// import { actions as globalActions } from '../../actions/Global.actions';
import { actions } from './Container.actions';

const initState = {
    myAction: null
};

const containerReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SHOW_ACTION:
            return Object.assign({}, state, {
                myAction: action.value
            });
        default:
            return state;
    }
};

export default containerReducer;
