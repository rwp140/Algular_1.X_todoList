# Create a ToDo app in AngularJs 1.x.

## Stage 1:

### Functionalities

1. Use the latest in AngularJs 1.x =done=
2. Have an input field to input the todo item. (done)
3. Once (2) has been input, the todo item must be automatically be reflected on the view itself. (done)
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

##current tasks
###firebase itneractions
- integrate q promise and firebase thenable interactions into code (done)
  - sign in (done)
  - sign up (done)
  - sign out (done)
  - write data (done)
- get user information from firebase (done)
- update list data saving to attach user ID (done)
- migrate profile interactions to separate module (moved to directive and service instead...)
 - move html (done)
  - create directive (done)
  - create template (done)
  - move variables (done)
  - move functions?
- load [default] list (done)
- change manual save to auto save (done)
- auto log IN (done)
- add ability to log in and sign up by Facebook (disable normal log in for now)
- add list and profile persistence (sessions)

- add ability to log in and sign up by G+
- re enable email log in, add encryption

###beautification
- switch todo list to cover mode if no logged in
- add texture to cover and main content background

##additional Functionalities
- add buttons to raise or lower an item through the list
- add check box to each list item
- checking an item should add a strike through style
- (optional)hovering over a empty display item should reveal a input field

### multi list interactions
- add a series of tab items that the user can create
- clicking a tab should bring the user to the attached list
- each tab should have a tab name, colour, and list ID
- similarly save to save all lists, and all tabs
- pressing a + at the top of the tabs should prompt user to create a new tab
- ^ main content should change to create tab page ^
- tab creation page should prompt for: name, colour, tags
- left of the add tab button should be a search bar
- data entered in to the search bar should: reduce to tabs with partial matching name and tag values
- tabs should be to the left of the todo list page
- should be able to flip through pages for lists with more then [PageSize]

###beautify user log in
- A) change cover to also be a log in page
  B) clicking cover should bring to log in
- clicking create new user should open up to a user creation page
  - user creation should allow user to connect with facebook, G+ or use an email or password
- move profile into a controller
