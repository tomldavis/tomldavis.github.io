
var old_unit = 0;

function createCookie(name,value,days)
{
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
    document.F.SIZE.value=20000;
	document.F.SURFACEpop.selectedIndex=1;
	document.F.FCjug.selectedIndex=3;
	document.F.CHLORINEpop.selectedIndex=1;
	document.F.FROMpop.selectedIndex=2;
	document.F.FCpcnt.value=8.25;
	return null;
	}

function eraseCookie(name)
{
	createCookie(name,"",-1);
	}

function SaveSettings()					// ABCDEFGHJKLMNOPQRSTUVWXYZ - I
{
	createCookie("settings",
		"U"+document.F.Units.selectedIndex+
		"G"+parseInt(document.F.SIZE.value)+
		"Q"+parseFloat(document.F.FCpcnt.value)+
		"J"+document.F.FCjug.selectedIndex+
		"Z"+document.F.FCpop.selectedIndex+
		"V"+document.F.SZpop.selectedIndex+
		"E"+document.F.EFFpop.selectedIndex+
		"C"+parseFloat(document.F.FCto.value)+
		"P"+parseFloat(document.F.PHto.value)+
		"M"+document.F.MApop.selectedIndex+
		"A"+parseInt(document.F.TAto.value)+
		"H"+parseInt(document.F.CHto.value)+
		"F"+parseInt(document.F.CHfill.value)+
		"Y"+parseInt(document.F.CYAto.value)+
		"S"+parseInt(document.F.SALTto.value)+
		"B"+parseInt(document.F.BORto.value)+
		"X"+document.F.BORpop.selectedIndex+
		"T"+parseInt(document.F.TEMP.value)+
		"W"+parseFloat(document.F.SZwid.value)+
		"L"+parseFloat(document.F.SZlen.value)+
		"D"+parseFloat(document.F.SZdeep.value)+
		"O"+parseFloat(document.F.EFFoz.value)+
		"N"+document.F.FROMpop.selectedIndex+
		"K"+document.F.CHLORINEpop.selectedIndex+
		"R"+document.F.SURFACEpop.selectedIndex,
		365);
	}

function RestoreSettings()
{
	var cookie, value, indx, len, tlen;

	cookie=readCookie("settings");
	if (cookie) len=cookie.length;
	else len=0;
	for (indx=0; indx+2<=len; indx=tlen) {
		for (tlen=indx+1; tlen<len && (cookie.charAt(tlen)=="." || 
			(cookie.charAt(tlen)>="0" && cookie.charAt(tlen)<="9")); ++tlen) ;
		if (tlen<=indx+1) break;
		value=parseFloat(cookie.substring(indx+1,tlen));
		switch (cookie.charAt(indx)) {

		case "U":
			document.F.Units.selectedIndex=old_unit=value;
			if (value>0) CalcUnits();
			break;
		case "G":
			document.F.SIZE.value=value;
			break;
		case "Q":
			document.F.FCpcnt.value=value;
			break;
		case "J":
			document.F.FCjug.selectedIndex=value;
			break;
		case "Z":
			document.F.FCpop.selectedIndex=value;
			break;
		case "V":
			document.F.SZpop.selectedIndex=value;
			break;
		case "E":
			document.F.EFFpop.selectedIndex=value;
			break;
		case "C":
			document.F.FCfrom.value=document.F.FCto.value=value;
			break;
		case "F":
			document.F.CHfill.value=value;
			break;
		case "P":
			document.F.PHfrom.value=document.F.PHto.value=value;
			break;
		case "M":
			document.F.MApop.selectedIndex=value;
			break;
		case "A":
			document.F.TAfrom.value=document.F.TAto.value=value;
			break;
		case "H":
			document.F.CHfrom.value=document.F.CHto.value=value;
			break;
		case "Y":
			document.F.CYAfrom.value=document.F.CYAto.value=value;
			break;
		case "S":
			document.F.SALTfrom.value=document.F.SALTto.value=value;
			break;
		case "B":
			document.F.BORfrom.value=document.F.BORto.value=value;
			break;
		case "X":
			document.F.BORpop.selectedIndex=value;
			break;
		case "T":
			document.F.TEMP.value=value;
			break;
		case "W":
			document.F.SZwid.value=value;
			break;
		case "L":
			document.F.SZlen.value=value;
			break;
		case "D":
			document.F.SZdeep.value=value;
			break;
		case "O":
			document.F.EFFoz.value=value;
			break;
		case "N":
			document.F.FROMpop.selectedIndex=value;
			break;
		case "K":
			document.F.CHLORINEpop.selectedIndex=value;
			break;
		case "R":
			document.F.SURFACEpop.selectedIndex=value;
			break;
			}
		}
	CalcAll();
	}

function GetGallons()
{
	if (document.F.Units.selectedIndex==1)
		return(parseInt(document.F.SIZE.value)/3.78541);
	if (document.F.Units.selectedIndex==2)
		return(parseInt(document.F.SIZE.value)*1.20095);
	return(parseInt(document.F.SIZE.value));
	}

function PutWeight(oz)
{
	if (document.F.Units.selectedIndex==1)
		return(Math.floor(oz*28.3495 + 0.5)+" g");
	if (oz<10) return(Math.floor(oz+0.05)+"."+Math.floor(oz*10+0.5)%10+" oz");
	return(Math.floor(oz+0.5)+" oz");
	}

function PutLbs(oz)
{
	if (document.F.Units.selectedIndex==1)
		return(Math.floor(oz*0.0283495 + 0.5)+" kg");
	return(Math.floor(oz/16+0.5)+" lbs");
	}

