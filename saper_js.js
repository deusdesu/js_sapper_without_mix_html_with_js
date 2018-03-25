var ilosc_bomb=59;
var czy_1_klikniecie = false;
var klikniety_kafelek;

function wielkosc_pola() {
	 czy_1_klikniecie = false
	 width_x = document.getElementById("width_x").value; 
	 width_x=width_x/1;
	 height_y = document.getElementById("height_y").value;
	 height_y=height_y/1;
	// ilosc_bomb = (width_x * height_y)/10;     10% z maksymalnej ilosci bomb
	 if(ilosc_bomb > (width_x * height_y)) ilosc_bomb = (width_x * height_y)/10; 
	 obiekt= new Array(width_x * height_y);
	 tablica_bomb = new Array(width_x * height_y);
			for(i=0;i<width_x * height_y;i++)
			{
				tablica_bomb[i]=0;
			}
	 kafelek=""; //po każdym kliknięciu zmienne kafelek resetuje się
	

	
	
	
	// wstawia kafelki
	for(i=0;i<width_x * height_y;i++)
	{
	/*	wyznacz(i);*/
		if(i%width_x==0)kafelek=kafelek+'<div style="clear:both;"></div>';
		kafelek=kafelek+'<div class="defa1" id=id'+i+'></div>';  /* sprawdz_nr_id_kliknietego_elementu('+i+') */
	}
	kafelek=kafelek+'<div style="clear:both;"></div>';
	document.getElementById("tu_wstaw_kafelki_sapera").innerHTML=kafelek;
	
	//  ustawia kafelki na środku szerokości, wartości nie stą statyczne, lecz pobierane ze style.css ( tak naprawdę to z elementów na stronie ale cii)
		width_kafelka=document.getElementById("id0").offsetWidth;
	
		width_pola_z_kafelkami=document.getElementById("pole_sapera").offsetWidth; //szerokość pole_sapera
		
		margines_pomocniczy=(width_pola_z_kafelkami - width_kafelka * width_x ) / 2;
		
		document.getElementById("tu_wstaw_kafelki_sapera").style.marginLeft = margines_pomocniczy+"px";
		
	// to samo tylko z wysokością
		height_pola_z_kafelkami=document.getElementById("pole_sapera").offsetHeight; //wysokość pole_sapera
	
		margines_pomocniczy=(height_pola_z_kafelkami - width_kafelka * height_y )/2;
		document.getElementById("tu_wstaw_kafelki_sapera").style.marginTop = margines_pomocniczy+"px";
		
		for(i=0;i<width_x * height_y;i++){
			document.getElementById("id"+i).addEventListener("click", wyznacz_bomby );
		}

		okresl_obiekty();
		//wyznacz_bomby(); // funkcja wywoływana dopiero po kliknięciu w dany kafelek
			//------------------------------------------------
			
			//------------------------------------------------
			
			
			
			
			
}

			function okresl_obiekty(){
		
				//var width_x = document.getElementById("width_x").value; 
				//var height_y = document.getElementById("height_y").value;
				//var obiekt= new Array(width_x * height_y);
				
				for(i=0;i<width_x * height_y;i++){
					obiekt[i] = {
						stan: "default",
						bomba: 0,
						numer: 0
					}
				
				}
				
				//alert(obiekt[4].stan);
				
			}

			function wyznacz_bomby(event){
				 
				 klikniety_kafelek=event.target.id.slice(2); //id kliknietego elementu
				 klikniety_kafelek=klikniety_kafelek/1;
				 
				if(czy_1_klikniecie == false){
					 var unikat;
					 ilosc_powtorzen_w_petli=0;
					 max_liczb_wysolowana = (width_x * height_y) - 1;
					for(i=0;i<ilosc_bomb;i++){
						for(w=0;w<2;){
							unikat = Math.floor(Math.random()*width_x * height_y +0)
							if(tablica_bomb[unikat]==0 && unikat != klikniety_kafelek){
								tablica_bomb[unikat]=tablica_bomb[unikat]+1;
								w=4;
								//break;
							}
							
						}
						obiekt[unikat].bomba=obiekt[unikat].bomba+1;
					}
					wyznacz_numer();
					umiesc_bomby(); //funkcja testowa
					//modyfikuj_html();

				}
				czy_1_klikniecie = true;
			}
			
			function umiesc_bomby(){ 							//funkcja testowa
				for(i=0;i<width_x * height_y;i++){
					if(obiekt[i].bomba==1){
						document.getElementById("id"+i).style.backgroundColor="red";
					}
				}
				
			}
			// funkcia przyzjane obiektom numery w zależnosci od ilości bomb dookoła wg
			function wyznacz_numer(){ 
				for(i=0; i < width_x * height_y; i++){
					if(i == 0 && obiekt[i].bomba == 1){
						obiekt[i+1].numer++;
						obiekt[i+width_x].numer++;
						obiekt[i+width_x+1].numer++;
					}
					else if(i == width_x-1 && obiekt[i].bomba == 1){
						obiekt[i-1].numer++;
						obiekt[i+width_x].numer++;
						obiekt[i+width_x-1].numer++;
					}
					else if(i == width_x * (height_y-1) && obiekt[i].bomba == 1){
						obiekt[i+1].numer++;
						obiekt[i-width_x].numer++;
						obiekt[i-width_x+1].numer++;
					}
					
					else if(i == width_x * height_y - 1 && obiekt[i].bomba == 1){
						obiekt[i-1].numer++;
						obiekt[i-width_x].numer++;
						obiekt[i-width_x-1].numer++;
					}
					
					else if(i > 0 && i < width_x-1 && obiekt[i].bomba == 1){
						obiekt[i+width_x-1].numer++;
						obiekt[i+width_x].numer++;
						obiekt[i+width_x+1].numer++;
					}
					
					else if(i % width_x == 0 && obiekt[i].bomba == 1){
						obiekt[i-width_x+1].numer++;
						obiekt[i+1].numer++;
						obiekt[i+width_x+1].numer++;
					}
					
					else if((i+1) % width_x == 0 && obiekt[i].bomba == 1){
						obiekt[i-width_x-1].numer++;
						obiekt[i-1].numer++;
						obiekt[i+width_x-1].numer++;
					}
					
					else if(i > width_x * (height_y-1) && i < width_x * height_y - 1 && obiekt[i].bomba == 1){
						obiekt[i-width_x-1].numer++;
						obiekt[i-width_x].numer++;
						obiekt[i-width_x+1].numer++;
					}
					
					else if (obiekt[i].bomba == 1){
						obiekt[i-width_x-1].numer++;
						obiekt[i-width_x].numer++;
						obiekt[i-width_x+1].numer++;
						obiekt[i+1].numer++;
						obiekt[i-1].numer++;
						obiekt[i+width_x-1].numer++;
						obiekt[i+width_x].numer++;
						obiekt[i+width_x+1].numer++;
					}
				}
			}
			
			function modyfikuj_html(){
				for(i=0;i<width_x * height_y;i++){
					if(obiekt[i].numer != 0 && obiekt[i].bomba == 1){
						document.getElementById('id' + i);
					}
				
				}
			}
			
	/*
	na początku wypisuje pole kafelków
	tworzy obiekty o takich samych właściwościach:
	
					obiekt[i] = {
						stan: "default",
						bomba: 0,
						numer: ""
					}
					0 przy bomba oznacza, że nie ma bomby, 1, że jest, jeżeli ma wartość większą niż 1 to jest jakiś błąd w kodzie i polecam to sprawdzić XD
					
	wyznacza bomby, wyznaca numery, modyfikuje obiekty 
	
	wzorując się na obiektach zmienia innerHTML
	}
*/





function rand( min, max ){
    min = parseInt( min, 10 );
    max = parseInt( max, 10 );

    if ( min > max ){
        var tmp = min;
        min = max;
        max = tmp;
    }
	
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}