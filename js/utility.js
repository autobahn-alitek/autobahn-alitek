function deleteAllCookies()
{
  deleteCookie("AA-Email");
 deleteCookie("AA-isCredAdmin");
 deleteCookie("AA-credAdminMfrID");
 deleteCookie("AA-credAdminMfrName");
 deleteCookie("AA-custID");
 deleteCookie("AA-custName");
 deleteCookie("isReviewer");
 document.location.href = "./index.html";
}