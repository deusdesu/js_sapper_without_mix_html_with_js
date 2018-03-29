var ilosc_bomb = 20;
var czy_1_klikniecie = false;
var klikniety_kafelek;
var nr_pomoc;


document.getElementById("input_button").addEventListener("click", wielkosc_pola);

function wielkosc_pola() {
    czy_1_klikniecie = false;
    width_x = document.getElementById("width_x").value;
    width_x = width_x / 1;
    height_y = document.getElementById("height_y").value;
    height_y = height_y / 1;

    //ilosc_bomb = (width_x * height_y) / 5; //10% z maksymalnej ilosci bomb
    if (ilosc_bomb - 9 > (width_x * height_y)) ilosc_bomb = (width_x * height_y) / 10;
    obiekt = [width_x * height_y];
    tablica_bomb = [width_x * height_y];
    for (i = 0; i < width_x * height_y; i++) {
        tablica_bomb[i] = 0;
    }
    kafelek = ""; //po każdym kliknięciu zmienne kafelek resetuje się




    // wstawia kafelki
    for (i = 0; i < width_x * height_y; i++) {
        /*	wyznacz(i);*/
        if (i % width_x == 0) kafelek = kafelek + '<div style="clear:both;"></div>';
        kafelek = kafelek + '<div class="defa1" id=id' + i + '></div>'; /* sprawdz_nr_id_kliknietego_elementu('+i+') */
    }
    kafelek = kafelek + '<div style="clear:both;"></div>';
    document.getElementById("tu_wstaw_kafelki_sapera").innerHTML = kafelek;

    //  ustawia kafelki na środku szerokości, wartości nie stą statyczne, lecz pobierane ze style.css ( tak naprawdę to z elementów na stronie ale cii)
    width_kafelka = document.getElementById("id0").offsetWidth;

    width_pola_z_kafelkami = document.getElementById("pole_sapera").offsetWidth; //szerokość pole_sapera

    margines_pomocniczy = (width_pola_z_kafelkami - width_kafelka * width_x) / 2;

    document.getElementById("tu_wstaw_kafelki_sapera").style.marginLeft = margines_pomocniczy + "px";

    // to samo tylko z wysokością
    height_pola_z_kafelkami = document.getElementById("pole_sapera").offsetHeight; //wysokość pole_sapera

    margines_pomocniczy = (height_pola_z_kafelkami - width_kafelka * height_y) / 2;
    document.getElementById("tu_wstaw_kafelki_sapera").style.marginTop = margines_pomocniczy + "px";

    //przyznaje każdemu kafelkowi click wyznacz_bomby()
    for (i = 0; i < width_x * height_y; i++) {
        document.getElementById("id" + i).addEventListener("click", wyznacz_bomby);
    }

    okresl_obiekty();
    //wyznacz_bomby(); // funkcja wywoływana dopiero po kliknięciu w dany kafelek
    //------------------------------------------------

    //------------------------------------------------



}

function okresl_obiekty() {

    //var width_x = document.getElementById("width_x").value; 
    //var height_y = document.getElementById("height_y").value;
    //var obiekt= new Array(width_x * height_y);

    for (i = 0; i < width_x * height_y; i++) {
        obiekt[i] = {
            stan: "default",
            bomba: 0,
            numer: 0
        }

    }

    //alert(obiekt[4].stan);

}

