# FishTank

Netcraft Fish Tank web-page **Home Work** Project for NetCraft's Academy Front End Course

## Context

* Build a fish tank like "game"
* User may add **Fish** to the fish tank
* Fish swim from side to side, once the reach the bounds of the tank they turn around
* Fish poop and make the fish tank water dirty
* User may add **Cleaner** to the fish tank
* With time the water changes colors, when more dirty they get darker, when cleaner they get lighter
* Cleaners always stays at the bottom of the tank and they clean the water
* User may give **Food** to fish, when the fish get food they will live longer
* Cleaners and Fish would eventually run out or Energy/Food and die (thus, will be deleted from the screen)

* Fish, Tank and Cleaner are all constructor type functions (classes),
  each holds it's specific properties (position, amount of food) and methods (eat, clean and poop)
* The Tank "listens" to clean and poop events and will clean or dirty the water as the level
  of dirt changes
* The tank also "listens" to deaf-fish event and will remove the dead fish from it's memory

* Rendered images were taken from the web and were altered (mostly color changes and transparency)

* All the objects in this project are assigned using a single name-space variable ```aquaFun
* A messaging module have been added so the "game" may interact with the user
* Messages has a key:value system that enables the programmer to use simple codes for messaging
* When feeding the food a snow-flake like animation would appear (just to indicate that food has been served)
* Each fish has an energy bar indicator next to it allowing the user to see how hungry this fish is

### Project Page

[fishtank](https://just2netcraft.github.io/FishTank/)
