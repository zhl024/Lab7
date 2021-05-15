// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;


// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let entryNum = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        entryNum++;
        newPost.id = entryNum;
        newPost.entry = entry;
        newPost.addEventListener('click', ()=>{
          setState({name:'entry', id:newPost.id}, false);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

setState({name:'main'}, false);
let settings = document.querySelector('header img');
settings.addEventListener('click', ()=>{
  setState({name:'settings'}, false);
});

let home = document.querySelector('h1');
home.addEventListener('click', ()=>{
  setState({name: 'main'}, false);
});

window.addEventListener('popstate', (event)=>{
  setState(event.state, true);
});

