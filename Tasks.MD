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
##personal tasks and features (bonus)

##additional base Functionalities
- add check box to each list item (done)
- checking an item should add a strike through style (done)
- add buttons to raise or lower an item through the list
- or set up click and drag to order items around
- (optional)double clicking over a empty display item should reveal a input field

### multi list interactions
####features [note colour not implemented yet for technical/asset reasons]
- add a series of tab items that the user can create  (done)
- make sure clicking a tab brings the user to the attached list  (done)
- set up each tab so it will have a tab name, colour, and tags  (done)
- pressing a + at the top of the tabs should prompt user to create a new tab  (done)
- ^ main content should change to create tab page (on click)^  (done)
- tab creation page should prompt for: name, colour, tags  (done)
- left of the add tab button should be a search bar (done)
- data entered in to the search bar should: reduce to tabs with partial matching name and tag values
- tabs should be to the left of the todo list page
- should be able to flip through pages for lists with more then [PageSize]
####tasks
- add tab sort function which by default should sort by name alphabetically (done)
- add search bar to todo List template  (done)
- add relative functions to "to do" controller  (done)
- - add search action function (trigger on key down)  (done)
- - - [action] disable all tabs in template, that do not match search value (done)
- - - [action] get filtered list of matching and partially matching values
- - - [action] mark all items not in list as invisible  (done)
- - - [action] mark all items in filtered to be visible  (done)
- - - [action] if search value is empty or " " remove mark value from list items  (done)
- - add filter by name function (done)
- - add filter by tag function (done)
- add "pages" functionality to lists
- - add left and right chevrons "<",">" to bottom of list to change through pages
- - display items i - i+"24"[pageSize-1] where i is "pageIndex" of list passed to display list
- - on click ">":pageIndex+1
- - on click "<":(pageIndex>0) pageIndex-1

###beautify, and extend user log in
- change cover to also be a log in page
- clicking create new user should open up to a user creation page
  - user creation should allow user to connect with facebook, G+ or use an email or password
- (optional)move profile into a controller
- add ability to log in and sign up by Facebook (disable normal log in for now)
- add list and profile persistence (sessions) (done)
- add ability to log in and sign up by G+
- re enable email log in, add encryption [if missing]


###FIX non detrimental bugs
-set up "on()" loading, and re set up loading to only use one load call per loadable item (tabs(done), lists(issue - needs research, works as is currently))

###guide
-set up default list called guide, which acts an exemplar, for new users
