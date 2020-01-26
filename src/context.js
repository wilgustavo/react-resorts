import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured);
        let maxPrice = Math.max(...rooms.map(room => room.price));
        let maxSize = Math.max(...rooms.map(room => room.size));
        this.setState({ rooms,
                        featuredRooms,
                        sortedRooms: rooms,
                        loading: false,
                        price: maxPrice,
                        maxPrice,
                        maxSize
                    });
    }

    formatData(items) {
        return items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            return {...item.fields, id, images};
        });
    }

    getRoom = slug => {
        let tempRooms =  [...this.state.rooms];
        return tempRooms.find(room => room.slug === slug);
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms);
    }

    filterRooms = () => {
        // eslint-disable-next-line
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;
        let tempRooms = [...rooms];
        tempRooms = tempRooms.filter(room => 
            (room.type === type || type === 'all') && 
            (room.capacity >= parseInt(capacity)) &&
            (room.price <= parseInt(price)) &&
            (room.size >= parseInt(minSize) && room.size <= parseInt(maxSize)) &&
            (room.breakfast || !breakfast) &&
            (room.pets || !pets));
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomCustomer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext};