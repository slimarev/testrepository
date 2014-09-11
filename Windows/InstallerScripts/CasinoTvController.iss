[Setup]
AppName = "Casino TV Controller"
AppVersion = "0.0.9.1"
DefaultDirName = "{pf}\CasinoTV\Controller"
DefaultGroupName = "CasinoTV"
OutputDir = "C:\Tools\Builds\0.0.9.1\Windows\Installers"
SourceDir = "C:\Tools\Builds\0.0.9.1\Windows\CasinoTvController"
OutputBaseFilename = "CasinoTvController_0.0.9.1"

[Files]
Source: "*.*"; DestDir: "{app}";
Source: "C:\Tools\Compile\Distr\dotNetFx45_web_installer.exe"; DestDir: {tmp}; Flags: deleteafterinstall; Check: FrameworkIsNotInstalled

[Run]
Filename: "{app}\CasinoTvController.exe"; Flags: postinstall skipifsilent unchecked
Filename: "{tmp}\dotNetFx45_web_installer.exe"; Check: FrameworkIsNotInstalled

[Icons]
Name: "{group}\Controller"; Filename: "{app}\CasinoTvController.exe"; WorkingDir: "{app}"
Name: "{group}\Uninstall Controller"; Filename: "{uninstallexe}"; WorkingDir: "{app}"
Name: "{commondesktop}\Controller"; Filename: "{app}\CasinoTvController.exe"; WorkingDir: "{app}"

[InstallDelete]
Type: files; Name: "{app}\*.*"

[UninstallDelete]
Type: filesandordirs; Name: "{app}\Configuration"
Type: filesandordirs; Name: "{app}\Log"

[code]
function FrameworkIsNotInstalled: Boolean;
begin
  Result := not RegKeyExists(HKEY_LOCAL_MACHINE, 'SOFTWARE\Microsoft\.NETFramework\policy\v4.0');
end;

function InitializeSetup : Boolean;
var
  Version: TWindowsVersion;
  S: String;
begin
   GetWindowsVersionEx(Version);

  if not Version.NTPlatform or (Version.Major < 6) or ((Version.Major = 6) and (Version.Minor < 1)) then
  begin
    SuppressibleMsgBox('Version of windows is not not supported. Please refer to the requirements',
      mbCriticalError, MB_OK, MB_OK);
    Result := False;
    Exit;
  end;
  
  Result := True;
end;

