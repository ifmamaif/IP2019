@echo off

echo Deleting __pycache__ ...
FOR /d /r . %%d IN (__pycache__) DO @IF EXIST "%%d" rd /s /q "%%d"
echo __pycache__ deleted

echo Deleting tfm_services.egg-info ...
FOR /d /r . %%d IN (tfm_services.egg-info) DO @IF EXIST "%%d" rd /s /q "%%d"
echo tfm_services.egg-info deleted

echo Clear done
pause