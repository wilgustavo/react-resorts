import React, { Component } from 'react'
import Title from './Title';
import ItemService from './ItemService';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />, 
                title: 'Free Cocktails',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eligendi'
            },
            {
                icon: <FaHiking />, 
                title: 'Endless Hiking',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eligendi'
            },
            {
                icon: <FaShuttleVan />, 
                title: 'Free Shutlle',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eligendi'
            },
            {
                icon: <FaBeer />, 
                title: 'Strongest Beer',
                info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eligendi'
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map( (item, index) => 
                        <ItemService key={index} title={item.title} icon={item.icon} info={item.info}/>)}
                </div>
            </section>
        )
    }
}
