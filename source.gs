//Write the content to a text file in Google Drive
function writeToTxt(content) {
  var fileName = 'EmailResults_' + new Date().toISOString() + '.txt';
  var file = DriveApp.createFile(fileName, content);
  Logger.log('File created: ' + file.getUrl());
}

//Automating adding message objects to the content array
function createMessageArray(numMessages) {
  let content = [];
  for (let i = 0; i < numMessages; i++) {
    content.push(new Message());
  }
  return content;
}

function myFunction() {
  const targetSubjects = ['Subject 1', 'Subject 2']; //CHANGE THIS TO SELECT DESIRED THREADS BY SUBJECT
  const query = targetSubjects.map(subject => `subject:"${subject}"`).join(' OR ');
  const threadArr = GmailApp.search(query, 0, 10);


  //Define total number of messages in all threads combined
  let numMessages = 0;
  for (let element of threadArr) {
    numMessages += element.getMessageCount();
  }
  const content = createMessageArray(numMessages); //Destination for all messages for sorting

  //console.log('Number of messages:', numMessages); // Check if numMessages is a valid number
  //console.log('Content array:', content); // Check the content array after it's created
  
  //Add all message data to the messages array 
  i = 0;
  for(let thread of threadArr) {
    for (let message of thread.getMessages()) {
      content[i].setSender('From: ' + message.getFrom());
      content[i].setSubject('Subject: ' + message.getSubject());
      content[i].setDate('Date: ' + message.getDate());
      content[i].setBody('Body: ' + '\n\n' + message.getPlainBody());
      i++;
    }
  }

  //Sort message array by date, delete any duplicates
  content.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  //Remove any duplicate emails (would remove erroniously if two emails happened 
  //to be sent at the exact same second, but how often could that  happen lmao)
  for (let i = 0; i < content.length; i++) {
    for (let j = i + 1; j < content.length; j++) {
        if (new Date(content[i].date).getTime() === new Date(content[j].date).getTime()) {
            content.splice(j, 1);
            j--; // Decrement j to account for the removed element
        }
    }
  }

  //Add all messages to a final content string
  let FullContents = '';
  for(let element of content) {
    FullContents += element.sender + '\n' + element.date + '\n' + element.subject + '\n' + element.body + '\n\n';
  }

  //Write final content to a text file
  writeToTxt(FullContents);
}
