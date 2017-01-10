(function () {

    'use strict';

    window.mapService = {

        map: null,
        infoArea: null,
        legend: null,

        create: function (domId) {
            this.map = L.map(domId).setView([6.1662, 1.2360], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                id: 'mapbox.light'
            }).addTo(this.map);

            // control that shows state info on hover
            this.createInfoArea();

            return this.map;
        },
        createInfoArea: function (options) {
            // control that shows state info on hover
            this.infoArea = L.control();

            this.infoArea.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                return this._div;
            };

            this.infoArea.addTo(this.map);

            return this.infoArea;

        },
        createLegend: function () {

            this.legend = L.control({
                position: 'bottomright'
            });

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                    labels = [],
                    from, to;

                for (var i = 0; i < grades.length; i++) {
                    from = grades[i];
                    to = grades[i + 1];

                    labels.push(
                        '<i style="background:' + getColor(from + 1) + '"></i> ' +
                        from + (to ? '&ndash;' + to : '+'));
                }

                div.innerHTML = labels.join('<br>');
                return div;
            };

            legend.addTo(this.map);
        },

        createGeojson: function (data, options) {

            this.infoArea.update = options.updateTooltip;

            var infoArea = this.infoArea;

            var geojson = L.geoJson(data, {
                style: function (feature) {
                    return {
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        fillColor: options.fillColor(feature.properties.Shape_Area)
                    };
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        mouseover: function highlightFeature(e) {
                            var layer = e.target;

                            layer.setStyle({
                                weight: 5,
                                color: '#666',
                                dashArray: '',
                                fillOpacity: 0.7
                            });

                            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                                layer.bringToFront();
                            }

                            infoArea.update(layer.feature.properties);
                        },
                        mouseout: function resetHighlight(e) {
                            geojson.resetStyle(e.target);
                            infoArea.update();
                        },
                        click: function zoomToFeature(e) {
                            this.map.fitBounds(e.target.getBounds());
                        }
                    });
                }
            }).addTo(this.map);
            this.geojson = geojson;
            return this.geojson;
        }

    };

})();
