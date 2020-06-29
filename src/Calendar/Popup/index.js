import React, { useState, useEffect, useRef } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { createEventId } from '../event-utils'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField, InputAdornment, FormControlLabel, Checkbox } from '@material-ui/core';
import './index.scss'

function Popup(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [allDay, setAllDay] = useState(true);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState("12:00");
  const [note, setNote] = useState('');
  const [id, setId] = useState(createEventId())
  useEffect (() => {
    if(props.popupData.selectInfo != null && props.popupState === "creating") {
      setSelectedDate(moment(props.popupData.selectInfo.startStr));
      setAllDay(props.popupData.selectInfo.startStr.length <= 10)
      if(props.popupData.selectInfo.startStr.length > 10) setTime(moment.utc(new Date(props.popupData.selectInfo.startStr).getHours()*3600*1000).format('HH:mm'))
    }
    if(props.popupData.selectInfo != null && props.popupState === "editing") {
        setTitle(props.popupData.selectInfo.event._def.title);
        setNote(props.popupData.selectInfo.event.extendedProps.note);
        setAllDay(props.popupData.selectInfo.event.allDay);
        setId(props.popupData.selectInfo.event.id);
        setSelectedDate(props.popupData.selectInfo.event._instance.range.start)
        setTime(moment.utc(new Date(props.popupData.selectInfo.event._instance.range.start).getHours()*3600*1000).subtract(3, "hours").format('HH:mm'))
    }
    return;
  }, [props]);
  const save = () => {
    let start = moment(selectedDate).format().substr(0,10);
    let event = {
      id,
      title,
      start: allDay ? start : moment(new Date(`${start} ${time}`)).tz('Europe/Kyiv').format(),
      allDay,
      extendedProps: {
        note
      }
    };
    if(props.popupState === "creating") {
      props.popupData.calendarApi.addEvent(event)
    } else {
      props.popupData.selectInfo.event.remove();
      props.popupData.selectInfo.view.calendar.addEvent(event)
    }
    props.closePopup()
  }

  const discard = () => {
    if(props.popupState === "creating") {
    } else {
      props.popupData.selectInfo.event.remove();
    }
    props.closePopup()
  }

  return (
    <div className="Popup" style={{position: "absolute", left: props.popupData.selectInfo.jsEvent.pageX, top: props.popupData.selectInfo.jsEvent.pageY}}>
      <FontAwesomeIcon className="Popup__cross" onClick={props.closePopup} icon={faTimesCircle} />
      <svg className="Popup__triangle" width="10px" height="11px">
        <path
              d="M 1,10 L 5,1 L 9,10 z"
            fill={props.popupState === "creating" ? "#43425D" : 'white'}
            stroke="#43425D"
            stroke-width="1"/>
      </svg>
      <TextField
        label="event name"
        value={title}
        onChange={e => setTitle(e.target.value.substr(0, 30))}
        className="Popup__item"
      />
      <div className="Popup__datepickerContainer">
        <MuiPickersUtilsProvider className="Popup__item Popup__datepicker" utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="event date"
            value={selectedDate}
            onChange={setSelectedDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <FormControlLabel
        className="Popup__checkbox"
        control={
          <Checkbox
            checked={allDay}
            onChange={() => setAllDay(!allDay)}
            name="checkedB"
            color="primary"
          />
        }
        label="All day"
      />
      {allDay ? null : (
        <div className='Popup__timeContainer'>
          <TextField
             className="Popup__item"
             id="time"
             label="event time"
             type="time"
             value={time}
             onChange={e => setTime(e.target.value)}
             endAdornment={
                   <InputAdornment position="end">
                     <FontAwesomeIcon icon={faClock} />
                   </InputAdornment>
                 }
             defaultValue="12:00"
             InputLabelProps={{
               shrink: true,
             }}
             inputProps={{
               step: 1800,
             }}
           />
        </div>
      )}
      <TextField
        label="notes"
        value={note}
        className="Popup__item Popup__note"
        onChange={e => setNote(e.target.value)}
      />
      <div className="Popup__controls">
        <button className="Popup__controls__cancel" onClick={discard} type="button">{props.popupState === 'creating' ? 'cancel' : 'delete'}</button>
        <button className="Popup__controls__save" onClick={save} type="button">save</button>
      </div>
    </div>
  )
}

export default Popup;
