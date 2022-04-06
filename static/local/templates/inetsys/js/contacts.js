
$(document).ready(function () {

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map25', {
                center: [55.861037, 37.484032], // Москва
                zoom: 17
            }, {
                searchControlProvider: 'yandex#search'
            }),

            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Интернет-системы',
                balloonContent: 'Интернет-системы'
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/inetsys/img/map_icon.png',
                iconImageSize: [52, 61],
                iconImageOffset: [-26, -61]
            });
        myMap.panes.get('ground').getElement().style.filter = 'sepia(80%) saturate(550%) hue-rotate(180deg)';
        myMap.geoObjects
            .add(myPlacemark);

        var myMap2 = new ymaps.Map('map26', {
                center: [56.848453, 35.907503], // Тверь
                zoom: 17
            }, {
                searchControlProvider: 'yandex#search'
            }),

            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap2.getCenter(), {
                hintContent: 'Интернет-системы',
                balloonContent: 'Интернет-системы'
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/inetsys/img/map_icon.png',
                iconImageSize: [52, 61],
                iconImageOffset: [-26, -61]
            });
        myMap2.panes.get('ground').getElement().style.filter = 'sepia(80%) saturate(550%) hue-rotate(180deg)';
        myMap2.geoObjects
            .add(myPlacemark)
    });
    /*
    function initialize() {

        // Create an array of styles.
        var styles = [{
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "transit.line",
                "stylers": [{
                "saturation": 100
            }, {
                "color": "#ff3183"
            }]
        }];
    
        // Create a new StyledMapType object, passing it the array of styles, as well as the name to be displayed on the map type control.
        var styledMap = new google.maps.StyledMapType(styles, {
            name: "Styled Map"
        });
    
        // Create a map object, and include the MapTypeId to add to the map type control.
        var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(40.7288, -74.1509),
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style']
            }
        };
    
        var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    
        // Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
    }
    
    initialize();*/
});