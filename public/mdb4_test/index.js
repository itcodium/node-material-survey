 
import _ from 'lodash';
import Print from './print';
import { cube } from './math.js';
import './styles.css';


if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }else{
   console.log('Looks like we are in PRODUCTION mode!');
 }
/*
coment
*/

/*
function test(){}

 function component() {
    var element = document.createElement('div');
    var elementPre = document.createElement('pre');
   var button = document.createElement('button');
   var br = document.createElement('br');

   button.innerHTML = 'Click me and look at the console!';
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.onclick = Print.bind(null, 'Hello webpack!');
   
    elementPre.innerHTML = [
         'Hello webpack!',
         '5 cubed is equal to ' + cube(5)
       ].join('\n\n');

    element.appendChild(br);
    element.appendChild(button);
    element.appendChild(elementPre);

    button.onclick = e => import('./print').then(module => {
      var print = module.default;
      print();
    });

    return element;
  }


  document.body.appendChild(component())


 if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     document.body.removeChild(element);
     element = component(); // Re-render the "component" to update the click handler
     document.body.appendChild(element);

   })
 }

*/




 