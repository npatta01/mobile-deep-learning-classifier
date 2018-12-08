# Training the Food Classifier

This project was completed jointly by [Nidhin Pattaniyil](https://www.linkedin.com/in/nidhinpattaniyil/) and [Reshama Shaikh](https://reshamas.github.io).

## Food-101 Dataset
The [Food-101](https://www.vision.ee.ethz.ch/datasets_extra/food-101/) data was used which included 101 food categories with a total of 101K images.  Thus, each class had 1000 images, of which 250 are manually reviewed test images and 750 are training images:    
>On purpose, the training images were not cleaned, and thus still contain some amount of noise. This comes mostly in the form of intense colors and sometimes wrong labels. All images were rescaled to have a maximum side length of 512 pixels.

The dataset size is 5GB and can be retrieved using:  
```bash
wget http://data.vision.ee.ethz.ch/cvl/food-101.tar.gz
```

The `tar.gz` file can be opened using:  
```bash
tar xvzf file.tar.gz
```
#### Data Citation
@inproceedings{bossard14,
  title = {Food-101 -- Mining Discriminative Components with Random Forests},
  author = {Bossard, Lukas and Guillaumin, Matthieu and Van Gool, Luc},
  booktitle = {European Conference on Computer Vision},
  year = {2014}
}

## Model Analysis on Google Cloud Platform (GCP)
The data was retrieved and analyzed on GCP.  Any cloud platform (such as Paperspace or AWS) is usable, as long as a GPU is available.  Instructions for setting up a GPU working environment will be available from fastai.  The MOOC will be officially released to the public in early 2019.

## Training Time
The model took about an hour to run on GCP.  The GPU type used was Nvidia Tesla P100 with 100 GB of storage.  

## Training the Model
The code used for training the data is available in the repository [food-classifier](https://github.com/npatta01/food-classifier).  

The [fastai](https://github.com/fastai) deep learning library, which runs on top of PyTorch, was utilized.  The output was a model file with weights.  Other libraries, such as Keras or TensorFlow can be used to run your model.  
Note to RS:  add snippets of code to share.

The output of the code is a `model.pth` file which is stored under "releases" area because of its size:  https://github.com/npatta01/food-classifier/releases

This output file, `model.pth` will be the input to the heroku app.  

Reshama's food repo:  
https://github.com/reshamas/food


## Training the Model
https://github.com/npatta01/food-classifier

## repo for iOS / Android App
https://github.com/npatta01/food-app




##  Deployment Options for Web App
There are two options discussed here for deploying an app on the web:  
- [Heroku](https://www.heroku.com/)
- [Zeit](https://zeit.co/now)

(https://course-v3.fast.ai/deployment_zeit.html)

## Python Web Frameworks

There are two options for a Python web framework:  
- [Starlette](https://www.starlette.io/): Starlette is a lightweight ASGI framework/toolkit, which is ideal for building high performance asyncio services.  Python 3.6+ is required.  It is [ASGI](https://asgi.readthedocs.io/en/latest/)
- [Flask](http://flask.pocoo.org/) is a [WSGI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface).  Flask based on Python 2 did not support asynchronous, but Flask in Python 3 does support it.  

It is best to use a framework which is **asynchronous** because it can handle **multiple requests** at a time.

We provide instructions on both Flask and Starlette here.  
### Our Flask Web Application
https://food-img-classifier.herokuapp.com

Note:  we used flask, but we will change it to Starlette. 


### Heroku App
- https://food-img-classifier.herokuapp.com



 


## repo for iOS / Android App
- Docs are stored in this repo:
- https://github.com/npatta01/food-app


This app lets you submit a photo of food and returns the predicted food category.  :pizza:

The model was developed using the food-101 dataset and the fastai deep learning library, which is built on PyTorch.

## Requirements for Running Mobile App

[Xcode](https://developer.apple.com/xcode/)  is an iOS simulator for Mac/iPhone users.  Xcode is a large file, at 10 GB.  [Android Studio](https://developer.android.com/studio/) is useful for Windows/Android users.  
Xcode is only available for Mac, but Androis Studio is available for Mac or Windows.  

These simulators are not required, though they are helpful in developing the app and provide a smoother development experience.  


|                                                                                        | iOS                       | Android                                                               |
|----------------------------------------------------------------------------------------|---------------------------|-----------------------------------------------------------------------|
| Can be deployed locally on computer and mobile phone?                                  | yes                       | yes                                                                   |
| Is [Expo](https://expo.io/) needed?                                                    | yes                       | yes                                                                   |
| Can app be run locally on mobile phone by developer?                                   | yes, on iPhone            | yes, on Android                                                       |
| Can the developer share unpublished app with others?                                   | no                        | yes, other users require Expo to be installed and using Android phone |
| What is the cost of publishing to the store for public access? [a]                         | $100 per year             | $30 one-time fee                                                      |
| Does official store publishing require: screenshots, privacy policy and contact info?  | yes                       | yes                                                                   |
| For official store publishing, is a review required?                                   | Apple will do peer review | no additional review required                                         |

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
