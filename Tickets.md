# Example Tickets

## Phase 1
Create App Using Dummy Data

### Add ability to login
- a user should be able to enter any string for name and email and be logged into the site
- once logged in a user should be routed to the dashboard

### Add ability to Search for dogs
- When on dashboard user should see default list of dogs
- When dashboard loads it should fetch breeds and provide a way to select breeds
- Add input that allows users to enter zip code and add that to search
- Add ability to sort results

### Add ability to mark dog as a favorite
- Each dog result should have a way to mark the dog as a favorite
- Favorited Dogs should appear on Favorites page

### Add ability to find match
- when a user has no favorites the page should link to the dashboard and let users know they need to favorite at least one dog to be matched
- when a user has favorites the page shows a message to allow the user to get matched
- Once a match ifs found result should be displayed on the page with contact info

### Add Ability to Logout
- clicking button should route back to '/'

## Phase 2
Use Endpoints to power site

- Update login functionality to use `/auth/login`
- Update logout  functionality to use `/auth/logout`
- Update search to fetch breeds using `/dogs/breeds`
- Update match functionality to use `/dogs/match`
- Update `DogGallery` to use pagination

## Phase 3
Things I would improve with more time
- Middleware set up properly
- Search by location
- Dark Mode
- cache favorites
- UNIT TESTING

