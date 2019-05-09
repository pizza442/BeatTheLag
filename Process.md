# BeatTheLag team process specification

## How will you communicate with teammates you depend on?
- Our team will use Facebook as the communication platform
- If one has any question, they have to @ the one who are responsible
- If not sure @ all people in the team
- From Monday - Thursday:
    - If someone ask question, other has to response in 8 hour
- On Friday - Sunday:
    - If someone ask question, other has to response in 24 hour
- If someone can't response, he/she need to inform the team in advance and tell team member when he/she can be able to response again

## What coordination and planning practices will you follow?
- Our team will have a in person meeting every Tuesday after class:
    - We will discuss about what have to be finished in the week based on members' weekly schedule.
    - We will start doing the goal we set for the week in the meeting to see if there are some potential problems so we can try to fix/discuss it in person.
    - The meeting will be in between 30 min to 1 hour, after that we should all know what to do in that week 

- If there is something happen and someone can’t make to the meeting:
    - Have to inform team members three hours before meeting
    - Have to inform team members when is he/she can be able to response again
    - The rest of the member will still hold the meeting. Then the information/progress made at meeting will be updated on Facebook to the absence person.
    - The absence person need to response to show he/she read the update info.  

## Who will own each of the components in your architecture?
- Ali:
    - LoginHandler: Create login UI, has to talk with `DatabaseManager` to make sure data was sent to the database
    - InputHandler: Create the form, has to talk with `ScheduleGenerator` to make sure the type/format of user input is correct  
- Shakeel
    - ScheduleGenerator: Create the JSON object that will sent to `ScheduleToCalendar`. Need to make sure the object type is correct with the request of Google API
- Sandy
    - ScheduleGenerator: Create the JSON object that will sent to `ScheduleToCalendar`. Need to make sure the object type is correct with the request of Google API
- Vanely
    - ScheduleToCalendar: Update user's google calendar by taking the object from `ScheduleGenerator`. Also need to make sure it update the correct user account in `DatabaseManager`
    - DatabaseManager: Manage every user account. Need to talk with `LoginHandler` to make sure user create/get the correct account.
    Need to talk with `ScheduleToCalendar` to make sure the correct account is being updated.

## What practices will you use to know if you're making progress toward that release candidate?
- Weekly report on Facebook every Sunday (before 11:59 pm):
    - We will set the goal on Tuesday meeting, on Sunday, each member has to inform the team what has been done and hans't been done in that week.
- If one can't make the report on Sunday, he/she should report earlier or inform the team member what will be the time he/she report after Sunday

## What practices will you follow to improve your process if it's not working?
- If someone doesn't response/report without reason or inform team member in advance:
    - First time: Warning on Facebook group
    - Second time: Bring this up in Tuesday meeting, talk with that person.
    - Second time: If that person is absence during meeting and doesn't response in Facebook, we will @ him/her on Facebook and see if he/she gonna response in a day. If so, ask for reason, try to discuss that in group and following meeting. If not, report to Andy and ask what should we do (lol).  
