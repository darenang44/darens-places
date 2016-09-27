var app = angular.module('app', ['ngSanitize']);

app.service('mapLoadApi', function mapLoadApi($window, $document, $q) {
  var deferred = $q.defer();
  $window.initMap = deferred.resolve;
  $document.ready(function loadScript() {
    var s = document.createElement('script');
    s.src = [
      'https://maps.googleapis.com/maps/api/js',
      '?key=AIzaSyDM4_JtK30KJjs8dOH_a2np-e0zmbWFxcQ',
      '&libraries=places',
      '&callback=initMap',
    ].join('');
    document.body.appendChild(s);
  });
  return deferred.promise;
});

app.controller('MapController', function ($scope, mapLoadApi) {
  var placesService;
  var infoWindow;
  var map;
  markers = [];

  mapLoadApi.then(function init() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(37.7854368, -122.397595),
      zoom: 15
    });

    new google.maps.places.Autocomplete(document.getElementById('query-input'));
    placesService = new google.maps.places.PlacesService(map);
    infoWindow = new google.maps.InfoWindow();
  });

  $scope.search = function () {
    var currentCenter = map.getCenter();
    var query = {
      location: new google.maps.LatLng(currentCenter.lat(), currentCenter.lng()),
      radius: 1500,
      query: $scope.searchQuery
    };

    clearMarkers();
    placesService.textSearch(query, manageResults);
    $scope.selectedPlace = null;
  };

  $scope.showDetails = function (id) {
    $scope.selectedPlace = id;
  };

  function manageResults(results, status) {
    $scope.searchResult = results;
    $scope.$apply();
    map.setCenter(results[0].geometry.location);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(function(result) {
        createMarker(result);
      });
    }
  }

  function createMarker(place) {
    marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
      $scope.$evalAsync(function() {
        $scope.showDetails(place.id);
      })
    });
    markers.push(marker);
  }

  function clearMarkers() {
    markers.forEach(function(marker){
      marker.setMap(null);
    });

    markers = [];
  }
});
