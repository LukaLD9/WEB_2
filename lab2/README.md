Adresa git repozitorija s web-aplikacijom: https://github.com/LukaLD9/WEB_2/tree/master/lab2

Adresa web-aplikacije: https://security-attack-techniques.onrender.com/

Popis implementiranih ranjivosti:
   1. SQL ubacivanje (SQL Injection)
   2. Lažiranje zahtjeva na drugom sjedištu (Cross Site Request Forgery, CSRF)
      
Sve je uspješno implementirano.
      
Kratke upute kako lokalno pokrenuti i isprobati aplikaciju:
	- raspakirati ZIP datoteku s gita
   - npm install
   - u .env datoteku postaviti valjane varijable za lokano pokretanje postgres baze podataka (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE),
		COOKIE_SECRET po izboru i BASE_URL na http://localhost/3000
   - npm run seed
   - npm run dev
   - otvoriti http://localhost/3000