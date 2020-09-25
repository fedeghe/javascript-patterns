import React from 'react';


class Container extends React.Component {
    componentDidMount() {
        this.props.componentDidMount();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Container;