function wyznacz_bomby(event) {

    klikniety_kafelek = event.target.id.slice(2); //id kliknietego elementu
    klikniety_kafelek = klikniety_kafelek / 1;

    obiekt[klikniety_kafelek].stan = "klikniety";

    document.getElementById("id" + klikniety_kafelek).style.backgroundColor = "#666";

    if (czy_1_klikniecie == false) {
        var unikat;
        ilosc_powtorzen_w_petli = 0;
        max_liczb_wysolowana = (width_x * height_y) - 1;
        for (i = 0; i < ilosc_bomb; i++) {
            for (w = 0; w < 2;) {
                unikat = Math.floor(Math.random() * width_x * height_y + 0)
                if (tablica_bomb[unikat] == 0 && unikat != klikniety_kafelek && unikat != klikniety_kafelek - 1 && unikat != klikniety_kafelek - width_x - 1 && unikat != klikniety_kafelek - width_x && unikat != klikniety_kafelek - width_x + 1 && unikat != klikniety_kafelek + 1 && unikat != klikniety_kafelek + width_x - 1 && unikat != klikniety_kafelek + width_x && unikat != klikniety_kafelek + width_x + 1) {
                    tablica_bomb[unikat] = tablica_bomb[unikat] + 1;
                    w = 4;
                    //break;
                }
				ilosc_powtorzen_w_petli++;

            }
            obiekt[unikat].bomba = obiekt[unikat].bomba + 1;
        }
        
       // umiesc_bomby(); //funkcja testowa
        //modyfikuj_html();
		wyznacz_numer()
    }
    czy_1_klikniecie = true;
	;
	if(czy_kafel_to_bomba() == false){
		szukaj_pustych_pol(klikniety_kafelek);
		if(obiekt[klikniety_kafelek].numer != 0){
			document.getElementById("id" + klikniety_kafelek).innerHTML = obiekt[klikniety_kafelek].numer;
		}
	}
	// czy gra została wygrana
	if(czy_wygrana() >= width_x * height_y - ilosc_bomb ){
		alert("wygranko heheszki no c:");
		for (i = 0; i < width_x * height_y; i++) {
			if (obiekt[i].bomba == 1) {
				document.getElementById("id" + i).style.backgroundColor = "green";
			}
		}
	}
	

}

function umiesc_bomby() { //funkcja testowa
    for (i = 0; i < width_x * height_y; i++) {
        if (obiekt[i].bomba == 1) {
            document.getElementById("id" + i).style.backgroundColor = "red";
        }
    }

}
// funkcia przyzjane obiektom numery w zależnosci od ilości bomb dookoła wg
function wyznacz_numer() {
    for (i = 0; i < width_x * height_y; i++) {
        if (i == 0 && obiekt[i].bomba == 1) {
            obiekt[i + 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x + 1].numer++;
        } else if (i == width_x - 1 && obiekt[i].bomba == 1) {
            obiekt[i - 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x - 1].numer++;
        } else if (i == width_x * (height_y - 1) && obiekt[i].bomba == 1) {
            obiekt[i + 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x + 1].numer++;
        } else if (i == width_x * height_y - 1 && obiekt[i].bomba == 1) {
            obiekt[i - 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x - 1].numer++;
        } else if (i > 0 && i < width_x - 1 && obiekt[i].bomba == 1) {
            obiekt[i + width_x - 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x + 1].numer++;
            obiekt[i + 1].numer++;
            obiekt[i - 1].numer++;

        } else if (i % width_x == 0 && obiekt[i].bomba == 1) {
            obiekt[i - width_x + 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i + 1].numer++;
            obiekt[i + width_x + 1].numer++;
            obiekt[i + width_x].numer++;
        } else if ((i + 1) % width_x == 0 && obiekt[i].bomba == 1) {
            obiekt[i - width_x].numer++;
            obiekt[i - width_x - 1].numer++;
            obiekt[i - 1].numer++;
            obiekt[i + width_x - 1].numer++;
            obiekt[i + width_x].numer++;
        } else if (i > width_x * (height_y - 1) && i < width_x * height_y - 1 && obiekt[i].bomba == 1) {
            obiekt[i - width_x - 1].numer++;
            obiekt[i - 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x + 1].numer++;
            obiekt[i + 1].numer++;
        } else if (obiekt[i].bomba == 1) {
            obiekt[i - width_x - 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x + 1].numer++;
            obiekt[i + 1].numer++;
            obiekt[i - 1].numer++;
            obiekt[i + width_x - 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x + 1].numer++;
        }
    }
}

function modyfikuj_html() {
    for (i = 0; i < width_x * height_y; i++) {
        if (obiekt[i].numer != 0 && obiekt[i].bomba == 1) {
            document.getElementById('id' + i);
        }

    }
}

function czy_jest_bomba_i_numer(nr_pomoc) {
    if (obiekt[nr_pomoc].bomba == 0 && obiekt[nr_pomoc].numer == 0 && obiekt[nr_pomoc].stan == "default") {
        obiekt[nr_pomoc].stan = "wcisniety";
        document.getElementById("id" + nr_pomoc).style.backgroundColor = "#666";
        document.getElementById("id" + nr_pomoc).removeEventListener("click", wyznacz_bomby);
        szukaj_pustych_pol(nr_pomoc);

    } else if (obiekt[nr_pomoc].bomba == 0 && obiekt[nr_pomoc].numer != 0 && obiekt[nr_pomoc].stan == "default") { //jeżeli id "nr_id + 1" nie ma bomby ale ma numer to kafel staje się szary, usuwa mu event click brak rekurencji. (w saperze po kliknęciu odsłąniane są pola aż do pola z numerkiem ;) )
		obiekt[nr_pomoc].stan = "wcisniety";
        document.getElementById("id" + nr_pomoc).style.backgroundColor = "#666";
        document.getElementById("id" + nr_pomoc).innerHTML = obiekt[nr_pomoc].numer;
        document.getElementById("id" + nr_pomoc).removeEventListener("click", wyznacz_bomby);
    }
}

