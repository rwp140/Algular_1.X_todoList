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
## personal tasks and features (bonus)

### multi list interactions
#### features [note colour not implemented yet for technical/asset reasons]
- data entered in to the search bar should: reduce to tabs with partial matching name and tag values
- should be able to flip through pages for lists with more then [PageSize]
#### tasks
- update filter [action]s to allow for partial matching values
- add "pages" functionality to lists (done)
- - add left and right chevrons "<",">" to bottom of list to change through pages
- - display items i - i+"24"[pageSize-1] where i is "pageIndex" of list passed to display list (done)
- - on click ">":pageIndex+1 (done)
- - on click "<":(pageIndex>0) pageIndex-1 (done)

### additional base Functionalities
- add buttons to raise or lower an item through the list
- or set up click and drag to order items around
- (optional)double clicking over a empty display item should reveal a input field

### beautify, and extend user log in
- change cover to also be a log in page
- clicking create new user should open up to a user creation page
  - user creation should allow user to connect with facebook, G+ or use an email or password
- (optional)move profile into a controller
- add ability to log in and sign up by Facebook (disable normal log in for now)
- add list and profile persistence (sessions) (done)
- add ability to log in and sign up by G+
- re enable email log in, add encryption [if missing]

### guide
-set up default list called guide, which acts an exemplar, created by default for new users

### FIX non detrimental bugs
-set up "on()" loading, for lists(issue - needs research, conflicts with current angular, works as is currently)(assume on hold indefinatly)
