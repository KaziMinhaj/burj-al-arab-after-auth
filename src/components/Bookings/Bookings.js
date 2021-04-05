import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([])
    const [loggedInUser,setloggedInUser] = useContext(UserContext)

    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setBookings(data))
    },[loggedInUser.email])
    return (
        <div>
            <h3>length {bookings.length}</h3>
            {
                bookings.map(book => <li>{book.name} from: {new Date(book.checkIn).toDateString('dd/MM/yyyy')} to:{new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );

};

export default Bookings;