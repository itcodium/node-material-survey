# Aplicacion NodeJS, AngularJS y Boostrap 4


A. Backend NodeJS el cual expone una API REST para la interacción con una aplicación frontend

	La funcionalidad 
	
	- Listado y filtrado de registros que luego se consumen desde un front end

B. Front
		
    Consume la API
		Visualiza los resultados del backend (Mobile y desktop)
		

C. Instalacion

1. npm install
  
    instala devDependencies y dependencies

2. Ejecutar aplicacion

    run prod

3. Modificacion del Front End

    Ejecutar la aplicacion en modo desarrollo

    run dev

4. Pasar cambios a prod

    Ejecutar comando

    npm run prod

5. Rutas y puertos de la aplicacion

    En caso de ser necesario modificar el archivo:

        public_src/app/api.routes.js

    if (process.env.NODE_ENV == 'production') {
        API_URL = API_URL_PROTOCOLO + "//localhost:8080/api/";
    
    if (process.env.NODE_ENV == 'development') {
        API_URL = API_URL_PROTOCOLO + "//localhost:7777/api/";


- Borrar carpeta (cmd)
  rd node_modules /S 
  
    https://mdbootstrap.com/legacy/angular/4.1.0/?page=javascript/alerts
