# Plan verification

## ScheduleGenerator
Make sure the difference between the departure and arrival date is more than 2 day
- Testing requirement:  If user's arrival date and departure date is at the same date, there will have a green check icon and the message “***You don't need to change your sleeping schedule!”*** is displayed.
- Input: int that represents the difference between arrival date and departure date    
- If input is less than two, return true, else return false
Output: Boolean
