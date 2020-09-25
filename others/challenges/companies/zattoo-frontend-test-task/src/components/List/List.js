import React from 'react';
import Item from './../Item';

class List extends React.Component {
    render() {
        return (
            <div className={`listContainer ${this.props.cls}`}>
                <h2 className={'title'}>{this.props.title}{this.props.num ? ` (${this.props.num})` : ''}</h2>    
                <section className={`listBody columns-${this.props.size}`}>
                    {
                        this.props.items.filter((item) => this.props.onlyFavorites ? item.isFavorite : true)
                        .map((item, i) => 
                            <Item {...item} key={i} selected={this.props.selected == i}/>
                        )
                    }
                </section>
            </div>
        )
    }
}

export default List;

