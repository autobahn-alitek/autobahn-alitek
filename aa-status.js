/************  Declare the fields for the grid  ******************/
const statusColDefs = [
  {
    field: "Transaction ID",
    filter: "agTextColumnFilter",
    sortable: true,
    minWidth: 300,
  },
  {
    field: "Mfr Name",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (params) => {
      this.eGui = document.createElement("span");
      var img = "";
      switch (params.value) {
        case "BMW":
          img = "bmw-36.png";
          break;
        case "Jaguar":
          img = "jaguar-logo-36.png";
          break;
        case "Volvo":
          img = "volvo-logo.png";
          break;
        case "Porsche":
          img = "porsche-logo.png";
          break;
        case null:
          img = "Transparent-36.png";
          break;
        case "":
          img = "Transparent-36.png";
          break;
        default:
          img = "Transparent-36.png";
          break;
      }
      return `<img src="./icons/mfrs/${img}"/> &nbsp; &nbsp; ${params.value}`;
    },
  },
  {
    field: "Stage",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (params) => {
      this.eGui = document.createElement("span");
      var img = "";
      switch (params.value) {
        case "Parts Manager":
          img = "parts-manager-icon-36.png";
          break;
        case "Accounting":
          img = "accounting-icon-36.png";
          break;
        case null:
          img = "Transparent-36.png";
          break;
        case "":
          img = "Transparent-36.png";
          break;
        default:
          img = "Transparent-36.png";
          break;
      }
      return `<img src="./icons/Stage/${img}"/> &nbsp; &nbsp; ${params.value}`;
    },
  },
  {
    field: "Submit Method",
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (params) => {
      this.eGui = document.createElement("span");
      var img = "";
      switch (params.value) {
        case "E-Mail":
          img = "email-icon-36.png";
          break;
        case "RPA":
          img = "rpa-icon-36.png";
          break;
        case "Manual":
          img = "manual-load-icon-36.png";
          break;
        case null:
          img = "Transparent-36.png";
          break;
        case "":
          img = "Transparent-36.png";
          break;
        default:
          img = "Transparent-36.png";
          break;
      }
      return `<img src="./icons/SubMethod/${img}"/> &nbsp; &nbsp; ${params.value}`;
    },
  },
  {
    field: "Submitted By",
    filter: "agTextColumnFilter",
    sortable: true,
    minWidth: 300,
  },
  { field: "Submitted Date", filter: "agDateColumnFilter", sortable: true },
];

/********** initially the grid row data is empty. we will fill from a flow in the ready event ***********/
const statusRowData = [{}];

// let the grid know which columns and what data to use
const gridOptions = {
  defaultColDef: {
    resizable: true,
  },
  columnDefs: statusColDefs,
  rowData: statusRowData,
  domLayout: "autoHeight",
  multiSortKey: "ctrl",
};

//************************************ End of the grid content Setup **********************************************/

function getStatusData() {
  let d = { customerID: 2 };
  let dST = JSON.stringify(d);
  //get the current time in locale timezone
  let ts = new Date().toLocaleString().toString();
  $("#tStamp").text("Status data as of " + ts);
  arrayURL =
    "https://prod-29.westus.logic.azure.com:443/workflows/da6e56d37c1141c0bf4704df294ecd2c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5vLGweujzE4virmPoGfF0BwA9N5td24zSDTV9pvEGAg";
  $.ajax({
    url: arrayURL,
    type: "POST",
    dataType: "json",
    data: dST,
    contentType: "application/json",
    success: function (json) {
      //alert("got back");

      console.log(json.data);
      //-------------------------------------------------------------------
      gridOptions.api.setRowData(json.data);

      showGridDiv();
      //------------------------------------------------------------------
    }, // end of success
  }); // end of ajax
} // end of getStatus f(x)

function showPromptDiv() {
  $("#grid-frame").hide();
  $("#prompt-div").show();
  //$("#refresh-button").hide();
  //$("#myGrid").hide();
}
function showGridDiv() {
  $("#grid-frame").show();
  // $("#myGrid").show();
  $("#prompt-div").hide();
  // $("#refresh-button").show();
}

// let the grid know which columns and what data to use
/*
const gridOptions = {
  defaultColDef: {
    resizable: true,
  },
  columnDefs: statusColDefs,
  rowData: statusRowData,
  domLayout: "autoHeight",
  multiSortKey: "ctrl",
};
*/
/***************************************************/
/*        JQuery Ready F(x)                        */
/***************************************************/
$(function () {
  /******  Declare the AG Grid ***********/
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  $("#refresh-image").click(function () {
    getStatusData();
  }); // end of refresh-button click event

  /****** start with grid hidden and prompt div shown */
  showPromptDiv();

  getStatusData();
}); // end of javascript ready f(x)
