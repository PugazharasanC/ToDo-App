# ToDo App

A simple ToDo application created as a demo for the FSD55WD Tamil batch. This application allows you to manage your tasks, add new ones, and mark them as completed. It uses a mock API for task data storage.

## Features

- Add new tasks with details and deadlines.
- Mark tasks as "On Progress," "Completed," or toggle back to "Pending."
- View and manage both pending and completed tasks.

## Technologies Used

- HTML
- CSS (Bootstrap)
- JavaScript

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/PugazharasanC/ToDo-App
   ```

2. Open the project folder:

   ```bash
   cd ToDo-App
   ```

3. Open the `index.html` file in your preferred web browser.

4. Update the API URL:
   - Open the `script.js` file in a text editor.
   - Locate the `const API_URL` declaration.
   - Update the URL to the new API endpoint:

     ```javascript
     const API_URL = "https://new-api-url.com/tasks";
     ```

   - Save the changes to the `script.js` file.

## Usage

1. Click on the "+ New" button to add a new task.
2. Fill in the task details and deadline, then click "Add."
3. View and manage tasks in the "Pending" and "Completed" sections.
4. Double click on a task to change its status.

<!-- ## Screenshots

Include screenshots or GIFs of your application in action. You can create a `screenshots` folder in your project and link to images here. -->

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request.

## Credits

- The ToDo App was created as a demo for the FSD55WD Tamil batch by Pugazharasan C.

## License

This project is not currently licensed.