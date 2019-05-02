# Architecture Specification

## LoginHandler
Manages the login screen, displays the login page which includes the BeatTheLag description and login form. Menage all the user login information, connecting the information from their Google account

## InputHandler
Displays the input form for the users flight and sleep information. Receive and manage all user input, connecting user input to Schedule Maker.  

#### Responsibility
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

#### Connections
##### Inputs
- `userInfo`: It takes the already established information of the user from the Login component

#### Outputs
- `organizedData`: After taking in the user data as string objects and organizing them in a Map data structure, it then sends that organized data to the `ScheduleGenerator` to produce the schedules


#### Property    
| Property | Type | Description|
|----------|------|------------|
|isValid |Boolean| Retrieve `userInput` and decide if what the user inserts is relevant or possible to use by using regex expression. If fails, sends an error message through google chrome window. Otherwise call out `organize()`.|
|allAirports |Array{String}|Checks the users query against the Airport API. If not there then is `isValid` is called. Otherwise return the list of airports and their cities|

#### Functionality

| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
|organize()|none|Map data structured| information and sorts and organizes everything in a map which then sends that to the schedule maker.|
|renderValid()|none|JSX|Returns the JSX that will show success of the information being used and validated. If not it will render, the blank form again which then will ask for re-entry of data.

## ScheduleGenerator
Receive user input form Input and generates a sleeping schedule. 	

#### Responsibility:
- Gets the time zones from arrival/departure location (airport) - [API call](https://developer.flightstats.com/api-docs/airports/v1)
- Creates a list of sleep and wake up times for individual days
- Calculate the starting day for sleeping schedule.
- Calculate when the schedule should start and end  
- End the schedule at departure day
- Package the schedule in a 2D array where’s it’s length will be the number of days, and the columns will contain the sleep and awaken times respectively. to give to Google API.

#### Connections

##### Inputs
- `organizedData` - Retrieve the organized data produce by InputHandler to make a sleeping schedule for user

##### Outputs  
- `sleepingSchedule` - Provide the number of `scheduleStartDate`,  `scheduleEndDate`, `sleepTime`, `WakeUpTime` to ScheduleToCalendar

#### Property

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

#### Functionality

| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
| getSchedule() | none | none| Retrieve the lists of flight and sleeping information from `flightInfo` and `sleepInfo`. Creates the schedule that the user would follow.|
| formJSON() | none | JSON object | Get the sleeping schedule form `getSchedule()` and returns it in the JSON format|

## ScheduleToCalendar
Adds the sleeping schedule to user’s Google calendar

## DatabaseManager
Stores the events added to the user’s Google Calendar
