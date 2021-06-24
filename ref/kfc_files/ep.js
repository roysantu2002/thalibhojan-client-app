var trc = (function(){
	function getCookie(name)
    {
        try {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++)
            {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0)
                    return c.substring(nameEQ.length, c.length);
            }
        } catch (e) {
            console.log('error in get cookie ' + e);
        }
        return null;
    }
	
	function setCookie(name, value, days)
    {
        try
        {
            var domain, date, expires, host;
            if (days)
            {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else
            {
                expires = "";
            }
            //host = location.host;
            document.cookie = name + "=" + value + expires + ";Path=/";
	    } catch (e) {
            console.log('error in setcookie ' + e);
        }
    }
	function gt(par, url) {
		try{
		var vars = {};
			var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars.hasOwnProperty(par) ? vars[par] : '';
		}catch(e){
			return '';
		}
	}
	
	function fpx(pixelId,type){
		try{
			var url = window.location.href;
			console.log(pixelId,type,url)
			if(pixelId != ""){
				var ad = '';
			   if(url != ''){	
				var adv = '';
				if(type == 'fp'){
					adv = getCookie('acf');	
				} else {
					adv = gt("ad", url);	
					setCookie('acf',adv);
				}
				if(adv != ''){
					ad = '&ad='+adv;
				 }
				}	
				var colombiaPixelURL = 'https://ade.clmbtech.com/cde/eventTracking.htm?pixelId='+ pixelId+'&_w=1'+ad+'&rd='+new Date().getTime();
				(new Image()).src = colombiaPixelURL;
			}
			return true;
		}catch(e){console.log(e)}
		return false;
	}	
	return {
		fpx:fpx
	}
})()