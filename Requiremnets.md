# Requirement
## Login page
- When users open the system, they will see the two `textbox` input at the middle of the page. These text boxes will requires them to input their *email* and **password** with caption “email” and “password”.
- The red * will be next to the caption to inform user they must put in the require information.
- Below the text boxes, there will be two big buttons. One with text “Sign in” and the other with text “Sign up”. Users are able to click them at anytime.
- If user click either buttons before they put down any input, the system will show the red message “Please fill in all required input” on the middle of the login page in about 1 second.
- If user put the thing that’s not the email inside of the email box, the system will show the red message “***this is not an email, please type an email here.***” on the middle of the login page in about 1 second.
- If user put the mismatch email and password and then they click the “sign in” button, above the text box, the system will show the message “***Incorrect password or email, please try it again.***” on the middle of the login page in about 1 second.  
- If users has put down the correct email which match their password, after they click the “sign in” button, they will go to the input page in between 0.5 to 2 second.
- If user click the “sign up” button, they should able to fill their email and the password they create and after that they should go to the input page

# input-page
- When user get into the input-page, they will see the form which require them to put down their flight and sleeping information and the button with text “Get my schedule” to get their sleeping schedule.

- User must be able to put in their flight information, these include:

    - Departure location: [`City`, `Nation`]
    - Arrival location: [`City`, `Nation`]
        - Departure and arrival location will be present as drop down list, so users are only allow to picked the value instead of put down the input.
        - The order of item in the dropdown list will follow the alphabetical order from A to Z
        - The default value for both dropdown lists will be set to blank

    - Arrival date & time: in format of: `DD/MM/YYYY`, `hour:minute`, `AM`, `PM`  
    - Departure date & time: in format of: `DD/MM/YYYY`, `hour:minute`, `AM`, `PM`
        - The required format will present above the input box so user can know how to type the correct input.
        - If user put down the wrong format (e.g. YYYY/MM/DD or DD/MM/YY) or any invalid input (e.g. put down letter), the text box will turn to red and there will be the alert message telling user "***Wrong format, please use DD/MM/YYYY for this input***".


- User must be able to put in their sleeping schedule information, these include:
    - Time usually get to sleep: `hour:minute`, `AM`, `PM`
    - Time usually wake up: `hour:minute`, `AM`, `PM`
        - For input box [hour:minute], user will use the drop down bar to select both hour and minute.
        - Hour drop down will have selected value from 1 to 12.
        - Minute drop down will have selected value from 00 to 50 divided by 10 minutes interval (e.g. 10, 20, 30).
        - For picking AM or PM, user will use the drop down bar to select either of them.
        - The default value for all drop down list above will be set to blank

- User must input all the information above in order to get their sleeping schedule.
- If any input is blank or invalid, when user click the “Get my schedule” button, the system will show the error message at the middle with red text “***Error: Your form is incomplete or you have the invalid input, please check your form again***” after 1 second.

- If all the inputs is filled and it’s in the correct format, when user click the “Get my schedule” button, the waiting animation will be shown at the middle of the page for about 5 second (this is the time when system is generating the sleeping schedule)
- After that 5 second, there will have a green check icon and the message show up: “***Your sleeping schedule has been updated on your google calendar!”***
- The sleeping schedule produced by the system should be follow the principles in [research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2829880/) over here.
- The sleeping schedule produced by the system will be added onto user’s google calendar with the title “Sleeping time”.
- The sleeping schedule will start at the day depend on user’s flight and sleeping formation (again, follow the principles above).
- The sleeping schedule will end at user’s departure date.
- After the sleeping schedule was added, user will also get the notification before 10 minutes they should go to sleep from the day schedule is started until the day of departure.    

- If user has use our service before and have an old schedule, if they make a new schedule on to the google calendar, the old schedule will be directly updated to the new schedule
