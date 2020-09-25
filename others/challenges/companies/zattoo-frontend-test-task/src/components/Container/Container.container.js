import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from './Container';
import { showAction } from './Container.actions';

function mapStateToProps(state) {
    return {
        myAction: state.ContainerReducer.myAction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        componentDidMount: () => dispatch(showAction())
    };
}

const ContainerConnected = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Container));

export default ContainerConnected;
