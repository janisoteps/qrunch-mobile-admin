interface LocalStorageKeys {
    [index: string] : {
        keyName: string,
        description: string
    }
}

const localStorageKeys: LocalStorageKeys = {
    selectedLocation: {
        keyName: 'selected_location',
        description: 'A dictionary containing information about selected location'
    },
    restaurantId: {
        keyName: 'restaurant_id',
        description: 'Selected restaurant ID'
    },
    userToken: {
        keyName: 'user_token',
        description: 'User authentication JWT token'
    },
    tokenDate: {
        keyName: 'token_date',
        description: 'Date when user token last checked'
    },
    userName: {
        keyName: 'user_name',
        description: 'User first name'
    },
    userEmail: {
        keyName: 'user_email',
        description: 'User email'
    }
}

export default localStorageKeys;
