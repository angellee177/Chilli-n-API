# Chilli'n API
this is a simple API that build using Node.js, and Express.JS to consume External API.
For this project i use [flickr](https://www.flickr.com/services/api/) and retrieving the data fro Flickr API.


## Prequisites

``` node v10.20.1 ``` ```npm 6.14.5 ```

## Installation

Use the package manager [npm](https://docs.npmjs.com/) to install rocketchat-assessment.


```
npm install # run NPM install to install all depedencies that needed after cloning this repositories
npm run dev # to running this API locally
npm run test # to running the unit test, it will show the coverages of unit test.
```


## Route List

* Method GET    ```/api/v1/feed/list```       to get all images feed list.
* Method GET    ```/api/v1/feed/search/{tags}```  to get images based on images tags.

## Documentation

For documentations, you can visit

[Chilli'n_API_Documentation](https://chillin-api.herokuapp.com/docs/)


## License
[MIT](https://choosealicense.com/licenses/mit/)