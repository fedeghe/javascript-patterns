import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelsTable from './ChannelsTable';
import {
    toggleFavorite,
    fetchChannels
} from './ChannelsTable.actions';

function mapStateToProps(state) {
    return {
        myAction: state.ChannelsTableReducer.myAction,
        channels: state.ChannelsTableReducer.channels,
        favorites: state.ChannelsTableReducer.favorites
    };
}

function mapDispatchToProps(dispatch) {
    return {
        componentDidMount: () => dispatch(fetchChannels()),
        toggleFavorite: i => dispatch(toggleFavorite(i))
    };
}

const ChannelsTableConnected = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelsTable));

export default ChannelsTableConnected;
