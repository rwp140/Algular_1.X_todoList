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
##personal tasks and features

##additional base Functionalities
- add check box to each list item [asap]
- checking an item should add a strike through style
- add buttons to raise or lower an item through the list
- (optional)hovering over a empty display item should reveal a input field

### multi list interactions
####features
- add a series of tab items that the user can create
- make sure clicking a tab brings the user to the attached list
- set up each tab so it will have a tab name, colour, and list ID
- pressing a + at the top of the tabs should prompt user to create a new tab
- ^ main content should change to create tab page (on click)^
- tab creation page should prompt for: name, colour, tags
- left of the add tab button should be a search bar
- data entered in to the search bar should: reduce to tabs with partial matching name and tag values
- tabs should be to the left of the todo list page
- should be able to flip through pages for lists with more then [PageSize]
####tasks
- tabs [tabs should lead to a connected list]
- - add ribbon textures (done)
- - create tab template (done)
- - - [name], (done)
- - - onclick go to list(listID),
- - - css: background colour = colour property, colour: black
- - - use ribbon texture (done)
- - create tab directive (done)
- - create tab object  (done)
- - - properties: colour, name/listID, tags[]  (done)
- add add new tab function to controller
- add "add tab" button to html
- add search bar to todo List tempalte
- add search function to "to do" controller
- - add search action function
- - add filter by name function
- - add filter by tag function
add "pages" functionality to lists


###beautify, and extend user log in
- A) change cover to also be a log in page
  B) clicking cover should bring to log in
- clicking create new user should open up to a user creation page
  - user creation should allow user to connect with facebook, G+ or use an email or password
- move profile into a controller
- add ability to log in and sign up by Facebook (disable normal log in for now)
- add list and profile persistence (sessions)
- add ability to log in and sign up by G+
- re enable email log in, add encryption
