@echo off

echo Removing previous files...
del /q ".\deployment\tfm_services_req\*"
for /d %%x in (".\deployment\tfm_services_req\*") do @rd /s /q "%%x"
echo Removed previous files

echo Copying new files...
xcopy ".\development\tfm_services" ".\deployment\tfm_services_req\tfm_services" /E /I
xcopy ".\development\tfm_services_dev.ini" ".\deployment\tfm_services_req"
xcopy ".\development\setup.py" ".\deployment\tfm_services_req"
echo Copied new files...

echo Setup done
pause