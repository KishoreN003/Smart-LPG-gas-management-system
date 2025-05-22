This system is designed to monitor LPG gas usage and send timely alerts to users through 

the Twilio SMS platform. It helps the users to track how much gas is used in each day and 

shows how many days left for usage of gas. The system has a login page to ensure only 

registered users can access the features. After logging in, users can choose from a list of fixed 

meals, each with a set gas usage per person. Users select meals and enter the number of 

people avail it. The system calculates how much gas is needed for those meals. Users can 

also add extra meals by entering the meal name, gas required, and number of people. These 

meals are also counted in the gas usage for the day. The total gas used is then calculated, and 

the remaining gas in the cylinder is updated. Based on the total cylinder capacity and average 

daily use, the system estimates how many days the gas will last. The backend is built using 

Node.js and Express, with Twilio API used for sending SMS.
