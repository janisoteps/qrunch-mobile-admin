import {TimeFieldInput} from "../../interfaces/service";

export interface GetTimeInputValue {
    (timeInput: TimeFieldInput): string
}

const getTimeInputValue: GetTimeInputValue = (timeInput) => {
    if (timeInput.isAsap) {
        return 'ASAP'
    } else {
        if (typeof timeInput?.selectedTime === 'string') {
            return timeInput.selectedTime
        } else {
            return 'No time'
        }
    }
};

export default getTimeInputValue;
