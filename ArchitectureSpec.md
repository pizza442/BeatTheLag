# Architecture Specification

## LoginHandler
Manages the login screen, displays the login page which includes the BeatTheLag description and login form. Menage all the user login information, connecting the information from their Google account

| Method | Input | Output | Description |Connector|
| --- | --- |
| displayLogin() | none | | List all new or modified files |
| getLoginInfo() | none || Show file differences that haven't been staged |

## InputHandler
Displays the input form for the users flight and sleep information. Receive and manage all user input, connecting user input to Schedule Maker.  

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

Inputs
- `flightInfo` - Call to retrieve am `Array<string>` of user's selection about their fight date, time and location
- `sleepInfo` - Call to retrieve am `Array<string>` of user's selection about their sleeping and waking time

output:  

#### Property

| Property | Type | Description|
|----------|------|------------|
|departureLocation|String|the departure location|
|departureTime|String|the time of departure|
|departureDate|String|the date of departure|
|destinationLocation|String|the arrival location|
|destinationTime|String|the time of arrival|
|destinationDate|String|the date of arrival|
|normalSleepTime|String|Time that the user normally goes to sleep|
|normalWakeTime|String|Time that the user normally wakes up.|
|scheduleData| Array[string] |data structure that contains the data for the calendar|

#### Functionality

| Method | Parameter | Return | Description|
|--------|-----------|--------|-------------|
| getSchedule() | none | none| Retrieve the lists of flight and sleeping information from `flightInfo` and `sleepInfo`. Creates the schedule that the user would follow.|
| formJSON() | none | JSON object | Returns the JSON object containing the schedule data.|



## ScheduleToCalendar
Adds the sleeping schedule to user’s Google calendar

## DatabaseManager
Stores the events added to the user’s Google Calendar
