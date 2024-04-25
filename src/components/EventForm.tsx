import { Form, Input, Row, Select } from "antd";
import React, { FC } from "react";
import { rules } from "../utils/rules";
import { DatePicker } from "antd";
import { Button } from "antd";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { useState } from "react";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Dayjs } from "dayjs";

interface EventFormProps {
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        title: '',
        date: '',
        description: '',
    } as IEvent);

    const {user} = useTypedSelector(state => state.isAuth)

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.email})
    }

    return (
      <Form onFinish={submitForm}>
        <Form.Item
            label = "Title"
            name = "title"
            rules={[rules.required()]}
        >
            <Input 
                onChange={e => setEvent({...event, title: e.target.value})}
                value={event.title}
            />

        </Form.Item>
        <Form.Item
            label = "Event description"
            name = "description"
            rules={[rules.required()]}
        >
            <Input 
                onChange={e => setEvent({...event, description: e.target.value})}
                value={event.description}
            />
        </Form.Item>
        <Form.Item
            label = "Date of event"
            name = "date"
            rules={[rules.required(), rules.isDateAfter('Date must be in the future')]}
        >
            <DatePicker 
                onChange={(date:Dayjs) => selectDate(date)}
            />
        </Form.Item>

        <Row justify="end">
            <Form.Item>
                <Button type="primary" htmlType="submit" >
                    Create
                </Button>
            </Form.Item>
        </Row>
      </Form>
        
    );
  };
  
  export default EventForm;