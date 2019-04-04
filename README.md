
# Map Diary 

## Overview


Diaries are old school. Pencil and paper with chronologically sorted events have little interest to our over stimulated 21st century brains. And what if you want to jump to a specific memory? I'm not sure about you but my diary doesn't have a table of contents...

A solution to our problem lies in reinventing the diary from the ground up with: __Map Diary__.
The map diary provides an easy way for users to organize their wonderful diary exerpts by locations on a map. When wanting to look back at a single moment all one has to do is remember where it took place and sort through the memories they have recorded at those coordinates. 


## Data Model

We will be keeping track of users, coordinates, and memories. 

Users will have a list (by reference) of coordinates they have visited.
Coordinates will have a list (by refercence) of memories recoreded there. Because multiple users can record memories at the same location, the memory objects will need to include the unique identifier attributed to the user that created the memory. 


An Example User:

```javascript
{
  username: "shannonshopper",
  hash: // a password hash,
  coords: // an array of references to Coordinate documents
}
```
An Example Coordinate:

```javascript
{
  lat: -10.04,
  long: 43.13,
  memories: // an array of references to Memory documents
}
```
An Example Memory:

```javascript
{
  text: "i love this place",
  date: //time memory is created,
  createdBy: // unique username of the creator of the memory
}
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)
