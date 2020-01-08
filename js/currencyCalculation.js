function moneyFormat(n) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
}

var CurrencyCalculator = new Vue({
    el: '#CurrencyCalculator',
    data: {
        rate: 0,
        hand_eur_rate: 0,
        cbr_usd_rate: 0,
        cbr_eur_rate: 0,
        usd_charges: "",
        eur_charges: "",
        rub_charges: "",
        date: "!!! Курсы валют не загрузились. Проверь курсы!!!",
        isHandMadeRates: false,
        textArea: null
    },
    computed: {
        result: function () {
            var usd_costs = this.usd_charges === "" ? 0 : eval(this.usd_charges);
            var eur_costs = this.eur_charges === "" ? 0 : eval(this.eur_charges);
            var rub_costs = this.rub_charges === "" ? 0 : eval(this.rub_charges);

            var result = usd_costs * this.usd_rate + eur_costs * this.eur_rate + rub_costs;

            return moneyFormat(result);
        },
        usd_rate: function () {
            return this.isHandMadeRates ? this.hand_usd_rate : this.cbr_usd_rate;
        },
        eur_rate: function () {
            return this.isHandMadeRates ? this.hand_eur_rate : this.cbr_eur_rate;
        },
        isInvalid_hand_usd_rate: function () {
            return this.hand_usd_rate === "";
        },
        isInvalid_hand_eur_rate: function () {
            return this.hand_eur_rate === "";
        }
    },
    methods: {
          generateTable: function(){
          var rows = this.textArea.split("\n");
          console.log(rows);
          }
        }
});

function generateTable() {
    var data = $('textarea[name=excel_data]').val();
    console.log(data);
    var rows = data.split("\n");

    var table = $('<table />');

    for(var y in rows) {
    var cells = rows[y].split("\t");
    var row = $('<tr />');
    for(var x in cells) {
        row.append('<td>'+cells[x]+'</td>');
    }
    table.append(row);
}

// Insert into DOM
$('#excel_table').html(table);
}