---
image: ./images/willarrive.jpg
tags: UXD, DEV
headline: willarrive.in
summary: How many clicks do you need to get to the arrival time of your train? This project tries to reduce the number of decisions to make when the next train is expected to arrive near a user's location. Think it's easy to find the time? You might be surprised.
year: 2020
---
Sometimes people get paralyzed by choice. This is common in navigational patterns with many options that a user can choose from. If we instead consider removing some choices from the main navigation, users may direct themselves toward their goal faster, thereby creating a better experience. This project is an exploration on how much navigation can be removed to get to a very specific user need.

> As a person getting ready to commute in New York City, I want to know when the next train is arriving for **the line I take most frequently** at my location.

The problem has a few asks; the user wants:
- The time(s) of the next arriving train
- For a specific line
- At their current location

A common solution would be to provide an app that allows the user to choose the line from a menu, choose the station that is closest to them and find the next arrival time from the given schedule. Oh, and don't forget what direction they will travelling in, that's another choice the user needs to make. How can reduce the steps?

We certainly can take out a step with geopositioning; the app can determine the closest station but perhaps we remove another step. However, can we remove the selection menus entirely?

Almost! The solution is to provide a dynamic URL scheme; `https://SUBWAY_LINE.willarrive.in` that a user can favorite in their web browser where `SUBWAY_LINE` is the number or letter that represents the subway to which the user needs the schedule. Examples:

- [f.willarrive.in](https://f.willarrive.in) (for the F line)
- [6.willarrive.in](https://6.willarrive.in) (for the 6 line)
- [a.willarrive.in](https://a.willarrive.in) (for the A line)

The only selection the user needs to make is the direction they are traveling. Certainly, if the user is at a terminal, we can simply provide the only direction we expect them to travel in. For stations located in the middle of the line, even the most accurate positioning will be confused within a subway station with some direction from the user. This ask has very little congitive load, since the choice is presented as either this way or that way (eg: uptown or downtown, Manhattan-bound or Brooklyn-bound).

Removing choices for the user can mean the difference between getting to an appointment on time or seeing the doors close from a missed opportunity.