# Plan verification

## InputHandler
Make sure if user didn't put down the input, our system shows up the error
- Testing requirement: If any input is blank, when users click the “Get my schedule” button, the system will display an error message in the middle with red text “Error: Your form is incomplete or you have the invalid input, please check your form again” after 1 second.
- Input:
    - (Since we are using HTML date object to let user pick their date, the only possible input we will get will be wither null or date object.)

    - if the input HTML date object: The form fields that are required should have messages with green check icon above them that say “***Your sleeping schedule has been updated on your google calendar!”***”.

    - if input is null: The input fields (either departure or arrival date) that are required should have red error messages below them that say “Error: Your form is incomplete or you have the invalid input, please check your form again”.

## ScheduleGenerator
Make sure the difference between the departure and arrival date is more than 2 day
- Testing requirement:  If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!”*** is displayed.
- Input: int that represents the difference between arrival date and departure date    
- If input is less than two, return true, else return false
Output: Boolean
