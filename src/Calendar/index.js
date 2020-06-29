import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import './index.scss';

import Popup from './Popup';

export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    popupState: 'inactive',
    popupData: {
      calendarApi: null,
      selectInfo: null,
    }
  }

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'today,prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,Agenda'
            }}
            customButtons= {{
              Agenda: {
                text: 'Agenda',
                click: function() {
                  alert('clicked the agenda button!');
                }
              }
            }}
            buttonText={{
              today: 'Today',
              prev : 'Back',
              next: "Next"
            }}
            initialView='dayGridMonth'
            slotLabelFormat= {[{
              hour: 'numeric',
              minute: '2-digit',
              hour12:true
            }]}
            slotDuration='01:00:00'
            expandRows={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
          />
          {this.state.popupState !== 'inactive' ? (
            <Popup popupState={this.state.popupState} popupData={this.state.popupData} closePopup={this.closePopup} />
          ) : null}
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    this.closePopup();
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
    this.setState({
      popupState: "creating",
      popupData: {
        calendarApi,
        selectInfo
      }
    })
  }

  closePopup = () => {
    this.setState({
      popupState: 'inactive',
      popupData: {
        calendarApi: null,
        selectInfo: null,
      }
    })
  }

  handleEventClick = (clickInfo) => {
    this.closePopup();
    this.setState({
      popupState: "editing",
      popupData: {
        calendarApi: null,
        selectInfo: clickInfo
      }
    })
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
