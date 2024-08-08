# Gmail Thread Organizer

## Motivation

The motivation behind this project was that an employer of mine had an email thread with a higher up that, over the course of almost a year, had grown to hundreds of messages. For various reasons, the thread had become split into several different subthreads, and any attempt to save the thread(s) as a PDF would result in an unreadable mess of reply lines. My employer wanted all of the messages saved chronologically to a text file for easy readability, and so that it could be processed by a LLM to return a summary of the vast amount of feedback throughout the chain.

## Usage

The code provided was implemented in Google Apps Script. Running the script with myFunction as the target and enumerating a list of desired email threads by subject in the first line of myFunction defined in source.gs -- const targetSubjects = ['Subject 1', 'Subject 2']; -- will produce a downloadable text file containing every email from a thread matching any of the listed subjects in chronological order, in plain text, including sender, date, subject, and body. Note that this is a plain text file and won't contain any attachments. 
