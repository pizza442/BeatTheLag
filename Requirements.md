# Requirements
This is the design requirement for BeatTheLag. BeatTheLag is the web application that allow user to create their own personalized jet lag plans.

## Login page
- `Complete`: When open up our page, user will see the big button with text "sign in with Google" in between 1-5 second.
- `Complete`: If user click the "sign in with Google" button, they will get direct to the Google api sign in. At there, they will see the form showing "***Sign in to continue to beatthelag-info442.firebaseapp.com***" and they should able to choose their google account (or to type in) to sign in with our system. (We have revive this based on the actual output of what google api show)
- `Complete`: If user do not have a Google account, Google api should direct user to make an account with Google system.
- `Complete`: After user sign in with their Google account successfully, they should be taken to input page.

## Input-page
- `Revised`, `Complete:` When user gets to the input-page, they will see the form which requires them to enter their flight and sleeping information and there's two buttons labeled “Submit” to get their sleeping schedule and "Sign out" if they want to change their acount.
    - **Reason for reviving**: We add the sign out button because we forgot to put this in when we are making the requirement. We also changed the button name because we think "Submit" sound more professional

- `Complete:` User must be able to put in their flight information, these include:
    - `Revised`, `Complete:` Pick your current timezone: [`time zone`]
    - `Revised`, `Complete:` Pick your destination timezone: [`time zone`]
        - `Revised`, `Complete:` Current and destination time zone will be presented as drop down list, so users are only allowed to pick the value instead of entering the input.
        - `Revised`, `Complete:` The order of item in the dropdown list will be in order by UTC and number (-12 to 12)
        - `Revised`, `Complete:` The default value for both dropdown lists will be set to "UTC-12";
        - `Revised`, `Complete:` If user input the location that has no time zone difference, our system will show the error as a pop up alert window after they click "submit"
        - **Reason for reviving this part**: The reason why we change this part of requirement is because that our original plan is to find the API that contains the location and it's time zone. Yet, the API we found actually cost money so that's why we decided not to match the location and timezone but to let user pick the time zone directly.

     - `Revised`, `Complete:` Arrival date & time: in format of: `mm/dd/yyyy`  
     - `Revised`, `Complete:` Departure date & time: in format of: `mm/dd/yyyy`
        - `Revised`, `Complete:` These two date boxes for `mm/dd/yyyy` will be the html `date` object that allow user to pick a date in a calendar-like UI.
        - `Revised`,  `Complete:` The default value for arrival date will be today date's and the default value for departure date will be two day after today's date.  
        -  `Revised`, `Complete:` For arrival date, user won't be able to pick a date that is before departure date.  
         - **Reason for reviving this part**: The reason why we change the requirement of this input date requirement is because (1) we figure out that the actual format of html date object is the `mm/dd/yyyy` rather than `YYYY/MM/DD`. (2) We want to prevent the user from picking the past date they can't change their sleeping schedule in the past (that's why we set the default as today). (3) We set the value of arrival date as two date because 

- `Complete:` Users must be able to input their sleeping schedule information, these include:
    - `Revised`, `Complete:` Please enter your bed time: `hour:minute AM/PM` 
    - `Revised`, `Complete:` Please enter your wake up time: `hour:minute AM/PM`
    - `Revised`, `Complete:` The input boxes for selecting `hour:minute` will be the html `input` with type `time`.
    - `Complete:` If user has the same wake up and sleep time, the system will output the error.
    - `Revised`, `Complete:` The default value of sleeping time will be set to 8:00 AM.
    - `Revised`, `Complete:` The default value of sleeping time will be set to 10:00 PM.
    - **Reason for reviving this part**: The reason why we change the requirement of input time in requirement is because (1) The imput time form render by HTML is not a dropdown but the defaut html time object. This time object can help us to get the user input value faster. (2)And this input form can allow us to use AM/PM feature. We think that having AM/PM is more simple for user to pick that's why we change the format of the input (3)

- `Complete:` Users must input all the information above in order to get their sleeping schedule.
- `Revised`, `Complete:` If any input is blank, when users click the “Submit” button, the system will display an  alert pop up window with error message based on which input in not. For example, if user didn't input the bed time, our system will output the alert message "**Please pick a bedtime**". 
    - **Reason for reviving**: We think that showing user which input they are missing is more explicit rather than just telling them they didn't finish the form. So we change the way of giving error message

- When users click the “Submit” button, the waiting animation will be shown in the middle of the page for about 5 second (this is the time when system is generating the sleeping schedule)

- `Revised`, `Complete:` After user click the "Submit" button, our page will display the 
    - **Reason for reviving**: Due to the Google calendar API issue, we change our plan and decided to produce the schedule on our system. The 

- If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!”*** is displayed.

- The sleeping schedule produced by the system will be shown by the page showing user when they should get to sleep.
    - **reason for reviving**: In order to add event or update event using Google API, we have to get certificate which will cause us 3 weeks. In this case we decided to change the plan and make the actual schedule that will be shown on our system

- `revised` `Complete:` The sleeping schedule produced by the system should be follow the principles in [research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2829880/) over here. In conclusion, how many days user will have for their sechedule is depend on how many time zone difference they have.  
    - **reason for reviving**: This is more like make the requirement more specific. The research provided above also includes how user will control when they will get expose under daylight, which is not what our sechedule will cover. We revised this requirement is to make this requirement more specific so that everybody know what will be the expected output
- `Impossible:` The sleeping schedule produced by the system will be added onto the user’s google calendar with the title “Sleeping time”.
    - **reason why impossible:** At the last two week before dead line we found out that we have to get the cirtification from Google in order to add/ update the event using Google Calendar API and it will spend over 3-5 week to apply cirtification. 
- `Complete:` The sleeping schedule will start on the day depending on user’s flight and sleeping information (again, follow the principles above).
- `Complete:` The sleeping schedule will end at user’s departure date.
- If user has used our service before and have an old schedule, if they make a new schedule, the old schedule will be directly updated to the new schedule