

        var emailVar = "";
        var emailFlowURL = "https://prod-160.westus.logic.azure.com:443/workflows/d04ab654e9774d8284a9114871b172fd/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SwxpEILAusx4ORxWNPOxq45-7lmmlS1tlhNFHJ6tW4E";
        var theCode = "";
        var cookieFlowURL = "https://prod-102.westus.logic.azure.com:443/workflows/4466e8084f8b42229f8f37687b85e86c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VfBCD-CsWXRp4gjVDdaRVRs9kfHuskHy2BoeZIXgZNU";
    

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
                if($("#codeInput").val()== theCode){
                   // alert('in keyup');
                   // if(1 == 1){
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
                     //alert("about to set cookies");
                     console.log("data : " + JSON.stringify(data));
                        //set Cookies
                        setCookie("AA-Email",data.email);
                        setCookie("AA-isCredAdmin",data.isCredAdmin);
                        setCookie("AA-credAdminMfrID", data.credAdminMfrID);
                        setCookie("AA-credAdminMfrName", data.credAdminMfrName);
                        setCookie("AA-custID",data.custID);
                        setCookie("AA-custName",data.custName);
                        setCookie("AA-isReviewer",data.isReviewer);
                       // alert(data.credAdminMfrID);
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

