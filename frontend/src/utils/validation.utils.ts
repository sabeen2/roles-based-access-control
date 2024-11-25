export const generalContactValidator = (contact: string) => {
    /*
          1. Check for the length of the contact number (9 for telephone and 10 for mobile)
          2. If the length is 10, check if it starts with a "9" because mobile numbers have to start with a "9"
      */

    const generalContactRegex = /^[0-9]{9,10}$/

    if (generalContactRegex.test(contact)) {
        if (contact.length === 10) {
            // 10-digit contact numbers must start with '9'
            if (!contact.startsWith('9')) {
                return Promise.reject(
                    new Error('10-digit contact number should start with 9')
                )
            }
        }

        return Promise.resolve()
    }

    return Promise.reject(
        new Error('Contact number should have 9 or 10 digits')
    )
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emailValidator = (email: string, isRequired: boolean = true) => {
    if (!email && !isRequired) {
        return Promise.resolve()
    }

    if (!email && isRequired) {
        return Promise.reject(new Error('Please enter an email address'))
    }

    if (emailRegex.test(email)) {
        return Promise.resolve()
    }

    return Promise.reject(new Error('Please enter a valid email address'))
}
