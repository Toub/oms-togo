(function () {

    'use strict';

    var mapService = window.mapService;

    var map = mapService.create('map');

    var mode = 'quartiers';

    function showQuartiers() {
        $.getJSON("./assets/data/Togo_lome_quartiers_wgs84.geojson", function (json) {
            var data = json;
            var geojson = mapService.createGeojson(data, {
                updateTooltip: function (props) {
                    this._div.innerHTML = '<h4>Quartiers de Lomé</h4>' + (props ?
                        '<b>' + props.name + '</b>' :
                        'Survoler un quartier');
                },
                fillColor: function (d) {
                    return d > 3500000 ? '#800026' :
                        d > 3000000 ? '#BD0026' :
                        d > 2500000 ? '#E31A1C' :
                        d > 2000000 ? '#FC4E2A' :
                        d > 1500000 ? '#FD8D3C' :
                        d > 1000000 ? '#FEB24C' :
                        d > 500000 ? '#FED976' :
                        '#FFEDA0';
                }
            });
        });
    }


    function showArrondissements() {

        $.getJSON("./assets/data/Togo_lome_arrondissements_wgs84.geojson", function (json) {
            var data = json;

            var geojson = mapService.createGeojson(data, {
                updateTooltip: function (props) {
                    this._div.innerHTML = '<h4>Arrondissements de Lomé</h4>' + (props ?
                        '<b>' + props.NOM + '</b>' :
                        'Survoler un arrondissement');
                },
                fillColor: function (d) {
                    return d > 3500000 ? '#800026' :
                        d > 3000000 ? '#BD0026' :
                        d > 2500000 ? '#E31A1C' :
                        d > 2000000 ? '#FC4E2A' :
                        d > 1500000 ? '#FD8D3C' :
                        d > 1000000 ? '#FEB24C' :
                        d > 500000 ? '#FED976' :
                        '#FFEDA0';
                }
            });
        });
    }

    showQuartiers();

    window.switchMap = function () {
        if (mode === 'quartiers') {
            showArrondissements();
            mode = 'arrondissements'
        } else {
            showQuartiers();
            mode = 'quartiers'
        }

    }

})();
