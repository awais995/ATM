#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize the initial balance and PIN code for the account
let balance = 50000;
const PIN = 1234;

// Main function to start the ATM application
async function main () {
    let userpin = await inquirer.prompt(
        [
            {
                name: "pin",
                type: "password", // Using password type to hide input
                mask: "*",
                message: "Enter your 4 digit PIN code."
            }
        ]
    ); 
    // convert the user input pin into a number
    const enterPin = parseInt(userpin.pin);

    // Check the user pin is matches the 4 digit pin code
    if (enterPin === PIN){
        console.log(chalk.yellow("Welcome to ATM"));
    
    // Prompt the user to select a transaction method
    const account = await inquirer.prompt(
        [
            {
                name: "operation",
                type: "list",
                message: "please select your transaction method.",
                choices: ["withdrawl", "Balance Inquiry", "Instant Cash"]
            },
          
        ]
    );
    // Perform different actions based on the selected operation    
    if (account.operation === "Instant Cash"){
        const cash = await inquirer.prompt(
                [
                    {
                        name: "instant_Cash",
                        type: "list",
                        message: "please select your amount you want to withdraw.",
                         choices: [1000, 5000, 10000, 20000, 25000 ]
                    }
                ]
            );
          
            console.log(chalk.red(`Remaining Balance is ${balance -= cash.instant_Cash}`));
    
        } else if (account.operation === "withdrawl"){
        const amount_Withdrawl = await inquirer.prompt(
                [
                    {
                         name: "amount",
                        type: "number",
                        message: "Amount Withdrawl"
                    }
                ]
            );
        if (amount_Withdrawl.amount > balance){
            console.log(chalk.red("Insuficient Balance"));
        } else {
                balance -= amount_Withdrawl.amount;
                console.log(chalk.green(`Your remaining balance is: ${balance}`));
        }
                    
        } else if (account.operation === "Balance Inquiry"){
                console.log (chalk.blueBright(`Your balance is ${balance}`));
    
        } 
        
        } else { console.log(chalk.red("Invalid Pin Code"));
    }
}

main();