function PutVolume(oz)
{
	if (document.F.Units.selectedIndex==1)
		return(Math.floor(oz*29.5735 + 0.5)+" ml");
	if (document.F.Units.selectedIndex==2) oz*=1.04084;
	if (oz<10) return(Math.floor(oz+0.05)+"."+Math.floor(oz*10+0.5)%10+" oz");
	return(Math.floor(oz+0.5)+" oz");
	}

function PutGallons(gal)
{
	if (document.F.Units.selectedIndex==1)
		return(Math.floor(gal/7.48052*10 + 0.5)*100 + " liters");
	if (document.F.Units.selectedIndex==2) gal*=0.832674;
	if (gal<1000) return(Math.floor(gal / 10 + 0.5) * 10 +" gallons");
	return(Math.floor(gal / 100 + 0.5) * 100 +" gallons");
	}

function CalcFC()
{
	var ozmul = [6854.95, 4149.03, 3565.44, 3936.84, 4828.12, 5422.41, 2637.5, 7489.4];
	var vol = ["X", 0.9351, 0.9352, 0.9352, 0.9352, 0.9352, 0.978, "X"];
	var temp;

	if (parseFloat(document.F.FCfrom.value)<parseFloat(document.F.FCto.value)) {
		// Bleach
		temp=(parseFloat(document.F.FCto.value)-
			parseFloat(document.F.FCfrom.value)) * 
			GetGallons() / 482.202 * 6 / parseFloat(document.F.FCpcnt.value);
		document.F.FC1oz.value=PutVolume(temp);

		// Trichlor, Dichlor, Cal-hypo 48%, 53%, 65%, 73%, 
		// Lith-hypo, Chlorine Gas
		temp=(parseFloat(document.F.FCto.value)-
			parseFloat(document.F.FCfrom.value)) *
			GetGallons() / ozmul[document.F.FCpop.selectedIndex];
		document.F.FC2oz.value=PutWeight(temp);
		if (vol[document.F.FCpop.selectedIndex]=="X")
			document.F.FC2vol.value="unknown";
		else document.F.FC2vol.value=PutVolume(temp *
			vol[document.F.FCpop.selectedIndex]);
		}
	else {
		document.F.FC1oz.value=0;
		document.F.FC2oz.value=document.F.FC2vol.value=0;
		}
	}

function CalcPH()
{
	var mamul = [2.0, 1.11111, 1.0, .909091, 2.16897, 1.08448 ];
	var temp, adj, delta, extra;

	delta=parseFloat(document.F.PHto.value)-parseFloat(document.F.PHfrom.value);
	delta*=GetGallons();
	temp=(parseFloat(document.F.PHfrom.value)+
		parseFloat(document.F.PHto.value))/2;
	adj=(192.1626 + -60.1221*temp + 6.0752*temp*temp + -0.1943*temp*temp*temp) *
		(parseInt(document.F.TAfrom.value)+13.91) / 114.6;
	extra=(-5.476259 + 2.414292*temp + -0.355882*temp*temp +
		0.01755*temp*temp*temp) * parseInt(document.F.BORfrom.value);
	extra*=delta;
	delta*=adj;
	if (parseFloat(document.F.PHfrom.value)<parseFloat(document.F.PHto.value)) {
		// Washing soda, soda ash
		temp=(delta/218.68)+(extra/218.68);
		document.F.PHU1oz.value=PutWeight(temp);
		document.F.PHU1vol.value=PutVolume(temp * 0.8715);

		// Borax
		temp=(delta/110.05)+(extra/110.05);
		document.F.PHU2oz.value=PutWeight(temp);
		document.F.PHU2vol.value=PutVolume(temp * 0.9586);
		}
	else {
		document.F.PHU1oz.value=document.F.PHU1vol.value=0;
		document.F.PHU2oz.value=document.F.PHU2vol.value=0;
		}

	if (parseFloat(document.F.PHfrom.value)>parseFloat(document.F.PHto.value)) {
		// Muriatic acid
		temp=(delta / -240.15 * mamul[document.F.MApop.selectedIndex])+
			(extra / -240.15 * mamul[document.F.MApop.selectedIndex]);
		document.F.PHD1oz.value=PutVolume(temp);

		// Dry acid
		temp=(delta/-178.66)+(extra/-178.66);
		document.F.PHD2oz.value=PutWeight(temp);
		document.F.PHD2vol.value=PutVolume(temp * 0.6657);
		}
	else {
		document.F.PHD1oz.value=0;
		document.F.PHD2oz.value=document.F.PHD2vol.value=0;
		}
	}

function CalcTA()
{
	var temp;

	document.F.PHTA.value=parseInt(document.F.TAfrom.value);
	if (parseInt(document.F.TAfrom.value) < parseInt(document.F.TAto.value)) {
		// Baking soda
		temp=(parseInt(document.F.TAto.value)-
			parseInt(document.F.TAfrom.value)) *
			GetGallons() / 4259.15;
		document.F.TAoz.value=PutWeight(temp);
		document.F.TAvol.value=PutVolume(temp * 0.7988);
		}
	else document.F.TAoz.value=document.F.TAvol.value=0;
}

