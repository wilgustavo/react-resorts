import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

const getUnique = (items, value) => [...new Set(items.map(item => item[value]))];

const getSelectOption = items => items
    .map((item, index) => <option value={item} key={index}>{item}</option>);

const getTypes = (rooms) => getSelectOption(['all', ...getUnique(rooms, 'type')]);

const getPeople = (rooms) => getSelectOption([...getUnique(rooms, 'capacity')]);

export default function RoomsFilter({ rooms }) {
    const context = useContext(RoomContext);
    console.log(context);

    // eslint-disable-next-line
    const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets } = context;

    return <section className="filter-container">
        <Title title="search rooms" />
        <form className="filter-form">
            <div className="form-group">
                <label htmlFor="type">room type</label>
                <select name="type" id="type" value={type}
                    className="form-control" onChange={handleChange}>
                    {getTypes(rooms)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="capacity">guests</label>
                <select name="capacity" id="capacity" value={capacity}
                    className="form-control" onChange={handleChange}>
                    {getPeople(rooms)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="price">room price ${price}</label>
                <input type="range" name="price" id="price" 
                       min={minPrice} max={maxPrice} 
                       className="form-control" value={price} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="minSize">room size</label>
                <div className="size-inputs">
                    <input type="number" name="minSize" id="minSize" 
                           className="size-input" value={minSize} onChange={handleChange}/>
                    <input type="number" name="maxSize" id="maxSize" 
                           className="size-input" value={maxSize} onChange={handleChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="single-extra">
                    <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                    <label htmlFor="breakfast">breakfast</label>
                </div>
                <div className="single-extra">
                    <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                    <label htmlFor="pets">pets</label>
                </div>
            </div>
        </form>
    </section>
}


