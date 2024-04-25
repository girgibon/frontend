import { Dayjs } from "dayjs";
import moment from "moment";
import { convertDayjsToMoment } from "./date";

const rules = {
    required: (message: string = "Required field") => ({
        required: true,
        message
    }),
    isDateAfter: (message: string) => () => ({
        validator(_: any, value: Dayjs) {
            const momentValue = convertDayjsToMoment(value)
            if (momentValue.isSameOrAfter(moment())) {
                return Promise.resolve()
            }
            return Promise.reject(new Error(message));
        }
    })
}
export default rules;