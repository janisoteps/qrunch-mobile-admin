export interface ServiceState {
    id: string,
    name: string,
}

export interface ServiceStates {
    [index: string]: ServiceState
}

export const serviceStates: ServiceStates = {
    pending: {
        id: 'pending',
        name: 'Pending'
    },
    accepted: {
        id: 'accepted',
        name: 'Accepted'
    },
    completed: {
        id: 'completed',
        name: 'Completed'
    }
};
