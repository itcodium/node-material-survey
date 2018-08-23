@ECHO OFF
REM Esto es un comentario

ECHO    Ejecutar proceso

:check1
    if "%1"=="" GOTO errparam
    
    if "%1" == "dev" 		GOTO parse
    if "%1" == "prod" 		GOTO parse
    if "%1" == "lprod" 		GOTO parse
    
    GOTO errparam3

:errparam
	ECHO    Atencion: Se requiere el uso de parametros
    ECHO    .
	ECHO    primer parametro:
	ECHO             dev = development
    ECHO             prod = production
    ECHO             lprod = production localhost
	ECHO    .
	GOTO endend


:errparam3
    ECHO    Error: primer parametro incorrecto. Valores posibles:
	ECHO             dev = development
	ECHO             prod = production
    ECHO             lprod = production local
	ECHO    .
    GOTO endend

    REM no hay GOTO
    GOTO endend
)

:parse

	ECHO Inicializando la aplicacion...

	if "%1"=="dev" (
        set NODE_ENV=development
        set NODE_LOCAL=DEV
        GOTO endparse
    ) else if "%1"=="prod" (
        set NODE_ENV=production
        set NODE_LOCAL=PROD
        GOTO endparse
    ) else if "%1"=="lprod" (
        set NODE_ENV=production_local
        set NODE_LOCAL=local
        GOTO endparse
    )

:error
	ECHO    Error inesperado. Error de estructura. No se ha encontrado el comando correcto.
	GOTO endend

:endparse
    node ./bin/www
:endend
    






