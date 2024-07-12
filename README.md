# Fake Gold Bar Finder

This project provides a TypeScript script to find the fake gold bar using a simulated balance scale on a website. The script automates the process of weighing the bars to identify the fake one, which is lighter than the others.

## Prerequisites

1. **Node.js and npm:**
   - Download and install Node.js and npm from the [Node.js official website](https://nodejs.org/).
   - Verify the installation by running the following commands in your terminal:
     ```sh
     node -v
     npm -v
     ```
   - You should see version numbers if the installation was successful.

2. **TypeScript and ts-node:**
   - Install TypeScript and ts-node globally by running the following command:
     ```sh
     npm install -g typescript ts-node
     ```

## Project Setup

1. **Clone the Repository:**
   - Open a terminal and run the following command to clone the GitHub repository:
     ```sh
     git clone <repository_url>
     ```
   - Replace `<repository_url>` with the URL of the GitHub repository.

2. **Navigate to the Project Directory:**
   - Change to the project directory where `find_fake_bar.ts` is located:
     ```sh
     cd <project_directory>
     ```
   - Replace `<project_directory>` with the name of the directory created by cloning the repository.

3. **Install Dependencies:**
   - Run the following command to install the necessary dependencies:
     ```sh
     npm install
     ```

## Running the Script

1. **Execute the Script:**
   - In the terminal, run the following command to execute the script:
     ```sh
     npx ts-node find_fake_bar.ts
     ```

## Project Structure

fake-gold-bar-finder/
│
├── find_fake_bar.ts
├── package.json
├── tsconfig.json
└── README.md


## Explanation

- The script uses a divide-and-conquer strategy to identify the fake gold bar in at most 3 weighings.
- It automates interactions with the website using Puppeteer, including filling the scales, performing weighings, and checking results.
- The script outputs the fake bar number, the result message from the website, and a list of weighings made.

### Example Output

Fake bar: 7
Result: Yay! You found it!
Weighings:
[0, 1, 2] vs [3, 4, 5] -> Same
[6, 7, 8] vs [0, 1, 2] -> Left
[6] vs [7] -> Right