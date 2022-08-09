interface TableIdTypes {
    [index: string]: {
        name: string
    }
}

const tableIdTypes: TableIdTypes = {
    manual: {
        name: 'manual'
    },
    auto: {
        name: 'auto'
    }
}

export default tableIdTypes;
