# Requirements
This is the design requirement for BeatTheLag. BeatTheLag is the web application that allow user to create their own personalized jet lag plans.

## Login page
- When open up our page, user will see the big button with text "sign in with Google" in between 1-5 second.
- If user click the "sign in with Google" button, they will get direct to the Google api sign in. At there, they will see the form showing "***Choose an account to continue to beatthelag-info442.firebaseapp.com***" and they should able to choose their google account to sign in with our system.
- If user do not have a Google account, Google api should direct user to make an account with Google system.
- After user sign in with their Google account successfully, they should be taken to input page.

## Input-page
- When user gets to the input-page, they will see the form which requires them to enter their flight and sleeping information and there's a button labeled “Get my schedule” to get their sleeping schedule.

- User must be able to put in their flight information, these include:

    - **revive**: The reason why we change this part of requirement is because that our original plan is to find the API that contains the location and it's time zone. Yet, the API we found cost money so that's why we decided not to match the location and timezone but to let user pick the time zone directly.
    - Pick your departure time zone: [`time zone`]
    - Pick your arrival time zone: [`time zone`]
        - Departure and arrival time zone will be presented as drop down list, so users are only allowed to pick the value instead of entering the input.
        - The default value for both dropdown lists will be set to "UTC-12";
        - If user input the location that has no time zone difference, our system will show the error

     - **revive**: The reason why we change the requirement of this input date requirement is because (1) we figure out that the actual format of html date object is the `mm/dd/yyyy` on react rather than `YYYY/MM/DD`. (2) We want to prevent the user from picking the past date they can't change their sleeping schedule in the past (that's why we set the default as today). (3) We set the value of arrival date as two date later is because that user do not need to change their sleeping schedule if
     - Arrival date & time: in format of: `mm/dd/yyyy`  
     - Departure date & time: in format of: `mm/dd/yyyy`
        - These two date boxes for `mm/dd/yyyy` will be the html `date` object that allow user to pick a date in a calendar-like UI.
        - The default value for arrival date will be today date's and the default value for departure date will be two day after today's date.  

- **revive**: The reason why we change the requirement of input time in requirement is because (1) html `input` object with type `time` is not a dropdown list but a .
- Users must be able to put in their sleeping schedule information, these include:
    - Time usually get to sleep: `hour:minute`
        - `revive`: The input boxes for selecting `hour:minute` will be the slots to enter hours and minutes of military time with default value blank.
        - If user has the same wake up and sleep time, the system will output the error.
        - Hour drop down will have selected value start from 00 to 23.
        - Minute drop down will have selected value start from 00 to 50 divided by 10 minutes interval (e.g. 10, 20, 30).
        - The input boxes for selecting `AM` or `PM` will be the dropdown list with default value blank.

- Users must input all the information above in order to get their sleeping schedule.
- If any input is blank, when users click the “Get my schedule” button, the system will display an error message in the middle with red text “***Error: Your form is incomplete or you have the invalid input, please check your form again***” after 1 second.
- When users click the “Get my schedule” button, the waiting animation will be shown in the middle of the page for about 5 second (this is the time when system is generating the sleeping schedule)
- After those 5 seconds, there will have a green check icon and the message “***Your sleeping schedule has been updated on your google calendar!”*** is displayed.
- If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!”*** is displayed.

- **revive**: This study has include principle of how user gonna getting daylight as well, which is too big than what we are trying to do. There is the easier version our team try to aim for: If user's departure and arrival location time zone has 4 hour difference, the
- The sleeping schedule produced by the system will be added onto the user’s google calendar with the title “Sleeping time”.
- The sleeping schedule will start on the day depending on user’s flight and sleeping information (again, follow the principles above).
- The sleeping schedule will end at user’s departure date.

- If user has used our service before and have an old schedule, if they make a new schedule, the old schedule will be directly updated to the new schedule
