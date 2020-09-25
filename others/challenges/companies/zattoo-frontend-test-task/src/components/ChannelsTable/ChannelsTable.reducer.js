
// import { actions as globalActions } from '../../actions/Global.actions';
import { actions } from './ChannelsTable.actions';
import { filterChannels } from './ChannelTable.helper';

const initState = {
    channels: []
};

const channelReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.TOGGLE_FAVORITE:
            return {
                channels: state.channels.map(
                    (content, i) => Object.assign({}, content, {
                        isFavorite: action.value == i ? !(content.isFavorite) : content.isFavorite
                    })
                )
            };
        case actions.FETCH_CHANNELS_SUCCESS:
            return  Object.assign({}, state, {
                channels: filterChannels(action.value.channels)
            })
        default:
            return state;
    }
};

export default channelReducer;
