
import './assets/css/style.css';
 


window.initDatePicker  =function (id){
 
}


import {app} from './app/app.init';

import {appController}            from './app/app';
import {controllerHoteles}        from './app/hoteles/controller.hoteles';
import {controllerSurveys}        from './app/surveys/controller.surveys';
import {controllerSurveyDetail}   from './app/surveys/controller.detail';



import {hotelItemCtrl}       from './app/hoteles/controllers/hotelItem';
import {ratingCtrl}          from './app/hoteles/controllers/hotelRating';
import {hotelFilterCtrl}     from './app/hoteles/controllers/hotelFilter';
import {hotelSearchStarCtrl} from './app/hoteles/controllers/searchStars';
import {hotelSearchNameCtrl} from './app/hoteles/controllers/searchName';

require ('./app/directives')(app);
require ('./app/components')(app);



 
// Uncomment one of the following lines to see error handling
// require('unknown-module')
// } syntax-error

// Uncomment this next line to trigger a warning
// require('Assert')

 

 if (module.hot) {
  module.hot.accept('./app/hoteles/controller.hoteles', function() {
    location.reload();  
  })
  module.hot.accept('./app/surveys/controller.surveys', function() {
    location.reload();  
  })
  module.hot.accept('./app/surveys/controller.detail', function() {
    location.reload();  
  })
  module.hot.accept('./app/directives/index', function() {
    location.reload();  
  })
  
  module.hot.accept('./app/components/index', function() {
    location.reload();  
  })
  
  module.hot.accept();
  module.hot.dispose(function() {});
}

