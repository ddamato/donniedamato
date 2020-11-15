---
image: ./images/domtricks.jpg
tags: UXD, DEV
headline: DOM Tricks
summary: When engineers write documentation, they often write code twice. Once as inert documentation and again as executable code. This project aims to surface the real comments and code together as the final documentation. This is also a home for useful techniques I find in front-end development.
year: 2020
month: 2
---
One of the parts of the product development process that is often overlooked is quality documentation. So much time is spent curating the best experience or delivering performant code that many forget to provide resources into this task. Granted, it could be said that the best experiences do not require documentation but in the world of development, being verbose might mean more code.

To create documentation for engineers, it is often rewritten or curated as a translation from the source code. This takes time to edit and methods (eg: Markdown) have helped speed up the process but can we just use the code we've written as the documentation?

> As a person writing code, I want to provide documentation **without rewriting** what was written as documentation.

The solution was a proof-of-concept to document the code within the code using JSDocs (ie: comments that live with the code) and having a process that runs to combine the commented documentation with the code itself. Examples are written as testable code to provide quality code coverage.

Enhancing the developer experience is important to keep focus on when creating performant quality products. This allows teams to move fast without breaking things and instead providing clarity for future collaborators.