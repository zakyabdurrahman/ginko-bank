# BANK
User bisa membuka 1 rekening dalam beberapa currency (USD, IDR, EURO, YEN, POUNDS)
Admin bisa melihat semua rekening yang ada dan membekukan rekening yang dilaporkan polisi
User bisa topup dan withdraw (dalam Rp saja , nanti di convert);
User bisa melihat list transaksi (withdraw dan topup) dan download pdf;
User bisa mengirimkan ke nomor rekening
Setiap transfer captcha

## Routes (/user)
GET / landing page  
GET /register page
POST /register login, redirect to dashboard
GET /login login form  
POST /login redirect to /dashboard  
GET /dashboard display all owned account and button for adding account  
GET /addAccount form for opening a new account  
POST /addAccount redirect to /accounts/:accountId  
GET /accounts/:accountId display account detail. can topup (in rp), transfer, see transaction detail here  
GET /logout logout