// Dancause Janin danj17087507



var dateFacture= new Date();
var sousTotalFacture = { soustotalnontaxe:0, soustotaltaxable:0, totalTPS:0, totalTVQ:0};	
var tempEssaie ="";
var caissierCaisse={caissier:"Janin", caisse:"1000"};
var codeTrouver="";
var detectAnnuler=2;
var codeTransaction=Number(new Date());
var compteTour = 0;
var achatQty=0;
var facture = new Array();
var taxe = {tps: 0.05, tvq: 0.095};
var Achat;
affichageCadran("CODE");
afficherRecuCaisse(facture,dateFacture, caissierCaisse, codeTransaction, sousTotalFacture);




$( '.cle' ).click( function() {
							var tempo = (  $( this ).attr( 'id' ) );
							tempo=tempo.split("cle-");
							
							if(isNumber(Number(tempo[1])))
							{
								if ( maxCodeLength( tempEssaie ) )
										tempEssaie = tempEssaie + new String(tempo [1]);
										affichageCadran(tempEssaie);						
						 }
						 else{
							 detecteur( tempo [ 1 ], tempEssaie );
							 }
							 return false;
} );





var detecteur= function(tempValue,xCode){

switch ( tempValue )
{
case "annuler":
affichageCadran("0")
resetCode();
  break;
  
case "code":
codeTrouver=utilitaireCode(xCode);
tempEssaie="";
  break;
  
  
 case "total-courant":
if( facture.length !==0)
{
	var temp;
 temp=totalCourant( facture.length, facture,dateFacture,caissierCaisse, codeTransaction, sousTotalFacture );
affichageCadran(  "$"+arrondirNombre(Number(temp.soustotalnontaxe) + Number(temp.soustotaltaxable)+Number(temp.totalTPS)+Number(temp.totalTVQ)) ) ; ;
}

break;
  
case "ok":
//compteTour=calculerAchatItem(codeTrouver,achatQty,compteTour);
afficherRecuCaisse(facture,dateFacture,caissierCaisse,codeTransaction, sousTotalFacture);
//resetCode();
 break;
  
case "reculer":
tempEssaie=effacerCode(tempEssaie);
 break;
  
case "quantite":
achatQty = controleQuantie2(xCode);
compteTour=calculerAchatItem(codeTrouver,achatQty,compteTour);
afficherRecuCaisse(facture,dateFacture,caissierCaisse,codeTransaction, sousTotalFacture);
resetCode();
tempEssaie="";
break;
 
case "effacer": 

if(achatQty !==0 )
{
	achatQty= 0 ;
	affichageCadran("Qte 0");
	
	}
affichageCadran(detruireFacture());
afficherRecuCaisse(facture,dateFacture,caissierCaisse,codeTransaction, sousTotalFacture);
 break;
 
case "moins":
tempEssaie = quantiteMoins ( xCode );
if(tempEssaie !=="")
affichageCadran(tempEssaie);
  break; 
 
case "total":
 stempTotal=totalCourant( facture.length, facture,dateFacture,caissierCaisse, codeTransaction, sousTotalFacture )
afficherRecuCaisse(facture,dateFacture,caissierCaisse,codeTransaction, stempTotal);

affichageCadran(  "$"+arrondirNombre(Number(stempTotal.soustotalnontaxe) + Number(stempTotal.soustotaltaxable)+Number(stempTotal.totalTPS)+Number(stempTotal.totalTVQ)) ) ;
  break;
} 
	
};




function affichageCadran(texte){
	$( '#ecran-affichage' ).html( texte);
	};
	
function arrondirNombre(x){
     return Number(x).toFixed(2);
    };
	
	
function calculerAchatItem( yCode, yQuantite){

	if(yQuantite !==0)
		{
	
		var x;
		x=getProduitPourCode( yCode);
		
		if(x !== undefined)
		{
			
	
		facture.push(constructeurFacture());
		var y = facture.length-1;
		
		facture[y].description = x.description;
		facture[y].quantite = yQuantite;
		facture[y].prix = ( x.prix * yQuantite );
		facture[y].taxable = x.taxable;
			if(x.taxable)
			{
			facture[y].tps = calculTaxe( taxe.tps , Number(x.prix * yQuantite) );
			facture[y].tvq = calculTaxe( taxe.tvq , Number( x.prix * yQuantite ) + Number(facture[y].tps) );
			}else{
				facture[y].tps = 0;
				facture[y].tvq = 0;
				}
		affichageCadran(arrondirNombre(facture[y].prix) + "$");
		y++;
		return y;
		}
		affichageCadran("Err.CODE");
		tempessaie="";
		
		}
		affichageCadran("Err.QTE");
		tempEssaie="";
};

	
function calculTaxe( tempTaxe, tempPrixProduit){
    "use strict";
    return arrondirNombre(tempTaxe * tempPrixProduit);
};



