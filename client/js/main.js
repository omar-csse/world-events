/*
    use the AJAX call to get the countries data from the
    router. Save the needed data in the sessionStorage.
    After that, show the country names as a source for
    the autocomplete ui.
*/

function getData() {
    fetch('/api/countries')
        .then (resp => resp.json())
        .then((data) => {
            let countryName = [];
            let countryAlpha2Code = [];
            let countryAlpha3Code = [];
            for (let i = 0; i < data.length; i++) {
                countryName.push(data[i].name);
                countryAlpha2Code.push(data[i].alpha2Code);
                countryAlpha3Code.push(data[i].alpha3Code);
            }
            sessionStorage.setItem('countryName', JSON.stringify(countryName));
            sessionStorage.setItem('countryAlpha2Code', JSON.stringify(countryAlpha2Code));
            sessionStorage.setItem('countryAlpha3Code', JSON.stringify(countryAlpha3Code));
        })
        .finally(() => {
            let countryName = JSON.parse(sessionStorage.getItem('countryName'));
            $('#search-box').autocomplete({
                source: countryName,
                minLength: 1,
            });
        })
        .catch(err => console.log(err))
}

getData();

const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

$(document).ready(() => {
    countryOption();
});

/*
    link the enter button on keyboard to the search button.
*/

$(document).keypress((e) => {
    if (e.which == 13) {
        $('#search-btn').click();
    }
});

/*
    user input validation function.
*/

function searchBtnClicked() {
    let selectedOption = $('#select-menu').val();
    let query = $('#search-box').val();
    try {
        if (!query) {
            throw new Error('Please fill the field');
        } else {
            if (selectedOption == '1') {
                let capitalalphaCode = query.toUpperCase();
                let capitalizeCountry = toTitleCase(query);
                country(query, capitalalphaCode, capitalizeCountry);

            } else if (selectedOption == '2') {
                window.location.assign(`/events?query=${query}`);
            }
        }
    } catch (e) {
        alert(e.message);
    }
    event.preventDefault();
}

/*
    Turn the autocomplete off when the query option
    is selected, and vice versa.
*/

function getSelectedOption(selectedOption) {
    if (selectedOption.value == '1') {
        countryOption();
        $('#search-box').autocomplete("enable");
    } else {
        $('#search-box').autocomplete("disable");
        $('#search-box').val('');
        $('#search-box').attr('placeholder', 'Search for events');
    }
};

function countryOption() {
    let countryName = JSON.parse(sessionStorage.getItem('countryName'));
    $('#select-menu').val('1').prop('selected', true);
    $('#search-box').val('');
    $('#search-box').attr('placeholder', 'Type the full name of country or the or the country code (##)');
    $('#search-box').autocomplete({
        source: countryName,
        minLength: 1,
    });
}

/*
    Validate the country chosen before loading the events page. If
    the country is not found, errors will be catched and an alert 
    message will appear.
*/

function country(countrySearchedFor, capitalalphaCode, capitalizeCountry) {
    try {
        let countryName = JSON.parse(sessionStorage.getItem('countryName'));
        let countryAlpha2Code = JSON.parse(sessionStorage.getItem('countryAlpha2Code'));
        let countryAlpha3Code = JSON.parse(sessionStorage.getItem('countryAlpha3Code'));
        if ($.inArray(countrySearchedFor, countryName) > -1 || $.inArray(capitalizeCountry, countryName) > -1) {
            sessionStorage.indexOfCountrySearchedFor = countryName.indexOf(countrySearchedFor);
            countryPage();
        } else if ($.inArray(capitalalphaCode, countryAlpha2Code) > -1) {
            sessionStorage.indexOfCountrySearchedFor = countryAlpha2Code.indexOf(capitalalphaCode);
            countryPage();
        } else if ($.inArray(capitalalphaCode, countryAlpha3Code) > -1) {
            sessionStorage.indexOfCountrySearchedFor = countryAlpha3Code.indexOf(capitalalphaCode);
            countryPage();
        } else {
            throw new Error('Input is not valid, choose from the shown options when typing');
        }
    } catch (e) {
        alert(e.message);
    }
}

function countryPage() {
    window.location.assign(`/country?index=${sessionStorage.indexOfCountrySearchedFor}`);
}