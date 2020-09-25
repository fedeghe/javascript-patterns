import React from 'react';
import classNames from 'classnames';


class Item extends React.Component {

    componentDidMount() {
        
    }
    render() {
        const imgUrl = this.props.qualities[0].logo_token ?
            `https://logos.zattic.com/images/channels/logos/${this.props.qualities[0].logo_token}/black/84x48.png`
            :
            'http://via.placeholder.com/84x48';
        const cls = classNames('item', { selected: this.props.selected, fav: this.props.isFavorite});
        return (
            <div className={cls}>
                <span className="num">{this.props.channelNumber}</span>
                <span className="name">{this.props.title}</span>
                <img src={imgUrl}/>
            </div>
        );
    }
}

export default Item;

