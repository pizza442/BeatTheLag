# Plan verification

#### **Testing requirement**:
    - When open up our page, user will see the big button with text "sign in with Google" in between 1-5 second
- **Test**: After we have deployed our page onto GitHub, we will put our page link onto [Google pagespeed insight](https://tools.pingdom.com/#5ab7276ce5000000) to see how many second it takes to load our page.

#### **Testing requirement**:
    - If user click the "sign in with Google" button, they will get direct to the Google api sign in. At there, they will see the form showing "***Choose an account to continue to beatthelag-info442.firebaseapp.com***" and they should able to choose their google account to sign in with our system.
- **Test**: We will manually test by clicking the button on our own machine and inspect the page to see if out system has direct to Google sign in.

#### **Testing requirement**:
    - If user do not have a Google account, Google api should direct user to make an account with Google system. they should able to choose their google account to sign in with our system.
- **Test**: We will manually test by clicking "Create an account" shows up in Google sign in page and inspect can in create the account and sign in.

#### **Testing requirement**:
    - After user sign in with their Google account successfully, they should be taken to input page.
- **Test**: We will manually inspect our page to see if our system have successfully take user to input page.

#### **Testing requirements**:
    - When user gets to the input-page, they will see the form which requires them to enter their flight and sleeping information and there's a button labeled “Get my schedule” to get their sleeping schedule.
    - User must be able to put in their flight information, includes:
        - Departure location: [`City`, `Nation`]
        - Arrival location: [`City`, `Nation`]
        - Arrival date & time: in format of: `YYYY/MM/DD`  
        - Departure date & time: in format of: `YYYY/MM/DD`
        - Time usually get to sleep: `hour:minute`
        - Time usually wake up: `hour:minute`
    - These inputs will be the dropdown menu with the default value of blank
    - When users click the “Get my schedule” button, the waiting animation will be shown in the middle of the page for about 5 second (this is the time when system is generating the sleeping schedule)
- **Test**: We will manually inspect our page to see if there is a form after we sign in.

#### **Testing requirement**:
    - Users must input all the information above in order to get their sleeping schedule.
    - If any input is blank, when users click the “Get my schedule” button, the system will display an error message in the middle with red text “Error: Your form is incomplete or you have the invalid input, please check your form again” after 1 second.
- **Test**
    - Input:
        - (Since we are using HTML date object to let user pick their date, the only possible input we will get will be wither null or date object.)

        - if the input HTML date object: The form fields that are required should have messages with green check icon above them that say “***Your sleeping schedule has been updated on your google calendar!”***” or ***You don't need to change your sleeping schedule!”*** based on the date they put down (see next test).

        - if input is null: The input fields (either departure or arrival date/ sleeping or awake time) that are required should have red error messages below them that say “Error: Your form is incomplete or you have the invalid input, please check your form again”.

#### **Testing requirement**:  
    - If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!***"" is displayed.
- **Test**
    - Input: two date object that represent arrival date and departure date  
        - If difference between these two dates is less than two days (arrivalDate -departureDate < 2), after user click the "get schedule" button, they should see "***You don't need to change your sleeping schedule!”***" above the form fields that are required.
        - if difference these two date is more than or equal to two days(arrivalDate -departureDate >= 2), they should see "***Your sleeping schedule has been updated on your google calendar!”***" above the form fields that are required.

#### **Testing requirement**:
    - The sleeping schedule produced by the system should be follow the principles in [research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2829880/) over here.
    - The sleeping schedule will start on the day depending on user’s flight and sleeping information (again, follow the principles above).
    - The sleeping schedule will end at user’s departure date.
- **Test**: We will manually calculate the output that suppose to generate by our system (which fit the research) and compare the schedule that output by our system  
    - What we input in our system:
        - Departure location: [`Las Vegas`, `US`]
        - Arrival location: [`New York City`, `US`]
        - Arrival date & time: in format of: `2019/07/23`  
        - Departure date & time: in format of: `2019/07/20`
        - Time usually get to sleep: `23:00`
        - Time usually wake up: `07:30`
    - Expect Output: JSON object
        ```js
        {
            {
                "start": {
                    "dateTime": "2019-07-17T022:00:00-07:00",
                    "timeZone": "America/Los_Angeles"
                },
                "end": {
                    "dateTime": "2019-07-18T06:00:00-07:00",
                    "timeZone": "America/Los_Angeles"
                }

            },
            {
                "start": {
                    "dateTime": "2019-07-18T021:00:00-07:00",
                    "timeZone": "America/Los_Angeles"
                },
                "end": {
                    "dateTime": "2019-07-19T06:00:00-07:00",
                    "timeZone": "America/Los_Angeles"
                }
            },
            {
                "start": {
                    "dateTime": "2019-07-19T022:00:00-07:00",
                    "timeZone": "America/Los_Angeles"
                },
                "end": {
                    "dateTime": "2019-07-20T06:00:00-07:00",
                    "timeZone": "America/Los_Angeles"
                }
            }    
        }
        ```
#### **Testing Requirement**:
    - The sleeping schedule produced by the system will be added onto the user’s google calendar with the title “Sleeping time”.
    - If user has used our service before and have an old schedule, if they make a new schedule, the old schedule will be directly updated to the new schedule
- **Test**: We will manually go on our Google calendar and see if the schedule has been created or updated with the title "Sleeping time"