function CalcCH()
{
	var temp;

	if (parseInt(document.F.CHfrom.value) < parseInt(document.F.CHto.value)) {
		// Calcium chloride
		temp=(parseInt(document.F.CHto.value)-
			parseInt(document.F.CHfrom.value)) *
			GetGallons() / 6754.11;
		document.F.CH1oz.value=PutWeight(temp);
		document.F.CH1vol.value=PutVolume(temp * 0.7988);

		// Calcium chloride dihydrate	
		temp=(parseInt(document.F.CHto.value)-
			parseInt(document.F.CHfrom.value)) *
			GetGallons() / 5098.82;
		document.F.CH2oz.value=PutWeight(temp);
		document.F.CH2vol.value=PutVolume(temp * 1.148);
		document.F.CHpcnt.value="some";
		}
	else {
		document.F.CH1oz.value=document.F.CH1vol.value=0;
		document.F.CH2oz.value=document.F.CH2vol.value=0;
		if (parseInt(document.F.CHfrom.value) > 
			 parseInt(document.F.CHto.value)) {
			if (parseInt(document.F.CHto.value) <
				 parseInt(document.F.CHfill.value))
				document.F.CHpcnt.value="can't";
			else document.F.CHpcnt.value=Math.floor(100-
				((parseInt(document.F.CHto.value)-
					parseInt(document.F.CHfill.value)) /
				(parseInt(document.F.CHfrom.value)-
					parseInt(document.F.CHfill.value)))*100+0.5) + "%";
			}
		else document.F.CHpcnt.value="some";
		}
	}

function CalcCYA()
{
	var temp;

	if (parseInt(document.F.CYAfrom.value) < parseInt(document.F.CYAto.value)) {
		// Stabilizer
		temp=(parseInt(document.F.CYAto.value)-
			parseInt(document.F.CYAfrom.value)) *
			GetGallons() / 7489.51;
		document.F.CYA1oz.value=PutWeight(temp);
		document.F.CYA1vol.value=PutVolume(temp * 1.042);
		temp=(parseInt(document.F.CYAto.value)-
			parseInt(document.F.CYAfrom.value)) *
			GetGallons() / 2890;
		document.F.CYA2oz.value=PutVolume(temp);
		document.F.CYApcnt.value="some";
		}
	else {
		document.F.CYA1oz.value=document.F.CYA1vol.value=
			document.F.CYA2oz.value=0;
		if (parseInt(document.F.CYAfrom.value) >
			parseInt(document.F.CYAto.value)) document.F.CYApcnt.value=
				Math.floor(100-(parseInt(document.F.CYAto.value)/
				parseInt(document.F.CYAfrom.value))*100+0.5) + "%";
		else document.F.CYApcnt.value="some";
		}
	}

function CalcSALT()
{
	var temp;

	if (parseInt(document.F.SALTfrom.value)<parseInt(document.F.SALTto.value)) {
		// Salt
		temp=(parseInt(document.F.SALTto.value)-
			parseInt(document.F.SALTfrom.value)) *
			GetGallons() / 7468.64;
		document.F.SALTlb.value=PutLbs(temp);
		document.F.SALTpcnt.value="some";
		}
	else {
		document.F.SALTlb.value=0;
		if (parseInt(document.F.SALTfrom.value) >
			parseInt(document.F.SALTto.value)) document.F.SALTpcnt.value=
				Math.floor(100-(parseInt(document.F.SALTto.value)/
				parseInt(document.F.SALTfrom.value))*100+0.5) + "%";
		else document.F.SALTpcnt.value="some";
		}
	}

function CalcBOR()
{
	var bormul = [ 849.271, 1309.52, 1111.69 ];
	var temp;

	document.F.PHBOR.value=parseInt(document.F.BORfrom.value);
	if (parseInt(document.F.BORfrom.value) < parseInt(document.F.BORto.value)) {
		// Borax & boric acid
		temp=(parseInt(document.F.BORto.value)-
			parseInt(document.F.BORfrom.value)) *
			GetGallons() / bormul[document.F.BORpop.selectedIndex];
		document.F.BORoz.value=PutWeight(temp);
		if (document.F.BORpop.selectedIndex==1) {
			document.F.BORvol.value=PutVolume(temp * 1.075);
			document.F.BORacid.value=0;
			}
		else if (document.F.BORpop.selectedIndex==2) {
			document.F.BORvol.value=PutVolume(temp * 0.5296);
			document.F.BORacid.value=PutVolume(temp * 0.624);	// Muriatic acid
			}
		else {
			document.F.BORvol.value=PutVolume(temp * 0.9586);
			document.F.BORacid.value=PutVolume(temp * 0.4765);	// Muriatic acid
			}
		document.F.BORpcnt.value="some";
		}
	else {
		document.F.BORoz.value=document.F.BORvol.value=0;
		document.F.BORacid.value=0;
		if (parseInt(document.F.BORfrom.value) >
			parseInt(document.F.BORto.value)) document.F.BORpcnt.value=
				Math.floor(100-(parseInt(document.F.BORto.value)/
				parseInt(document.F.BORfrom.value))*100+0.5) + "%";
		else document.F.BORpcnt.value="some";
		}
	}

