import { createConstants } from 'redux-action-helper';
import { ChannelService } from './../../service';



const actions = createConstants(
    'TOGGLE_FAVORITE',
    'FETCH_CHANNELS_REQUEST',
    'FETCH_CHANNELS_SUCCESS',
    'FETCH_CHANNELS_FAILURE'
);

const toggleFavorite = index => ({
    type: actions.TOGGLE_FAVORITE,
    value: index
});

const fetchChannelsRequest = () => ({
    type: actions.FETCH_CHANNELS_REQUEST
});
const fetchChannelsSuccess = value => ({
    type: actions.FETCH_CHANNELS_SUCCESS,
    value
});
const fetchChannelsFailure = (error) => ({
    type: actions.FETCH_CHANNELS_FAILURE,
    value: error
});

function fetchChannels() {
    return (dispatch) => {
        dispatch(fetchChannelsRequest());
        return ChannelService.getChannels().then((response) => {
            dispatch(fetchChannelsSuccess(response.data));
        }).catch((error) => {
            dispatch(fetchChannelsFailure(error));
        });
    };
}

export {
    toggleFavorite,
    fetchChannels,
    fetchChannelsRequest,
    fetchChannelsSuccess,
    fetchChannelsFailure,
    actions
};
