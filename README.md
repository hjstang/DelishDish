# DelishDish
Delish Dish is a digital extension of a cookbook. It is a mobile application that lets you save recipes, search in your own library of recipes and browse other recipes (retrieved from an external API) to find inspiration.

[![logo](https://i.postimg.cc/90ZXFVM7/Skjermbilde-2020-08-05-kl-15-17-35.png)](https://postimg.cc/8fkgt2Lp)

## Getting Started

### Clone
Clone this repo to your local machine using 
```
git clone https://github.com/hjstang/DelishDish.git
```
or using SSH key
```
git clone git@github.com:hjstang/DelishDish.git
```

### Setup
Install npm
```
$ npm install 
```

Install expo command line tool
```
$ npm install expo-cli --global
```

### Configure Recipe API
1. Sign up for 'Recipe Search API' on Edamam website: https://developer.edamam.com/edamam-recipe-api
2. Go to the file `apiConfig_sample.js` in the config folder. Replace `YOUR_APP_ID` and `YOUR_APP_KEY` in this file with your credentials
3. Rename the file to `apiConfig.js`

```
const config = {
    appId: 'YOUR_APP_ID',
    appKey: 'YOUR_APP_KEY'
};

export default config;
```

### Run Application
Now you are ready to run the application. This is done by running
```
$ expo start
```
You should download the `Expo` app on your phone. You can view the running application either by scanning the QR-code or by logging in to your expo-account in the expo command line.

## Features
### Explore New Recipes
The “Explore”-screen is the screen that is shown when the app is launched. Here the user can find inspirational recipes from the Edamam API. The user can browse recipes from predefined categories like salad, chicken, soup etc., or search for specific recipes in the search field. If the user clicks on a recipe, the full recipe will be shown with its ingredient list, description and tags. It is not necessary to be logged in to use the functionality on the “Explore”-page.

[![explore](https://i.postimg.cc/vHTy4q92/Skjermbilde-2020-08-05-kl-14-43-59.png)](https://postimg.cc/grCQ5Kg3)

### Search In Your Own Library Of Recipes
On the “Search”-screen, the user is able to browse own recipes by predefined meal types like breakfast, lunch, dinner etc. The user can also use the search field to search for own recipes, and it is possible to search for recipe name or content. 

[![search](https://i.postimg.cc/y8Cp2KcZ/Skjermbilde-2020-08-05-kl-15-05-39.png)](https://postimg.cc/KRQ5gd9G)
[![recipe](https://i.postimg.cc/NGrWnpSZ/Skjermbilde-2020-08-05-kl-15-06-26.png)](https://postimg.cc/YjMnGfpx)

### Add New Recipes
The “Add Recipe”-screen is where the user can create own recipes, by defining title, ingredients, descriptions etc.. The user can add an image either from the camera roll on the phone or take a photo. There are also different predefined tags that the user can add to the recipe.

[![add recipe](https://i.postimg.cc/W1Jjwsjq/Skjermbilde-2020-08-05-kl-15-04-06.png)](https://postimg.cc/75Dpx85q)

### Favorite Recipes
The “Favorites”-screen shows the list of all the recipes favorited by the user. It is possible to click on each recipe to see the full details of that specific recipe.

[![favorites](https://i.postimg.cc/W1Jjwsjq/Skjermbilde-2020-08-05-kl-15-04-06.png)](https://postimg.cc/75Dpx85q)

### View All Recipes
On the “Profile”-screen the user can view its profile information, in addition to all the recipes saved by the user. When clicking on a recipe, the user is sent to the details page for that recipe. On the “Profile”-screen it is also possible to log out.

[![profile](https://i.postimg.cc/Hsz71479/Skjermbilde-2020-08-05-kl-15-03-05.png)](https://postimg.cc/w7tBhN21)

## Built With
- **React Native with Expo**
- **Redux**
- **Firebase**
  - **Firebase Authentication:** for authenticating the users and make it possible to use Google as login-provider
  - **Firebase Cloud Firestore:** for storing the users and recipes
  - **Firebase Cloud Storage:** for storing the images of the dishes
  
 ### Edamam Recipe Search API
 <a href="https://developer.edamam.com/edamam-recipe-api" target="_blank">Edamam Recipe Search API</a> is used to retrieve recipes that can be used as inspiration for the user. The API is accessed by sending HTTPS requests on specific URLs. On success, the API returns HTTP code 200 OK and the body contains the results of the query in JSON format.

[![system overview](https://i.postimg.cc/zfVdgf14/Skjermbilde-2020-08-05-kl-15-07-50.png)](https://postimg.cc/f3Qj4Dyv)

## Created By
Created by Helene Janine Stang <a href="https://github.com/hjstang" target="_blank">`(@hjstang)`</a> and Ida Merete Enholm <a href="https://github.com/idaame" target="_blank">`(@idaame)`</a>.

DelishDish was developed in the course `Design and Implementation of Mobile Applications` at Politecnico di Milano (Autumn Semester 2019).
