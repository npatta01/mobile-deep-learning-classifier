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




## Training the Model
https://github.com/npatta01/food-classifier

## Heroku App
- https://food-img-classifier.herokuapp.com



## repo for iOS / Android App
https://github.com/npatta01/food-app




