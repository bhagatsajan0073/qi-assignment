Please follow the instruction to get started

a) Database Task
    1. Start mongodb and create a database "dummy" in it.
    2. run this command to import qi data from "qi\db\qi.json" to collection "qi" in "dummy" table

       mongoimport --db dummy --collection qi --file ~\db\qi.json

    3. now you have data in your qi collection of dummy table with your server running on 27017 port.


b) Node js task

    requirement npm/node installed on system

    1. Open Console
    2. Go to Project folder containing Server.js
    3. execute the command "node server.js"
    4. Open the browser and go to this url  "localhost:8080"
    5. A live demo is running on the ec2 server "http://52.33.208.216/"


####################################### how it works #################################################

1. Page list you all the products with their name and quantity status.
2. buy / sell product
   a) if you buy a specific product with quantity(1000) it reduces the quantity status by 1000 units.
   b) if you sell a specific product with quantity(2000) it increase the quantity status of that specific product by
       2000 units.



#############################################################################
#############################################################################
#############                                                 ###############
#############       Author : Sajan Kumar                      ###############
#############       Dated  : 30 september 2016                ###############
#############       Email  : bhagat.sajan0073@gmail.com       ###############
#############                                                 ###############
#############################################################################
#############################################################################