function constructionFacture(xfacture)
{
	if(xfacture !== undefined){
	var temp="";
	for(i=0; i < xfacture.length ; i ++){
	temp=temp+("<p>" + xfacture[ i ].description + "<span class='montant'>" + arrondirNombre( xfacture[ i ].prix) +" $</span></p>");
	} 
	return temp;
	}
	
	return("<p><span class='montant'></span></p>" );
	
};


function constructeurFacture( descrip, xQty, xPrix, xtps, xtvq, xtaxer ){
	var tempFacture = { description: descrip,qty: xQty,prix: xPrix,Tps: xtps,tvs: xtvq, taxable: xtaxer};	
	return {description: tempFacture.description, quantite: tempFacture.qty, prix: tempFacture.prix, tps: tempFacture.Tps,tvq: tempFacture.tvq};
};



function controleQuantie2(tempQty){
	
if (Number(tempQty ) === 0 )
  {
affichageCadran("Er.Qte");
 return 0;
 
  }
else if (Number(tempQty ) > 99  )
  {
affichageCadran("Er.Qte");
   return 0;
  }
  else if (Number(tempQty ) < -99  )
  {
  affichageCadran("Er.Qte");
  return 0;
  }
else
  {
affichageCadran("OK");
 return tempQty;
  } 

};

function effacerCode(yCode){
	if( yCode.length > 0 ){
		yCode = yCode.slice ( 0 , (yCode.length)-1 );
		affichageCadran(yCode);
				if(yCode === '-')
					{
					affichageCadran('0');
					return"";
					}
		
			if( yCode.length === 0 ){
				affichageCadran('0');
				return "";
			}
		return yCode;
		}
			else{
				affichageCadran('0');
				return "";
				}
};
	
	
function maxCodeLength(tempCode){
	
	if((tempCode.length)>=6){ 
		return false;
		}
		else{
	return true;
	}
};
	

function quantiteMoins(Moins)
{
	if(Number(Moins) !== 0){
		if( Number(Moins) > 0){
			return '-'+Moins;
			}
			else
			return Moins;
			}
			else{
			return Moins;
			}
};

function resetCode(){
	tempEssaie = "";
	codeTrouver = 0;
	achatQty = 0;
};


function totalCourant(xTour,xFacture,xDate,xCaissier,xCode)
{
	var dSousTotal = { soustotalnontaxe:0, soustotaltaxable:0, totalTPS:0, totalTVQ:0};
	
	for(i=0 ; i < xTour ; i++){
		if(xFacture[i].taxable){
			dSousTotal.soustotaltaxable=dSousTotal.soustotaltaxable+xFacture[i].prix;
			dSousTotal.totalTPS=dSousTotal.totalTPS+xFacture[i].tps;
			dSousTotal.totalTVQ=dSousTotal.totalTVQ+xFacture[i].tvq;
			
			}
			else{
			dSousTotal.soustotalnontaxe=dSousTotal.soustotalnontaxe+xFacture[i].prix;
			}
	}
	return dSousTotal;
	
};


function utilitaireCode(tempoCode){
	var x = getProduitPourCode(tempoCode);
		if( x !== undefined ){
			
			affichageCadran("QTE");
			
			resetCode();
			return tempoCode;
		}
		else{
			affichageCadran("Er.CODE");
			resetCode();
			}
};


	
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
  }; // code trouver sur internet



function detruireFacture(){
	if(facture.length>0){
	facture.pop();
	compteTour=(Number(compteTour))-1;
	return("dell");
	}
	else
	return("empty");
};




