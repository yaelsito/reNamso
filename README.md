
# reNamso v2.0 (October 2024)

### Features

- **Removed Jquery Dependency**
- **Clean and rewritten Javascript code:** I modernized the code from almost 500 lines of the original Namso to only 170; using the most modern Javascript features.
- **Renamed Javascript variables:** Now the variables in the main code are no longer “k” “m” etc, each one has the name of what it does.
- **Dark Mode and Light Mode:** Now the generator has a button to switch to light mode, by default it has dark mode.
- **Now the CCGEN use CSS variables** to edit the appearance of the generator. You can simply edit the variables and change the colors of both light and dark mode.
- **Clean HTML code:** The HTML was cleaned up, formatted and I removed unused lines.
- **Accepts VISA, MASTERCARD, JBC, DISCOVER and DINERS CLUB cards;** I updated the generator so that it actually generates and gives the correct format depending on the type of BIN entered.
- **Multi-lang** The new CCGEN is available in English and Spanish. (Spanish on es.html)

# Screenshots:
### Dark Mode
![Dark Mode](https://i.ibb.co/64ZSJxj/dm-rn.png)
### Light Mode
![Light Mode](https://i.ibb.co/7vjqXV1/lm-rn.png)

## Changelog
### Version 2.0 Update (09-OCT-2024):

 - Fixed the bug that all generated cards ended in 0.
 - Added dark mode by adding variables in `body.light-mode` to change the appearance of the generator.
 - Added the `theme.js` file, whose function is to change the icon depending on the mode in which the generator is and saving the user's preference in LocalStorage.
 - The main javascript code `gen.js` was updated and modernized, adding arrow functions and renaming variables and functions according to what they do, to make the code more readable and easy to understand for other developers.

### Frequently Asked Questions
**Can I use your generator, rename it and put links to my networks?**
Of course you can. The generator is open source and anyone can use it, however you must leave credits to my Github repository or my social networks.

**Can the code be optimized?**
Yes, in CSS you can set global variables and just declare inside the clear mode the colors of that mode. In Javascript you could use only one of the 2 methods of validation of the cards.

**Do you plan to keep updating the repository?**
I think this version (2.0) already has all the necessary to be a functional generator, I think it already has all the bases so that it can be modified and improved according to the vision of each developer. I don't discard in the future maybe to make small improvements, like a change of languages by means of a button or something like that.

## Thank You
I never expected so much support and acceptance for this repository, I do it with the sole purpose of spreading knowledge and love for programming.

If you use my code, please put the credits and don't forget that it will always be free.

**-Yael.**
