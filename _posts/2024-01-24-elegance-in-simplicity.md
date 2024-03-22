---
layout: post
title: Elegance in Simplicity
permalink: /posts/elegance-in-simplicity
---

Simplicity is often underrated in software.

This is a story about my journey through learning frontend development and how stripping back complexity can reveal the true beauty of a system.

Being a DevOps engineer in the past life most of my development revolved around writing shell scripts or backend services in Rails. Now with Shovel, we need to create a bunch of MVPs and PoCs. Being in the Lofi and decentralised space, most of the code needs to run on the client side and hence requires JavaScript.

Early last year, I started learning JavaScript development. I subscribe to the **start and then learn** philosophy.
Whenever I looked for a place to start learning JS, React just popped out of nowhere. It felt like React was synonymous with front-end development. Everyone wants you just to use `create-react-app` and start making changes to the file.

Don’t get me wrong, I love how easy it was to get started. But I also feelt a level of opaqueness around what was happening inside the guts of the machine. I found yourself learning the quirks of the framework rather than building an understanding from first principles.

So, I chose to strip the stack back to plain javascript and HTML, for creating our apps & Express to run the webserver.

This helped me understand the background and the design choices required to create web apps from scratch. How you can quickly wrangle something up with just one index.html and app.js, quick and dirty. Playing with low-level functions in HTML, like using form submissions for making API calls helped me understand how everything fits together. 

I feel that starting with the bare minimum helps you understand the true simplicity and beauty of the tech. Technologies sometimes become too burdened with all the abstractions that we as programmers love to create. But as a novice, those can become hindering blocks in gaining a true understanding of the systems we are running.

I am not saying that we don’t need frameworks like React, we will start using it pretty soon. But not until we truly feel the need for it. 

With every bit of complexity you start to introduce to the problem space, you organically start to lean towards the right abstraction.
Something we love to call `controlled evolution over grand design`