/*****************************************************/
/*          Function setCookie                       */
/*****************************************************/
function setCookie(cname, cvalue) {
    const d = new Date();
    let cVal = cname + "=" + cvalue + ";" + ";path=/";

    document.cookie = cVal;
} // end of setCookie f(x)

/*****************************************************/
/*          Function getCookie                       */
/*****************************************************/
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "NOT FOUND";
} // end of getCookie f(x)

/****************************************************/
/*      Function deleteCookie                       */
/****************************************************/
function deleteCookie( name ){
document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
return true;
}
/****************************************************/
/*  funciton checkAuthentication                    */
/*                                                  */
/*  this f(x) should be called as the first thing   */
/*  in the document ready f(x) on every js page     */
/*  where it's included.                            */
/****************************************************/
function checkAuthentication()
{
    let res = getCookie("AA-Email");
    if( res == "NOT FOUND")
    {
         /* not authenticated so redirect to Authentication page */
         window.location.href = './auth.html';
         
    }
    else
    {
        let AA_Email = res;
        /* get other cookies and set variables here */
        /* AA_CustID, MFR_APPROVER_LIST */
    }
}

function deleteAllCookies()
{
   deleteCookie("AA-Email");
   deleteCookie("AA-isCredAdmin");
   deleteCookie("AA-credAdminMfrID");
   deleteCookie("AA-credAdminMfrName");
   deleteCookie("AA-custID");
   deleteCookie("AA-custName");
   deleteCookie("isReviewer");
   
}