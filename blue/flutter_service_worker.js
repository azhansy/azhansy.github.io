'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "cb23a708a6dee7172d07187750dd1124",
"index.html": "b683c8d7ab441f4e34b611688d80a755",
"/": "b683c8d7ab441f4e34b611688d80a755",
"main.dart.js": "37e342f7a0546c82d345ccd3a335989b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "3bbd48ec4837b5e4044029ca3ff36118",
"assets/AssetManifest.json": "4cbff47e2726e01775e3978d4ad0eb7e",
"assets/NOTICES": "60f137d2e196d5eddcd8424f8442b692",
"assets/FontManifest.json": "a276eb2f48269fe04104961268276d5f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "ffed6899ceb84c60a1efa51c809a57e4",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "eaed33dc9678381a55cb5c13edaf241d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "3241d1d9c15448a4da96df05f3292ffe",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/images/home/ic_more_default.svg": "81d63f8aa7c63be74fe36f87fdc23e3e",
"assets/assets/images/home/ic_home_default.svg": "44d03647c7f0de247f9a74596a37915b",
"assets/assets/images/home/ic_cars_default.svg": "2fa0fae693b7b308438ebaf6085dd3ae",
"assets/assets/images/core/ic_index_bar_bubble_white.png": "3a428b9603817acb16fc3abcfade936f",
"assets/assets/images/common/ic_default_avatar.png": "5e3a58dd6c650b374a4b475aa2f050d5",
"assets/assets/images/common/ic_close.svg": "bc856c6b1daf70b8681977652a64b4db",
"assets/assets/images/common/ic_photos.svg": "9c739112f5c0a3f37cb6013e5d55b7da",
"assets/assets/images/common/logo.png": "df1acba1fb703c067d20187d1034b922",
"assets/assets/images/common/ic_back.svg": "0b9afd0585c61f3aff1b9d2f316d9b7d",
"assets/assets/images/common/icon_empty.svg": "6050ecf74c08a3fc040c6830b358d738",
"assets/assets/images/common/ic_default_logo.svg": "6050ecf74c08a3fc040c6830b358d738",
"assets/assets/images/common/logo.svg": "38408c5912bd135341e35f15a95afd09",
"assets/assets/images/common/ic_back_shadow.png": "941e7bea6907eb2ad244a3292321ec5a",
"assets/assets/images/login/ic_splash_bg.png": "9b68674052584d507af6f7e73ceb1322",
"assets/assets/images/login/bg_city.png": "eb1070d994a3bcce0074ed72a65aa49a",
"assets/assets/json/sub_system.json": "5016f1d01a7c26c7df4ba7344cc2e7e4",
"assets/assets/json/dict.json": "0a81451d179aa61518ddc3213ac1a4d9",
"assets/assets/json/tab.json": "4578924c27fe96e35dbf011e995d5dba",
"assets/assets/json/user.json": "23c9414b1f5b0878ad966b0930721cb7",
"assets/assets/json/menu.json": "108f22bd0622e21583774e11bd502cdb",
"assets/assets/fonts/BowlbyOneSC-Regular.TTF": "481cce5e1106a7d559aa26a548475f2b",
"assets/assets/fonts/AGENCYR.TTF": "70777e6bd210190350f7c92395c1860f",
"assets/assets/fonts/RockSalt-Regular.ttf": "1af0b153d5633ca641badc9e7dfe8245",
"assets/assets/fonts/BRADHITC.TTF": "0252223e8c36008b595f5e379ad5e524",
"assets/assets/fonts/AnnieUseYourTelescope-Regular.TTF": "ce7cd207f6d1604a0ee0e9c7acedee99",
"assets/assets/fonts/Italianno-Regular.TTF": "0ed37d8f71fa4eb862394a191a263d28",
"assets/assets/fonts/Chango-Regular.TTF": "ec84d179becb3da836a33acecdbb37c7",
"assets/assets/fonts/OpenSansCondensed-LightItalic.TTF": "d828c28462d9842695ba992b521389c3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
