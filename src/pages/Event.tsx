import React, {FC, useEffect, useState} from "react";
import EventCalendar from "../components/EventCalendar";
import { Button, Modal, Row, Layout } from "antd";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event:FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {createEvent, fetchEvents} = useActions()
  const {events} = useTypedSelector(state => state.event)
  const {user} = useTypedSelector(state => state.isAuth);
  useEffect(() => {
    fetchEvents(user.email)
  }, [fetchEvents, user.email])

  const addNewEvent = (event: IEvent) => {
    setModalOpen(false);
    createEvent(event);
  }

  return (
    <Layout>
      <EventCalendar events={events}/>
      <Row justify="center">
        <Button
          onClick={() => setModalOpen(true)}
        > 
        Add task
        </Button>
      </Row>
      <Modal
        title="Add task"
        open ={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <EventForm 
          submit={addNewEvent}
        />
      </Modal>
    </Layout>
  );
};

export default Event;