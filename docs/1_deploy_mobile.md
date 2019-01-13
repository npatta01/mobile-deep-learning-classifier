# Part 2:  Deploying the Image Classifier on Mobile

### Assumptions
Part 2 here assumes that Part 1 is complete and that the heroku web app is running and the `final.pth` file is available.

These additional tools were used:
- Heroku
- Expo
- Xcode simulator (optional)

## Diagram


## Mobile Deployment 
## repo for iOS / Android App
https://github.com/npatta01/food-app

 
### Heroku App

- https://food-img-classifier.herokuapp.com
http://np-food-classifier.herokuapp.com



 


## repo for iOS / Android App
- Docs are stored in this repo:
- https://github.com/npatta01/food-app


This app lets you submit a photo of food and returns the predicted food category.  :pizza:

The model was developed using the food-101 dataset and the fastai deep learning library, which is built on PyTorch.

## Requirements for Running Mobile App

[Xcode](https://developer.apple.com/xcode/)  is an iOS simulator for Mac/iPhone users.  Xcode is a large file, at 10 GB.  [Android Studio](https://developer.android.com/studio/) is useful for Windows/Android users.  
Xcode is only available for Mac, but Androis Studio is available for Mac or Windows.  

These simulators are not required, though they are helpful in developing the app and provide a smoother development experience.  

|                                                       | iOS                       | Android                                    |
|-------------------------------------------------------|---------------------------|--------------------------------------------|
| Can be deployed locally on computer and mobile phone? | yes                       | yes                                        |
| Is [Expo](https://expo.io/) needed?                   | yes                       | yes                                        |
| Can app be run locally on mobile phone by developer?  | yes, on iPhone            | yes, on Android                            |
| Can the developer share unpublished app with others?  | no                        | yes, other users require Expo to be installed and using Android phone |
| What is the cost of publishing to the store for public access? [a]| $100 per year | $30 one-time fee                           |
| Does official store publishing require: screenshots, privacy policy and contact info?  | yes                       | yes       |
| For official store publishing, is a review required?  | Apple will do peer review | no additional review required              |
[a] Cost indicated are in US dollars.


## Once mobile app is running
TO_DO:  take short video, upload to YouTube, embed link in blog.



## References
- [Expo](https://expo.io/): is a free and open source toolchain built around React Native to help you build native iOS and Android projects using JavaScript and React.
-[GitHub Help: Distributing Large Binaries] (https://help.github.com/articles/about-releases/) Some projects require distributing large files, such as binaries or installers, in addition to distributing source code.

If you need to distribute large files within your repository, we recommend that you create releases for your projects on GitHub. Releases allow you to include binary files, such as compiled programs. For more information, visit "Creating releases."

[Food-101–mining discriminative components with random forests](https://link.springer.com/chapter/10.1007%2F978-3-319-10599-4_29)
L Bossard, M Guillaumin, L Van Gool
European Conference on Computer Vision, 446-461



