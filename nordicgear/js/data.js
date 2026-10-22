// Dane produktów, ikon kategorii i zdjęć
const CATS=["Wszystko","Laptopy","PC","Akcesoria","Promocje"];
const P=[
{id:1,n:"Fjord Air 14",c:"Laptopy",p:5499,o:6299,img:"img/1.jpg",pop:80,s:["14″ OLED","Ryzen 7, 16 GB RAM","Do 18 h pracy"]},
{id:2,n:"Skadi Pro 15",c:"Laptopy",p:7899,o:0,img:"img/2.jpg",pop:70,s:["15,6″ 165 Hz","RTX 5060","16 GB RAM, 1 TB SSD"]},
{id:3,n:"Thor Mini",c:"PC",p:4299,o:4799,img:"img/3.jpg",pop:65,s:["Ryzen 5","Zintegrowana grafika","Obudowa 3 l"]},
{id:4,n:"Freya Gaming 5070",c:"PC",p:8499,o:0,img:"img/4.jpg",pop:85,s:["RTX 5070","Ryzen 7 9700X","32 GB DDR5"]},
{id:5,n:"Klawiatura Rune TKL",c:"Akcesoria",p:399,o:0,img:"img/5.jpg",pop:75,s:["Przełączniki liniowe","Hot-swap","Bluetooth + USB"]},
{id:6,n:"Mysz Lynx 8K",c:"Akcesoria",p:249,o:329,img:"img/6.jpg",pop:88,s:["Sensor 30 000 DPI","58 g","Polling 8 kHz"]},
{id:7,n:"Monitor Aurora 27 OLED",c:"Akcesoria",p:3299,o:0,img:"img/7.jpg",pop:92,s:["27″ QHD OLED","240 Hz, 0,03 ms","HDMI 2.1"]}];

const ICON={Laptopy:'<rect x="14" y="16" width="52" height="34" rx="3"/><path d="M6 58h68"/>',PC:'<rect x="24" y="8" width="32" height="56" rx="3"/><circle cx="40" cy="22" r="5"/><path d="M32 46h16"/>',Akcesoria:'<rect x="18" y="12" width="44" height="52" rx="22"/><path d="M40 12v22M18 34h44"/>'};
