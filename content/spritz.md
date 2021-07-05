---
image: ./images/spritz.jpg
tags: DEV
headline: Spritz-UI
summary: Reading fast isn't just for fun, some people need to read quickly to focus. However, this often requires practice which fundamentally requires more focus. This web component reimagines the "redicle" originally developed by Spritz Inc. and provides a handy resource to help reading comprehension.
year: 2021
month: 5
---
I was introduced to the Spritz redicle a few years ago and thought it would be a fun project to replicate as I honed my JavaScript skills. This project was a refactor of that original project I completed several years ago as a reusable Web Component. My version provides a few features that the Spritz offering does not, as far as I know.

- Wraps quotes and brackets using the redicle.
- Identifies words that do not need a pause due to punctuation.
- Provides ability to move forward and back sentences, along with words.
- Provides the approximate reading time based on the number of words and WPM.

This project wasn't an attempt as solving a problem as much as it was an exercise in skill. The most difficult part of the project was splitting the content into works. While this sounds like a simple task, ensuring that each word would fit in the redicle meant that longer words would need to be split further using a hyphen. Then reengineering the algorithm to determine the "optimal recognition point" (ORP) for each word. Parsing when to show wrapping characters in the redicle was also tricky.

I've always believed that you learn better when the result is something you are passionate about. This was a great learning experience to keep my expertise sharp with my eyes wide open.