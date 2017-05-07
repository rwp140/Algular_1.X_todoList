# Create a ToDo app in AngularJs 1.x.

## Stage 1:

### Functionalities

1. Use the latest in AngularJs 1.x =done=
2. Have an input field to input the todo item. (done)
3. Once (2) has been input, the todo item must be automatically be reflected on the view itself. (done)
4. On refresh of the page, the todo items that was input previously MUST still be present.
5. a) Able to remove a todo item (done)
   b) as per (4), once a page refresh is done, the item must also be removed
6. a) Able to edit a todo item (done)
   b) as per (4), once a page refresh is done, the item must also be edited
7. (see 4) list must save to Firebase
8. Have a login view with a login function with Firebase (done)
9. Have a signup view with a signup function with Firebase (done)
10. Each saved list must be tied to a matching user ID
11. Have a README in markdown format to detail the step by step of getting started with your app.
12. Upload all your code to github. =done=

*Take note of the commits that you do. It is here that I will see whether you commit often & how you decide to commit your codes*

##current tasks
###firebase itneractions
- integrate q promise and firebase thenable interactions into code
- get user information from firebase
- update list data saving to attach user ID
- migrate profile interactions to separate module
- add ability to log in and sign up by Facebook (disable normal log in for now)
- add list and profile persistence

- add ability to log in and sign up by G+
- re enable email log in, add encryption

###beautification
- switch todo list to cover mode if no logged in
- add texture to cover and main content background

###additional Functionalities
- add buttons to raise or lower an item through the list
- add check box to each list item
- checking an item should add a strike through style
- (optional)hovering over a empty display item should reveal a input field
