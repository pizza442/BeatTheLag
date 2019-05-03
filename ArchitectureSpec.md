# Architecture Specification

## LoginHandler
Manages the login screen, displays the login page which includes the **BeatTheLag** description and login form. Manage all the user login information, connecting the information from their Google account

### Responsibility
- Use FirebaseUI to render login page UI elements to get user to sign in using their Google account 
- Send user account/password to Google API to retrieve access to their calendar
- Wait to see if user data is valid
- Allow/deny access toward our application to get the calendar data
- If valid, store the calendar data as a variable within a map data structure that will then be given to the Input page

### Functionality
| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
|Onload()|none|JSX/boolean state|render the state in which the user has not entered any login information or is in the process of doing so.|
|Afterload()|none|JSX|Renders the web page contents after the login information is successful or unsuccessful.|
|isSuccesful()| none|Boolean|Updates the state of webpage with newly validated login information and gives a login success sign. If not successful, requires the user to re-input their data and then gives an error message through google chrome window|

### Connections
#### Inputs
- `userInfo` - Connects to the Firebase API to retrieve all necessary data.

#### Outputs
- `userInfo` - Puts out the raw information for what they currently have and gives it to the Input component



## InputHandler
Displays the input form for the users flight and sleep information. Receive and manage all user input, connecting user input to Schedule Maker.  

### Responsibility
- Render form on the screen:
    - All UI elements
        - Use react forms, cards and fragments to create input areas for the user to insert their DNA
        - Use time input for date from form
        - Dropdown for time from form
        - Dropdown for location from form
        - Load all the options for airport dropdown by calling the AirPort API
        - Include an autocomplete functionality for the user so they don’t have to scroll around to find their desire airport
    - Check user’s input
        - If form is not complete, show error message with window in google chrome showing up
        - If input is invalid, show error message with window in google chrome showing up
    -   Have these data fields be stored as variables as string types and then put them in a map dictionary so the schedule maker component has easier time to process the data given.

### Connections
#### Inputs
- `userInfo`- It takes the already established information (raw data) of the user from the Login component

#### Outputs
- `organizedData`- After taking in the user data as string objects and organizing them in a Map data structure, it then sends that organized data to the `ScheduleGenerator` to produce the schedules

### Functionality

| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
|isValid() |none|Boolean| Retrieve `userInput` and decide if what the user inserts is relevant or possible to use by using regex expression. If fails, sends an error message through google chrome window. Otherwise call out `organize()`.|
|allAirports() |none| Array{String}|Checks the users query against the Airport API. If not there then is `isValid` is called. Otherwise return the list of airports and their cities|
|organize()|none|Map data structured| information and sorts and organizes everything in a map which then sends that to the schedule maker.|
|renderValid()|none|JSX|Returns the JSX that will show success of the information being used and validated. If not it will render, the blank form again which then will ask for re-entry of data.

## ScheduleGenerator
Receive user input form Input and generates a sleeping schedule. 	

### Responsibility:
- Gets the time zones from arrival/departure location (airport) - [API call](https://developer.flightstats.com/api-docs/airports/v1)
- Creates a list of sleep and wake up times for individual days
- Calculate the starting day for sleeping schedule.
- Calculate when the schedule should start and end  
- End the schedule at departure day
- Package the schedule in a 2D array where’s it’s length will be the number of days, and the columns will contain the sleep and awaken times respectively to give to Google API.

### Connections
#### Inputs
- `organizedData` - Retrieve the organized data produce by **InputHandler** to make a sleeping schedule for user

#### Outputs  
- `sleepingSchedule` - Provide the number of `scheduleStartDate`,  `scheduleEndDate`, `sleepTime`, `wakeUpTime` to **ScheduleToCalendar**

### Properties

| Property | Type | Description|
|----------|------|------------|
|departureLocation|String|User's departure location|
|departureTime|String|Represent user's time of departure|
|departureDate|String|Represent user's date of departure|
|arrivalLocation|String|User's arrival location|
|arrivalTime|String|Represent user's time of arrival|
|arrivalDate|String|Represent user's date of arrival|
|normalSleepTime|String|Time that the user normally goes to sleep|
|normalWakeTime|String|Time that the user normally wakes up.|
|scheduleData| Array{String} |data structure that contains the data for the calendar|

### Functionality

| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
| getSchedule() | none | none| Retrieve the lists of flight and sleeping information from `flightInfo` and `sleepInfo`. Creates the schedule that the user would follow.|
| formJSON() | none | JSON object | Get the sleeping schedule form `getSchedule()` and returns it in the JSON format|

## ScheduleToCalendar
Adds the sleeping schedule to user’s Google calendar

### Responsibility
- Calls the Schedule Maker component and gets the times for the event of when they should go to sleep. And then calls the Google API
- Creates an event spanning the time the user should be sleeping
Adds a reminder to the event so the user will be notified via a Google notification on their device a few minutes before they should sleep
- Updates the event if the user has already created a sleeping schedule from previous uses.

### Connections
#### Inputs
- `authorization` - Authorization from the authenticated user to make request to the Google Calendar API
- `sleepingSchedule` - Sleeping schedule generated by **ScheduleGenerator**

#### Outputs
- `eventIds` - The event IDs from the events added to the user’s Google Calendar

### Properties
| Property | Type | Description|
|----------|------|------------|
|IdToken|String|Google authentication ID token needed to use Google Calendar API for the user|

### Functionality
| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
|addEvents()| Array{String} |none| Takes `sleepingSchedule` generated by **ScheduleGenerator** and adds events to the users Google calendar. Events are created with createEvent().|
|createEvent()|`sleepingSchedule`|JSON object|creates an event with the date, start time, and end time, and timezone from the json object parameter.|
|updateEvents()|String|none| Updates the events in the users Google Calendar with the given list of `eventId`

## DatabaseManager
Stores the events added to the user’s Google Calendar

### Responsibility
- Every user will have a list of event ids that have been added to their calendar
- Event IDs will be used to update the event in case the user changes their sleeping schedule

### Connections
#### Inputs
- `newUserEvents` - Receives a user id and a list of the event ids that were added to their Google Calendar 

#### Outputs
- `currentEventIds` - Returns the event Ids for the user updating their schedule 

### Properties
| Property | Type | Description|
|----------|------|------------|
| database | Firebase RealTime Database | Stores list of event IDs for every user

### Functionality
| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
|addEventsIds()|Array{string}|none| Adds the list of event IDs to the database
|getEventIds()|userId| Array{string}| Returns the list of event IDs added to the user's Google Calendar
