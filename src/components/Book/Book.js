import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser,setloggedInUser] = useContext(UserContext)
    // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState({
      checkIn : new Date(),
      checkOut: new Date()
  });

  const handleCheckIn = (date) => {
      const newDate = {...selectedDate}
      newDate.checkIn = date
      setSelectedDate(newDate);
  };
  const handlecheckOut = (date) => {
    const newDate = {...selectedDate}
    newDate.checkOut = date
  setSelectedDate(newDate);
};
const handleBooking =() =>{
    const newBooking = {...loggedInUser,...selectedDate}
    fetch('http://localhost:5000/addBooking',
        {method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newBooking)})
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}
  
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Welcome {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-dialog"
          label="Checkin date"
          value={selectedDate.checkIn}
          onChange={handleCheckIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Checkout date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handlecheckOut}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Button onClick={handleBooking} variant="contained" color="primary"> Book now </Button>
    </MuiPickersUtilsProvider>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;