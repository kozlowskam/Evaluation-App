# Evaluation-App

Evaluation Tool for Teachers - Final Assignment of Codaisseur Academy

This repo contains a frontend and backend for a Students' Evaluation App. It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API.
The app runs with yarn start on client side and nodemon dev on the server side. 

User Stories
1. As a Teacher I can log in.
2. As a Teacher, after I log in, I see a list of current classes, identifiable by their Batch number (e.g. Batch #1), start date, and end date.
3. As a Teacher, I can create a new class by giving it a Batch number, start date, and end date.
4. As a Teacher I can add, edit, remove students in a class. To add a student I need to provide: 1) their full name, 2) (a link to) their profile picture.
5. As a Teacher, I can click on a class, after which I see a grid of all the students by their name and photo, and the last colour code given to them. Above the students grid, I see a bar with 1-3 segments, showing me the percentage (%) of students evaluated GREEN, YELLOW, and RED. As a Teacher, when I click on a photo or name, I can click on GREEN, YELLOW, or RED, fill in the date (defaults to today), and a remark. When I click “Save” it saves my evaluation, and takes me back to the student overview. I can edit my own evaluations. 
6. ALGORITHM PART - As a Teacher, from the class view I can click a button “ASK A QUESTION”. It shows me the name and picture of a random student to ask a question. Not entirely random though: RED students get ~45% of the questions YELLOW students ~35%, and GREEN students ~20%. 
