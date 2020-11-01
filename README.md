#skipli-coding-challenge-react-client
- Implement the front-end of the server-api (https://github.com/nguyen-vo/skipli-coding-challenge-server) that have a form in which users can provide phone number to get access code and validate the code through post requests
- The form has two fields phoneNumber field and accessCode field.
    - Initially, the accessCode field is hidden from the user. As soon as the user provides a valid phone number, the accessCode field is visible for the user to validate the access code.
    - The user can only validate his access code when the server successfully generates the code an send it to him through sms. Otherwise, he would not be prompted to validate his code.
    - Message from server will be displayed as a helper text to indicate error or success
    - Users can get new code after successfully validating the provided access code
- Implementation include 
    - Using Hooks in React to control the state.
    - TextField from Material-UI this helps to display clear error message with less styling