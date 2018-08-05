

var PHLib = (function () {
	
	function restDays(startDate,numberOfDays)
	{
		var returnDate = new Date(
								startDate.getFullYear(),
								startDate.getMonth(),
								startDate.getDate()-numberOfDays,
								startDate.getHours(),
								startDate.getMinutes(),
								startDate.getSeconds());
		return returnDate;
	}
	function addDays(startDate,numberOfDays)
	{
		var returnDate = new Date(
								startDate.getFullYear(),
								startDate.getMonth(),
								startDate.getDate()+numberOfDays,
								startDate.getHours(),
								startDate.getMinutes(),
								startDate.getSeconds());
		return returnDate;
	}
    function dayFromToday(day,next) {
		var daysUS = {'Sunday':0, 'Monday':1, 'Tuesday':2, 'Wednesday':3, 'Thursday':4, 'Friday':5, 'Saturday':6};
		var daysES = {'Domingo':0, 'Lunes':1, 'Martes':2, 'Miercoles':3, 'Jueves':4, 'Viernes':5, 'Sabado':6};
		var vDay=daysES[day]
		
		if(typeof vDay=='undefined'){
			vDay=daysUS[day]
		}
		
		var dayList=[];
		dayList.push(new Date())
		
		for(var i=1;i<=7;i++){
			var newdate;
			if(next=="-"){
				newdate = restDays(dayList[i-1],1);
			}
			if(next=="+"){
				newdate = addDays(dayList[i-1],1);
			}
			if(newdate.getDay()==vDay){
				return newdate;
			}
			dayList.push(newdate);
		}
    }
    function formatNumber(nro,mil,decimal){
		var res= nro.toString().replace(/\B(?=(\d{3})+(?!\d))/g, mil);
		var aNro=res.split(decimal)
		
		var decimalPadding;
		if(typeof aNro[1]=='undefined'){
			aNro[1]=0
		}
		decimalPadding=paddingRight(aNro[1],"0",2)
		
		return aNro[0]+decimal+decimalPadding;
	}
	
	function paddingRight(s, c, n) {
		s=s.toString();
	  if (! s || ! c || s.length >= n) {
		return s;
	  }
	  var max = (n - s.length)/c.length;
	  for (var i = 0; i < max; i++) {
		s += c;
	  }
	  return s;
	}
	function convertDateToNumber(value,format){
		if (format.toUpperCase()=="YYMMDD"){
			return parseInt(value.substring(4,6)+value.substring(2,4)+ value.substring(0,2))
		}
		return null;
	}
	function getCustomDay(format,separador){
		separador=(typeof separador =='undefined') ? '' : separador;

		var date = new Date();
		var pad="00";
		var padYear="0000";
		
			
		var min	= date.getMinutes().toString();
		var hour	= date.getHours().toString();
			
			
		var day=date.getDate().toString();
		var mes=(date.getMonth() +1).toString();
		var year=date.getFullYear().toString();
			day=pad.substring(0, pad.length - day.length)+day;
			mes=pad.substring(0, pad.length - mes.length)+mes;
			
			hour=pad.substring(0, pad.length - hour.length)+hour;
			min=pad.substring(0, pad.length - min.length)+min;
			
		if(format.toUpperCase()=="YYYYMMDDMMSS"){
			year=year.substring(0, 4);
			year=padYear.substring(0, padYear.length - year.length)+year;
			return year+separador+ mes+separador+day+separador+hour+separador+min;
		}
		if(format.toUpperCase()=="YYMMDDMMSS"){
			year=year.substring(2, 4);
			year=pad.substring(0, pad.length - year.length)+year;
			return year+separador+ mes+separador+day+separador+hour+separador+min;
		}
		
		year=year.substring(2, 4);
		return day+separador+mes+separador+year;
    };
	
	
	return {
        dayFromToday: dayFromToday,
		formatNumber: formatNumber,
		paddingRight:paddingRight,
		convertDateToNumber: convertDateToNumber,
		getCustomDay:getCustomDay
    };
})();



var day=PHLib.dayFromToday("Lunes","-");
console.log("Day -> ",day)

var test_Padding=PHLib.paddingRight(33.59,"0",2);
console.log("test_Padding -> ",test_Padding)


var test_number=23101808
var day=PHLib.formatNumber(test_number.toString(),",",".");
console.log("day -> ",day)


function convertDateToNumber(value,format){
    if (format.toUpperCase()=="YYMMDD"){
        return parseInt(value.substring(4,6)+value.substring(2,4)+ value.substring(0,2))
    }
    if (format.toUpperCase()=="YYMMDDHHMM"){
        return parseInt(
                value.substring(4,6)+value.substring(2,4)+ value.substring(0,2) + 
				value.substring(6,8)+value.substring(8,10)
        )
    }

    return null;
}

console.log( " fecha1 -> ",PHLib.convertDateToNumber("130717",'yymmdd'))
console.log( " fecha2 *** -> ", convertDateToNumber("1210171313",'yymmddhhmm'))
console.log( " Dia -> ",PHLib.getCustomDay("yymmddhhmm",""))
 
