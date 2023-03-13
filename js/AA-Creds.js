/*********************************  Javascript here  ******************************/
      
      let theEmail = "";
      ///***************************************************************
      // Global vars
      //*****************************************************************
      let isVerified = false;
      let mfrCount = 0;
      let hasMfr = false;
      let verifiedEmail = "@@@NONE@@@";
      let verifyCode = "";
      let custID = "";
      let customerName = "";
      let mfr = "";
      let mfrID = "";
      var email = "";
      let emailFlowURL =
        "https://prod-114.westus.logic.azure.com:443/workflows/1b6c9b2efa4c46758ea9af8acc2a1a8f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zC9UAi72ODYV7sVIPOz9TrAnKkGrvALUYLDWUVLt5d4";

      let sendEmailFlowUrl =
        "https://prod-164.westus.logic.azure.com:443/workflows/2847c5874b054d1f96a12fe1b18f9f08/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g-Zccb7Fd5wk7XhdLhDiuVv7nsSHLdVg_MnBDh3pRO0";

        
      let setCredsFlowURL =
          "https://prod-187.westus.logic.azure.com:443/workflows/11ebd5c8637d43778720bf93d5ed80e3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9CXGsZfzlnfsa7IjZoTdZM286mIdeTMVZvA58bjHpQk";

      let verifictionCodeEmailURL = "https://prod-163.westus.logic.azure.com:443/workflows/cabc87a5d7384e3f83cd00b923cc86cc/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_MVzPGDB1J08KE0CgisLYYMBKc7Z8IeFZaCfSDlSKEI";

      /*********************** end of global vars *****************************************************************************************************/

      
    

     /********************************************************/
     /*         function showMfrDiv                          */
     /********************************************************/
     function showMfrDiv()
     {
      
        $("#MfrDiv").show();
        $("#creds-div").hide();
        $("#creds-final").hide();
        $("#bad-link").hide();
        $("#validate-div").hide();
        $("#message-div").show();
     } // end of showMfrDiv f(x)

     /********************************************************/
     /*         function showCredsFinalDiv                   */
     /*   NO LONGER USED ????                                */
     /********************************************************/
     function showCredsFinalDiv()
     {
      
        $("#MfrDiv").hide();
        $("#creds-div").hide();
        $("#creds-final").show();
        $("#bad-link").hide();
        $("#validate-div").hide();
        $("#message-div").hide();
     } // end of showcredsFinalDiv f(x)

     /********************************************************/
     /*         function showBadLinkDiv                       */
     /*  NO LONGER USED                                       */
     /********************************************************/
     function showBadLinkDiv()
     {
       
        $("#MfrDiv").hide();
        $("#creds-div").hide();
        $("#creds-final").hide();
        $("#bad-link").show();
        $("#validate-div").hide();
        $("#message-div").hide();
     } // end of showBadLinkDiv

     /********************************************************/
     /*         function showCredDiv                         */
     /********************************************************/
     function showCredsDiv()
     {
       var thePrompt = "Please enter the credentials for the " + mfr + " site";
       $("#creds-prompt").text(thePrompt);
      
        $("#MfrDiv").hide();
        $("#creds-div").show();
        $("#creds-final").hide();
        $("#bad-link").hide();
        $("#validate-div").hide();
        $("#message-div").show();
     } // end of showCredsDiv f(x)

     function showValidateDiv()
     {
       
        $("#MfrDiv").hide();
        $("#creds-div").hide();
        $("#creds-final").hide();
        $("#bad-link").hide();
        $("#validate-div").show();
        $("#message-div").show();
     }
      function handleFlowResults() {
        
        $("#MfrDiv").show();
      }

      function outputInfo(messageText)
      {
         $("textarea").css("color",'black');
         $("textarea").val(messageText);
      }
      function outputError(errorText)
      {
          $("textarea").css('color', 'red');
          $("textarea").val(errorText);
      }

      function clearMessage()
      {
        $("textArea").val("");
      }
      
      function logout()
      {
        deleteAllCookies();
        window.location.href="./href";
      }

      function popupValidate()
      {
        
        outputInfo("");
       

        $( "#dialg" ).dialog( "open" );
        
      }
      ////********************************************************
      function callSendEmailFlow(userEmail) {
        //build the flow input as a JS object
        var flowInputJSON = {
          email: email,
          customerID: parseInt(custID),
          customerName: customerName,
          mfrId: parseInt(mfrID),
          mfrName: mfr,
        };

        $.ajax({
          url: sendEmailFlowUrl,
          type: "post",
          dataType: "json",
          contentType: "application/json",
          success: function (data) {
            var status = data.Status;
            var statusMessage = "";
            console.log(data);
            if (status.toUpperCase() != "DONE") {
              //alert("send email flow failed");
              statusMessage = "Flow failed";
            } else {
              statusMessage =
                "Please check your email for a link to set your " +
                mfr +
                " site credentials";
            }
            $("#mfrButton").prop("disabled", false);
            $("#mfrError").val(statusMessage);
          }, //end of callback function
          data: JSON.stringify(flowInputJSON),
        });
      }
      ///**********************************************************

      function sendVerificationCodeEmail()
      {
         // alert("send verification code email");
          //*************************************************************
          var flowInputJSON = {
          email: email,
          code: verifyCode.toString()
        };

        $.ajax({
          url: verifictionCodeEmailURL,
          type: "post",
          dataType: "json",
          contentType: "application/json",
          success: function (data) {
            var status = data.Status;
            var statusMessage = "";
            console.log(data);
            /*
            if (status.toUpperCase() != "DONE") {
              //alert("send email flow failed");
              statusMessage = "Flow failed";
              alert("failed to send validation code");
            } else {
              console.log("send verification code email - success");
            }
            */
            $("#mfrButton").prop("disabled", false);
           // $("#mfrError").val(statusMessage);
          }, //end of callback function
          data: JSON.stringify(flowInputJSON),
        });


          //************************************************************


      } // end of sendVerificationCodeEmail f(x)
     
      function generateCode()
      {
        return Math.floor(100000 + Math.random() * 900000);
      }
      function callEmailVerifyFlow(userEmail) {
        //build the flow input as a JS object
        var flowInputJSON = {
          email: $("#userEmail").val(),
        };
        console.log("email is " + email);
        $.ajax({
          url: emailFlowURL,
          type: "post",
          dataType: "json",
          contentType: "application/json",
          success: function (data) {
            // this is the function that will be called with the results from the post ( i.e the flow)
            if( data.status == 'not-found')
            {
              outputError("This E-mail isn't authorized to change credentials");
              $("#emailButton").prop("disabled", false);
              return;
            }
            console.log(data);
            console.log("Results");
            console.log("----------");
            custID = data.CustomerID;
            customerName = data.CustomerName;

            console.log("CustomerName : " + customerName);
            //console.log("CustomerID :" + data.CustomerID);
            console.log("CustomerID :" + custID);

            //extract the manufactur value into a variable
            let mfrArray = data.Manufacturers;

            console.log(mfrArray);

            //convert the manufacturer string value to an array
            let array = JSON.parse(mfrArray);

            console.log("Number of mfrs: " + array.length);

            //clear any options that may currently be in the select
            $("#theSelect").empty();

            for (var i = 0; i < array.length; i++) {
              mfr = array[i]["manufacturer"];
              mfrID = array[i]["mfrid"];
              console.log("manufacturerName : " + mfr + " mfrID: " + mfrID);

              //now add this manufacturer as an option to the select
              $("#theSelect").append(
                '<option value="' + mfrID + '">' + mfr + "</option>"
              );
            } // end of for loop
           // alert("about to call popup validate");
            //handleFlowResults();

            verifyCode = generateCode();
            sendVerificationCodeEmail();
           // alert("code : " + verifyCode);
            popupValidate();
            var statusMessage = "";
            //lert("data Status : " + data.status);
            if (data.status.toUpperCase() != "FOUND") {
              alert("flow failed");
            }
            $("#emailButton").prop("disabled", false);
            clearMessage();
          }, //end of callback function
          data: JSON.stringify(flowInputJSON),
        });
      }
      
      function emailClicked() {
       // $("#emailError").val("Working, please wait...");
        outputInfo("Working, please wait...");
        //alert($("#emailError").val());
        email = $("#userEmail").val();
       

        //email = $("#userEmail").val();
        
        callEmailVerifyFlow($("#userEmail").val());

        $("#emailError").val("");
      } //close emailClicked function
      function mfrClicked() {
        outputInfo("Working, please wait...");
        
        //$("#mfrError").val("");
       // callSendEmailFlow(email);
      } //close emailClicked function


      $(document).ready(function () {

        checkAuthentication();
        
        theEmail = getCookie("AA-Email");
        custID = getCookie("AA-custID");
        //alert(custID);
      
        
        //build the mfr select options
        var mfrIDList = getCookie("AA-credAdminMfrID");
        //alert(mfrIDList);
        var mfrIDArray = mfrIDList.split("|");
        var mfrNameList = getCookie("AA-credAdminMfrName");
        var mfrNameArray = mfrNameList.split("|");

      
        $("#mfrButton").prop("disabled", true);
        $("#theSelect").empty();
        mfrCount = 1;
        if( mfrNameArray[0].length == 0)
        {
          hasMfr = false;
        }
        else
        {
          hasMfr = true;
        }
        mfrCount = mfrNameArray.length;
       
        for(var i=0; i< mfrIDArray.length; i++)
        {
            

  
            mfr = mfrNameArray[i];
            mfrID = mfrIDArray[i];
           

            //now add this manufacturer as an option to the select
            $("#theSelect").append(
              '<option value="' + mfrID + '">' + mfr + "</option>"
            );
        }

        if( mfrIDArray.length > 0)
        {
          $("#mfrButton").prop("disabled", false);
        }
        
    
         $('#togglePassword1').click(function() {
           var password1 = $("#password-field");
           const type = password1.attr("type") === 'password' ? 'text' : 'password';
           password1.attr('type',type);
           $("#togglePassword1").toggleClass('fa-eye fa-eye-slash');
        });

        $('#togglePassword2').click(function() {
          var password2 = $("#verify-field");
          const type = password2.attr("type") === 'password' ? 'text' : 'password';
          password2.attr('type',type);
          $("#togglePassword2").toggleClass('fa-eye fa-eye-slash');
       });

       $("body").css({"font-family": "Arial, Helvetica, sans-serif"});

        //when dialog cancelled
        $('div#dialg').on('dialogclose', function(event) {
          $("#emailButton").prop("disabled", false);
          $("#userEmail").prop("disabled",false);
          $("#code-field").val("");
           // alert('closed');
         });


        // configure the dialog in jquery
        $( "#dialg" ).dialog({  
               autoOpen: false,  

            });
  
              

        $("#code-field").keyup( function(){
        if( $("#code-field").val() == verifyCode)
        {
                //we Verified the code
                $("#code-field").val("");
                $( "#dialg" ).dialog( "close" );
                isVerified = true;
                verifiedEmail = $("#userEmail").val();
                $("#emailButton").prop("disabled", false);
                $("#userEmail").prop("disabled",false);
                showMfrDiv();
        }
        })
      
        //show the email div
        showMfrDiv();
    
      
      

        $("#emailButton").click(function () {
            //check if the email is blank
          if ($("#userEmail").val().length == 0) {
              
               outputError("Email address required");
               return;
        }


          if( isVerified)
          {
               // we're already verified so just show the mfr screen
            
               
               outputInfo("");

          }
          else
          {
              // not verified so show verify dialog
              $("#emailButton").prop("disabled", true);
               $("#userEmail").prop("disabled",true);
               emailClicked();
          }
          
          //$("#emailButton").prop("disabled", true);
        });

        $("#mfrButton").click(function () {
          //alert("hasMfr: " + hasMfr);
         if( !hasMfr)
         {
           outputError("You are not authorized to update credentials for any manufacturers");
           return;

         }
          mfrClicked();
          $("#mfrButton").prop("disabled", false);
          
         // alert("SelectedVal: " + $("#theSelect").val() );
          mfrID = parseInt( $("#theSelect").val() );
          mfr   =  $("#theSelect").text();
          outputInfo("");
          //alert("mfr: " + $("#theSelect").text());
          showCredsDiv();
        });

        $("#submit-button").click(function(){
         var optionCnt =
        

         //disable the submit button while flow is running
         $(this).prop('disabled',true);

         $("#message-area").val("");
       
        // alert( $("username-field").val());
         if( $("#username-field").val() == "" || $("#password-field").val() == "" || $("#verify-field").val() == "")
         {
           
            
             outputError("Username, Password and Verify Password fields are required")
             $(this).prop('disabled',false);
         }
         else
         {
              //call the flow
              if( $("#password-field").val() != $("#verify-field").val())
              {
              
               outputError("The password and the verify password fields do not match");
               $(this).prop('disabled',false);

              }
              else
              {
                // $("#message-area").val("Working, please wait...");
                 send2Flow();
                // $("#message-area").val("");
                
                
              }
         }
         
       
       }) // end of submit button clicked

       function send2Flow() {
          //build the flow input as a JS object
          
          outputInfo("Working, please wait...");
          var un = $("#username-field").val();
          var pw = $("#password-field").val();
     
          var flowInputJSON = {
            custID: parseInt(custID),
            mfrID: parseInt(mfrID),
            username: un,
            password: pw
          };
         console.log(flowInputJSON);
          var JSONStringified = JSON.stringify(flowInputJSON);
          console.log(JSONStringified);

          $.ajax({
            url: setCredsFlowURL,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
            //alert("got results from json")
           $("#message-area").val("");
             //showfinal();
             showMfrDiv();
             outputInfo("Your " + mfr + " credentials have been saved");

            }, //end of callback function
            error: function(e) {
              //alert("got error calling flow");
              $("#submit-button").prop('disabled',false);
              $("#message-area").val("");
                      console.log(e);
            },
            data: JSONStringified
          });
        }  // end of send2Flow f(x)



      }); // end of read f(x)
 