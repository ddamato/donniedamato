---
image: ./images/damato.jpg
tags: UXD, DEV
headline: DAMATO Design
summary: What if a design system was truly focused on user needs; both for those using the product and the ones building it. What responsiblities would it have? What should it contain and how would it be made to help people achieve their goals? In this project, I explored how engineering tools and architecture can help support anticipated design needs.
year: 2020
month: 4
---
I've been creating and working with design systems for a few years now and I've gained a great deal of knowledge and experience in that time. It seemed important to document all of the concepts that I found useful or interesting and share them with others. Often my peers and I are unable to do exactly what we want to do because of the organizations we work with so this was meant as a guide to my beliefs in design system architecture.

> As a design systems architect, I want to describe my thoughts in design and engineering as a documentation site **without business influence**.

One of the biggest mindset shifts in this project is the idea of "intents". These are variables that describe the intent of the designer to describe a part of the UI. Instead of assigning the background color red directly to a button with a dangerous action, a variable (ie. an intent) called "action critical background-color" is used instead. What makes these variables special is the naming framework designed to be scalable for future UI components. The framework aims to describe general design concepts that can span across multiple components.

Several tools were also built to help inform the design process. A color contrast system was made to decide on the correct colors to use for light/dark mode. Additional functional components were made to help identify other accessibility concerns like Irlen Syndrome. Many of these can be interacted with using controls found around the site to experience how certain values would affect the UI. The site is also a Progressive Web App (PWA) with offline capabilities.