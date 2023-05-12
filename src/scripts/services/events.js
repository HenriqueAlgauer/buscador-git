import {baseUrl} from '../variables.js'

async function getEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events`)
    const events = await response.json()
    console.log(events);
    const filteredEvents = await events.filter(event => {
        return (event.type === 'PushEvent' || event.type === 'CreateEvent' )
    })
    const slicedArray = await filteredEvents.slice(0,10)
    return await slicedArray 
}

export { getEvents }