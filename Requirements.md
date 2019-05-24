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

    - Departure location: [`City`, `Nation`]
    - Arrival location: [`City`, `Nation`]
        - Departure and arrival location will be presented as drop down list, so users are only allow to pick the value instead of entering the input.
        - The order of item in the dropdown list will be in alphabetical order from A to Z
        - The default value for both dropdown lists will be set to blank
        - If user input the location that has no time zone difference

     - Arrival date & time: in format of: `YYYY/MM/DD`  
     - Departure date & time: in format of: `YYYY/MM/DD`
        - These two date boxes for `DD/MM/YYYY` will be the html `date` object that allow user to pick a date in calendar like UI.
        - The default value for date will be blank for data input.  

- Users must be able to put in their sleeping schedule information, these include:
    - Time usually get to sleep: `hour:minute`
    - Time usually wake up: `hour:minute`
        - The input boxes for selecting `hour:minute` will be the dropdown list of military time with default value blank.
        - If user has the same wake up and sleep time, the system will output the error. 
        - Hour drop down will have selected value start from 00 to 23.
        - Minute drop down will have selected value start from 00 to 50 divided by 10 minutes interval (e.g. 10, 20, 30).
        - The input boxes for selecting `AM` or `PM` will be the dropdown list with default value blank.

- Users must input all the information above in order to get their sleeping schedule.
- If any input is blank, when users click the “Get my schedule” button, the system will display an error message in the middle with red text “***Error: Your form is incomplete or you have the invalid input, please check your form again***” after 1 second.
- When users click the “Get my schedule” button, the waiting animation will be shown in the middle of the page for about 5 second (this is the time when system is generating the sleeping schedule)
- After those 5 seconds, there will have a green check icon and the message “***Your sleeping schedule has been updated on your google calendar!”*** is displayed.
- If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!”*** is displayed.
- The sleeping schedule produced by the system should be follow the principles in [research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2829880/) over here.
- The sleeping schedule produced by the system will be added onto the user’s google calendar with the title “Sleeping time”.
- The sleeping schedule will start on the day depending on user’s flight and sleeping information (again, follow the principles above).
- The sleeping schedule will end at user’s departure date.

- If user has used our service before and have an old schedule, if they make a new schedule, the old schedule will be directly updated to the new schedule
