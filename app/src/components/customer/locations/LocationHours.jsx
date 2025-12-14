import React from 'react';
import Navbar from '../../NavBar';

/**
 * Component displaying the store hours in a card format.
 * 
 * @component
 * @example
 * return (
 *   <Hours />
 * )
 */
function Hours() {
    return (
        <section className="card hours-card">
            <h3>Hours</h3>
            <ul className="hours-list">
                <li><span>Monday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Tuesday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Wednesday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Thursday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Friday</span><span>9:30am - 10:30pm</span></li>
                <li><span>Saturday</span><span>9:30am - 10:30pm</span></li>
                <li><span>Sunday</span><span>10:00am - 10:00pm</span></li>
            </ul>
        </section>
    );
}

export default Hours;
