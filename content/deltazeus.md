---
image: ./images/deltazeus.jpg
tags: UXD, DEV
headline: deltazeus
summary: You might think that checking the weather is a solved problem several times over. However, nearly all weather apps do the same thing; they provide absolute numbers. This solution aims to provide weather data relative to the user so they can make more personalized decisions on how to prepare for the new day.
year: 2020
month: 3
---
If you ask this to many people, a common answer is to prepare for the day. If it's going to rain, we might need an umbrella. If it's going to be warm, I might not need a jacket. We check the weather on any of the current weather apps today and it tells us there's precipitation, or a number of degress that the high temperature will be.

If it's 60 degrees today, what does that mean? Is it hotter than it was yesterday? How can you tell? Most often, without looking up historical data, your weather app doesn't tell you. You have to remember how 60 degrees feels and if you need a jacket or not.

> As a person getting ready to go out of my home, I want the weather to tell me **how much** it has changed.

The solution is very simple. We save the forecast data from yesterday and compare to today. If there's a signifigant change, we notify the user with the qualities that have changed and by how much. They can make the determination on what to do with that information (bring an umbrella, wear a jacket).

The interaction is a simple button that asks for permission to lookup the user's location (or optional postal code input), and the result is a link to their area's weather feed. A user subscribes to a notification feed for weather in their area and they'll begin getting notified of signifigant changes.

Sometimes a single button can prepare you to tackle the coming days better than you did before.