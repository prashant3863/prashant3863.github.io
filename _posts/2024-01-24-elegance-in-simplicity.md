---
layout: post
title: Elegance in Simplicity
permalink: /posts/elegance-in-simplicity
---

Simplicity is often under-rated in software.

This is a story about my journey through learning frontend development and how stripping back complexity can reveal the true beauty of a system.

Being a devops engineer in the past life most of my development revolved around writing shell script or backend services in Rails. Now with Shovel we need to create a bunch of MVPs and PoCs. Being in the Lofi and decentralised space, most of the code needs to run on client side and hence require JavaScript.

Early last year, I started learning javascript development. I personally subscribe to the "start and then learn" philosophy
Whenever I looked for a place to start learning js, React just pops out of nowhere. It felt like React is synonymous to frontend development.
Everyone want you to just use 'create-react-app' and start making changes to the file.

Don't get me wrong, I love how easy it was to get started. But I also feelt a level of opaqueness around what was happening inside the guts of the machine. I found yourself learning the quirks of the framework rather than building an understanding from first principles.

So, I chose to strip the stack all the way back to plain javascript and HTML, for creating our apps. Along with Express to run the webservers.

This helped me understand the background and the design choices required to create webapps from scratch. 
How can you quickly wrangle something up with just one index.html and app.js, quick and dirty. 
Playing with low level functions in HTML like using form submissions for making API calls helped me understand how everything fits together. 

I feel that starting with the bare-minimum helps you understand the true simplicity and beauty of the tech. Technolofies sometimes becomes too burdened with all the abstractions that we as programmers love to create. But as a novice those can become hindering block in gaining the true understanding of the systems we are running.

I am not saying that we don't need frameworks like react, we ourselves will start using it pretty soon. But not untill we truly feel the need for it. With every bit of complexity you start to introduce to the problem space you organically start to lean towards the right abstraction. Something we love to call "controlled evolution, rather than grand design"