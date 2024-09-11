import {setTimeout} from 'timers/promises'

export default defineEventHandler(async (event) => {
    setTimeout(1000)

    const body = await readBody(event)

    if (!body.domain) {
        return {
            status: 400,
            message: 'Domain is required'
        }
    } else if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/.test(body.domain)) {
        return {
            status: 400,
            message: 'Domain is invalid'
        }
    }

    try {
        const response = await fetch(`https://domainr.p.rapidapi.com/v2/status?domain=${body.domain}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'domainr.p.rapidapi.com',
                'x-rapidapi-key': 'fce866c0d4mshf5b76ee0ad3c5dap139b6cjsn131cfebf1096'
            }
        })

        const data = await response.json()

        if (data.errors) {
            return {
                status: 400,
                message: data.errors[0].message
            }
        }

        return {
            status: 200,
            message: (body.domain + ' ') + ((data.status[0].summary == 'inactive') ? 'available 🎉' : 'already taken 😞'),
            data: data,
            summary: data.status[0].summary
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Error'
        }
    }
})
