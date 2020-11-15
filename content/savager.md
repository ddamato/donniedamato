---
image: ./images/savager.jpg
tags: DEV
headline: Savager
summary: Just about every website uses icons to help convey information and wayfinding. Some of the smallest components of a page are also the most difficult to manage in a simple and performant way. This project provides options for developers to maintain these assets easily.
year: 2020
month: 5
---
While building the [DAMATO Design](#damato) project, I found a challenge in managing icons that I once tackled before within my time at [Compass](#compass). There's a lot of ways to render icons within a webpage or across a website. I wanted to create something that could be used in many ways depending on the architecture of the website.

> As a engineer, I want **a reliable way to manage icons** on a page and style them using CSS.

There are several ways of providing an SVG icon (or really any SVG) on a page to allow for CSS to modify it later:
- Inline SVG markup exactly where the icon is expected.
- Using a reference sheet that exists on the same page and reference where the icon will be rendered.
- Referencing an external stylesheet with the icon within the same domain as the page and reference where the icon will be rendered.

There's some problems that can occur with the second and third approach above which happen when using Shadow DOM or trying to access SVGs across domains. I wanted this project to have solutions for these problems as well. The result handles normal use-cases along with other edge-case usage and is successful in applying SVG icons on a page in multiple ways easily. This was also my first contribution to the open-source NPM eocsystem so I also ensured to add several connected services to highlight build quality and test coverage.