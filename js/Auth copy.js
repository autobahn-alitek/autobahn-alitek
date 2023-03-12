

        var emailVar = "";
        var emailFlowURL = "https://prod-160.westus.logic.azure.com:443/workflows/d04ab654e9774d8284a9114871b172fd/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SwxpEILAusx4ORxWNPOxq45-7lmmlS1tlhNFHJ6tW4E";
        var theCode = "";
        var cookieFlowURL = "https://prod-163.westus.logic.azure.com:443/workflows/1596e1ee66234b608dd9da51896b71e3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aFzPQL9Xpa5kLP892zWQ45a_PoV4eg7-t5r3tM3lNSE";
    

        function generateCode(){
            return (Math.floor(100000 + Math.random() * 900000)).toString();
        }

        


        $(document).ready(function(){
          
            $("#emailButton").click(function(){
            emailClicked();
        })
            
            
            $( "#thePopup" ).dialog({  
                close: function(event, ui){
                  //  alert("closed dialog");
                },
               // open: function () { $(".ui-dialog-titlebar-close").hide(); },
               autoOpen:false,
               modal:true,
               
               
            }); 

           
            $(".ui-dialog-titlebar-close").click(function(){
                $("#emailButton").prop("disabled",false);
                $("#emailError").val("");
                          
            });

            $("#codeInput").keyup(function(){
                //if($("#codeInput").val()== theCode){
                    alert('in keyup');
                    if(1 == 1){
                    $("#thePopup").dialog("close");
                    var cookieFlowInputJSON = {
                    "email": emailVar
                }
                    $.ajax({
                    url: cookieFlowURL,
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data:JSON.stringify(cookieFlowInputJSON),
                    success: function (data){
                        var email = data.email;
                        var credAdmin = data.isCredAdmin;
                        var isReviewer = data.isReviewer;
                        var custName = data.cust.custName;
                        var custID = data.cust.custID;
                        //alert(data.credAdminMfrs[0].mfr);
                        var mfrNamePart = "";
                        var mfrIDPart = "";
                        for(var i = 0; i<data.credAdminMfrs.length; i++){
                            mfrNamePart = mfrNamePart + data.credAdminMfrs[i].mfr;
                            mfrIDPart = mfrIDPart + data.credAdminMfrs[i].mfrid;
                            if(i < data.credAdminMfrs.length-1){
                                mfrNamePart = mfrNamePart + "|";
                                mfrIDPart = mfrIDPart + "|";
                            }
                            console.log(mfrNamePart);
                            console.log(mfrIDPart);
                        }
                        //set Cookies
                        setCookie("AA-Email",email);
                        setCookie("AA-isCredAdmin",credAdmin);
                        setCookie("AA-credAdminMfrID",mfrIDPart);
                        setCookie("AA-credAdminMfrName",mfrNamePart);
                        setCookie("AA-custID",custID);
                        setCookie("AA-custName",custName);
                        setCookie("AA-isReviewer",isReviewer);
                        
                        var redirectURL = "";
                        if(document.referrer.length==0){
                            redirectURL = "Index.html";
                        }
                        else{
                            redirectURL = document.referrer;
                        }

                        window.location.replace(redirectURL);



                    }

                    
                })
                }
            })
        })

        function emailClicked(){
            $("#emailButton").prop("disabled",true);
            $("#emailError").val("Working, please wait...");
            emailVar = $("#userEmail").val();

            if($("#userEmail").val().length == 0){
             $("#emailError").val("Email address required");
             $("#emailButton").prop("disabled",false);
             return;
            }

            else{
                theCode = generateCode();
                var flowInputJSON = {
                "email": emailVar,
                "code": theCode
                }
            
                
                console.log(theCode);
                $.ajax({
                url: emailFlowURL,
                 type: "post",
                 dataType: "json",
                contentType: "application/json",
                data:JSON.stringify(flowInputJSON),
                success: function (data){
                    $("#thePopup").dialog("open");
                },
                fail: function (data){
                alert("Flow failed");
                 }
                })

                
                


                }
        }

