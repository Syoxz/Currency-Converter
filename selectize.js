$(document).ready(function () {
   $('#startCurrency').selectize({
        searchField: 'text',
        sortField: 'text',
        placeholder: "Start Currency"
    });

});

$(document).ready(function () {
    $('#targetCurrency').selectize({
         searchField: 'text',
         sortField: 'text',
         placeholder: "Target Currency"
     });
 
 });