function CSI(PH,TA,CH,CYA,Salt,Borate,Temp)
{
	var Sodium, extra_NaCl, CarbAlk, Ionic, TDS, CSI;

	if (PH<6 || PH>9 || isNaN(PH)) return("PH Err");
	TA=parseInt(TA);
	CH=parseInt(CH);
	CYA=parseInt(CYA)
	Salt=parseInt(Salt);
	Borate=parseInt(Borate);
	if (document.F.Units.selectedIndex!=1) Temp=(parseInt(Temp)-32)*5/9;
	else Temp=parseInt(Temp);
//	if (Salt<=0) Salt = CH*1.1678 + TA*1.6859 + Borate*2.6976;
//	Sodium = 23*( (TA - CYA/3)*2/100 + CYA/129 + Salt/58.4 - 2*CH/100 );
//	TDS = CH*(40/100) + (TA - CYA/3)*2*(61/100) + CYA*(128/129) +
//		Borate*(61.8/10.8) + Salt*(35.5/58.4) + Sodium;
	CarbAlk = TA - 0.38772*CYA/(1+Math.pow(10,6.83-PH)) -
		4.63*Borate/(1+Math.pow(10,9.11-PH));
//	extra_NaCl = TDS - (1.109*CH + 1.679*CarbAlk + CYA);
	extra_NaCl = Salt - 1.1678*CH;
	if (extra_NaCl<0) extra_NaCl=0;
	Ionic = (1.5*CH+1*TA)/50045 + extra_NaCl/58440;
	CSI = PH-11.677 + Math.log(CH)/Math.LN10 + Math.log(CarbAlk)/Math.LN10 -
		2.56*Math.sqrt(Ionic)/(1+1.65*Math.sqrt(Ionic)) - 
		1412.5/(Temp+273.15) + 4.7375;
	return(Math.floor(CSI*100+0.5)/100);
	}

function CalcCSIfrom()
{
	document.F.CSIfrom.value=CSI(document.F.PHfrom.value,
		document.F.TAfrom.value,document.F.CHfrom.value,
		document.F.CYAfrom.value,document.F.SALTfrom.value,
		document.F.BORfrom.value,document.F.TEMP.value);
	document.F.Status1.value=document.F.Status2.value="";
	}

function CalcCSIto()
{
	document.F.CSIto.value=CSI(document.F.PHto.value,
		document.F.TAto.value,document.F.CHto.value,
		document.F.CYAto.value,document.F.SALTto.value,
		document.F.BORto.value,document.F.TEMP.value);
	document.F.Status1.value=document.F.Status2.value="";
	SaveSettings();
	}

function CalcSUG()
{
	var cya;

	cya=parseInt(document.F.CYAfrom.value);
	document.F.SUGFCswg.value=Math.max(1,Math.floor(cya*0.045+0.7));
	document.F.SUGFCmin.value=Math.max(1,Math.floor(cya*0.075+0.7));
	document.F.SUGFCtarg.value=Math.max(3,Math.floor(cya/10+3.5));
	document.F.SUGFCshock.value=Math.max(10,Math.floor(cya/6+8.5));
	document.F.SUGFCmust.value=Math.max(12,Math.floor(cya/2+4.5));
	if (document.F.FROMpop.selectedIndex==0)
		document.getElementById("FCgoal").innerHTML="Not Setup";
	else if (document.F.FROMpop.selectedIndex==3)
		document.getElementById("FCgoal").innerHTML="1 to 6";
	else document.getElementById("FCgoal").innerHTML=
		((document.F.CHLORINEpop.selectedIndex==2)?
		  document.F.SUGFCswg.value:document.F.SUGFCmin.value)+
		" to "+document.F.SUGFCtarg.value;
	}

function CalcGOAL()
{
	var from, chlorine, surface;

	CalcSUG();
	from=document.F.FROMpop.selectedIndex;
	chlorine=document.F.CHLORINEpop.selectedIndex;
	document.F.CHLORINEpop.disabled=(from==3);
	surface=document.F.SURFACEpop.selectedIndex;
	document.F.SURFACEpop.disabled=(from==3);
	if (from==0 || (from==2 && (chlorine==0 || surface==0))) {
		document.getElementById("PHgoal").innerHTML="Not Setup";
		document.getElementById("TAgoal").innerHTML="Not Setup";
		document.getElementById("CHgoal").innerHTML="Not Setup";
		document.getElementById("CYAgoal").innerHTML="Not Setup";
		}
	else if (from==1) {
		document.getElementById("PHgoal").innerHTML="7.2 to 7.8";
		document.getElementById("TAgoal").innerHTML="80 to 120";
		document.getElementById("CHgoal").innerHTML="200 to 400";
		document.getElementById("CYAgoal").innerHTML="30 to 80";
		}
	else if (from==2) {
		document.getElementById("PHgoal").innerHTML="7.5 to 7.8";
		document.getElementById("TAgoal").innerHTML=(chlorine==1)?
			"70 to 90+":(chlorine==2)?"60 to 80":"100 to 120+";
		document.getElementById("CHgoal").innerHTML=(surface==1)?
			"250 to 350":(surface==2)?"50 to 300":"220 to 320";
		document.getElementById("CYAgoal").innerHTML=(chlorine==2)?
			"70 to 80":"30 to 50";
		}
	else if (from==3) {
		document.getElementById("PHgoal").innerHTML="7.4 to 7.8";
		document.getElementById("TAgoal").innerHTML="50 to 80";
		document.getElementById("CHgoal").innerHTML="120 to 200";
		document.getElementById("CYAgoal").innerHTML="20 to 40";
		}
	}

