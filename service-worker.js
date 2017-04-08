// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'rehanuddin-v1';
var cacheName = 'rehanuddin-final-1';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/assets/css/styles.css',
  '/assets/images/github-chart.png',
  '/assets/images/logo.jpg',
  '/assets/images/profile.png',
  '/assets/images/projects/project-1.png',
  '/assets/images/projects/project-2.jpg',
  '/assets/images/projects/project-2.png',
  '/assets/images/projects/project-3.png',
  '/assets/images/projects/project-4.png',
  '/assets/images/projects/project-5.png',
  '/assets/images/projects/project-featured.png',
  '/assets/js/main.js',
  '/assets/less/base.less',
  '/assets/less/mixins.less',
  '/assets/less/responsive.less',
  '/assets/less/styles.less',
  '/assets/less/theme-default.less',
  '/assets/plugins/jquery-1.11.2.min.js',
  '/assets/plugins/jquery-migrate-1.2.1.min.js',
  '/assets/plugins/bootstrap/css/bootstrap.css',
  '/assets/plugins/bootstrap/css/bootstrap.css.map',
  '/assets/plugins/bootstrap/css/bootstrap.min.css',
  '/assets/plugins/bootstrap/css/bootstrap-theme.css',
  '/assets/plugins/bootstrap/css/bootstrap-theme.css.map',
  '/assets/plugins/bootstrap/css/bootstrap-theme.min.css',
  '/assets/plugins/bootstrap/fonts/glyphicons-halflings-regular.eot',
  '/assets/plugins/bootstrap/fonts/glyphicons-halflings-regular.svg',
  '/assets/plugins/bootstrap/fonts/glyphicons-halflings-regular.ttf',
  '/assets/plugins/bootstrap/fonts/glyphicons-halflings-regular.woff',
  '/assets/plugins/bootstrap/fonts/glyphicons-halflings-regular.woff2',
  '/assets/plugins/bootstrap/js/bootstrap.js',
  '/assets/plugins/bootstrap/js/bootstrap.min.js',
  '/assets/plugins/bootstrap/js/npm.js',
  '/assets/plugins/font-awesome/css/font-awesome.css',
  '/assets/plugins/font-awesome/css/font-awesome.min.css',
  '/assets/plugins/font-awesome/fonts/FontAwesome.otf',
  '/assets/plugins/font-awesome/fonts/fontawesome-webfont.eot',
  '/assets/plugins/font-awesome/fonts/fontawesome-webfont.svg',
  '/assets/plugins/font-awesome/fonts/fontawesome-webfont.ttf',
  '/assets/plugins/font-awesome/fonts/fontawesome-webfont.woff',
  '/assets/plugins/font-awesome/fonts/fontawesome-webfont.woff2',
  '/assets/plugins/font-awesome/less/animated.less',
  '/assets/plugins/font-awesome/less/bordered-pulled.less',
  '/assets/plugins/font-awesome/less/core.less',
  '/assets/plugins/font-awesome/less/fixed-width.less',
  '/assets/plugins/font-awesome/less/font-awesome.less',
  '/assets/plugins/font-awesome/less/icons.less',
  '/assets/plugins/font-awesome/less/larger.less',
  '/assets/plugins/font-awesome/less/list.less',
  '/assets/plugins/font-awesome/less/mixins.less',
  '/assets/plugins/font-awesome/less/path.less',
  '/assets/plugins/font-awesome/less/rotated-flipped.less',
  '/assets/plugins/font-awesome/less/stacked.less',
  '/assets/plugins/font-awesome/less/variables.less',
  '/assets/plugins/font-awesome/scss/_animated.scss',
  '/assets/plugins/font-awesome/scss/_bordered-pulled.scss',
  '/assets/plugins/font-awesome/scss/_core.scss',
  '/assets/plugins/font-awesome/scss/_fixed-width.scss',
  '/assets/plugins/font-awesome/scss/_icons.scss',
  '/assets/plugins/font-awesome/scss/_larger.scss',
  '/assets/plugins/font-awesome/scss/_list.scss',
  '/assets/plugins/font-awesome/scss/_mixins.scss',
  '/assets/plugins/font-awesome/scss/_path.scss',
  '/assets/plugins/font-awesome/scss/_rotated-flipped.scss',
  '/assets/plugins/font-awesome/scss/_stacked.scss',
  '/assets/plugins/font-awesome/scss/_variables.scss',
  '/assets/plugins/font-awesome/scss/font-awesome.scss',
  '/assets/plugins/github-activity/dist/mustache/mustache.min.js',
  '/assets/plugins/github-activity/dist/octicons/octicons.eot',
  '/assets/plugins/github-activity/dist/octicons/octicons.min.css',
  '/assets/plugins/github-activity/dist/octicons/octicons.svg',
  '/assets/plugins/github-activity/dist/octicons/octicons.ttf',
  '/assets/plugins/github-activity/dist/octicons/octicons.woff',
  '/assets/plugins/github-activity/dist/github-activity-0.1.0.min.css',
  '/assets/plugins/github-activity/dist/github-activity-0.1.0.min.js',
  '/assets/plugins/github-activity/dist/github-activity-0.1.1.min.css',
  '/assets/plugins/github-activity/dist/github-activity-0.1.1.min.js',
  '/assets/plugins/github-activity/src/github-activity.css',
  '/assets/plugins/github-activity/src/github-activity.js',
  '/assets/plugins/jquery-rss/dist/jquery.rss.min.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  //var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  var dataUrl = 'https://rehanuddin.me';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
