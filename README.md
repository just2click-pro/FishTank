# FishTank

Netcraft Fish Tank web-page **Home Work** Project for NetCraft's Academy Front End Course

## Context

* Build a fish tank like "game"
* User may add **Fish** to the fish tank
* Fish swim from side to side, once the reach the bounds of the tank they turn around
* Fish poop and make the fist tank water dirty
* User may add **Cleaner** to the fish tank
* With time the water changes colors, when more dirty they get darker, when cleaner they get light
* Cleaners always stays at the bottom of the tank and they clean the water
* User may give **Food** to fish, when the fish get food they will live longer
* Cleaners and Fish would eventually run out or Energy/Food and die (thus, will be deleted from the screen)

* Fish, Tank and Cleaner are all constructor type functions (classes),
  each holds it's specific properties (position, amount of food) and methods (eat, clean and poop)
* The Tank "listens" to clean and poop events and will clean or dirty the water as the level
  of dirt changes
* The tank also "listens" to deaf-fish event and will remove the dead fish from it's memory

* Rendered images were taken from the web and were altered (mostly color changes and transparency)

### Project Page

[fishtank](https://just2netcraft.github.io/fishtank/)