var getProduitPourCode = function( codeProduit ) {
    "use strict";
    var catalogueProduits = {
        '119423': { description: 'Craquelins', prix: 2.75, taxable: false },
        '248800': { description: 'Haricots blancs', prix: 2.19, taxable: false },
        '328001': { description: 'Olives farcies', prix: 1.99, taxable: false },
        '376894': { description: 'Moutarde', prix: 1.99, taxable: false },
        '383863': { description: 'Buiscuits', prix: 2.75, taxable: false },
        '435038': { description: 'Huile de tournesol', prix: 4.99, taxable: false },
        '435071': { description: 'Papier aluminium', prix: 5.39, taxable: true },
        '487603': { description: 'Vinaigre balsamique', prix: 7.49, taxable: false },
        '544411': { description: 'Pois verts', prix: 1.79, taxable: false },
        '564369': { description: 'Barres granola', prix: 3.99, taxable: false },
        '570490': { description: 'Essuie-tout', prix: 4.29, taxable: true },
        '584237': { description: 'Balai', prix: 14.69, taxable: true },
        '585578': { description: 'Brosse �  vaisselle', prix: 2.29, taxable: true },
        '674385': { description: 'Bouillon', prix: 3.99, taxable: false },
        '728241': { description: 'Cornichons', prix: 2.19, taxable: false },
        '741761': { description: 'Amandes', prix: 3.49, taxable: false },
        '838314': { description: 'Sel', prix: 0.99, taxable: true },
        '867044': { description: 'Ananas dans son jus', prix: 1.25, taxable: false },
        '870326': { description: 'Lasagne', prix: 2.49, taxable: false },
        '901703': { description: 'Barres tendres', prix: 2.49, taxable: false },
        '928045': { description: 'Poivre', prix: 1.99, taxable: false },
        '954339': { description: 'Cornets gaufrés', prix: 3.99, taxable: false },
        '960827': { description: 'Diner Kraft', prix: 1.09, taxable: false },
        '085106': { description: 'Fondue au chocolat', prix: 4.19, taxable: false },
        '091247': { description: 'Détergent �  vaisselle', prix: 2.99, taxable: true },
        '049840': { description: 'Café instantanné', prix: 12.99, taxable: false }
    };
    var produit = catalogueProduits[ codeProduit ];
    if ( produit === undefined ) {
        return undefined;
    } else {
        return { code: codeProduit, description: produit.description, prix: produit.prix, taxable: produit.taxable };
    }
};


function afficherRecuCaisse(dFacture,dDate,xCaisse, xTransaction,xSousTotaux)
{
										
$( '#facture' ).html(
   "<p class='entete'>EPICERIE EQUITABLE</p>" +
    "<p class='entete'>320 RUE SAINTE-CATHERINE EST</p>" +
    "<p class='entete'>MONTREAL QC H2X 1L7</p>" + 
    "<p class='entete'>(514) 987-3000</p><br>" +
   "<p class='droite'>"+ dDate.getFullYear()+"/"+ (dDate.getMonth()+1) +"/"+dDate.getDate() +"  "+ dDate.getHours()+":"+dDate.getMinutes()+":"+dDate.getSeconds()+" </p> "+ 
    "<p>CAISSE<span class='montant'>"+ xCaisse.caisse+"  "+"("+xCaisse.caissier+")"+"</span></p>" +
    "<p>TRANSACTION<span class='montant'>"+xTransaction+"</span></p>" +
    "<p class='droite'>---------------</p>" +
    "<p>ACHATS</p>" +
 	constructionFacture(dFacture) +
    "<p class='droite'>---------------</p>" +
    "<p>SOUS-TOTAL NON TAXABLE<span class='montant'>$"+ arrondirNombre(Number(xSousTotaux.soustotalnontaxe))+"</span></p>" +
    "<p>SOUS-TOTAL TAXABLE<span class='montant'>$"+ arrondirNombre(Number(xSousTotaux.soustotaltaxable))+"</span></p>" +
    "<p>TPS<span class='montant'>$"+ arrondirNombre(xSousTotaux.totalTPS)+"</span></p>" +
    "<p>TVQ<span class='montant'>$"+ arrondirNombre(xSousTotaux.totalTVQ)+"</span></p>" +
    "<p>TOTAL</p>" +
    "<p span class='montant total'>$"+ arrondirNombre((Number(xSousTotaux.soustotalnontaxe)+Number(xSousTotaux.soustotaltaxable)+Number(xSousTotaux.totalTVQ)+Number(xSousTotaux.totalTPS)))+"</span></p>" +
    "<p class='droite'>---------------</p>"
);
};

