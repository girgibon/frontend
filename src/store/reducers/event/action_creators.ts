import { AppDispatch } from "../..";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetGuestsAction, SetEventsAction } from "./types";
import UserService from "../../../api/UserService";
import { createEventDb, getAllEvents } from "../../../http/userAPI";
import { getIdByEmail } from "../../../http/userAPI";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () =>  async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActionCreators.setGuests(response));
        } catch (e) {
            console.log(e);
        }
    },
    createEvent: (event: IEvent) =>  async (dispatch: AppDispatch) => {
        try {
            const userId = await getIdByEmail(event.author)
            await createEventDb({title:event.title, description:event.description, date:event.date, userId:userId ? userId: 1})
            const events = await getAllEvents()
            const currentUserEvents = events.filter(ev => ev.user.email === event.author);
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (email: string) => async (dispatch: AppDispatch) => {
        try {
            const events = await getAllEvents()
            const currentUserEvents = events.filter(ev => ev.user.email === email);
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (e) {
            console.log(e)
        }
    }
}