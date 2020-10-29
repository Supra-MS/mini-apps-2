import React from 'react';
import uniqid from 'uniqid';
import { CalcDate } from '../utils/CalcDate';

const EventsList = ({ events, eventsCount }) => {
    return (
        <>
            <p className="evnt-txt">Displaying {eventsCount} events per page</p>
            {events.map((evnt) => {
                let createdAt = CalcDate(evnt.date);
                return (
                    <div key={uniqid()}>
                        <li className="card"> 
                            <h5 className="card-header">Place: {evnt.category2} </h5>
                            <div className="card-body">
                                <div className="card-title">{createdAt}</div>
                                <span className="card-text">{evnt.description}</span>
                                <div className="btn btn-primary btn-sm">Read More</div>
                            </div>
                        </li>

                    </div>
                );
            })}
        </>
    );
};

export default EventsList;