import { AuthActionCreators } from "./auth/action-creators"
import { EventActionCreators } from "./event/action_creators"

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}