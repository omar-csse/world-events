$(document).ready(function () {
    $('#vmap').vectorMap({
        map: 'world_en',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        color: '#ffffff',
        colors: { asia: '#0000ff', },
        enableZoom: true,
        hoverColor: '#f49b42',
        hoverOpacity: null,
        normalizeFunction: 'polynomial',
        scaleColors: ['#C8EEFF', '#006491'],
        selectedColor: '#c9dfaf',
        selectedRegions: null,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial',
        onRegionClick: function (element, code, region) {
            sessionStorage.cityName = '';
            sessionStorage.cityLat = '';
            sessionStorage.cityLong = '';
            country('0',code.toUpperCase(),'0');
        }
    });
});
