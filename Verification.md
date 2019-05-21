# Plan verification

## InputHandler
Make sure if user didn't put down the input, our system shows up the error
- Testing requirement: If any input is blank, when users click the “Get my schedule” button, the system will display an error message in the middle with red text “Error: Your form is incomplete or you have the invalid input, please check your form again” after 1 second.
- Input:
    - (Since we are using HTML date object to let user pick their date, the only possible input we will get will be wither null or date object.)

    - if the input HTML date object: The form fields that are required should have messages with green check icon above them that say “***Your sleeping schedule has been updated on your google calendar!”***” or ***You don't need to change your sleeping schedule!”*** based on the date they put down (see next test).

    - if input is null: The input fields (either departure or arrival date/ sleeping or awake time) that are required should have red error messages below them that say “Error: Your form is incomplete or you have the invalid input, please check your form again”.

## ScheduleGenerator
Make sure the difference between the departure and arrival date is more than 2 day
- Testing requirement:  If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!***"" is displayed.
- Input: two date object that represent arrival date and departure date  
    - If difference between these two dates is less than two days, after user click the "get schedule" button, they should see "***You don't need to change your sleeping schedule!”***" above the form fields that are required.
    - if difference these two date is more than or equal to two days, they should see "***Your sleeping schedule has been updated on your google calendar!”***" above the form fields that are required.
