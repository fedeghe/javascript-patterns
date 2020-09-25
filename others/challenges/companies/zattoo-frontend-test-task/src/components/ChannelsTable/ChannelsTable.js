import React from 'react';
import List from './../List';

class ChannelsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.props = props;
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this.state = {
            selected: 0,
            loading: false
        };
    }
    componentDidMount() {
        this.props.componentDidMount();
        document.body.focus();
        document.addEventListener("keydown", this._handleKeyDown);
        
    }

    componentWillReceiveProps(newProps) {
        if (newProps.channels.length !== this.chLen) {
            this.chLen = newProps.channels.length;
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown);
    }

    _handleKeyDown(e) {
        let add = 0;
        switch (e.keyCode) {
            case 40: add = 2; break;
            case 38: add = -2; break;
            case 37: add = -1;break;
            case 39: add = 1;break;
            case 13:
                this.props.toggleFavorite(this.state.selected);
                break;
            default:return;
        }
        this.setState((prevState) => {
            const newVal = prevState.selected + add;
            if (newVal >= 0 && newVal < this.chLen) {
                return { selected: newVal };
            }
            return prevState;
        });
    }
    render() {
        return (
            <div className="container">
                <List
                    title={'MY FAVORITE CHANNELS'}
                    items={this.props.channels}
                    num={this.props.channels.reduce((a, i) => a + ~~(i.isFavorite), 0)}
                    onlyFavorites
                    cls={'favorites'}
                    size={1}
                />
                <List
                    title={'ALL CHANNELS'}
                    items={this.props.channels}
                    num={this.props.channels.length}
                    cls={'channels'}
                    selected={this.state.selected}
                    size={2}
                />
            </div>
        );
    }
}

export default ChannelsTable;

