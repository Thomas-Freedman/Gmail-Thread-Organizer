class Message {
  // Constructor
  constructor() {
    this.subject = '';
    this.date = '';
    this.body = '';
    this.sender = '';
  }

  // Method to set sender
  setSender(text) {
    this.sender = text;
  }

  // Method to set subject
  setSubject(text) {
    this.subject = text;
  }

  // Method to set date
  setDate(text) {
    this.date = text;
  }

  //This function is designed to remove reply chains from the body of emails when body is added to a Message object
  setBody(text) {
    let output = '';
    const dateStrings = ['On Mon', 'On Tue', 'On Wed', 'On Thu', 'On Fri', 'On Sat', 'On Sun', 'On Jan', 'On Feb', 'On Mar', 
    'On Apr', 'On May', 'On Jun', 'On Jul', 'On Aug', 'On Sep', 'On Oct', 'On Nov', 'On Dec'];
    let targetIndex = -1;

    // Find the earliest occurrence of any target date string
    for (let i = 0; i < dateStrings.length; i++) {
        let index = text.indexOf(dateStrings[i]);
        if (index !== -1 && (targetIndex === -1 || index < targetIndex)) {
            targetIndex = index;
        }
    }

    // If a target string is found in the input string, including everything prior 
    if (targetIndex !== -1) {
        output = text.substring(0, targetIndex);
    } else {
        output = text; // If a target string is not found, copy the entire input string
    }

    this.body = output + '______________________________________________________________________________';
  }
}
