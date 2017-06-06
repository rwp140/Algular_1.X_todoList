# Create a ToDo app in AngularJs 1.x.

## Stage 1:

### Functionalities

1. Use the latest in AngularJs 1.x =done=
2. Have an input field to input the todo item. (done)
3. Once (2) has been input, the todo item must bed automatically be reflected on the view itself. (done)
4. On refresh of the page, the todo items that was input previously MUST still be present. (done)
5. a) Able to remove a todo item (done)
   b) as per (4), once a page refresh is done, the item must also be removed (done)
6. a) Able to edit a todo item (done)
   b) as per (4), once a page refresh is done, the item must also be edited (done)
7. (see 4) list must save to Firebase (done)
8. Have a login view with a login function with Firebase (done)
9. Have a signup view with a signup function with Firebase (done)
10. Each saved list must be tied to a matching user ID (done)
11. Have a README in markdown format to detail the step by step of getting started with your app. (done)
12. Upload all your code to github. =done=

*Take note of the commits that you do. It is here that I will see whether you commit often & how you decide to commit your codes*
## personal additional tasks and features (bonus)
### spacing and beauty
- fix tab spacing
- add selected tab indicator
- add unselected tab indicator
- add edit tab actions

### additional base Functionalities (med priority)
- add buttons or set up click and drag to; raise or lower an item through the list and order items around  (blocker)
- (optional)double clicking over a empty display item should reveal a input field
- add edit button

### guide (low priority, blocker)
-set up default list called guide, which acts an exemplar, created by default for new users

### FIX non detrimental bugs (low priority/non-blocker)
-set up "on()" loading, for lists(issue - needs research, conflicts with current angular, works as is currently)(assume on hold indefinatly)

###convert to different skeleton model and rebuild(med priority, blockers required)
- copy and past / save relative code to back up
- branch build
- set up and establish using "angularjs_starting_template" (https://github.com/tlkiong/angularjs_starting_template/) by T.L. kiong
- rebuild, update, and set up old code and convert old as needed to new template
- functionalize code into services and controllers where available and possible as needed

### beautify, and extend user log in (low priority)
- change cover to also be a log in page
- clicking create new user should open up to a user creation page
  - user creation should allow user to connect with facebook, G+ or use an email or password
- (optional)move profile into a controller
- add ability to log in and sign up by Facebook (disable normal log in for now)
- add list and profile persistence (sessions) (done)
- add ability to log in and sign up by G+
- re enable email log in, add encryption [if missing]