function CalcSZ()
{
	var volmult = [7.48052, 7.48052, 5.87518];
	var temp, wid, len;

	wid=parseFloat(document.F.SZwid.value);
	len=parseFloat(document.F.SZlen.value);
	if (document.F.SZpop.selectedIndex==2) {
		len=wid;
		document.F.SZlen.style.color=document.F.SZunit2.style.color="#BBBBBB";
		document.F.SZlen.readOnly=true;
		}
	else {
		document.F.SZlen.style.color=document.F.SZunit2.style.color="#000000";
		document.F.SZlen.readOnly=false;
		}
	if (document.F.SZpop.selectedIndex==1 && len<wid) {
		temp=wid;
		wid=len;
		len=temp;
		}
	temp=wid*len;
	if (document.F.SZpop.selectedIndex==1) temp=temp - 0.214602*wid*wid;
	temp=temp * parseFloat(document.F.SZdeep.value) *
		volmult[document.F.SZpop.selectedIndex];
	document.F.SZvol.value=PutGallons(temp);
	SaveSettings();
	}

var eff_units = [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
				  1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 0, 2 ];
		// 0-volume(oz,ml), 1-weight(oz,g), 2-weight(lbs,kg)
		
function Format(value)
{
	if (value<9.95) return(Math.floor(value*10+0.5)/10);
	else return(Math.floor(value+0.5));
	}

function CalcEFF()
{
	var oz, unit, result;


	oz=parseFloat(document.F.EFFoz.value);
	unit=eff_units[document.F.EFFpop.selectedIndex];
	if (document.F.Units.selectedIndex==1) {		// Metric
		if (unit==1) {
			document.F.EFFunit.value="g";
			oz=oz*0.035274;
			}
		else if (unit==2) {
			document.F.EFFunit.value="kg";
			oz=oz*2.20462;
			}
		else {
			document.F.EFFunit.value="ml";
			oz=oz*0.033814;
			}
		}
	else if (document.F.Units.selectedIndex==2) {	// Imperial
		if (unit==2) document.F.EFFunit.value="lbs";
		else {
			document.F.EFFunit.value="oz";
			if (unit==0) oz=oz*0.96076;
			}
		}
	else {											// U.S.
		if (unit==2) document.F.EFFunit.value="lbs";
		else document.F.EFFunit.value="oz";
		}
	switch (document.F.EFFpop.selectedIndex) {

	case 0:					// 5.25% bleach
		oz=oz*525/600;
	case 1:					// 6% bleach
		oz=oz*600/825;
	case 2:					// 8.25% bleach
		oz=oz*0.84867552;
	case 3:					// 10% bleach
		oz=oz*100/125;
	case 4:					// 12.5% bleach
		result="raise FC by "+Format(oz / GetGallons() * 976.562);
		result=result+" and raise Salt by "+Format(oz / GetGallons() *
			1607);
		break;
	case 5:					// trichlor
		result="raise FC by "+Format(oz / GetGallons() * 6854.95);
		result=result+", raise CYA by "+Format(oz / GetGallons() *
			4159.41);
		result=result+", lower pH by "+Math.floor(oz / GetGallons() *
			367 * 100 + 0.5) / 100;
		result=result+", and raise Salt by "+Format(oz / GetGallons() *
			5600);
		break;
	case 6:					// dichlor
		result="raise FC by "+Format(oz / GetGallons() * 4149.03);
		result=result+", raise CYA by "+Format(oz / GetGallons() *
			3776.46);
		result=result+", lower pH by "+Math.floor(oz / GetGallons() *
			158 * 100 + 0.5) / 100;
		result=result+", and raise Salt by "+Format(oz / GetGallons() *
			3384);
		break;
	case 7:					// 48% cal-hypo
		oz=oz*48/53;
	case 8:					// 53% cal-hypo
		oz=oz*53/65;
	case 9:					// 65% cal-hypo
		oz=oz*65/73;
	case 10:					// 73% cal-hypo
		result="raise FC by "+Format(oz / GetGallons() * 5422.41);
		result=result+", raise CH by "+Format(oz / GetGallons() *
			3827.09);
		result=result+", and raise Salt by "+Format(oz / GetGallons() *
			5500);
		break;
	case 11:					// lithium hypochlorite
		result="raise FC by "+Format(oz / GetGallons() * 2637.5);
		result=result+" and raise Salt by "+Format(oz / GetGallons() *
			4170);
		break;
	case 12:				// chlorine gas
		result="raise FC by "+Format(oz / GetGallons() * 7489.4);
		result=result+", lower pH by "+Math.floor(oz / GetGallons() * 625 * 
			100 + 0.5) / 100;
		result=result+", and raise Salt by "+Format(oz / GetGallons() *
			6140);
		break;
	case 13:				// 15.725% muriatic acid
		oz=oz/2;
	case 14:				// 31.45% muriatic acid
		result="lower pH by "+Math.floor(oz / GetGallons() * 240.15 * 
			100 + 0.5) / 100;
		result=result+" and lower TA by "+Format(oz / GetGallons() *
			3911.47);
		break;
	case 15:				// dry acid
		result="lower pH by "+Math.floor(oz / GetGallons() * 167.9 * 
			100 + 0.5) / 100;
		result=result+" and lower TA by "+Format(oz / GetGallons() *
			2909.47);
		break;
	case 16:				// washing soda or soda ash
		result="raise pH by "+Math.floor(oz / GetGallons() * 217.1 * 
			100 + 0.5) / 100;
		result=result+" and raise TA by "+Format(oz / GetGallons() *
			7072.46);
		break;
	case 17:				// borax (20 Mule Team)
		result="raise pH by "+Math.floor(oz / GetGallons() * 109.1 * 
			100 + 0.5) / 100;
		result=result+", raise Borate by "+Format(oz / GetGallons() *
			849.271);
		result=result+", and raise TA by "+Format(oz / GetGallons() *
			1949.93);
		break;
	case 18:				// sodium tetraborate pentahydrate
		result="raise pH by "+Math.floor(oz / GetGallons() * 166.8 * 
			100 + 0.5) / 100;
		result=result+", raise Borate by "+Format(oz / GetGallons() *
			1111.69);
		result=result+", and raise TA by "+Format(oz / GetGallons() *
			2548.89);
		break;
	case 19:				// boric acid
		result="raise Borate by "+Format(oz / GetGallons() * 1309.52);
		result=result+" and lower PH by "+Math.floor(oz / GetGallons() * 
			7.559 * 100 + 0.5) / 100;
		break;
	case 20:				// caustic soda (lye)
		result="raise pH by "+Math.floor(oz / GetGallons() * 546.3 * 
			100 + 0.5) / 100;
		result=result+" and raise TA by "+Format(oz / GetGallons() *
			9135.78);
		break;
	case 21:				// baking soda
		result="raise TA by "+Format(oz / GetGallons() * 4461.56);
		result=result+" and raise pH by "+Math.floor(oz / GetGallons() *
			9.091 * 100 + 0.5) / 100;
		break;
	case 22:				// calcium chloride
		result="raise CH by "+Format(oz / GetGallons() * 6754.11);
		break;
	case 23:				// calcium chloride dihydrate
		result="raise CH by "+Format(oz / GetGallons() * 5098.82);
		break;
	case 24:				// stabilizer
		result="raise CYA by "+Format(oz / GetGallons() * 7489.51);
		result=result+" and lower pH by "+Math.floor(oz / GetGallons() *
			138.8 * 100 + 0.5) / 100;
		break;
	case 25:				// liquid stabilizer
		result="raise CYA by "+Format(oz / GetGallons() * 2890);
		break;
	case 26:				// salt
		result="raise Salt by "+Format(oz / GetGallons() * 7468.64 *
			16);
		break;
		}
	document.F.EFFresult.value=result+".";
	SaveSettings();
	}