function szukaj_pustych_pol(nr_id) {
    nr_id = nr_id / 1;


    if (nr_id == 0) { // tutaj analizować będzie lewy górny róg,  id: większe o 1, większe o width_x oraz większe o width_x + 1
        //jeżeli id "nr_id + 1" nie ma bomby i numeru to kafel staje się szary, usuwa mu event click, rekurencja szukaj_pustych_pól dla "id + 1"
        czy_jest_bomba_i_numer(nr_id + 1); //analizować będzie id: większe o 1
        czy_jest_bomba_i_numer(nr_id + width_x); //analizować będzie id: większe o szerokość pola    
        czy_jest_bomba_i_numer(nr_id + width_x + 1); //analizować będzie id: większe o szerokość pola

    } else if (nr_id == width_x - 1) { // tutaj analizować będzie prawy górny róg,  id: mniejsze o 1, większe o width_x oraz większe o width_x - 1
        czy_jest_bomba_i_numer(nr_id - 1); //analizować będzie id: mniejsze o 1    
        czy_jest_bomba_i_numer(nr_id + width_x); //analizować będzie id: większe o width_x     
        czy_jest_bomba_i_numer(nr_id + width_x - 1); //analizować będzie id: większe o width_x - 1 

    } else if (nr_id == width_x * (height_y - 1)) { // tutaj analizować będzie lewy dolny róg,  id: większe o 1, mniejsze o width_x oraz mnijesze o width_x + 1     
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id - width_x + 1);

    } else if (nr_id == width_x * height_y - 1) { // tutaj analizować będzie prawy dolny róg,  id: mniejsze o 1, mniejsze o width_x oraz mnijesze o width_x - 1     
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id - width_x - 1);

    } else if (nr_id > 0 && nr_id < width_x - 1) {
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id + width_x - 1);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x + 1);
    } else if (nr_id % width_x == 0) {
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id - width_x + 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x + 1);
    }else if ((nr_id + 1) % width_x == 0){
		czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id - width_x - 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x - 1);
	}else if (nr_id > width_x * (height_y - 1) && nr_id < width_x * height_y - 1){
		czy_jest_bomba_i_numer(nr_id - 1);
		czy_jest_bomba_i_numer(nr_id + 1);
		czy_jest_bomba_i_numer(nr_id - width_x);
		czy_jest_bomba_i_numer(nr_id - width_x - 1);
		czy_jest_bomba_i_numer(nr_id - width_x + 1);
	}else{
		czy_jest_bomba_i_numer(nr_id - 1);
		czy_jest_bomba_i_numer(nr_id + 1);
		czy_jest_bomba_i_numer(nr_id - width_x);
		czy_jest_bomba_i_numer(nr_id - width_x - 1);
		czy_jest_bomba_i_numer(nr_id - width_x + 1);
		czy_jest_bomba_i_numer(nr_id + width_x);
		czy_jest_bomba_i_numer(nr_id + width_x - 1);
		czy_jest_bomba_i_numer(nr_id + width_x + 1);
	}



}

function czy_kafel_to_bomba(){
	if(obiekt[klikniety_kafelek].bomba != 0){ //przegranko
		for(i = 0; i < width_x * height_y; i++){
			 document.getElementById("id" + i).removeEventListener("click", wyznacz_bomby);
		}
		umiesc_bomby();
		alert("przegranko no :c");
		return true;
	}
	else return false; // jeszcze nie przegranko
}

function czy_wygrana(){
	 pomoc=0;
	for(i=0;i<width_x * height_y;i++){
		if( (obiekt[i].bomba == 0 && obiekt[i].stan != "default") || (obiekt[i].numer != 0 && obiekt[i].stan != "default"))pomoc++;
	}
	return pomoc;
}
/*
	# .button == 2 aby zaznaczało frage, potem znak zapytania
*/




