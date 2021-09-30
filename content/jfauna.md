---
image: ./images/jfauna.jpg
tags: 
  - DEV
headline: jFauna
summary: Databases are hard to use. They are able to manipulate data in really performant ways but at the cost of deeply knowing the often confusing syntax. This project was a journey into creating a more accessible framework for accessing a commonly used database solution while learning about a new language in the process.
year: 2021
month: 7
---
I really loved the idea of FaunaDB, easy database of JSON blobs that you could query in static site hosting platforms. It's conceptually good for small projects where you need to store data but the language of constructing queries is super ugly.

So, I dove into the language and began trying to make an abstraction layer for the language that helps do common operations without the need to know what's happening under-the-hood.

> As a user looking to store and retrieve data, I'd like to query in an **obvious language**.

I also made this to have chainable methods that look alot like jQuery or testing assertion libraries. This gets the composition looking closer to the description of the request in easily readable terms. I've also begun to build this with jQuery's no-failure principle. The application shouldn't stop because you've made a mistake, but we should still log if something goes wrong.