function CalcEFFUnits(new_unit,old)
{
	var unit=eff_units[document.F.EFFpop.selectedIndex];
	var factor;

	if (new_unit==0) {
		if (old==1) {				// Metric to US
			if (unit==0) factor=0.033814;		// Liquid
			else if (unit==1) factor=0.035274;	// Weight
			else if (unit==2) factor=2.20462;	// Lbs/kg
			}
		else if (old==2) {			// Imperial to US
			if (unit==0) factor=0.96076;		// Liquid
			else if (unit==1) factor=1;			// Weight
			else if (unit==2) factor=1;			// Lbs/kg
			}
		}
	else if (new_unit==1) {
		if (old==0) {				// US to Metric
			if (unit==0) factor=29.5735;		// Liquid
			else if (unit==1) factor=28.3495;	// Weight
			else if (unit==2) factor=0.453592;	// Lbs/kg
			}
		else if (old==2) {			// Imperial to Metric
			if (unit==0) factor=28.4131;		// Liquid
			else if (unit==1) factor=28.3495;	// Weight
			else if (unit==2) factor=0.453592;	// Lbs/kg
			}
		}
	else if (new_unit==2) {
		if (old==0) {				// US to Imperial
			if (unit==0) factor=1.04084;		// Liquid
			else if (unit==1) factor=1;			// Weight
			else if (unit==2) factor=1;			// Lbs/kg
			}
		else if (old==1) {			// Metric to Imperial
			if (unit==0) factor=0.0351951;		// Liquid
			else if (unit==1) factor=0.035274;	// Weight
			else if (unit==2) factor=2.20462;	// Lbs/kg
			}
		}
	document.F.EFFoz.value=Math.floor(parseFloat(document.F.EFFoz.value)*
		factor + 0.5);
	}

function CalcAll()
{
	CalcFC();
	CalcPH();
	CalcTA();
	CalcCH();
	CalcCYA();
	CalcSALT();
	CalcBOR();
	CalcCSIfrom();
	CalcCSIto();
	CalcSUG();
	CalcGOAL();
	CalcSZ();
	CalcEFF();
	document.F.Status1.value=document.F.Status2.value="";
	}

function CalcUnits()
{
	if (document.F.Units.selectedIndex==1) {
		document.F.SIZEunit.value="liters";
		document.F.TEMPunit.value="Celsius";
		document.F.SZunit1.value=document.F.SZunit2.value=
			document.F.SZunit3.value="m";
		document.F.FCjug.options[0].text="900 milliliters";
		document.F.FCjug.options[1].text="2.0 liter";
		document.F.FCjug.options[2].text="2.8 liter";
		document.F.FCjug.options[3].text="3.6 liter";
		document.F.FCjug.options[4].text="3.8 liter";
		document.F.FCjug.options[5].text="5.1 liter";
		document.F.FCjug.options[6].text="5.4 liter";
		if (old_unit==0) document.F.SIZE.value=
			Math.floor(parseInt(document.F.SIZE.value)*3.78541+0.5);
		else if (old_unit==2) document.F.SIZE.value=
			Math.floor(parseInt(document.F.SIZE.value)*4.54609+0.5);
		if (old_unit!=1) document.F.TEMP.value=
			Math.floor((parseInt(document.F.TEMP.value)-32)*5/9+0.5);
		}
	else {
		document.F.SIZEunit.value="gallons";
		document.F.TEMPunit.value="Fahrenheit";
		document.F.SZunit1.value=document.F.SZunit2.value=
			document.F.SZunit3.value="ft";
		document.F.FCjug.options[0].text="30 oz";
		document.F.FCjug.options[1].text="64 oz";
		document.F.FCjug.options[2].text="96 oz";
		document.F.FCjug.options[3].text="121 oz";
		document.F.FCjug.options[4].text="128 oz";
		document.F.FCjug.options[5].text="174 oz";
		document.F.FCjug.options[6].text="182 oz";
		if (document.F.Units.selectedIndex==2) {
			if (old_unit==0) document.F.SIZE.value=
				Math.floor(parseInt(document.F.SIZE.value)*0.832674+0.5);
			else if (old_unit==1) document.F.SIZE.value=
				Math.floor(parseInt(document.F.SIZE.value)*0.219969+0.5);
			}
		else {
			if (old_unit==1) document.F.SIZE.value=
				Math.floor(parseInt(document.F.SIZE.value)*0.264172+0.5);
			else if (old_unit==2) document.F.SIZE.value=
				Math.floor(parseInt(document.F.SIZE.value)*1.20095+0.5);
			}
		if (old_unit==1) document.F.TEMP.value=
			Math.floor(parseInt(document.F.TEMP.value)*9/5+0.5)+32;
		}
	CalcEFFUnits(document.F.Units.selectedIndex,old_unit);
	CalcAll();
	old_unit=document.F.Units.selectedIndex;
	}

function StatusWeight(oz)
{
	oz=parseFloat(oz);
	if (document.F.Units.selectedIndex==1) {
		if (oz==0) document.F.Status1.value="None";
		else {
			if (oz>10000) oz=Math.floor((oz+500)/1000)*1000;
			else if (oz>1000) oz=Math.floor((oz+50)/100)*100;
			else if (oz>100) oz=Math.floor((oz+5)/10)*10;
			document.F.Status1.value=oz/1000+" kg";
			}
		}
	else {
		if (oz<0) document.F.Status1.value=oz+" oz";
		else if (oz==0) document.F.Status1.value="None";
		else {
			if (oz>=16) {
				if (oz>10*16) oz=Math.floor((oz+8)/16)*16;
				document.F.Status1.value=(Math.floor(oz/16))+" lb";
				if (oz>=2*16)
					document.F.Status1.value=document.F.Status1.value+"s";
				oz=oz-Math.floor(oz/16)*16;
				if (oz>0) 
					document.F.Status1.value=document.F.Status1.value+" ";
				}
			else document.F.Status1.value="";
			if (oz>0) document.F.Status1.value=document.F.Status1.value+
				oz+" oz";
			}
		}
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusVolume(oz)
{
	var div, tsp;

	oz=parseFloat(oz);
	if (document.F.Units.selectedIndex==1) {
		if (oz==0) document.F.Status1.value="None";
		else {
			if (oz>10000) oz=Math.floor((oz+500)/1000)*1000;
			else if (oz>1000) oz=Math.floor((oz+50)/100)*100;
			else if (oz>100) oz=Math.floor((oz+5)/10)*10;
			document.F.Status1.value=oz/1000+" liters";
			}
		}
	else {
		if (oz<0) document.F.Status1.value=oz+" oz";
		else if (oz==0) document.F.Status1.value="None";
		else {
			if (document.F.Units.selectedIndex==2) {
				div=160;
				tsp=0.5/4.8;
				}
			else {
				div=128;
				tsp=0.5/6;
				}
			if (oz>10*div) oz=Math.floor((oz+div/2)/div)*div;
			else if (oz>10*div/4) oz=Math.floor((oz+div/8)/(div/4))*(div/4);
			else if (oz>10*div/16) oz=Math.floor((oz+div/32)/(div/16))*(div/16);
			if (oz>=div) {
				document.F.Status1.value=(Math.floor(oz/div))+" gallon";
				if (oz>=2*div) document.F.Status1.value=
					document.F.Status1.value+"s";
				oz=oz-Math.floor(oz/div)*div;
				if (oz>0) document.F.Status1.value=document.F.Status1.value+" ";
				}
			else document.F.Status1.value="";
			div=div/4;
			if (oz>=div) {
				document.F.Status1.value=document.F.Status1.value+
					Math.floor(oz/div)+" quart";
				if (oz>=2*div) document.F.Status1.value=
					document.F.Status1.value+"s";
				oz=oz-Math.floor(oz/div)*div;
				if (oz>0) document.F.Status1.value=document.F.Status1.value+" ";
				}
			div=div/4;
			if (oz>=div) {
				document.F.Status1.value=document.F.Status1.value+
					Math.floor(oz/div)+" cup";
				if (oz>=2*div) document.F.Status1.value=
					document.F.Status1.value+"s";
				oz=oz-Math.floor(oz/div)*div;
				if (oz>0) document.F.Status1.value=document.F.Status1.value+" ";
				}
			if (oz>=1-tsp) {
				document.F.Status1.value=document.F.Status1.value+
					Math.floor(oz+tsp)+" oz";
				oz=oz-Math.floor(oz+tsp);
				if (oz<0) oz=0;
				if (oz>=tsp) document.F.Status1.value=
					document.F.Status1.value+" ";
				}
			if (oz>=tsp) document.F.Status1.value=document.F.Status1.value+
				Math.floor((oz+tsp)/(tsp*2))+" tsp";
			}
		}
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusBleach(oz)
{
	var jugoz = [30, 64, 96, 121, 128, 174, 182];
	var jugliter = [900, 2000, 2800, 3600, 3800, 5100, 5400];
	var jug;

	StatusVolume(oz);
	oz=parseInt(oz);
	if (document.F.Units.selectedIndex==1) {
		jug=jugliter[document.F.FCjug.selectedIndex];
		if (oz>=jug) {
			if (oz>jug*10) document.F.Status1.value=document.F.Status1.value+
				" or "+ Math.floor((oz+jug/2)/jug)+" ("+jug/1000+" liter) jugs";
			else document.F.Status1.value=document.F.Status1.value+" or "+
				Math.floor(oz/jug*10+0.5)/10+" ("+jug/1000+" liter) jugs";
			}
		}
	else {
		jug=jugoz[document.F.FCjug.selectedIndex];
		if (oz>=jug) {
			if (oz>jug*10) document.F.Status1.value=document.F.Status1.value+
				" or "+ Math.floor((oz+jug/2)/jug)+" ("+jug+" oz) jugs";
			else document.F.Status1.value=document.F.Status1.value+" or "+
				Math.floor(oz/jug*10+0.5)/10+" ("+jug+" oz) jugs";
			}
		}
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusPcnt(value)
{
	if (isNaN(parseInt(value))) 
		document.F.Status1.value="No water replacement required.";
	else document.F.Status1.value="Replace "+value+" of your water.";
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusBorax(oz)
{
	StatusWeight(oz);
	oz=parseInt(oz);
	if (document.F.Units.selectedIndex==1) oz/=28.3495;
	if (oz>=76) {
		document.F.Status1.value=document.F.Status1.value+" or "+
			Math.floor(oz/76*10+0.5)/10+" (76 oz) boxes";
		document.F.Status2.value=document.F.Status1.value;
		}
	}

function StatusBags(lbs)
{
	lbs=parseInt(lbs);
	if (document.F.Units.selectedIndex==1) {
		if (lbs<0) document.F.Status1.value=lbs+" kg(s)";
		else if (lbs==0) document.F.Status1.value="None";
		else {
			if (lbs>=25) {
				if (lbs>10*25) lbs=Math.floor((lbs+25/2)/25)*25;
				document.F.Status1.value=(Math.floor(lbs/25))+" (25 kg) bag";
				if (lbs>=50)
					document.F.Status1.value=document.F.Status1.value+"s";
				lbs=lbs-Math.floor(lbs/25)*25;
				if (lbs>0) document.F.Status1.value=document.F.Status1.value+
					" and ";
				}
			else document.F.Status1.value="";
			if (lbs>0) document.F.Status1.value=document.F.Status1.value+lbs+" kg(s)";
			}
		}
	else {
		if (lbs<0) document.F.Status1.value=lbs+" lb(s)";
		else if (lbs==0) document.F.Status1.value="None";
		else {
			if (lbs>=40) {
				if (lbs>10*40) lbs=Math.floor((lbs+40/2)/40)*40;
				document.F.Status1.value=(Math.floor(lbs/40))+" (40 lb) bag";
				if (lbs>=80)
					document.F.Status1.value=document.F.Status1.value+"s";
				lbs=lbs-Math.floor(lbs/40)*40;
				if (lbs>0) document.F.Status1.value=document.F.Status1.value+
					" and ";
				}
			else document.F.Status1.value="";
			if (lbs>0) document.F.Status1.value=document.F.Status1.value+
				lbs+" lb(s)";
			}
		}
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusCSI(value)
{
	value=parseFloat(value);
	if (value <= -0.6) document.F.Status1.value="Corrosion of plaster likely";
	else if (value <= -0.3) document.F.Status1.value="Potential to become corrosive to plaster";
	else if (value < 0.3) document.F.Status1.value="Balanced";
	else if (value < 0.6) document.F.Status1.value="Potential to become scaling";
	else if (value >= 0.6) document.F.Status1.value="Scaling likely";
	else document.F.Status1.value="Invald Inputs";
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusSUG(name,value)
{
	document.F.Status1.value=name+" FC target "+value;
	document.F.Status2.value=document.F.Status1.value;
	}

function StatusEFF()
{
	var oz, unit;

	oz=parseInt(document.F.EFFoz.value);
	unit=eff_units[document.F.EFFpop.selectedIndex];
	if (unit==1) StatusWeight(oz);
	else if (unit==2) StatusBags(oz);
	else StatusVolume(oz);
	}

var GoToField;

function DoGoTo()
{
	GoToField.focus();
	GoToField.select();
	}

function GoTo(field)
{
	GoToField=field;
	setTimeout('DoGoTo()', 50);
	}

function DoLoaded()
{
	RestoreSettings();
	ls="/log____image.gif?summarylog&je="+navigator.javaEnabled()+
		"&sw="+screen.width+"&sh="+screen.height;
	if (screen.pixelDepth) ls+="&sd="+screen.pixelDepth;
	else if (screen.colorDepth) ls+="&sd="+screen.colorDepth;
	if (navigator.language) ls+="&la="+navigator.language;
	else if (navigator.userLanguage) ls+="&la="+navigator.userLanguage;
	if (!document.all) {
		document.cookie="log____cc=1";
		ls+="&co="+(document.cookie?true:false);
		}
	else ls+="&co="+navigator.cookieEnabled;
	if (window.innerWidth) {
		ls+="&ww="+window.innerWidth;
		ls+="&wh="+window.innerHeight;
		}
	else if (document.documentElement && document.documentElement.clientWidth) {
		ls+="&ww="+document.documentElement.clientWidth;
		ls+="&wh="+document.documentElement.clientHeight;
		}
	else if (document.body && document.body.clientWidth) {
		ls+="&ww="+document.body.clientWidth;
		ls+="&wh="+document.body.clientHeight;
		}
	li=new Image();
	li.src=ls;
	}


