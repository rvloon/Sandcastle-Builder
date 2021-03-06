'use strict';
/* In which some Helper functions are defined
+++++++++++++++++++++++++++++++++++++++++++++*/
function g(id) {return document.getElementById(id);}
function ONGsnip(time)
{
	if(time.getMinutes()>=30&&Molpy.newpixNumber <= 240)
	{
		time.setMinutes(30);
	}else
	{			
		time.setMinutes(0);
	}
	time.setSeconds(0);
	time.setMilliseconds(0); 
	return time;
}
var postfixes=[
{limit:1e210,divisor:1e210,postfix:['Q',' Quita']},
{limit:1e42,divisor:1e42,postfix:['W',' Wololo']},
{limit:1e39,divisor:1e39,postfix:['L',' Lotta']},
{limit:1e36,divisor:1e36,postfix:['F',' Ferro']},
{limit:1e33,divisor:1e33,postfix:['H',' Helo']}, //or Ballard
{limit:1e30,divisor:1e30,postfix:['S',' Squilli']},
{limit:1e27,divisor:1e27,postfix:['U',' Umpty']},

{limit:1e24,divisor:1e24,postfix:['Y',' Yotta']},
{limit:1e21,divisor:1e21,postfix:['Z',' Zeta']},
{limit:1e18,divisor:1e18,postfix:['E',' Exa']},
{limit:1e15,divisor:1e15,postfix:['P',' Peta']},
{limit:1e12,divisor:1e12,postfix:['T',' Tera']},
{limit:1e9,divisor:1e9,postfix:['G',' Giga']},
{limit:1e6,divisor:1e6,postfix:['M',' Mega']},
{limit:1e4,divisor:1e3,postfix:['K',' Kilo']}, //yes this is intentional
];
function Molpify(number, raftcastle, shrinkify)
{
	if(isNaN(number))return'Mustard';
	if(!isFinite(parseFloat(number)))return'Infinite';
	var molp='';
	
	if(Molpy&&!shrinkify)shrinkify=!Molpy.showStats;
	
	if(shrinkify)
	{
		for (var i in postfixes)
		{	
			var p = postfixes[i];
			if(number>=p.limit)
			{
				return Molpify(number / p.divisor, raftcastle,1)+p.postfix[Molpy.options.longpostfix];
			}
		}
	}else{
		if(number==3)return 'Math.floor(Math.PI)';
		if(number==4)return 'Math.ceil(Math.PI)';
	}
	
	if(raftcastle>0)
	{
		var numCopy=number;
		//get the right number of decimal places to stick on the end:
		var raft=numCopy*Math.pow(10,raftcastle)-Math.floor(numCopy)*Math.pow(10,raftcastle);
		var sraft = Math.floor(raft)+'';
		if((sraft).length>raftcastle)
		{
			numCopy++;
			sraft=''; //rounded decimal part up to 1
		}else if(raft) while(sraft.length<raftcastle)
		{
			sraft='0'+sraft; //needs leading zeroes because it's a number like 1.01
		}
		molp=Molpify(numCopy,0,shrinkify)+(raft?('.'+sraft):''); //stick them on the end if there are any
	}else
	{
		number = Math.floor(number);
		//drop the decimal bit
		var sep = (number+'').indexOf('e') ==-1; //true if not in exponential notation
		number=(number+'').split('').reverse(); //convert to string, then array of chars, then backwards
		for(var i in number)
		{
			if(sep&&i%3==0 &&i>0) molp=','+molp;//stick commas in every 3rd spot but not 0th
			molp=number[i]+molp;
		}
	}
	return molp;
}

function PriceSort(a,b)
{
	var asp = EvalMaybeFunction(a.sandPrice,a,1);
	var acp = EvalMaybeFunction(a.castlePrice,a,1);
	var bsp = EvalMaybeFunction(b.sandPrice,b,1);
	var bcp = EvalMaybeFunction(b.castlePrice,b,1);
	if (asp>bsp) return 1;
	else if (asp<bsp) return -1;
	else
	if (acp>bcp) return 1;
	else if (acp<bcp) return -1;
	else return 0;
}
function ClassNameSort(a,b)
{
	var at = a.className||'z';
	var bt = b.className||'z';
	var ag = a.group;
	var bg = b.group;
	var an = a.name;
	var bn = b.name
	if (at>bt) return 1;
	else if (at<bt) return -1;
	else
	if (ag>bg) return 1;
	else if (ag<bg) return -1;
	else
	if (an>bn) return 1;
	else if (an<bn) return -1;
	else return 0;
}
function FormatPrice(monies,item)
{
	return Molpify(Math.floor(EvalMaybeFunction(monies,item,1)*Molpy.priceFactor),1);
}
function CuegishToBeanish(mustard)
{
	try{
		return AllYourBase.SetUpUsTheBomb(escape(encodeURIComponent(mustard)));
	}
	catch(err)
	{
		return '';
	}
}
function BeanishToCuegish(mustard)
{
	try{
		return decodeURIComponent(unescape(AllYourBase.BelongToUs(mustard)));
	}
	catch(err)
	{
		return '';
	}
}
	
function isChildOf(child,parent)
{
	if(!child)return;
	var current = child;
	while(current = current.parentNode)
	{
		if(current == parent)
			return 1;
	}
}

function onhover(me,event)
{
	if(me.hoverOnCounter>0||Molpy.Boosts['Expando'].power)return;
	me.hoverOnCounter=Math.ceil(Molpy.fps/2);
	me.hoverOffCounter=-1;
}
function onunhover(me,event)
{				
	if(isChildOf(event.relatedTarget,event.currentTarget)) return;
	me.hoverOffCounter=Math.ceil(Molpy.fps*1.5);
	me.hoverOnCounter=-1;
}

function showhideButton(key)
{
	return '<input type="Button" value="'+(Molpy.options.showhide[key]?'Hide':'Show')+'" onclick="showhideToggle(\''+key+'\')"></input>'
}
function showhideToggle(key)
{
	Molpy.options.showhide[key]=!Molpy.options.showhide[key];
	if(Molpy.options.showhide[key])
	{
		if(key=='tagged')
		{
			for(var k in Molpy.options.showhide)
			{
				Molpy.options.showhide[k]=k==key; //when showing tagged, hide all others
			}
		}else{
			Molpy.options.showhide.tagged=0; //hide tagged when showing anything else
		}
	}
	Molpy.shopRepaint=1;
	Molpy.boostRepaint=1;
	Molpy.badgeRepaint=1;
}

/* In which the game initialisation is specified
++++++++++++++++++++++++++++++++++++++++++++++++*/
var Molpy={};
Molpy.Up=function()
{
	Molpy.molpish=0;
	
	Molpy.Wake=function()
	{
		Molpy.molpish=1;
		Molpy.HardcodedData();//split some stuff into separate file
		/* In which variables are declared
		++++++++++++++++++++++++++++++++++*/
		Molpy.Life=0; //number of gameticks that have passed
		Molpy.fps = 30 //this is just for paint, not updates
		Molpy.version=2.84;
		
		Molpy.time=new Date().getTime();
		Molpy.newpixNumber=1; //to track which background to load, and other effects...
		Molpy.ONGstart= ONGsnip(new Date()); //contains the time of the previous ONG
		Molpy.NPlength=1800; //seconds in current NewPix (or milliseconds in milliNewPix)
		Molpy.updateFactor=1; //increase to update more often
		
		Molpy.options=[];
		
		Molpy.lateness=0;
		Molpy.ketchupTime=0;
		Molpy.baseNinjaTime=12*60*1000; //12 minutes for newpixbot delay
		Molpy.ninjaTime=Molpy.baseNinjaTime;
		Molpy.ninjad=0; //ninja flag for newpixbots
		Molpy.npbONG=0; //activation flag for newpixbots

		Molpy.sandDug=0; //total sand dug throughout the game
		Molpy.sandManual=0; //total sand dug through user clicks
		Molpy.sand=0; //current sand balance
		Molpy.castlesBuilt=0; //total castles built throughout the game
		Molpy.castles=0; //current castle balance
		Molpy.castlesDestroyed=0; //total castles destroyed by other structures throughout the game
		Molpy.sandPermNP=0; //sand per milliNewPix (recaculated when stuff is bought)
		Molpy.prevCastleSand=0; //sand cost of previous castle
		Molpy.nextCastleSand=1; //sand cost of next castle
		Molpy.castlesSpent=0; //castles spent in shop
		Molpy.sandSpent=0; //sand spent on Boosts		
		Molpy.beachClicks=0; //number of times beach has been clicked for sand
		Molpy.ninjaFreeCount=0; //newpix with no clicks in ninja period (but with clicks later)
		Molpy.ninjaStealth=0; //streak of uninterrupted ninja-free newpix
		Molpy.saveCount=0; //number of times game has been saved
		Molpy.loadCount=0; //number of times gave has been loaded
		Molpy.autosaveCountup=0;
		Molpy.highestNPvisited=1; //keep track of where the player has been
		Molpy.timeTravels=0; //number of times timetravel has been used
		Molpy.totalCastlesDown=0; //cumulative castles built and then wiped by Molpy Down throughout all games
		Molpy.globalCastleMult=1; //for boosting castle gains
		Molpy.lGlass=0;
		
		
		Molpy.options=[];
		Molpy.DefaultOptions=function()
		{
			Molpy.options.particles=1;
			Molpy.options.numbers=1;
			Molpy.options.autosave=2;
			Molpy.options.autoupdate=1;
			Molpy.options.sea=1;
			Molpy.options.otcol=1;
			Molpy.options.longpostfix=0;
			Molpy.options.colourscheme=0;
			Molpy.options.sandmultibuy=0;
			Molpy.options.castlemultibuy=0;
			Molpy.options.showhide={boosts:1,ninj:0,cyb:0,hpt:0,chron:0,bean:0,badges:1,badgesav:1,discov:0,monums:0,monumg:0,tagged:0};
			Molpy.options.showhideNamesOrder=['boosts','ninj','cyb','hpt','chron','bean','badges','badgesav','discov','monums','monumg','tagged'];
		}
		Molpy.DefaultOptions();
		
		Molpy.SaveC_STARSTAR_kie=function(auto)
		{
			if(!auto)
			{
				Molpy.saveCount++;
				if(Molpy.saveCount>=20){
					Molpy.UnlockBoost('Autosave Option');	
					Molpy.EarnBadge('This Should be Automatic');
				}
			}else{
				if(!Molpy.Got('Autosave Option')) return;
			}
			var threads = Molpy.ToNeedlePulledThing();
			var flood = new Date();
			flood.setFullYear(13291);
			flood.setMonth(4);
			flood.setDate(10);
			for(var i in threads)
			{
				var thread=CuegishToBeanish(threads[i]);
				var dough='CastleBuilderGame'+i+'='+escape(thread)+'; expires='+flood.toUTCString()+';'
				document.cookie=dough;//aaand save
					
				if(document.cookie.indexOf('CastleBuilderGame')<0) 
				{
					Molpy.Notify('Error while saving.<br>Export your save instead!',1);
					return;
				}
			}
			document.cookie='CastleBuilderGame=;'; //clear old cookie
			Molpy.Notify('Game saved');
			Molpy.autosaveCountup=0;
		}
		
		Molpy.LoadC_STARSTAR_kie=function()
		{
			var thread='';
			if (document.cookie.indexOf('CastleBuilderGame')>=0) 
			{
				var k=['',0,1,2,3,4];
				for(i in k)
				{
					var dough = document.cookie.split('CastleBuilderGame'+k[i]+'=')[1];
					if(dough)
						thread+=BeanishToCuegish(unescape(dough).split(';')[0])||'';
				}
				Molpy.FromNeedlePulledThing(thread);
				Molpy.loadCount++;
				Molpy.autosaveCountup=0;
				if(g('game'))
				{
					Molpy.Notify('Game loaded',1);
					if(Molpy.loadCount>=40)
					{
						Molpy.UnlockBoost('Coma Molpy Style');
					}
				}
			}
		}
		
		Molpy.Import=function()
		{
			var thread=prompt('Please paste in the text that was given to you on save export.\n(If you have multiple parts, put them all together with no gaps.)\nWarning: this will automatically save so you may want to back up your current save first.','');
			if(thread=='pants')
			{
				Molpy.InMyPants=!Molpy.InMyPants;
				return;
			}
			if(thread=='F5')
			{
				Molpy.ClickBeach();
				Molpy.EarnBadge('Use Your Leopard');				
				return;
			}
			if(thread=='scrumptious donuts')
			{
				Molpy.scrumptiousDonuts=1;				
				return;
			}
			if(thread=='Molpy')
			{
				Molpy.Notify(BeanishToCuegish(BlitzGirl.ChallengeAccepted),1);			
				return;
			}
			if (thread && thread!='')
			{
				Molpy.FromNeedlePulledThing(BeanishToCuegish(thread));
				Molpy.SaveC_STARSTAR_kie();
			}
		}
		
		
		/* In which I do save and load!
		+++++++++++++++++++++++++++++++*/
		Molpy.ToNeedlePulledThing=function()
		{
			var p='P'; //Pipe seParator
			var s='S'; //Semicolon
			var c='C'; //Comma
			
			var thread='';
			var threads=[];
			thread+=Molpy.version+p+p;//some extra space!
			thread+=Molpy.startDate+p;
			
			thread+=
			(Molpy.options.particles?'1':'0')+
			(Molpy.options.numbers?'1':'0')+
			(Molpy.options.autosave)+
			(Molpy.options.autoupdate?'1':'0')+
			(Molpy.options.sea?'1':'0')+
			(Molpy.options.otcol?'1':'0')+
			(Molpy.options.longpostfix?'1':'0')+
			(Molpy.options.colourscheme)+
			(Molpy.options.sandmultibuy)+
			(Molpy.options.castlemultibuy)+
			p;
			
			thread+=			
			(Molpy.newpixNumber)+s+
			(Molpy.sandDug)+s+
			(Molpy.sandManual)+s+
			(Molpy.sand)+s+
			(Molpy.castlesBuilt)+s+
			(Molpy.castles)+s+
			(Molpy.castlesDestroyed)+s+
			(Molpy.prevCastleSand)+s+
			(Molpy.nextCastleSand)+s+
			(Molpy.castlesSpent)+s+
			(Molpy.sandSpent)+s+
			(Molpy.beachClicks)+s+
			(Molpy.ninjaFreeCount)+s+
			(Molpy.ninjaStealth)+s+
			(Molpy.ninjad)+s+
			(Molpy.saveCount)+s+
			(Molpy.loadCount)+s+
			(Molpy.notifsReceived)+s+
			(Molpy.timeTravels)+s+
			(Molpy.npbONG)+s+
		
			(Molpy.redactedCountup)+s+
			(Molpy.redactedToggle)+s+
			(Molpy.redactedVisible)+s+
			(Molpy.lGlass)+s+
			(Molpy.redactedClicks)+s+
			(Molpy.highestNPvisited)+s+
			(Molpy.totalCastlesDown)+s+
			p;
			//sand tools:
			for(var cancerbabies in Molpy.SandTools)
			{
				var cb = Molpy.SandTools[cancerbabies];
				thread += cb.amount+c+cb.bought+c+cb.totalSand+c+cb.temp+s;
			}
			thread+=p;
			//castletools:
			for(var cancerbabies in Molpy.CastleTools)
			{
				var cb = Molpy.CastleTools[cancerbabies];
				thread += cb.amount+c+cb.bought+c+cb.totalCastlesBuilt+c+cb.totalCastlesDestroyed+c+
				cb.totalCastlesWasted+c+cb.currentActive+c+cb.temp+s;
			}
			thread+=p;
			threads.push(thread);
			thread='';
			//boosts:
			for(var cancerbabies in Molpy.Boosts)
			{
				var cb = Molpy.Boosts[cancerbabies];
				thread += cb.unlocked+c+cb.bought+c+cb.power+c+cb.countdown+s;
			}
			thread+=p;
			threads.push(thread);
			thread='';
			//badges:
			for(var cancerbabies in Molpy.Badges)
			{
				var cb = Molpy.Badges[cancerbabies];
				if(cb.group=='badges')
					thread += cb.earned;
			}
			thread+=p;
			//showhide:
			for(var i in Molpy.options.showhideNamesOrder)
			{
				thread+=Molpy.options.showhide[Molpy.options.showhideNamesOrder[i]]?1:0;
			}
			thread+=p;
			threads.push(thread);
			thread='';
			//stuff pretending to be badges:
			for(var cancerbabies in Molpy.Badges)
			{
				var cb = Molpy.Badges[cancerbabies];
				if(cb.group!='badges')
					thread += cb.earned;
			}
			thread+=p;
			
			threads.push(thread);
			return threads;
		}
		Molpy.needlePulling=0;
		Molpy.FromNeedlePulledThing=function(thread)
		{
			Molpy.needlePulling=1; //prevent earning badges that haven't been loaded
			var p='P'; //Pipe seParator
			var s='S'; //Semicolon
			var c='C'; //Comma
			if(!thread)return;
			if(thread.indexOf(p)<0)
			{
				p='|'; s=';'; c=','; //old style data
			}
			thread=thread.split(p);
			var version = parseFloat(thread[0]);
			if(version>Molpy.version)
			{
				alert('Error : you are a time traveller attempting to load a save from v'+version+' with v'+Molpy.version+'.');
				return;
			}
			var pixels = thread[2].split(s);
			Molpy.startDate=parseInt(pixels[0]);
			
			pixels=thread[3].split('');			//whoops used to have ';' here which wasn't splitting!
			Molpy.options.particles=parseInt(pixels[0]);
			Molpy.options.numbers=parseInt(pixels[1]);
			Molpy.options.autosave=parseInt(pixels[2]);
			Molpy.options.autoupdate=parseInt(pixels[3]);
			Molpy.options.sea=parseInt(pixels[4]);
			Molpy.options.otcol=parseInt(pixels[5]);
			Molpy.options.longpostfix=parseInt(pixels[6]);
			Molpy.options.colourscheme=parseInt(pixels[7]);
			Molpy.options.sandmultibuy=(parseInt(pixels[8] || 0));
			Molpy.options.castlemultibuy=(parseInt(pixels[9] || 0));
			if(!g('game'))
			{				
				Molpy.UpdateColourScheme();
				return;
			}
			
			pixels=thread[4].split(s);
			Molpy.newpixNumber=parseInt(pixels[0]);
			Molpy.sandDug=parseFloat(pixels[1]);
			Molpy.sandManual=parseFloat(pixels[2]);
			Molpy.sand=parseFloat(pixels[3]);
			Molpy.castlesBuilt=parseFloat(pixels[4]);
			Molpy.castles=parseFloat(pixels[5]);
			Molpy.parseFloat=parseInt(pixels[6]);
			Molpy.prevCastleSand=parseFloat(pixels[7]);
			Molpy.nextCastleSand=parseFloat(pixels[8]);
			Molpy.castlesSpent=parseFloat(pixels[9]);
			Molpy.sandSpent=parseFloat(pixels[10]);
			Molpy.beachClicks=parseInt(pixels[11]);
			Molpy.ninjaFreeCount=parseInt(pixels[12]);
			Molpy.ninjaStealth=parseInt(pixels[13]);
			Molpy.ninjad=parseInt(pixels[14])?1:0;
			Molpy.saveCount=parseInt(pixels[15]);
			Molpy.loadCount=parseInt(pixels[16]);			
			Molpy.notifsReceived=parseInt(pixels[17]);			
			Molpy.timeTravels=parseInt(pixels[18]);		
			Molpy.npbONG=parseInt(pixels[19]);		
			
			Molpy.redactedCountup=parseInt(pixels[20]);			
			Molpy.redactedToggle=parseInt(pixels[21]);			
			Molpy.redactedVisible=parseInt(pixels[22]);			
			Molpy.lGlass=parseInt(pixels[23]);
			Molpy.redactedClicks=parseInt(pixels[24]);	
			if(version < 0.92)
			{	
				//three variables not needed are skipped here
				Molpy.redactedClicks=parseInt(pixels[27]);	
				
				var blitzSpeed=parseInt(pixels[28]);	//these were saved here in 0.911 and 2
				var blitzTime=parseInt(pixels[29]);		//but now are put in the 'Blitzed' boost
			}
			Molpy.highestNPvisited=parseInt(pixels[25]);
			Molpy.totalCastlesDown=parseFloat(pixels[26]);
			if(version < 2.1)
				Molpy.tempIntruderBots=parseFloat(pixels[27]);
			
			
			pixels=thread[5].split(s);
			Molpy.SandToolsOwned=0;
			for (var i in Molpy.SandToolsById)
			{
				var me=Molpy.SandToolsById[i];
				if (pixels[i])
				{
					var ice=pixels[i].split(c);
					me.amount=parseInt(ice[0]);
					me.bought=parseInt(ice[1]);
					me.totalSand=parseFloat(ice[2]);
					me.temp=parseInt(ice[3])||0;
					Molpy.SandToolsOwned+=me.amount;
					me.refresh();
				}
				else
				{
					me.amount=0;me.bought=0;me.totalSand=0;
				}
			}
			pixels=thread[6].split(s);
			Molpy.CastleToolsOwned=0;
			for (var i in Molpy.CastleToolsById)
			{
				var me=Molpy.CastleToolsById[i];
				if (pixels[i])
				{
					var ice=pixels[i].split(c);
					me.amount=parseInt(ice[0]);
					me.bought=parseInt(ice[1]);
					me.totalCastlesBuilt=parseFloat(ice[2]);
					me.totalCastlesDestroyed=parseFloat(ice[3]);
					if(!me.totalCastlesDestroyed)me.totalCastlesDestroyed=0;//mustard cleaning
					me.totalCastlesWasted=parseFloat(ice[4]);
					me.currentActive=parseInt(ice[5]);
					me.temp=parseInt(ice[6])||0;
					Molpy.CastleToolsOwned+=me.amount;
					me.refresh();
				}
				else
				{
					me.amount=0;me.bought=0;
					me.totalCastlesDestroyed=0;
					me.totalCastlesWasted=0;
					me.totalCastlesBuilt=0;
					me.currentActive=0;
				}
			
			}
			pixels=thread[7].split(s);
			Molpy.BoostsOwned=0;
			for (var i in Molpy.BoostsById)
			{
				var me=Molpy.BoostsById[i];
				if (pixels[i])
				{
					var ice=pixels[i].split(c);
					me.unlocked=parseInt(ice[0]);
					me.bought=parseInt(ice[1]); 
					if(version<0.92)
                    {
                        me.power=0;
                        me.countdown=0;                        
                    }else{
                        me.power=parseFloat(ice[2]);
                        me.countdown=parseInt(ice[3]);
                    }
					if(!me.unlocked)me.bought=0; //prevent zombies from Shopping Assistant gone wrong!
					if(me.bought)
					{
						Molpy.BoostsOwned++;
						Molpy.unlockedGroups[me.group]=1;
					}
					if(me.countdown)
					{
						Molpy.GiveTempBoost(me.name,me.power,me.countdown);
					}
					if(isNaN(me.power))
						me.power=0; //compression! :P
					if(isNaN(me.countdown))
						me.countdown=0;
				}
				else
				{
					me.unlocked=0;me.bought=0;me.power=0;me.countdown=0;				
				}
			}
			if(thread[8])
			{
				if(version<2.3)
					pixels=thread[8].split(s);
				else
					pixels=thread[8].split('');
			}else{
				pixels=[];
			}
			Molpy.BadgesOwned=0;
			Molpy.groupBadgeCounts={};
			for (var i in Molpy.BadgesById)
			{
				var me=Molpy.BadgesById[i];
				if(me.group=='badges')
				if (pixels[i])
				{
					me.earned=parseInt(pixels[i])||0;
					if(me.earned)
					{
						Molpy.BadgesOwned++;											
						if(!Molpy.groupBadgeCounts[me.group])
						{
							Molpy.groupBadgeCounts[me.group]=1;
						}else
						{
							Molpy.groupBadgeCounts[me.group]++;
						}
					}
				}
				else
				{
					me.earned=0;					
				}
			}
			if(thread[9])
			{
				pixels=thread[9].split('');
			}else{
				pixels=[];
			}
			for (var i in Molpy.options.showhideNamesOrder)
			{
				var vis = parseInt(pixels[i]);
				if(!isNaN(vis))
					Molpy.options.showhide[Molpy.options.showhideNamesOrder[i]]=vis;
			}	

			if(thread[10])
			{
				if(version<2.3)
					pixels=thread[10].split(s);
				else
					pixels=thread[10].split('');
			}else{
				pixels=[];
			}
			var j=0;
			var cam=version >=2||Molpy.Got('Camera');
			for (var i in Molpy.BadgesById)
			{
				var me=Molpy.BadgesById[i];
				if(j||me.group!='badges')
				{
					if(!j)j=i;
					if(cam&&pixels[i-j])
					{
						me.earned=parseInt(pixels[i-j])||0;
						if(me.earned)
						{
							Molpy.BadgesOwned++;	
							Molpy.unlockedGroups[me.group]=1;										
							if(!Molpy.groupBadgeCounts[me.group])
							{
								Molpy.groupBadgeCounts[me.group]=1;
							}else
							{
								Molpy.groupBadgeCounts[me.group]++;
							}
						}
					}
					else
					{
						me.earned=0;					
					}
				}
			}
			
			Molpy.needlePulling=0;//badges are loaded now
			
			if(version<0.8)
			{
				Molpy.options.autosave=2; //default to 5 millinewpix
			}
			if(version<0.82)
			{
				Molpy.Build(Molpy.newpixNumber/2);//cos I'm generous
			}
			if(version<0.831)
			{
				if(Molpy.saveCount>=20)
				{
					Molpy.UnlockBoost('Autosave Option');
					Molpy.EarnBadge('This Should be Automatic');
					Molpy.options.autosave=2;				
				}
				Molpy.options.colourscheme=0; //was NaN, steambottlish!
			}
			if(version<0.9)
			{
				Molpy.notifsReceived=0;
			}
			if(version<0.902)
			{			
				if(Molpy.ninjaStealth>=26)				
					Molpy.EarnBadge('Ninja Madness');				
				if(Molpy.Earned('Ninja Madness'))
					Molpy.UnlockBoost('Ninja Hope');
			}
			if(version<0.903)
			{
				Molpy.npbONG='mustard';
				//fix this later in execution when we can calculate it.
			}
			if(version<0.91)
			{
				Molpy.redactedCountup=0;
				Molpy.redactedToggle=0; 
				Molpy.redactedVisible=0; 
				Molpy.redactedViewIndex=-1;
				Molpy.redactedClicks=0;
			}
			if(version<0.913)
			{
				if(blitzTime)
				{
					Molpy.GiveTempBoost('Blitzing',blitzSpeed,blitzTime);
				}
			}
			if(version<0.941)
			{
				Molpy.Boosts['Overcompensating'].power=1.05;				
			}
			if(version<0.95)
			{
				Molpy.Boosts['Ninja Hope'].power=1;				
				Molpy.Boosts['Ninja Penance'].power=2;				
			}
			if(version<0.951)
			{
				Molpy.timeTravels=0;				
			}
			if(version<0.963)
			{
				Molpy.totalCastlesDown=0;
				Molpy.highestNPvisited=Molpy.newpixNumber;		//steambottle!	
			}
			if(version<0.97)
			{
				Molpy.intruderBots=0;
				for(var i in Molpy.npbDoublers)
				{
					var me = Molpy.Boosts[Molpy.npbDoublers[i]];
					if(me.bought)Molpy.LockBoost(me.name,1); //ha!
				}
			}
			if(version<0.983)
			{
				Molpy.Boosts['Double or Nothing'].power=0;
			}			
			if(version<0.992)
			{
				var bkj ='BKJ';
				if(Molpy.Got(bkj))
				{
					Molpy.Boosts[bkj].power=Molpy.redactedClicks-Molpy.Boosts[bkj].power;
				}
			}		
			if(version<1.5)//wow I haven't needed one of these in a while!
			{
				Molpy.lGlass = Molpy.Boosts['Glass Chiller'].power+1;
			}	
			if(version<1.51)
			{
				var bl = Molpy.Boosts['Glass Block Storage'];
				var pur = Molpy.Boosts['Sand Purifier'];
				if(pur.power==1 || pur.power==2) //cost should be 20, 25, 30 but was actually 25, 25, 25.
				{
					bl.power+=5;
					Molpy.Notify('+5 glass blocks. Sorry about that, BlitzGirl',1);
				}
			}
			if(version<1.532)
			{
				var fa = Molpy.Boosts['Factory Automation'];
				if(!fa.power) 
				{
					fa.power=0;
				}
			}
			if(version<1.62)
			{
				var ch = Molpy.Boosts['Glass Chip Storage'];
				if(ch.power<0)
				{
					ch.power=-ch.power;
					Molpy.Notify('Reversed the Polarity');
				}
			}
			if(version<1.73)
			{
				Molpy.Boosts['Panther Salve'].power=1;
			}
			if(version<1.9)
			{
				Molpy.options.showhide.tagged=Molpy.options.showhide.monumg;
			}
			if(version<Molpy.version) //hey let's do this every upgrade!
			{
				Molpy.Notify(BeanishToCuegish(BlitzGirl.ChallengeAccepted),1);	
			}
			if(version<1.94)
			{
				if(Molpy.Got('Glass Extruder'))
				{
					Molpy.SpendGlassChips(9000);
					Molpy.Notify('Yoink! Sorry, you got undercharged on Glass Extruder.',1);
				}
			}
			if(version<2.1)
			{
				Molpy.CastleTools['NewPixBot'].temp=Molpy.tempIntruderBots;
				if(!isFinite(Molpy.castlesDown))
				{
					Molpy.castlesDown=DeMolpify('1WTF'); //:P
				}
			}
			if(version<2.32)
			{
				var tt=Molpy.Boosts['Time Travel'];
				if(tt.bought&&tt.power!=1)
				{
					tt.power=1;
					Molpy.Notify('Let it be known that this is an apology that Time Travel was broken, specifically to BlitzGirl <small>(<b>Knight Temporal</b> of the One True Comic, BlitzGirl the First, Mopey Molpy Mome, Ottifactor Superior, First of the True Followers of Time\'s Time, Patriarch of the Western Paradox Church, Great Pilgrim of the One True Comic, Greatest Grain on the Beach of Time, Hope of the Non-Committal Waiters, Time Architect of Signposting, Supreme Observer of Time, Saint of the Timewaiters, Cardinal Tempus Viator, Archbishop of the Past, Troubadour of Time, The Bard of The-Before, The Poetess of The-Present, Versifier of Voyages-Yet-To-Be, Most True Followerer, Beater of Paradoxes, Ghost of PresentPix, Incoming Hurricane, Omnilector of Time, Princess of Persia, Red Spiders Eyes, LaPetite BlitzGirl, Sister in Waiting, Big KnowItAll, Blitzrandir, Reader, B.O.B.)</small>',1);
				}
			}
			if(version<2.8)
			{
				if(Molpy.Got('Glass Ceiling 10'))
				{
					Molpy.LockBoost('Glass Ceiling 10');
					Molpy.UnlockBoost('Glass Ceiling 10');
				}
				if(Molpy.Got('Glass Ceiling 11'))
				{
					Molpy.LockBoost('Glass Ceiling 11');
					Molpy.UnlockBoost('Glass Ceiling 11');
				}
			}
			
			Molpy.UpdateColourScheme();
			Molpy.LockBoost('Double or Nothing');
			if(Molpy.redactedVisible)
			{
				Molpy.redactedCountup=Molpy.redactedToggle;
				Molpy.CheckRedactedToggle();
			}
			
			Molpy.CheckBuyUnlocks(); //in case any new achievements have already been earned
			Molpy.CheckSandRateBadges(); //shiny!
			
			Molpy.ONGstart = ONGsnip(new Date()); //if you missed the ONG before loading, too bad!
			g('clockface').className= Molpy.Boosts['Coma Molpy Style'].power?'hidden':'unhidden';
			Molpy.HandlePeriods();
			Molpy.UpdateBeach();
			Molpy.recalculateDig=1;
			Molpy.shopRepaint=1;
			Molpy.boostRepaint=1;
			Molpy.badgeRepaint=1;
			Molpy.judgeLevel=-1;
			
			if(Molpy.showOptions) //needs refreshing
			{
				Molpy.showOptions=0;
				Molpy.OptionsToggle();
			}
		}
		
		/* In which a routine for resetting the game is presented
		+++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
		Molpy.Down=function(auto)
		{
			if(auto || confirm('Really Molpy Down?\n(Progress will be reset but achievements will not.)'))
			{
				Molpy.sandDug=0; 
				Molpy.sand=0; 
				Molpy.sandManual=0;
				if(isFinite(Molpy.castlesBuilt))
					Molpy.totalCastlesDown+=Molpy.castlesBuilt;
				Molpy.castlesBuilt=0;
				Molpy.castles=0; 
				Molpy.castlesDestroyed=0;
				Molpy.prevCastleSand=0;
				Molpy.nextCastleSand=1;
				Molpy.ninjaFreeCount=0;
				Molpy.ninjaStealth=0;
				
				Molpy.sandSpent=0;
				Molpy.castlesSpent=0;
				Molpy.beachClicks=0;
				Molpy.SandToolsOwned=0;
				Molpy.CastleToolsOwned=0;
				Molpy.BoostsOwned=0;
				Molpy.notifsReceived=0;
				
				Molpy.startDate=parseInt(new Date().getTime());
				Molpy.newpixNumber=1; 				
				Molpy.ONGstart = ONGsnip(new Date());
				Molpy.options.sandmultibuy=0;
				Molpy.options.castlemultibuy=0;
							
				for(i in Molpy.SandTools)
				{
					var me = Molpy.SandTools[i];
					me.amount=0;
					me.bought=0;
					me.totalSand=0;
					me.temp=0;
					me.refresh();
				}
				for(i in Molpy.CastleTools)
				{
					var me = Molpy.CastleTools[i];
					me.amount=0;
					me.bought=0;
					me.temp=0;
					if(i!='NewPixBot')
						me.totalCastlesBuilt=0;
					me.totalCastlesDestroyed=0;
					me.totalCastlesWasted=0;
					me.currentActive=0;
					me.refresh();
				}
				for(i in Molpy.Boosts)
				{
					var me = Molpy.Boosts[i];
					me.unlocked=0;
					me.bought=0;	
					me.power=0;
					if(me.startPower)
						me.power=me.startPower;
					me.countdown=0;
				}
				Molpy.recalculateDig=1;
				Molpy.boostRepaint=1;
				Molpy.shopRepaint=1;
				
				Molpy.UpdateBeach();
				Molpy.HandlePeriods();
				Molpy.EarnBadge('Not Ground Zero');
				Molpy.UpdateColourScheme();
			}
		}
		Molpy.Coma=function()
		{
			if(confirm('Really coma?\n(This will wipe all progress and badges!)') &&
			confirm('Seriously, this will reset ALL the things.\nAre you ABSOLUTELY sure?'))
			{
				//reset the badges
				Molpy.Down(1);				
				Molpy.saveCount=0;
				Molpy.loadCount=0;
				Molpy.highestNPvisited=0;
				Molpy.BadgesOwned=0;
				Molpy.groupBadgeCounts={};
				Molpy.redactedClicks=0;
				Molpy.timeTravels=0;
				Molpy.totalCastlesDown=0;
				Molpy.CastleTools['NewPixBot'].totalCastlesBuilt=0; //because we normally don't reset this.
				for (var i in Molpy.BadgesById)
				{
					Molpy.BadgesById[i].earned=0;						
				}
				Molpy.badgeRepaint=1;
			}
		}
		Molpy.showOptions=0;
		Molpy.OptionsToggle=function()
		{
			if(Molpy.showOptions)
			{
				Molpy.showOptions=0;
				g('beachAnchor').className='unhidden';
				g('beach').className='unhidden';
				g('options').className='hidden';
					
			}else{
				Molpy.showOptions=1;
				Molpy.showStats=0;
				Molpy.showExport=0;
				g('beachAnchor').className='hidden';
				g('beach').className='hidden';
				g('stats').className='hidden';
				g('export').className='hidden';
				g('options').className='unhidden';				
				Molpy.EarnBadge('Decisions, Decisions');
				if(Molpy.Got('Autosave Option')){
					g('autosaveoption').className='minifloatbox';
				}else{
					g('autosaveoption').className='hidden';
				}
				if(Molpy.Boosts['Chromatic Heresy'].power){
					g('otcoloption').className='minifloatbox';
				}else{
					g('otcoloption').className='hidden';
				}
				if(Molpy.Got('Sand Tool Multi-Buy')){
					g('sandmultibuy').className='minifloatbox';
				}else{
					g('sandmultibuy').className='hidden';
				}
				if(Molpy.Got('Castle Tool Multi-Buy')){
					g('castlemultibuy').className='minifloatbox';
				}else{
					g('castlemultibuy').className='hidden';
				}
				var i = Molpy.optionNames.length
				while(i--)
				{
					Molpy.OptionDescription(Molpy.optionNames[i],1); //show all descriptions
				}
			}
		}
		Molpy.flashes=0;
		Molpy.ToggleOption=function(bacon)
		{
			if(bacon=='autosave')
			{
				Molpy.options.autosave++;
				if(Molpy.options.autosave>=9)Molpy.options.autosave=0;
			}else if(bacon=='sandnumbers')
			{
				Molpy.options.numbers++;
				if(Molpy.options.numbers>=2)Molpy.options.numbers=0;
			}else if(bacon=='colourscheme')
			{
				Molpy.options.colourscheme++;
				if(Molpy.options.colourscheme>=2)Molpy.options.colourscheme=0;
				Molpy.EarnBadge('Night and Dip');
				Molpy.UpdateColourScheme();
				Molpy.flashes++;
				if(Molpy.flashes==30)
				{
					Molpy.EarnBadge('I love my flashy gif');
				}
			}else if(bacon=='otcol')
			{
				Molpy.options.otcol++;
				if(Molpy.options.otcol>=2)Molpy.options.otcol=0;
				Molpy.UpdateColourScheme();
			}else if(bacon=='longpostfix')
			{
				Molpy.options.longpostfix++;
				if(Molpy.options.longpostfix>=2)Molpy.options.longpostfix=0;
				Molpy.shopRepaint=1;
			}else if(bacon=='sandmultibuy')
			{
				Molpy.options.sandmultibuy++;
				Molpy.shopRepaint=1;
				if(Molpy.options.sandmultibuy>5)Molpy.options.sandmultibuy=0;
			}else if(bacon=='castlemultibuy')
			{
				Molpy.options.castlemultibuy++;
				Molpy.shopRepaint=1;
				if(Molpy.options.castlemultibuy>5)Molpy.options.castlemultibuy=0;
			}else return;
			
			Molpy.OptionDescription(bacon,1); //update description
			}
		Molpy.optionNames=['autosave','colourscheme','sandnumbers','otcol','longpostfix','sandmultibuy','castlemultibuy'];
		Molpy.OptionDescription=function(bacon,caffeination)
		{
			var desc='';
			if(caffeination)
			{
				if(bacon=='autosave')
				{
					var auto = Molpy.options.autosave;
					if(auto){
						desc = 'Every ' + auto*5 + 'milliNewPix';
					}else{
						desc='Off (remember to save manually!)';
					}
				}else if(bacon=='colourscheme')
				{
					var sch = Molpy.options.colourscheme;
					if(!sch){
						desc="Dark Theme";
					}else{
						desc="Light Theme";
					}
				}else if(bacon=='sandnumbers')
				{
					var nu = Molpy.options.numbers;
					if(!nu){
						desc="No";
					}else{
						desc="Yes";
					}
				}else if(bacon=='otcol')
				{
					var nu = Molpy.options.otcol;
					if(!nu){
						desc="No";
					}else{
						desc="Yes";
					}
				}else if(bacon=='longpostfix')
				{
					var nu = Molpy.options.longpostfix;
					if(!nu){
						desc="No";
					}else{
						desc="Yes";
					}
				}else if(bacon=='sandmultibuy')
				{
					desc = Math.pow(4,Molpy.options.sandmultibuy) + ' tool' + (Molpy.options.sandmultibuy > 0?'s':'')
				}else if(bacon=='castlemultibuy')
				{
					desc = Math.pow(4,Molpy.options.castlemultibuy) + ' tool' + (Molpy.options.castlemultibuy > 0?'s':'')
				}else{
					return;
				}
			}
			g(bacon+'description').innerHTML='<br>'+desc;
		}
		Molpy.UpdateColourScheme=function()
		{
			var heresy='';
			if(g('game'))
			{
				if(Molpy.Got('Chromatic Heresy')&&Molpy.Boosts['Chromatic Heresy'].power)
				{
					heresy=' heresy'
				}
				Molpy.UpdateBeach();
			}
			
			if(Molpy.options.colourscheme)
			{
				document.body.className='lightscheme'+heresy;
			}else{
				document.body.className='darkscheme'+heresy;
			}
		}
		
		
		if(!g('game'))
		{
			Molpy.LoadC_STARSTAR_kie();
			g('indexversion').innerHTML='The Game of Time. Version '+Molpy.version;
			return;
		}
		
		createClockHand();
		
		Molpy.showStats=0;
		Molpy.StatsToggle=function()
		{
			if(Molpy.showStats)
			{
				Molpy.showStats=0;
				g('beachAnchor').className='unhidden';
				g('beach').className='unhidden';
				g('stats').className='hidden';
					
			}else{
				Molpy.showStats=1;
				Molpy.showOptions=0;
				Molpy.showExport=0;
				g('beachAnchor').className='hidden';
				g('beach').className='hidden';
				g('options').className='hidden';
				g('export').className='hidden';
				g('stats').className='unhidden';
				Molpy.EarnBadge('Far End of the Bell Curve');
			}
			Molpy.shopRepaint=1;
			Molpy.boostRepaint=1;
		}
		
		Molpy.showExport=0;
		Molpy.ExportToggle=function()
		{
			if(Molpy.showExport)
			{
				Molpy.show=0;
				g('beachAnchor').className='unhidden';
				g('beach').className='unhidden';
				g('stats').className='hidden';
				g('export').className='hidden';
					
			}else{
				Molpy.showExport=1;
				Molpy.showOptions=0;
				Molpy.showStats=0;
				g('beachAnchor').className='hidden';
				g('beach').className='hidden';
				g('options').className='hidden';
				g('stats').className='hidden';
				var threads = Molpy.ToNeedlePulledThing();
				var thread='';
				for(var i in threads)
				{
					thread+=threads[i]
				}
				g('exporttext').value= CuegishToBeanish(thread);
				g('export').className='unhidden';
			}
		}
		
		/* In which the mathematical methods of sandcastles are described
		+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
		Molpy.Dig=function(amount)
		{
			Molpy.sandDug+=amount;
			Molpy.sand+=amount;
			
			var sandEpsilon = 0.0000001; //because floating point errors
			var gap = Math.ceil(Molpy.sand)-Molpy.sand;
			if(gap && gap < sandEpsilon)
			{	
				Molpy.sand = Math.ceil(Molpy.sand);
				Molpy.sandDug = Math.ceil(Molpy.sandDug);
				Molpy.EarnBadge('Clerical Error');
			}
			Molpy.SandToCastles();
			
			if(Molpy.sand>=50){
				Molpy.EarnBadge('Barn');
			}
			if(Molpy.sand>=200){
				Molpy.EarnBadge('Storehouse');
			}
			if(Molpy.sand>=500){
				Molpy.EarnBadge('Bigger Barn');	
			}
			if(Molpy.sandDug>=5000)Molpy.UnlockBoost('Molpies');						
			if(Molpy.sand>=8000){
				Molpy.EarnBadge('Warehouse');
			}
			if(Molpy.sand>=300000){
				Molpy.EarnBadge('Sand Silo');
			}
			if(Molpy.sand>=7000000){
				Molpy.EarnBadge('Silicon Valley');
			}
			if(Molpy.sand>=80000000){
				Molpy.EarnBadge('Glass Factory');
				Molpy.UnlockBoost('Glass Furnace');
			}
			if(Molpy.sand>=420000000){
				Molpy.EarnBadge('Seaish Sands');
			}
			if(Molpy.sand>=123456789){
				Molpy.EarnBadge('You can do what you want');
			}		
			if(Molpy.sand>=782222222144){
				Molpy.EarnBadge('Store ALL of the sand');
			}								
		}
		Molpy.SandToCastles=function()
		{
			Molpy.buildNotifyFlag=0;
			while(Molpy.sand >= Molpy.nextCastleSand && isFinite(Molpy.castles))
			{
				if(Molpy.Got('Fractal Sandcastles'))
				{
					var m=1.35;
					if(Molpy.Got('Fractal Fractals')) m = 1.5;
					Molpy.Build(Math.floor(Math.pow(m,Molpy.Boosts['Fractal Sandcastles'].power)));
					Molpy.Boosts['Fractal Sandcastles'].power++;
					if(Molpy.Boosts['Fractal Sandcastles'].power>=60)
					{
						Molpy.EarnBadge('Fractals Forever');
					}
				}else{
					Molpy.Build(1);
				}
				Molpy.sand -= Molpy.nextCastleSand;
				Molpy.currentCastleSand = Molpy.nextCastleSand;
				//In which Fibbonacci occurs:
				Molpy.nextCastleSand = Molpy.prevCastleSand+Molpy.currentCastleSand;
				Molpy.prevCastleSand=Molpy.currentCastleSand
				if(!isFinite(Molpy.sand) || Molpy.nextCastleSand<=0)
				{
					Molpy.nextCastleSand=1;
					Molpy.castles=Infinity;
					Molpy.castlesBuilt=Infinity;
					return;
				}
			}
			Molpy.buildNotifyFlag=1;
			Molpy.Build(0);
			
			if(isNaN(Molpy.sand))
			{
				Molpy.sand=0;
				Molpy.EarnBadge('Mustard Cleanup');
			}
			if(isNaN(Molpy.castles))
			{
				Molpy.castles=0;
				Molpy.EarnBadge('Mustard Cleanup');
			}
			if(isNaN(Molpy.castlesBuilt))
			{
				Molpy.castlesBuilt=0;
				Molpy.EarnBadge('Mustard Cleanup');
			}
		}
		Molpy.buildNotifyFlag=1;
		Molpy.buildNotifyCount=0;
		Molpy.Build=function(amount,refund)
		{
			if(!isFinite(Molpy.castles))
			{
				amount=0; //no point in adding any more
			}
			if(!refund&&amount)//don't multiply if amount is 0
			{
				amount = Math.round(amount*Molpy.globalCastleMult);
			}
			amount = Math.max(0,amount);
			Molpy.castlesBuilt+=amount;
			Molpy.castles+=amount;
			
			if(Molpy.buildNotifyFlag)
			{
				if(Molpy.buildNotifyCount)
				{
					amount+=Molpy.buildNotifyCount;
					Molpy.buildNotifyCount=0;
				}				
				if(amount){
					if(amount >= Molpy.castles/10000000)
						Molpy.Notify(amount==1?'+1 Castle':Molpify(amount,3)+ ' Castles Built',1);
					else
						Molpy.buildNotifyCount+=amount;
				}
			}else{
				Molpy.buildNotifyCount+=amount;
			}
			
			if(Molpy.castlesBuilt>=1){
				Molpy.EarnBadge('Rook');
			}
			if(Molpy.castlesBuilt>=4){
				Molpy.EarnBadge('Enough for Chess');
			}
			if(Molpy.castlesBuilt>=40){
				Molpy.EarnBadge('Fortified');
			}
			if(Molpy.castlesBuilt>=320){
				Molpy.EarnBadge('All Along the Watchtower');
			}
			if(Molpy.castlesBuilt>=1000){
				Molpy.EarnBadge('Megopolis');
			}
			if(Molpy.castlesBuilt>=100000){
				Molpy.EarnBadge('Kingdom');
			}
			if(Molpy.castlesBuilt>=10000000){
				Molpy.EarnBadge('Empire');
			}
			if(Molpy.castlesBuilt>=1000000000){
				Molpy.EarnBadge('Reign of Terror');
			}
			if(Molpy.castlesBuilt>=2000000000000){
				Molpy.EarnBadge('Unreachable?');
				Molpy.UnlockBoost("Château d'If");
			}
									
			
			if(Molpy.castles>=1000){
				Molpy.EarnBadge('We Need a Bigger Beach');
			}
			if(Molpy.castles>=1000000){
				Molpy.EarnBadge('Castle Nation');
			}
			if(Molpy.castles>=1000000000){
				Molpy.EarnBadge('Castle Planet');
			}
			if(Molpy.castles>=1000000000000){
				Molpy.EarnBadge('Castle Star');
			}
			if(Molpy.castles>=8888000000000000){
				Molpy.EarnBadge('Castle Galaxy');
			}
			if(Molpy.castles>=DeMolpify('1P')){
				Molpy.EarnBadge('People Eating Tasty Animals');
			}
			if(Molpy.castles>=DeMolpify('20P')){
				Molpy.UnlockBoost('Free Advice');
			}
			if(Molpy.castles>=DeMolpify('1Y')){
				Molpy.EarnBadge('Y U NO RUN OUT OF SPACE?');
			}
			if(Molpy.castles>=DeMolpify('1U')){
				Molpy.EarnBadge('Dumpty');
			}
			if(Molpy.castles>=DeMolpify('1S')){
				Molpy.EarnBadge('This is a silly number');
			}
			if(Molpy.castles>=DeMolpify('1H')){
				Molpy.EarnBadge('To Da Choppah');
			}
			if(Molpy.castles>=DeMolpify('1F')){
				Molpy.EarnBadge('Toasters');
			}
			if(Molpy.castles>=DeMolpify('1W')){
				Molpy.EarnBadge('Dubya');
			}
			if(Molpy.castles>=DeMolpify('1WW')){
				Molpy.EarnBadge('Rub a Dub Dub');
			}
			if(Molpy.castles>=DeMolpify('1WWW')){
				Molpy.EarnBadge('WWW');
			}
			if(Molpy.castles>=DeMolpify('1WWWW')){
				Molpy.EarnBadge('Age of Empires');
			}
			if(Molpy.castles>=DeMolpify('1Q')){
				Molpy.EarnBadge('Queue');
			}
			if(Molpy.castles>=DeMolpify('1WQ')){
				Molpy.EarnBadge('What Queue');
			}
			if(!isFinite(Molpy.castles)&&!isFinite(Molpy.sand)){
				Molpy.EarnBadge('Everything but the Kitchen Windows');
			}
					
		
		}
		Molpy.MakeChips=function()
		{
			var furnaceLevel=(Molpy.Boosts['Sand Refinery'].power)+1;
			Molpy.AddChips(furnaceLevel);
		}
		Molpy.AddChips=function(amount)
		{
			Molpy.UnlockBoost('Glass Chip Storage');
			var ch = Molpy.Boosts['Glass Chip Storage'];
			if(!ch.bought)
			{
				ch.buy();
			}
			ch.power+=amount;
			var waste = Math.max(0,ch.power-(ch.bought)*10);
			ch.power-=waste;
			amount-=waste;
			if(amount)
            {
				Molpy.Notify('Made '+Molpify(amount)+' Glass Chip'+(amount>1?'s':''),1);
			}
			if(waste)
			{
				Molpy.Notify('Not enough Chip Storage for '+Molpify(waste)+' Glass Chip'+(waste>1?'s':''));
			}
		}
		Molpy.MakeBlocks=function()
		{
			var chillerLevel=(Molpy.Boosts['Glass Chiller'].power)+1;
			var chipsFor=chillerLevel;
			
			var ch = Molpy.Boosts['Glass Chip Storage'];
			while(ch.power < chipsFor*20)
			{
				chipsFor--;
			}
			if(!chipsFor)
			{
				Molpy.Notify('Not enough Glass Chips to make any Blocks',1);
				return;
			}else if (chillerLevel<chipsFor){
				Molpy.Notify('Running low on Glass Chips!');
				chillerLevel=chipsFor;
			}
			ch.power-=chipsFor*20;
			Molpy.AddBlocks(chillerLevel);
		}
		Molpy.AddBlocks=function(amount)
		{
			Molpy.UnlockBoost('Glass Block Storage');
			var bl = Molpy.Boosts['Glass Block Storage'];
			if(!bl.bought)
			{
				bl.buy();
			}
			bl.power+=amount;
			var waste = Math.max(0,bl.power-(bl.bought)*50);
			bl.power-=waste;
			amount-=waste;
			if(amount)
            {
				Molpy.EarnBadge('Glassblower');
				Molpy.Notify('Made '+Molpify(amount)+' Glass Block'+(amount>1?'s':''),1);
			}
			if(waste)
			{
				Molpy.Notify('Not enough Block Storage for '+Molpify(waste)+' Glass Block'+(waste>1?'s':''));
			}
		}
		
		Molpy.SpendCastles=function(amount,silent)
		{
			if(!amount)return;
			amount = Math.min(amount,Molpy.castles);
			Molpy.castles-=amount;
			Molpy.castlesSpent+=amount;
			if(isNaN(Molpy.castles))
			{
				Molpy.castles=0;
				Molpy.EarnBadge('Mustard Cleanup');
			}
			if(!silent&&(isFinite(Molpy.castles)||!isFinite(amount)))
				Molpy.Notify('Spent Castles: ' + Molpify(amount,3),1);
		}
		Molpy.spendSandNotifyFlag=1;
		Molpy.spendSandNotifyCount=0;
		Molpy.SpendSand=function(amount,silent)
		{
			if(!amount)return;
			Molpy.sand-=amount;
			Molpy.sandSpent+=amount;
			if((isFinite(Molpy.sand)||!isFinite(amount)))
			{
				if(!silent&&Molpy.spendSandNotifyFlag)
				{
					if(Molpy.spendSandNotifyCount)
					{
						amount+=Molpy.spendSandNotifyCount;
						Molpy.spendSandNotifyCount=0;
					}				
					if(amount){
						if(amount >= Molpy.sand/10000000)
							Molpy.Notify('Spent Sand: ' + Molpify(amount,3),1);
						else
						{
							Molpy.spendSandNotifyCount+=amount;
							return 1;
						}
					}
				}else{
					Molpy.spendSandNotifyCount+=amount;
					return 1;
				}
			}
		}
		
		Molpy.destroyNotifyFlag=1;
		Molpy.destroyNotifyCount=0;
		Molpy.Destroy=function(amount,logsilent)
		{
			amount = Math.min(amount,Molpy.castles);
			Molpy.castles-=amount;
			Molpy.castlesDestroyed+=amount;
			if(Molpy.destroyNotifyFlag)
			{
				if(Molpy.destroyNotifyCount)
				{
					amount+=Molpy.destroyNotifyCount;
					Molpy.destroyNotifyCount=0;
				}				
				if(amount){
					if(amount >= Molpy.castles/10000000)
						Molpy.Notify(amount==1?'-1 Castle':Molpify(amount,3)+ ' Castles Destroyed',!logsilent);
					else
					{
						Molpy.destroyNotifyCount+=amount;
						return 1;
					}
				}
			}else{
				Molpy.destroyNotifyCount+=amount;
				return 1;
			}
			//destroying is done by trebuchets and stuff: it's different to spending
		}
		Molpy.sandPerClick=function()
		{			
			var baserate=1 + Molpy.Got('Bigger Buckets')*0.1;
			var mult=1;
			if(Molpy.Got('Huge Buckets'))mult*=2;
			if(Molpy.Got('Buccaneer'))mult*=2;
			baserate*=mult;
			if(Molpy.Got('Helpful Hands'))
			{
				var pairs = Math.min(Molpy.SandTools['Bucket'].amount, Molpy.SandTools['Cuegan'].amount);
				baserate+=0.5*pairs;
			}
			if(Molpy.Got('True Colours'))
			{
				var pairs = Math.min(Molpy.SandTools['Flag'].amount, Molpy.SandTools['Cuegan'].amount);
				baserate+=5*pairs;
			}
			if(Molpy.Got('Raise the Flag'))
			{
				var pairs = Math.min(Molpy.SandTools['Flag'].amount, Molpy.SandTools['Ladder'].amount);
				baserate+=50*pairs;
			}
			if(Molpy.Got('Hand it Up'))
			{
				var pairs = Math.min(Molpy.SandTools['Bag'].amount, Molpy.SandTools['Ladder'].amount);
				baserate+=500*pairs;
			}
			if(Molpy.Got('Bucket Brigade'))
			{
				baserate+=Molpy.sandPermNP*0.01*Math.floor(Molpy.SandTools['Bucket'].amount/50);
			}
			
			if(Molpy.Got('Bag Puns'))
			{
				baserate+= baserate*(4/10)*Math.max(-2,Math.floor((Molpy.SandTools['Bag'].amount-25)/5));
			}
			return baserate;
		}
		Molpy.computedSandPerClick=1;
		Molpy.globalSpmNPMult=1;
		Molpy.lastClick=0;
		Molpy.ClickBeach=function()
		{
			var newsand=Molpy.computedSandPerClick;
			Molpy.Dig(newsand);
			if(Molpy.options.numbers) Molpy.AddSandParticle('+'+Molpify(newsand,1));
			Molpy.sandManual+=newsand;
			Molpy.beachClicks+=1;
			Molpy.CheckClickAchievements();
			if( Molpy.ninjad==0&&Molpy.CastleTools['NewPixBot'].amount)
			{
				if(Molpy.npbONG==1)
				{
					Molpy.StealthClick();
				}else if(Molpy.npbONG==0){
					if(Molpy.NinjaUnstealth())
					{
						if(Molpy.CastleTools['NewPixBot'].currentActive)
						{
							Molpy.EarnBadge('Ninja');
						}
						if(Molpy.CastleTools['NewPixBot'].currentActive>=10)
						{
							Molpy.EarnBadge('Ninja Strike');
						}
					}
				}
			}else if(Molpy.Got('VJ'))
			{
				if(Molpy.beachClicks%100==0)
				{
					Molpy.Notify(Molpy.Boosts['VJ'].name);
					Molpy.Build(Molpy.CalcVJReward(1));
					Molpy.Boosts['VJ'].power++;
				}
			}
			if(Molpy.Got('Bag Puns')&&Molpy.Boosts['VJ'].bought!=1)
			{
				if(Molpy.beachClicks%20==0)
				{
					Molpy.Notify(GLRschoice(Molpy.bp));
					var p = Molpy.Boosts['Bag Puns'].power;
					p++;
					if(p>100)
					{
						Molpy.UnlockBoost('VJ');
					}
					Molpy.Boosts['Bag Puns'].power=p;
				}
			}
			Molpy.ninjad=1;
			Molpy.HandleClickNP();	

			if(Molpy.Got('Temporal Rift') && Molpy.Boosts['Temporal Rift'].countdown<5 && Math.floor(Math.random()*2)==1)
			{
				Molpy.Notify('You accidentally slip through the temporal rift!,1');
				Molpy.RiftJump();
			}
		}
		g('beach').onclick=Molpy.ClickBeach;	
		
		Molpy.CalcVJReward=function(includeNinja)
		{
		
			var p = Molpy.Boosts['VJ'].power;
			var mult=1000000;
			if(Molpy.Got('Swedish Chef'))
			{
				mult*=100;
			}else{
				if(p>20)Molpy.UnlockBoost('Swedish Chef');
			}
			if(Molpy.Got('Phonesaw')) mult*=mult;
			if(includeNinja&&Molpy.Boosts['Ninjasaw'].power)
			{
				if(Molpy.HasGlassBlocks(50))
				{
					Molpy.SpendGlassBlocks(50);
					mult*=Molpy.CalcStealthBuild(0,1)/10;
				}
			}
			return p*mult;
		}
		
		Molpy.StealthClick=function()
		{		
			//clicking first time, after newpixbot		
			Molpy.EarnBadge('No Ninja');
			Molpy.ninjaFreeCount++; 
			var ninjaInc = 1;
			if(Molpy.Got('Active Ninja'))
			{
				ninjaInc*=3;
			}
			if(Molpy.Got('Ninja League'))
			{
				ninjaInc*=100;
			}
			if(Molpy.Got('Ninja Legion'))
			{
				ninjaInc*=1000;
			}
			Molpy.ninjaStealth+=ninjaInc;
			
			if(Molpy.Got('Ninja Builder')) 
			{
				var stealthBuild=Molpy.CalcStealthBuild(1,1);
				Molpy.Build(stealthBuild+1);
				var fn='Factory Ninja';
				if(Molpy.Got(fn))
				{
					Molpy.ActivateFactoryAutomation();
					!Molpy.Boosts[fn].power--
					if(!Molpy.Boosts[fn].power)
						Molpy.LockBoost(fn);
				}
			}else{
				Molpy.Build(1); //neat!
			}
			if(Molpy.ninjaStealth>=6)
			{
			 Molpy.EarnBadge('Ninja Stealth');
				Molpy.UnlockBoost('Stealthy Bot');
			} 
			if(Molpy.ninjaStealth>=16)
			{
				Molpy.EarnBadge('Ninja Dedication');			
				Molpy.UnlockBoost('Ninja Builder');	
			} 			
			if(Molpy.ninjaStealth>=26)
			{
				Molpy.EarnBadge('Ninja Madness');
				Molpy.UnlockBoost('Ninja Hope');
			}
			if(Molpy.ninjaStealth>=36)
			{
				Molpy.EarnBadge('Ninja Omnipresence');
			}
			if(Molpy.ninjaStealth>4000)
			{
				Molpy.EarnBadge('Ninja Pact');
			}	
			if(Molpy.ninjaStealth>4000000)
			{
				Molpy.EarnBadge('Ninja Unity');
			}				
		}
		Molpy.CalcStealthBuild=function(vj,spend)
		{
			var stealthBuild = Molpy.ninjaStealth;
			if(Molpy.Got('Ninja Assistants')) stealthBuild*=Molpy.CastleTools['NewPixBot'].amount;
			if(Molpy.Got('Skull and Crossbones'))
			{
				stealthBuild*=Math.floor(Math.pow(1.05,Math.max(-1,Molpy.SandTools['Flag'].amount-40)));
			}
			if(Molpy.Boosts['Glass Jaw'].power)
			{
				if(Molpy.HasGlassBlocks(1))
				{
					if(spend)
						Molpy.SpendGlassBlocks(1);
					stealthBuild*=100;
				}
			}
			if(Molpy.Got('Ninja Climber'))
			{
				stealthBuild*=Molpy.SandTools['Ladder'].amount;
				if(spend)
				{
					Molpy.recalculateDig=1;
				}
			}
			if(vj&&Molpy.Boosts['Ninjasaw'].power&&Molpy.Boosts['VJ'].power)
			{
				if(Molpy.HasGlassBlocks(50))
				{
					if(spend)
						Molpy.SpendGlassBlocks(50);
						stealthBuild*=Molpy.CalcVJReward();
				}
			}
			
			return stealthBuild;
		}
		
		var prevKey='';
		Molpy.KeyDown=function(e)
		{
			var key= String.fromCharCode(e.keyCode||e.charCode);
			if(key=='5'&&prevKey.toLowerCase()=='f')
			{
				Molpy.ClickBeach();
				Molpy.EarnBadge('Use Your Leopard');
			}
			prevKey=key;
		}
		window.onkeydown=Molpy.KeyDown;
		
		Molpy.NinjaUnstealth=function()
		{
			if(Molpy.Got('Impervious Ninja'))return 0; //Safe
			if(!Molpy.ninjaStealth)return 0; //Nothing to lose!
			if(Molpy.Got('Ninja Hope')&&Molpy.Boosts['Ninja Hope'].power)
			{
				if(Molpy.castles>=10){
					Molpy.Destroy(10);
					Molpy.Boosts['Ninja Hope'].power--;
					Molpy.Notify('Ninja Forgiven',1);
					return 0;
				}
			}
			if(Molpy.Got('Ninja Penance')&&Molpy.Boosts['Ninja Penance'].power)
			{
				if(Molpy.castles>=30){
					Molpy.Destroy(30);
					Molpy.Boosts['Ninja Penance'].power--;
					Molpy.Notify('Ninja Forgiven',1);
					return 0;
				}
			}
			Molpy.Boosts['Ninja Hope'].power=1;
			Molpy.Boosts['Ninja Penance'].power=2;
			if(Molpy.ninjaStealth)
				Molpy.Notify('Ninja Unstealthed',1);
			if(Molpy.ninjaStealth>=7&&Molpy.Got('Ninja Hope'))
			{
				Molpy.UnlockBoost('Ninja Penance');
			}
			if(Molpy.ninjaStealth>=30&&Molpy.ninjaStealth<36)
			{
				Molpy.EarnBadge('Ninja Shortcomings');
			}
			Molpy.ninjaStealth=0;
			return 1;
		}
		
		Molpy.HandleClickNP=function()
		{
			var NP = Molpy.newpixNumber;
			if(NP==404) Molpy.EarnBadge('Badge Not Found');
		}
		
		/* In which we calculate how much sand per milliNewPix we dig
		+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
		Molpy.CalculateDigSpeed=function()
		{
			Molpy.recalculateDig=0;
			
			var oldrate = Molpy.sandPermNP;
			Molpy.sandPermNP=0;
			var multiplier = 1;
			for (var i in Molpy.SandTools)
			{
				var me=Molpy.SandTools[i];
				me.storedSpmNP=EvalMaybeFunction(me.spmNP,me);
				me.storedTotalSpmNP=me.amount*me.storedSpmNP;
				Molpy.sandPermNP+=me.storedTotalSpmNP;
			}
			var ninjaFactor =1;
			if(Molpy.Got('Busy Bot'))ninjaFactor+=0.1;
			if(Molpy.Got('Stealthy Bot'))ninjaFactor+=0.1;
			if(Molpy.Got('Chequered Flag'))ninjaFactor+=0.2;
			Molpy.ninjaTime = Molpy.baseNinjaTime/ninjaFactor;
			if(Molpy.Got('Molpies'))//molpy molpy molpy molpy molpy
			{
				multiplier+=0.01*Molpy.BadgesOwned;
			}
			if(Molpy.Got('Grapevine'))//grapevine
			{
				multiplier+=0.02*Molpy.BadgesOwned;
			}
			if(Molpy.Got('Ch*rpies'))
			{
				multiplier+=0.05*Molpy.BadgesOwned;
			}
			if(Molpy.Got('Blitzing'))
			{
				multiplier*=Molpy.Boosts['Blitzing'].power/100;
			}
			Molpy.computedSandPerClick=Molpy.sandPerClick()*multiplier;
			
			//stuff beyond here doesn't apply to clicks
			if(Molpy.Got('Overcompensating')) 
			{
				multiplier+=Molpy.Boosts['Overcompensating'].power;
			}
			
			if(Molpy.Got('Facebugs'))
			{
				multiplier+=0.1*Molpy.BadgesOwned;
			}
			var glassUse=Molpy.CalcGlassUse();
			multiplier*=Math.max(0,((100-glassUse)/100));
			Molpy.globalSpmNPMult=multiplier;
			Molpy.sandPermNP*=Molpy.globalSpmNPMult;
						
			if(Molpy.sandPermNP>oldrate) Molpy.CheckSandRateBadges();
			
			Molpy.CalcReportJudgeLevel();
			
			if(Molpy.Got('Flux Turbine'))
			{
				var fluxLevel = Math.log(Molpy.totalCastlesDown);
				if(Molpy.Got('Flux Surge'))
				{
					fluxLevel*=1.5;
				}
				Molpy.globalCastleMult=Math.max(1,Math.pow(1.02,fluxLevel));
			}else{
				Molpy.globalCastleMult=1;
			}
			
		}
		Molpy.CheckSandRateBadges=function()
		{
			var sr = Molpy.sandPermNP;
			if(sr>=0.1)Molpy.EarnBadge('A light dusting');
			if(sr>=0.8)Molpy.EarnBadge('Sprinkle');
			if(sr>=6)Molpy.EarnBadge('Trickle');
			if(sr>=25)Molpy.EarnBadge('Pouring it on');
			if(sr>=100)Molpy.EarnBadge('Hundred Year Storm');
			if(sr>=400)Molpy.EarnBadge('Thundering Typhoon!');
			if(sr>=1600)Molpy.EarnBadge('Sandblaster');
			if(sr>=7500)Molpy.EarnBadge('Where is all this coming from?');
			if(sr>=30000)Molpy.EarnBadge('Seaish Sandstorm');
			if(sr>=500500)Molpy.EarnBadge('WHOOSH');
			if(sr>=2222222)Molpy.EarnBadge('We want some two!');
			if(sr>=10101010)Molpy.EarnBadge('Bittorrent');
			if(sr>=299792458)Molpy.EarnBadge('WARP SPEEEED');
			if(sr>=8888888888.8)Molpy.EarnBadge('Maxed out the display');
		}
		Molpy.CalcReportJudgeLevel=function()
		{
			var judy=Molpy.JudgementDipReport()[0];
			if(Molpy.judgeLevel==-1)//just loaded
			{
				if(judy>0)
					Molpy.Notify("Judgement Dip Level: "+Molpify(judy-1,2),1);
			}			
			else if(judy>Molpy.judgeLevel)//increase
			{
				if(Molpy.judgeLevel<2&&judy>2)//jumped from safe to multiple levels of judgement
				{
					Molpy.Notify('Judgement Dip is upon us!');
					Molpy.Notify("Judgement Dip Level: "+Molpify(judy-1,2),1);
				}else if(judy>2)
				{
					Molpy.Notify('Things got worse!!');
					Molpy.Notify("Judgement Dip Level: "+Molpify(judy-1,2),1);
				}
				else if(judy==2)
				{
					Molpy.Notify('Judgement Dip is upon us!',1);
				}
				else if(judy==1)
				{
					Molpy.Notify("You sense trouble. The bots are restless.",1);
				}
			}else if(judy<Molpy.judgeLevel)//decrease
			{
				if(judy>1)
				{
					Molpy.Notify('Things got better');
					Molpy.Notify("Judgement Dip Level: "+Molpify(judy-1,2),1);
				}
				else if(judy==1)
				{
					Molpy.Notify("You feel relief but fear lingers.",1);
				}
				else if(judy==0)
				{
					if(Molpy.Boosts['NewPixBot Navigation Code'].power)
					{
						Molpy.Notify('Your alterations to the navigation code have saved the day!',1);
					}else{
						Molpy.Notify('You feel safe.',1);
					}
				}
			}
			Molpy.judgeLevel=judy;
			
			if(Molpy.judgeLevel)Molpy.EarnBadge('Judgement Dip Warning');
			if(Molpy.judgeLevel>1)Molpy.EarnBadge('Judgement Dip');
		}
		
		
		/* In which the shop is implemented
		+++++++++++++++++++++++++++++++++++*/
		Molpy.shopRepaint=1;
		Molpy.sandToolPriceFactor=1.1;
		Molpy.SandTools=[];
		Molpy.SandToolsById=[];
		Molpy.SandToolsN=0;
		Molpy.CastleTools=[];
		Molpy.CastleToolsById=[];
		Molpy.CastleToolsN=0;
		Molpy.SandToolsOwned=0;
		Molpy.CastleToolsOwned=0;
		Molpy.priceFactor=1;
		
		Molpy.SandTool=function(args)
		{
			this.id=Molpy.SandToolsN;
			this.name=args.name;
			args.commonName=args.commonName.split('|');
			this.single=args.commonName[0];
			this.plural=args.commonName[1];
			this.actionName=args.commonName[2];
			this.desc=args.desc;
			this.basePrice=args.price;
			this.price=this.basePrice;
			this.spmNP=args.spmNP;
			this.totalSand=0;
			this.storedSpmNP=0;
			this.storedTotalSpmNP=0;
			this.gpmNP=args.gpmNP;
			this.totalGlass=0;
			this.storedGpmNP=0;
			this.storedTotalGpmNP=0;
			this.nextThreshold=args.nextThreshold;
			this.pic=args.pic;
			this.icon=args.icon;
			this.background=args.background;
			this.buyFunction=args.buyFunction;
			this.drawFunction=args.drawFunction;
						
			this.amount=0;
			this.bought=0;
			this.temp=0;
			
			this.buy=function()
			{
				var times = Math.pow(4,Molpy.options.sandmultibuy );
				var bought=0;
				var spent=0;
				while (times--)
				{
					var price=Math.floor(Molpy.priceFactor*this.basePrice*Math.pow(Molpy.sandToolPriceFactor,this.amount));
					if(!isFinite(price))
					{
						Molpy.UnlockBoost('Tool Factory');
						Molpy.EarnBadge(this.name+' Shop Failed');
					}else if (Molpy.castles>=price){
						Molpy.SpendCastles(price,1);
						this.amount++;
						this.bought++;
						bought++;
						spent+=price;
						price=Math.floor(this.basePrice*Math.pow(Molpy.sandToolPriceFactor,this.amount));
						this.price=price;
						if (this.buyFunction) this.buyFunction(this);
						if (this.drawFunction) this.drawFunction();
						Molpy.shopRepaint=1;
						Molpy.recalculateDig=1;
						Molpy.SandToolsOwned++;
						Molpy.CheckBuyUnlocks();
					}
				}
				if(Molpy.Got('Temporal Duplication'))
				{
					this.amount+=bought;
					this.temp+=bought;
					bought+=bought;
				}
				if(bought)
					Molpy.Notify('Spent '+Molpify(spent,3)+' Castle'+(spent>1?'s':'')+', Bought '+Molpify(bought,3)+' '+(bought>1?this.plural:this.single),1);
			}
			this.create=function()
			{
				this.amount++;
				this.bought++;
				Molpy.SandToolsOwned++;				
			}
			this.sell=function()
			{
				if (this.amount>0)
				{					
					this.amount--;
					var price=this.basePrice*Math.pow(Molpy.sandToolPriceFactor,this.amount);
					
					if(this.temp>0)
					{
						this.temp--;
						Molpy.Notify('Temporal Duplicate Destroyed!');
					}else{
						var d=1;
						if(Molpy.Got('Family Discount'))d=.2;
						if(Molpy.Boosts['ASHF'].startPower>0.5) d*=0.8; //sorry guys, no ikea-scumming
						Molpy.Build(Math.floor(price*0.5*d),1);
					}
					this.price=price;
					if (this.sellFunction) this.sellFunction();
					if (this.drawFunction) this.drawFunction();
					Molpy.shopRepaint=1;
					Molpy.recalculateDig=1;
					Molpy.SandToolsOwned--;
					Molpy.UnlockBoost('No Sell');
					Molpy.CheckBuyUnlocks();
				}
			}
			this.showdesc=function()
			{
				var desc = '';
				if(Molpy.showStats)
				{
					desc='Total sand '+this.actionName+': '+Molpify(this.totalSand,1)+
					'<br>Sand/mNP per '+this.single+': '+Molpify(this.storedSpmNP,1)+
					'<br>Total '+this.plural+' bought: '+Molpify(this.bought);
					Molpy.EarnBadge('The Fine Print');
				}else
				{				
					desc=this.desc;
				}
				var d=g('SandToolDescription'+this.id);
				if(d)d.innerHTML='<br>'+desc;
			}
			this.hidedesc=function()
			{		
				var d=g('SandToolDescription'+this.id);
				if(d)d.innerHTML='';
			}
			this.refresh=function()
			{
				Molpy.shopRepaint=1;
				Molpy.recalculateDig=1;
				this.price=Math.floor(this.basePrice*Math.pow(Molpy.sandToolPriceFactor,this.amount));
				if (this.drawFunction) this.drawFunction();
			}
			
			
			Molpy.SandTools[this.name]=this;
			Molpy.SandToolsById[this.id]=this;
			Molpy.SandToolsN++;
			return this;
		}	
	
		Molpy.CastleTool=function(args)
		{
			this.id=Molpy.CastleToolsN;
			this.name=args.name;
			args.commonName=args.commonName.split('|');
			this.single=args.commonName[0];
			this.plural=args.commonName[1];
			this.actionDName=args.commonName[2];
			this.actionBName=args.commonName[3];
			this.desc=args.desc;
			this.price0=args.price0;
			this.price1=args.price1;
			this.prevPrice=args.price0;
			this.nextPrice=args.price1;
			this.price=this.prevPrice+this.nextPrice; //fib!
			this.destroyC=args.destroyC;
			this.buildC=args.buildC;
			this.destroyG=args.destroyG;
			this.buildG=args.buildG;
			this.totalCastlesBuilt=0;
			this.totalCastlesDestroyed=0;
			this.totalCastlesWasted=0; //those destroyed for no gain
			this.totalGlassBuilt=0;
			this.totalGlassDestroyed=0;
			this.totalGlassWasted=0; 
			this.currentActive=0;
			this.nextThreshold=args.nextThreshold;
			this.pic=args.pic;
			this.icon=args.icon;
			this.background=args.background;
			this.buyFunction=args.buyFunction;
			this.drawFunction=args.drawFunction;
			this.destroyFunction=args.destroyFunction;
						
			this.amount=0;
			this.bought=0;
			this.temp=0;
			
			this.buy=function()
			{
				var times = Math.pow(4, Molpy.options.castlemultibuy);
				var bought=0;
				var spent=0;
				while (times--)
				{
					var price=Math.floor(Molpy.priceFactor*(this.prevPrice+this.nextPrice));
					if(!isFinite(price))
					{
						Molpy.UnlockBoost('Tool Factory');
						Molpy.EarnBadge(this.name+' Shop Failed');
					}else if (Molpy.castles>=price){
						Molpy.SpendCastles(price,1);
						this.amount++;
						this.bought++;
						bought++;
						spent+=price;
						this.prevPrice=this.nextPrice;
						this.nextPrice=this.price;
						this.price=this.prevPrice+this.nextPrice;
						if (this.buyFunction) this.buyFunction(this);
						if (this.drawFunction) this.drawFunction();
						Molpy.shopRepaint=1;
						Molpy.recalculateDig=1;
						Molpy.CastleToolsOwned++;
						Molpy.CheckBuyUnlocks();
					}
				}
				if(Molpy.Got('Temporal Duplication'))
				{
					this.amount+=bought;
					this.temp+=bought;
					bought+=bought;
				}
				if(bought)
					Molpy.Notify('Spent '+Molpify(spent,3)+' Castle'+(spent>1?'s':'')+', Bought '+Molpify(bought,3)+' '+(bought>1?this.plural:this.single),1);
			}
			this.create=function()
			{
				this.amount++;
				this.bought++;
				Molpy.CastleToolsOwned++;				
			}
			this.sell=function()
			{				
				var price=this.prevPrice;
				if (this.amount>0)
				{
					if(this.temp>0)
					{
						this.temp--;
						Molpy.Notify('Temporal Duplicate Destroyed!');
					}else{					
						var d=1;
						if(Molpy.Got('Family Discount'))d=.2;
						if(Molpy.Boosts['ASHF'].startPower>0.5) d*=0.7; //sorry guys, no ikea-scumming
						Molpy.Build(price*d,1);
					}
					
					this.amount--;
					this.prevPrice=this.nextPrice-this.prevPrice;
					this.price=this.nextPrice;
					this.nextPrice=price; //which is the former value of prevPrice
					if (this.sellFunction) this.sellFunction();
					if (this.drawFunction) this.drawFunction();
					Molpy.shopRepaint=1;
					Molpy.recalculateDig=1;
					Molpy.CastleToolsOwned--;
					Molpy.UnlockBoost('No Sell');
					Molpy.CheckBuyUnlocks();
				}
			}
			this.DestroyPhase=function()
			{
				var i = this.amount
				var destroyC=EvalMaybeFunction(this.destroyC);
				while(i--)
				{
					if(Molpy.castles >= destroyC)
					{
						this.currentActive++;
						this.totalCastlesDestroyed+=destroyC;
					}
					else
					{
						this.totalCastlesWasted+=Molpy.castles;
					}
					Molpy.Destroy(destroyC);
					if(this.destroyFunction)this.destroyFunction();
				}
			}
			this.BuildPhase=function()
			{
				var i = this.currentActive;
				var buildC =EvalMaybeFunction(this.buildC);
				while(i--)
				{
					Molpy.Build(buildC);
					this.totalCastlesBuilt+=buildC;
				}
				this.currentActive=0;
			}
			this.showdesc=function()
			{
				var desc = '';
				var bN = EvalMaybeFunction(this.buildC);
				var dN = EvalMaybeFunction(this.destroyC);
				var actuals ='<br>Builds '+Molpify(bN,1)+(dN?(' if '+Molpify(dN,1)+((dN-1)?' are':' is')+' destroyed.'):'');
				if(Molpy.showStats)
				{
					if(this.totalCastlesDestroyed)
						desc+='Total castles '+this.actionDName+': '+Molpify(this.totalCastlesDestroyed)+
						'<br>Total castles wasted: '+Molpify(this.totalCastlesWasted);
					if(this.totalCastlesBuilt)
						desc+='<br>Total castles '+this.actionBName+': +'+Molpify(this.totalCastlesBuilt);
					desc+='<br>Total '+this.plural+' bought: '+Molpify(this.bought);
					desc+='<br>'+actuals;
					Molpy.EarnBadge('Keeping Track');
				}else
				{				
					desc=this.desc+actuals;
				}
			
				var d=g('CastleToolDescription'+this.id);
				if(d)d.innerHTML='<br>'+desc;
			}
			this.hidedesc=function(event)
			{
				var d=g('CastleToolDescription'+this.id);
				if(d)d.innerHTML='';
			}
			this.refresh=function()
			{
				Molpy.shopRepaint=1;
				Molpy.recalculateDig=1;
				var i = this.amount;
				this.prevPrice=this.price0;
				this.nextPrice=this.price1;
				var p = this.prevPrice+this.nextPrice;
				while(i--)
				{
					this.prevPrice=this.nextPrice;
					this.nextPrice=p;
					p=this.prevPrice+this.nextPrice;
				}
				this.price=p;
				if (this.drawFunction) this.drawFunction();
			}
			
			
			Molpy.CastleTools[this.name]=this;
			Molpy.CastleToolsById[this.id]=this;
			Molpy.CastleToolsN++;
			return this;
		}
		
		
		Molpy.boostRepaint=1;
		Molpy.boostHTML='';
		Molpy.Boosts=[];
		Molpy.BoostsById=[];
		Molpy.BoostN=0;
		Molpy.BoostsInShop=[];
		Molpy.BoostsOwned=0;
		Molpy.BoostAKA=[];
		var order=0;
		Molpy.Boost=function(args)
		{
			this.id=Molpy.BoostN;
			this.name=args.name;
			this.aka=args.aka||args.name;
			this.desc=args.desc;
			this.sandPrice=args.sand||0;
			this.castlePrice=args.castles||0;
			this.glassPrice=args.glass||0;
			this.stats=args.stats;
			this.icon=args.icon;
			this.buyFunction=args.buyFunction;
			this.countdownFunction=args.countdownFunction;
			this.unlocked=0;
			this.bought=0;
			this.department=args.department; //allow unlock by the department (this is not a saved value)
			this.logic=args.logic; //allow unlock by logicat (this is not a saved value)
			this.order=this.id;
			this.hovered=0;
			this.power=0;
			this.countdown=0;
			if(args.startPower)
			{
				this.startPower=args.startPower;
				this.power=args.startPower;
			}
			this.startCountdown=args.startCountdown;
			this.className=args.className;
			this.classChange=args.classChange;
			this.group=args.group||'boosts';
			this.lockFunction=args.lockFunction;
			this.unlockFunction=args.unlockFunction;
			
			if(order) this.order=order+this.id/1000;
			//(because the order we create them can't be changed after we save)
			
			
			this.buy=function()
			{
				if(!this.unlocked)return; //shopping assistant tried to buy it when it was locked
				
				var sp = Math.floor(Molpy.priceFactor*EvalMaybeFunction(this.sandPrice,this,1));
				var cp = Math.floor(Molpy.priceFactor*EvalMaybeFunction(this.castlePrice,this,1));
				var gp = Math.floor(Molpy.priceFactor*EvalMaybeFunction(this.glassPrice,this,1));
				if (!this.bought && Molpy.castles>=cp && Molpy.sand>=sp && Molpy.HasGlassBlocks(gp))
				{
					Molpy.SpendSand(sp);
					Molpy.SpendCastles(cp);
					Molpy.SpendGlassBlocks(gp);
					this.bought=1;
					if (this.buyFunction) this.buyFunction(this);
					Molpy.boostRepaint=1;
					Molpy.recalculateDig=1;
					Molpy.BoostsOwned++;
					Molpy.CheckBuyUnlocks();
					Molpy.unlockedGroups[this.group]=1;
					if(sp+cp>0)
					{
						Molpy.ShowGroup(this.group,this.className);
					}
				}				
			}
			this.showdesc=function()
			{
				var boo=g('BoostDescription'+this.id)
				if(boo)
				{	
					boo.innerHTML='<br>'+EvalMaybeFunction((Molpy.showStats&&this.stats)?this.stats:this.desc,this);
				}
			}
			this.hidedesc=function()
			{					
				var d=g('BoostDescription'+this.id);
				if(d)d.innerHTML='';
			}
			this.describe=function()
			{			
				Molpy.Notify(this.name + ': ' + EvalMaybeFunction(this.desc,this),1);
			}
			
			Molpy.Boosts[this.aka]=this;
			Molpy.BoostsById[this.id]=this;
			if(this.name!=this.aka)
			{
				Molpy.BoostAKA[this.name]=this.aka;
			}
			Molpy.BoostN++;
			return this;
		}	
		
		Molpy.UnlockBoost=function(bacon)
		{
			if(typeof bacon==='string')
			{
				var baby=Molpy.Boosts[bacon];
				if(baby)
				{
					if(baby.unlocked==0)
					{
						baby.unlocked=1;
						Molpy.boostRepaint=1;
						Molpy.recalculateDig=1;
						Molpy.Notify('Boost Unlocked: '+baby.name,1);
						if(baby.unlockFunction)baby.unlockFunction();
						if(baby.name==Molpy.shoppingItem)
							Molpy.Donkey();
					}
				}
			}else{ //yo wolpy I heard you like bacon...
				for(var i in bacon){Molpy.UnlockBoost(bacon[i]);}
			}
		}		
		Molpy.GiveTempBoost=function(bacon,power,countdown,desc)
		{		
			var bb = Molpy.Boosts[bacon];
			if(bb)
			{
				if(desc)bb.desc=desc;
				bb.power=EvalMaybeFunction(power);
				bb.countdown=EvalMaybeFunction(countdown);
				bb.unlocked=1;					
				bb.describe();
				bb.buy();
				Molpy.recalculateDig=1;
			}
		}
		Molpy.LockBoost=function(bacon,silent)
		{
			if(typeof bacon==='string')
			{
				var me = Molpy.Boosts[bacon];
				if(me)
				{
					if(me.unlocked==1)
					{
						me.unlocked=0;
						Molpy.boostRepaint=1;
						Molpy.shopRepaint=1;
						Molpy.recalculateDig=1;

						if(me.lockFunction)me.lockFunction();
						if(me.bought==1);
						{
							Molpy.BoostsOwned--;
							me.bought=0;
						} //Orteil did this bit wrong :P
						if(!silent)
							Molpy.Notify('Boost Locked: '+me.name,1);
						Molpy.CheckBuyUnlocks();
					}
				}
			}else{ //so I put bacon in your bacon
				for(var i in bacon){Molpy.LockBoost(bacon[i]);}
			}
		}		
		Molpy.Got=function(back)
		{	//I like big molpies and I can not lie
			return (Molpy.Boosts[back]?Molpy.Boosts[back].bought:0);
			//also, watch www.youtube.com/watch?v=tTYr3JuueF4
		}		
		
		Molpy.ShowGroup=function(group,tagged)
		{		
			if(Molpy.redactedDrawType[Molpy.redactedDrawType.length-1]!='hide1')
			{
				if(tagged)
				{
					if(!Molpy.options.showhide.tagged)
					{
						showhideToggle('tagged');
					}
				}else{
					if(!Molpy.options.showhide[group])
					{
						showhideToggle(group);
					}
				}
			}
		}
		
		Molpy.badgeRepaint=1
		Molpy.badgeHTML='';
		Molpy.Badges=[];
		Molpy.BadgesById=[];
		Molpy.BadgeN=0;
		Molpy.BadgesOwned=0;
		var order=0;
		Molpy.Badge=function(args)
		{
			this.id=Molpy.BadgeN;
			this.np=args.np;
			this.name=args.name;
			this.aka=args.aka||args.name;
			this.desc=args.desc
			this.stats=args.stats;
			this.icon=args.icon;
			this.earnFunction=args.earnFunction;
			this.earned=0;
			this.order=this.id;
			if(order) this.order=order+this.id/1000;
			//(because the order we create them can't be changed after we save)
			this.visibility=args.vis||0; //0 is normal, 1 is hidden description, 2 is hidden name, 3 is invisible
			this.className=args.className;
			this.classChange=args.classChange;
			this.group=args.group||'badges';
			
			this.showdesc=function()
			{
				var d = g('BadgeDescription'+this.id);
				if(d)d.innerHTML='<br>'+((this.earned||this.visibility<1)?
				EvalMaybeFunction((Molpy.showStats&&this.stats)?this.stats:this.desc,this):'????');
			}
			this.hidedesc=function()
			{
				var d = g('BadgeDescription'+this.id);
				if(d)d.innerHTML='';
			}
			
			Molpy.Badges[this.aka]=this;
			Molpy.BadgesById[this.id]=this;
			Molpy.BadgeN++;
			return this;
		}		
		
		Molpy.groupBadgeCounts={};
		Molpy.EarnBadge=function(bacon)
		{
			if(typeof bacon==='string')
			{
				var baby=Molpy.Badges[bacon];
				if(baby)
				{
					if(baby.earned==0&&!Molpy.needlePulling)
					{
						baby.earned=1;
						if(Molpy.BadgesOwned==0) Molpy.EarnBadge('Redundant Redundancy');
						Molpy.badgeRepaint=1;
						Molpy.recalculateDig=1;
						Molpy.BadgesOwned++;
						Molpy.unlockedGroups[baby.group]=1;
						Molpy.Notify((baby.group=='badges'?'Badge Earned: ':'')+baby.name,1);
						Molpy.EarnBadge('Redundant');
						Molpy.CheckBuyUnlocks();							
						if(!Molpy.groupBadgeCounts[baby.group])
						{
							Molpy.groupBadgeCounts[baby.group]=1;
						}else
						{
							Molpy.groupBadgeCounts[baby.group]++;
						}
						Molpy.ShowGroup(baby.group,baby.className);
					
					}
				}
			}else{ //so you can be bacon while you're bacon
				for(var i in bacon){Molpy.EarnBadge(bacon[i]);}
			}
		}
		Molpy.Earned=function(bacon)
		{
			var baby = Molpy.Badges[bacon];
			return baby&&baby.earned;
		}
		
		Molpy.MakeSpecialBadge=function(args,kind)
		{
			new Molpy.Badge({name:Molpy.groupNames[kind][3]+': '+args.name,aka:kind+args.np,np:args.np,
				desc:function(me)
				{
					var str = Molpy.groupNames[kind][4]+': '+args.desc+'<br><small>(in NP'+me.np+')</small>';
					if(me.group=='discov')
					{
						if(Molpy.newpixNumber!=me.np&&Molpy.Got('Memories Revisited'))
						{
							str+='<br><input type="Button" onclick="Molpy.TTT('+me.np+',2,20)" value="Jump!"></input> (Uses 20 Glass Chips and '+Molpify(Molpy.TimeTravelPrice(),2)+' Castles)'
						}
						if(Molpy.Got('SMM')&&!Molpy.Boosts['SMM'].power&&!Molpy.Earned('monums'+me.np))
						{
							str+='<br><br>Sudo <input type="Button" onclick="Molpy.MakeSandMould('+me.np+')" value="Make"></input> a mould from this Discovery, which can be filled with sand to create a Monument'
						}
					}else if(me.group=='monums')
					{
						if(Molpy.Got('GMM')&&!Molpy.Boosts['GMM'].power&&!Molpy.Earned('monumg'+me.np))
						{
							str+='<br><br>Sudo <input type="Button" onclick="Molpy.MakeGlassMould('+me.np+')" value="Make"></input> a mould from this Sand Monument, which can be filled with glass to create a Glass Monument'
						}
					}
					return str;
				}
				,icon:args.icon+'_'+kind,
				earnFunction:args.earnFunction,visibility:args.visibility,group:kind});
		}
		Molpy.MakeTripleBadge=function(args)
		{
			Molpy.MakeSpecialBadge(args,'discov');
			Molpy.MakeSpecialBadge(args,'monums');
			Molpy.MakeSpecialBadge(args,'monumg');
		}
		
		Molpy.redactedW=BeanishToCuegish("UmVkdW5kYW50");
		Molpy.redactedWord=BeanishToCuegish("UmVkdW5kYWtpdHR5");
		Molpy.redactedWords=BeanishToCuegish("UmVkdW5kYWtpdHRpZXM=");
		Molpy.redactedBrackets=BeanishToCuegish("JTI1NUJyZWR1bmRhbnQlMjU1RA==");
		Molpy.redactedSpoilerValue=BeanishToCuegish("JTI1M0NpZnJhbWUlMjUyMHNyYyUyNTNEJTI1MjJodHRwJTI1M0ElMjUyRiUyNTJGd3d3LnlvdXR1YmUuY29tJTI1MkZlbWJlZCUyNTJGYkJ5ZWNDRDR0SjAlMjUzRmF1dG9wbGF5JTI1M0QxJTI1MjIlMjUyMHdpZHRoJTI1M0QlMjUyMjEwMCUyNTIyJTI1MjBoZWlnaHQlMjUzRCUyNTIyNjglMjUyMiUyNTIwZnJhbWVib3JkZXIlMjUzRCUyNTIyMCUyNTIyJTI1MjBhbGxvd2Z1bGxzY3JlZW4lMjUzRSUyNTNDJTI1MkZpZnJhbWUlMjUzRQ==");
		Molpy.redactedDrawType=[];
		Molpy.RedactedHTML=function(heading,level)
		{
			level=level||0;
			var drawType = Molpy.redactedDrawType[level];
			var spoiler = '';
			var label = 'Hide';
			if(drawType=='show') label='Show';
			heading=heading?'<h1>'+Molpy.redactedBrackets+'</h1>':'';
			var countdown=(level==0?'&nbsp;<span id="redactedcountdown" class="faded">'+Molpify(Molpy.redactedToggle-Molpy.redactedCountup)+'</span>':'');
			var str = '<div id="redacteditem">'+heading+'<div class="icon redacted"></div><h2">'
				+Molpy.redactedWord+countdown+'</h2><div><b>Spoiler:</b><input type="button" value="'
				+label+'" onclick="Molpy.ClickRedacted('+level+')"</input>';
			if(drawType=='recur')
			{
				str+=Molpy.RedactedHTML(heading,level+1);
			}else if( drawType=='hide1')
			{
				str+=Molpy.redactedSpoilerValue;
			}else if( drawType=='hide2')
			{
				str+=Molpy.redactedPuzzleValue;
			}
				
			return str+'</div></div>';
		}
		
		Molpy.redactedCountup=0;
		Molpy.redactedToggle=0; //disabled
		Molpy.redactedVisible=0; //hidden
		Molpy.redactedGr=''; //for boosts keep track of which group it's in
		Molpy.redactedViewIndex=-1;
		Molpy.redactableThings=6;
		Molpy.redactedClicks=0;
		Molpy.CheckRedactedToggle=function()
		{				
			if(Molpy.redactedToggle)
			{
				Molpy.redactedCountup++;
				var redC=g('redactedcountdown');
				if(redC)redC.innerHTML=Molpify(Molpy.redactedToggle-Molpy.redactedCountup);
				
				if(Molpy.redactedCountup>=Molpy.redactedToggle)
				{
					Molpy.redactedCountup=0;
					if(Molpy.redactedVisible)
					{
						Molpy.redactedVisible=0; //hide because the redacted was missed
						Molpy.redactedDrawType=[];
						Molpy.shopRepaint=1;
						Molpy.boostRepaint=1;
						Molpy.badgeRepaint=1;	
						Molpy.RandomiseRedactedTime();	
					}else{
						Molpy.redactedDrawType=['show'];
						Molpy.RedactedJump();
						var stay = 6 *(4+ Molpy.Got('Kitnip'));
						Molpy.redactedToggle=stay;
						Molpy.shopRepaint=1;
						Molpy.boostRepaint=1;
						Molpy.badgeRepaint=1;
					}
				}
			}else{//initial setup
				Molpy.RandomiseRedactedTime();
			}
		}
		Molpy.RandomiseRedactedTime=function()
		{
			var rrsr='Redundant Redundance Supply of Redundancy';
			var min = 200-80*(Molpy.Got('Kitnip')+Molpy.Got('Kitties Galore'))-30*Molpy.Got(rrsr);
			var spread = 90-20*(Molpy.Got('Kitnip')+Molpy.Got('Kitties Galore')+Molpy.Got(rrsr));
			Molpy.redactedToggle=min+Math.ceil(spread*Math.random());
			Molpy.redactedGr='';
			if(Molpy.Boosts[rrsr].unlocked
				&& !Molpy.Boosts[rrsr].bought)
			{
				Molpy.redactedToggle*=12;
			}
		}
		
		Molpy.ClickRedacted=function(level)
		{
			level=level||0;
			Molpy.shopRepaint=1;
			Molpy.boostRepaint=1;
			Molpy.badgeRepaint=1;
			if(Molpy.redactedDrawType[level]!='show')
			{
				Molpy.UnlockBoost('Technicolour Dream Cat');
				Molpy.redactedDrawType[level]='show'; 
				while(Molpy.redactedDrawType.length>level+1)
					Molpy.redactedDrawType.pop(); //we don't need to remember those now
				Molpy.RedactedJump();
				return;
			}
			
			
			if(Molpy.Got('Redundant Redundance Supply of Redundancy') && Math.floor(Math.random()*20)==1)
			{
				Molpy.redactedDrawType[level]='hide1';
				Molpy.redactedToggle=65;	
				Molpy.redactedCountup=0;
			}else
			if (Molpy.Got('Redunception') && Molpy.redactedDrawType.length <21 
				&& Math.floor(Math.random()*8/Molpy.redactedDrawType.length)==0)
			{
				Molpy.redactedDrawType[level]='recur';
				Molpy.redactedDrawType.push('show');
				Molpy.RedactedJump();
				if(Molpy.redactedDrawType.length < 5 && Molpy.redactedToggle<5)
				{
					Molpy.redactedToggle=5;
					Molpy.redactedCountup=0;
				}
			}else
			if (Molpy.Got('Logicat') && Molpy.redactedDrawType.length <21
				&& Math.floor(Math.random()*6/Molpy.redactedDrawType.length)==0)
			{
				Molpy.MakeRedactedPuzzle();
				Molpy.redactedDrawType[level]='hide2';
				Molpy.RedactedJump();
				if(Molpy.redactedToggle<20)
				{
					Molpy.redactedToggle=20;
				}
				Molpy.redactedCountup=0;
			}else
			{ // it goes away.					
				var item=g('redacteditem');
				if(item) item.className='hidden';
				Molpy.redactedVisible=0;
				Molpy.redactedViewIndex=-1;
				Molpy.redactedDrawType=[];
				Molpy.redactedCountup=0; //whoops forgot that!
				Molpy.RandomiseRedactedTime();
			}
			
			
			Molpy.redactedClicks++;		
			if(  Molpy.redactedDrawType.length <16)
				Molpy.RewardRedacted();
			if(Molpy.redactedClicks>=2)
				Molpy.EarnBadge('Not So '+Molpy.redactedW);
			if(Molpy.redactedClicks>=14)
				Molpy.EarnBadge("Don't Litter!");
			if(Molpy.redactedClicks>=16)
				Molpy.UnlockBoost('Kitnip');
			if(Molpy.redactedClicks>=32)
				Molpy.UnlockBoost('DoRD');
			if(Molpy.redactedClicks>=64)
				Molpy.Boosts['Kitties Galore'].department=1;
			if(Molpy.redactedClicks>=128)
				Molpy.EarnBadge('Y U NO BELIEVE ME?');
			if(Molpy.redactedClicks>=256)
				Molpy.UnlockBoost('BKJ');
		}
		
		Molpy.RedactedJump=function()
		{		
			//JUMP!
			Molpy.redactedVisible=Math.ceil((Molpy.redactableThings+2)*Math.random());
			if(Molpy.redactedVisible>Molpy.redactableThings)Molpy.redactedVisible=4;		
			Molpy.redactedViewIndex=-1;
		}

		Molpy.RewardRedacted=function(forceDepartment,automationLevel)
		{		
			if(Molpy.Got('DoRD') &&
				(!Math.floor(8*Math.random()) || forceDepartment))
			{
				if(Molpy.Got('Blast Furnace') && !Math.floor(4*Math.random()))
				{
					Molpy.RewardBlastFurnace();
					return;
				}				
				
				Molpy.CheckRewards(automationLevel);				
			
				var availRewards=[];
				for(var i in Molpy.Boosts)
				{
					var me=Molpy.Boosts[i];
					if(!me.unlocked&&me.department)
					{
						availRewards.push(me);
					}
				}
				
				if(availRewards.length)
				{
					var red=GLRschoice(availRewards);
					if((EvalMaybeFunction(red.sandPrice,red)+EvalMaybeFunction(red.castlePrice,red)+EvalMaybeFunction(red.glassPrice,red)))
					{
						Molpy.Notify('The DoRD has produced:',1);
						Molpy.UnlockBoost(red.aka);
					}else{
						Molpy.Notify('The DoRD has provided:',1);
						Molpy.GiveTempBoost(red.aka,red.startPower,red.startCountdown);
					}
					return;
				}
			}
			var BKJ = Molpy.Boosts['BKJ'];			
			if(BKJ.bought)
			{
				BKJ.power=(BKJ.power)+1;
			}
			if(Math.floor(2*Math.random()))
			{
				Molpy.RewardNotLucky(automationLevel);
			}else if(isFinite(Molpy.sand)){
				Molpy.RewardBlitzing(automationLevel);
			}else
			{
				Molpy.RewardBlastFurnace();
			}
		}
		Molpy.RewardBlastFurnace=function()
		{
			var cb=0;
			if(Molpy.Got('Furnace Crossfeed'))
			{
				if(Molpy.Boosts['Glass Furnace'].power && Molpy.Boosts['Furnace Crossfeed'].power)
				{
					Molpy.MakeChips();
					cb=1;
				}
			}
			if(Molpy.Got('Furnace Multitasking'))
			{
				if(Molpy.Boosts['Glass Blower'].power && Molpy.Boosts['Furnace Multitasking'].power)
				{
					Molpy.MakeBlocks();
					cb=1;
				}
			}
			if(cb)return;
			
			var blastFactor=1000;
			var boosted=0;
			if(Molpy.Got('Fractal Sandcastles'))
			{
				blastFactor=Math.max(5,1000*Math.pow(0.94,Molpy.Boosts['Fractal Sandcastles'].power));
				if(Molpy.Got('Blitzing'))
				{
					if(Molpy.Got('BKJ'))
					{
						blastFactor/=Math.max(1,(Molpy.Boosts['Blitzing'].power-800)/600);
						boosted=1;
					}
					blastFactor/=2;
					
				}
			}
			var castles=Math.floor(Molpy.sand/blastFactor);		
			if(boosted)
			{
				castles=Math.floor(Math.min(castles,Molpy.castlesBuilt/10));
			}else{
				castles=Math.floor(Math.min(castles,Molpy.castlesBuilt/2));
			}
			Molpy.Notify('Blast Furnace in Operation!');
			Molpy.SpendSand(castles*blastFactor);
			Molpy.Build(castles);
		}
		Molpy.RewardNotLucky=function(automationLevel)
		{
			if(!automationLevel)
				Molpy.Notify('You are not Lucky (which is good)');
			var bonus=0;
			var i=0;
			var items=0;
			while(i<Molpy.SandToolsN)
			{
				bonus+=Molpy.SandToolsById[i].amount*Math.pow(3.5,i+1);
				items+=Molpy.SandToolsById[i].amount;
				i++;
			} 
			i=0;
			while(i<Molpy.CastleToolsN)
			{
				bonus+=Molpy.CastleToolsById[i].amount*Math.pow(2.5,i+1);
				items+=Molpy.CastleToolsById[i].amount;
				i++;
			}
			var bb = Molpy.BoostsOwned+Molpy.BadgesOwned;
			bonus+=bb;
			items+=bb;
			bonus += Molpy.redactedClicks*10;
			if(Molpy.Got('BFJ'))
			{
				bonus*= (1+0.2*Molpy.Boosts['BKJ'].power)
				if(Molpy.Got('Blitzing'))
					bonus*=Math.min(2,(Molpy.Boosts['Blitzing'].power-800)/200);
			}
			var finite=isFinite(Molpy.castles);
			var pg = Molpy.Got('Panther Glaze');
			if(Molpy.Got('RRR') && Molpy.Boosts['RRR'].power && Molpy.HasGlassBlocks(30))
			{
				bonus*=10000;
				if(finite)
					Molpy.SpendGlassBlocks(30);
				else if(pg)
					Molpy.AddChips(300);
			}
			if(Molpy.Got('LCB') && Molpy.Boosts['LCB'].power)
			{
				if(Molpy.SandTools['Ladder'].amount)	
				{
					items+=Math.floor(Molpy.SandTools['Ladder'].amount/2);
					if(finite&&Molpy.HasGlassBlocks(35))				
					{
						Molpy.SpendGlassBlocks(35);
					}
					else 			
					{
						Molpy.SandTools['Ladder'].amount--;
						Molpy.SandTools['Ladder'].refresh();
						Molpy.SandToolsOwned--;
						if(!finite&&pg)
							Molpy.AddChips(350);
					}
				}
				if(Molpy.SandTools['Bag'].amount)	
				{
					items+=Math.floor(Molpy.SandTools['Bag'].amount/2);
					if(finite&&Molpy.HasGlassBlocks(35))				
					{
						Molpy.SpendGlassBlocks(35);
					}
					else 			
					{
						Molpy.SandTools['Bag'].amount--;
						Molpy.SandTools['Bag'].refresh();
						Molpy.SandToolsOwned--;
						if(!finite&&pg)
							Molpy.AddChips(350);
					}
				}
			}
			if(Molpy.Got('Catamaran') && Molpy.Boosts['Catamaran'].power)
			{
				if(Molpy.CastleTools['River'].amount)
				{
					items+=(Molpy.CastleTools['River'].amount)*6;
					if(finite&&Molpy.HasGlassBlocks(45))				
					{
						Molpy.SpendGlassBlocks(45);
					}
					else 				
					{
						Molpy.CastleTools['River'].amount--;
						Molpy.CastleTools['River'].refresh();
						Molpy.CastleToolsOwned--;
						if(!finite&&pg)
							Molpy.AddChips(450);
					}
				}
				if(Molpy.CastleTools['Wave'].amount)	
				{
					items+=(Molpy.CastleTools['Wave'].amount)*6;
					if(finite&&Molpy.HasGlassBlocks(45))				
					{
						Molpy.SpendGlassBlocks(45);
					}
					else 			
					{
						Molpy.CastleTools['Wave'].amount--;
						Molpy.CastleTools['Wave'].refresh();
						Molpy.CastleToolsOwned--;
						if(!finite&&pg)
							Molpy.AddChips(450);
					}
				}
			}
			if(Molpy.Got('Redundant Raptor') && Molpy.Boosts['Redundant Raptor'].power)
			{
				if(finite&&Molpy.HasGlassBlocks(120))				
				{
					Molpy.SpendGlassBlocks(120);
					items+=Molpy.redactedClicks*2;
				}else if(!finite&&pg)
					Molpy.AddChips(1200);
			}
			var nerf=0;
			if(Molpy.Got('Panther Salve') && Molpy.Boosts['Panther Salve'].power>0)
			{
				if(finite&&Molpy.HasGlassBlocks(10))
				{				
					Molpy.SpendGlassBlocks(10);
					Molpy.Boosts['Panther Salve'].power++;
					bonus*=Math.pow(1.01,items);
					nerf=1;
				}
				else if(!finite&&pg)
				{
					Molpy.AddChips(100);
				}
			}
			if(Molpy.Got('Fractal Sandcastles'))
			{
				bonus*=Math.ceil(Molpy.Boosts['Fractal Sandcastles'].power/10);
				nerf=1;
			}
			if(nerf)
				bonus=Math.min(bonus,Molpy.castlesBuilt/(50)); //just to keep things sane
			
			bonus = Math.floor(bonus);
			Molpy.Build(bonus);
			if(Molpy.Got('Glass Block Storage'))
			{
				if(Molpy.lGlass)
				{
					Molpy.lGlass--;
					Molpy.AddBlocks(1);
				}else{
					Molpy.AddChips(1);				
				}
			}
		}
		Molpy.RewardBlitzing=function()
		{
			var blitzSpeed=800,blitzTime=23;
			var BKJ = Molpy.Boosts['BKJ'];
			if(BKJ.bought)
			{
				blitzSpeed+= BKJ.power*20;
				if(BKJ.power>24) Molpy.Boosts['BFJ'].department=1;
			}
			if(Molpy.Got('Schizoblitz'))blitzSpeed*=2;
			
			if(Molpy.Got('Blitzing'))
			{
				blitzSpeed+=Molpy.Boosts['Blitzing'].power;
				blitzTime+=Math.floor(Molpy.Boosts['Blitzing'].countdown/2);
			}
			if(blitzSpeed>=1000000) Molpy.EarnBadge('Blitz and Pieces');
			Molpy.GiveTempBoost('Blitzing',blitzSpeed,blitzTime);
		}
		
		Molpy.redactedSGen=InitStatementGen();
		Molpy.MakeRedactedPuzzle=function()
		{
			Molpy.redactedSGen.FillStatements();
			Molpy.redactedPuzzleTarget=Molpy.redactedSGen.RandStatementValue();
			var str='Click a statement that is '+Molpy.redactedPuzzleTarget+':';
			var statements= Molpy.redactedSGen.StringifyStatements('Molpy.ClickRedactedPuzzle');
			for(var i in statements)
			{
				str+='<br><br>'+statements[i];
			}
			Molpy.redactedPuzzleValue=str;
			Molpy.redactedSGen.firstTry=1;
		}
		Molpy.ClickRedactedPuzzle=function(name)
		{
			var clickedVal=Molpy.redactedSGen.StatementValue(name);
			if(clickedVal==Molpy.redactedPuzzleTarget)
			{
				Molpy.Notify('Correct',1);
				var lc = Molpy.Boosts['Logicat'];
				lc.power++;
				if(lc.power>=lc.bought*5)
				{
					Molpy.RewardLogicat(lc.bought);
					lc.bought++;
				}
			}
			else
			{
				Molpy.Notify('Incorrect',1);
			
				if(Molpy.redactedSGen.firstTry&&Molpy.Got('Second Chance')&&Molpy.HasGlassBlocks(50))
				{
					Molpy.SpendGlassBlocks(50);
					Molpy.redactedSGen.firstTry=0;
					Molpy.Notify('Try Again');
					return;
				}
				Molpy.Boosts['Logicat'].power-=0.5;
			}
			Molpy.redactedDrawType[Molpy.redactedDrawType.length-1]='show';
			Molpy.shopRepaint=1;
			Molpy.boostRepaint=1;
			Molpy.badgeRepaint=1;
		}
		Molpy.RewardLogicat=function(level)
		{
			Molpy.CheckRewards(0);
			var availRewards=[];
			for(var i in Molpy.Boosts)
			{
				var me=Molpy.Boosts[i];
				if(!me.unlocked&&me.logic&&level>=me.logic)
				{
					availRewards.push(me);
				}
			}
			
			if(availRewards.length)
			{
				var red=GLRschoice(availRewards);
				if((EvalMaybeFunction(red.sandPrice,red)+EvalMaybeFunction(red.castlePrice,red)+EvalMaybeFunction(red.glassPrice,red)))
				{
					Molpy.Notify('Logicat rewards you with:',1);
					Molpy.UnlockBoost(red.aka);
				}else{
					Molpy.Notify('You reward from Logicat:',1);
					Molpy.GiveTempBoost(red.aka,red.startPower,red.startCountdown);
				}
				return;
			}
			Molpy.RewardRedacted(1);
		}
		
		Molpy.CalcPriceFactor=function()
		{
			var baseval=1;
			if(Molpy.Got('ASHF'))
			{
				baseval*=(1-Molpy.Boosts['ASHF'].power);
			}
			if(Molpy.Got('Family Discount'))
			{
				baseval*=(0.2);
			}
			Molpy.priceFactor=Math.max(0,baseval);
		}
		
		Molpy.unlockedGroups={};
		Molpy.PaintLootToggle=function(gr,kind)
		{
			var str='';
			if(Molpy.unlockedGroups[gr])
			{
				var id = Molpy.groupNames[gr][2]||'';
				if(id) id= ' id="'+id+'"';
				var r = (Molpy.redactedVisible==kind&&Molpy.redactedGr==gr);
				if(r)id='';
				str+= '<div class="floatsquare loot '+(kind==4?'boost':'badge')+'"><h3>'+Molpy.groupNames[gr][1]+'</h3><br>'+showhideButton(gr)
					+'<div class="icon'
					+(r?' redacted"':'"')
					+id+'></div></div>';
			}
			return str;
		}
		Molpy.RepaintLootSelection=function()
		{
			var str = '';
			var groups = ['boosts','ninj','cyb','hpt','bean','chron'];
			for(var i in groups)
			{
				str+=Molpy.PaintLootToggle(groups[i],4);
			}
			if(Molpy.BadgesOwned)
			{
				str+= '<div class="floatsquare badge loot"><h3>Badges<br>Earned</h3>'
					+showhideButton('badges')+'<div class="icon '
					+(Molpy.redactedVisible==5&& Molpy.redactedGr=='badges'?'redacted':'')
					+'"></div></div>';
			}
			var groups = ['discov','monums','monumg'];
			for(var i in groups)
			{
				str +=Molpy.PaintLootToggle(groups[i],5);
			}
			if(Molpy.BadgeN-Molpy.BadgesOwned)
			{
				str+= '<div class="floatsquare badge shop"><h3>Badges<br>Available</h3>'
					+showhideButton('badgesav')+'<div class="icon '
					+(Molpy.redactedVisible==6?'redacted':'')
					+'"></div></div>';
			}
			if(Molpy.Boosts['Chromatic Heresy'].unlocked)
			{
				str+= '<div class="floatsquare boost loot alert"><h3>Tagged<br>Items</h3>'
					+showhideButton('tagged')+'<div id="boost_chromatic" class="icon '
					+(Molpy.redactedVisible==7?'redacted':'')
					+'"></div></div>';
			}
			
			g('lootselection').innerHTML=str;
		}
	
		Molpy.RepaintShop=function()
		{
			Molpy.shopRepaint=0;
			Molpy.CalcPriceFactor();			
			var redactedIndex=-1;
			var expando=Molpy.Boosts['Expando'].power;
			var toolsUnlocked=1;			
			for (var i in Molpy.SandTools)
			{
				if(Molpy.SandTools[i].bought>=Molpy.SandTools[i].nextThreshold)toolsUnlocked++;
			}
			
			if(Molpy.redactedVisible==1)
			{
				if(Molpy.redactedViewIndex==-1)
				{
					Molpy.redactedViewIndex=Math.floor((toolsUnlocked)*Math.random());					
				}
				redactedIndex=Molpy.redactedViewIndex;
			}

			var str='';
			var i=0;
			var nBuy = Math.pow(4,Molpy.options.sandmultibuy);
			while (i < Math.min(toolsUnlocked, Molpy.SandToolsN))
			{
				if(i==redactedIndex) str+= Molpy.RedactedHTML();
				var me=Molpy.SandToolsById[i];
				var name = me.name;
				if(Molpy.Got('Glass Ceiling '+(i*2))) name = 'Glass '+name;
				var salebit='';
				if(isFinite(me.price)||!(Molpy.Earned(me.name+' Shop Failed')&&Molpy.Got('Tool Factory')))
				{
					salebit=' <a onclick="Molpy.SandToolsById['+me.id+'].buy();">Buy&nbsp;'+nBuy+'</a>'
						+(Molpy.Boosts['No Sell'].power?'':' <a onclick="Molpy.SandToolsById['+me.id+'].sell();">Sell</a>');
				}
				str+='<div class="floatbox sand shop" onMouseOver="onhover(Molpy.SandToolsById['+me.id+'],event)" onMouseOut="onunhover(Molpy.SandToolsById['+me.id+'],event)"><div id="tool'+me.name+'" class="icon"></div><h2>'+name+salebit+'</h2>'+
				(me.amount>0?'<div class="owned">Owned: '+Molpify(me.amount,3)
				+'</div>':'')+
				'<span class="price">Price: '+FormatPrice(me.price,me)+(me.price<100?' Castles':' C')+'</span>'+
				'<div id="SandToolProduction'+me.id+'"></div><div id="SandToolDescription'+me.id+'"></div></div></div>';
				if(expando)me.hoverOnCounter=1;
				i++
			}
			if(i==redactedIndex) str+= Molpy.RedactedHTML();
			g('sandtools').innerHTML=str;
			
			toolsUnlocked=1;			
			for (var i in Molpy.CastleTools)
			{
				if(Molpy.CastleTools[i].bought>=Molpy.CastleTools[i].nextThreshold)toolsUnlocked++;
			}
			
			redactedIndex=-1;
			if(Molpy.redactedVisible==2)
			{
				if(Molpy.redactedViewIndex==-1)
				{
					Molpy.redactedViewIndex=Math.floor((toolsUnlocked)*Math.random());
				}
				redactedIndex=Molpy.redactedViewIndex;
			}
						
			str='';
			i=0;
			var nBuy = Math.pow(4,Molpy.options.castlemultibuy);
			while (i < Math.min(toolsUnlocked, Molpy.CastleToolsN))
			{
				if(i==redactedIndex) str+= Molpy.RedactedHTML();
				var me=Molpy.CastleToolsById[i];
				var name = me.name;
				if(Molpy.Got('Glass Ceiling '+(i*2+1))) name = 'Glass '+name;
				var salebit='';
				if(isFinite(me.price)||!(Molpy.Earned(me.name+' Shop Failed')&&Molpy.Got('Tool Factory')))
				{
					salebit=' <a onclick="Molpy.CastleToolsById['+me.id+'].buy();">Buy&nbsp;'+nBuy+'</a>'
						+(Molpy.Boosts['No Sell'].power?'':' <a onclick="Molpy.CastleToolsById['+me.id+'].sell();">Sell</a>');
				}
				str+='<div class="floatbox castle shop" onMouseOver="onhover(Molpy.CastleToolsById['+me.id+'],event)" onMouseOut="onunhover(Molpy.CastleToolsById['+me.id+'],event)"><div id="tool'+me.name+'" class="icon"></div><h2>'+name+salebit+'</h2>'+
				(me.amount>0?'<div class="owned">Owned: '+Molpify(me.amount,3)
				+'</div>':'')+
				'<span class="price">Price: '+FormatPrice(me.price,me)+(me.price<100?' Castles':' C')+'</span>'+
				'<div id="CastleToolProduction'+me.id+'"></div><div id="CastleToolDescription'+me.id+'"></div></div></div>';
				if(expando)me.hoverOnCounter=1;
				i++
			}
			if(i==redactedIndex) str+= Molpy.RedactedHTML();
			g('castletools').innerHTML=str;		
		}
		
		//f= force (show regardless of group visibility
		//r = redacted index
		Molpy.BoostString=function(me,f,r)
		{		
			var cn= me.className||'';
			var group= me.group;
			if(r)
			{
				r=Molpy.RedactedHTML(1);
				Molpy.redactedGr=group;
			}else{
				r='';
			}
			
			if(!(Molpy.options.showhide[group]||f))return'';
			if(cn)Molpy.UnlockBoost('Chromatic Heresy');
			
			
			cn = r+'<div class="boost '+(me.bought?'lootbox loot ':'floatbox shop ')+cn;
			var heading= '<h1>['+Molpy.groupNames[group][0]+']</h1>';
			var buy= '';
			if(!me.bought)
			{
				buy=' <a onclick="Molpy.BoostsById['+me.id+'].buy();">Buy</a>';
				if(me.sandPrice||me.castlePrice||me.glassPrice)
				{
					buy+='<span class="price"> Price: ';
					if(me.sandPrice) buy +=FormatPrice(me.sandPrice,me)+' Sand '+(me.castlePrice||me.glassPrice?'+ ':'');
					if(me.castlePrice) buy +=FormatPrice(me.castlePrice,me)+' Castles '+(me.glassPrice?'+ ':'');
					if(me.glassPrice) buy +=FormatPrice(me.glassPrice,me)+' Glass Block'+(FormatPrice(me.glassPrice)=='1'?'':'s');
					buy+='</span>';
				}
			}
			if(Molpy.Boosts['Expando'].power)me.hoverOnCounter=1;
			
			return cn+'" onMouseOver="onhover(Molpy.BoostsById['+me.id+'],event)" onMouseOut="onunhover(Molpy.BoostsById['+me.id
				+'],event)"><div id="boost_'+(me.icon?me.icon:me.id)+'" class="icon"></div>'+heading+'<h2>'+me.name+buy+'</h2>'
				+'<div id="BoostDescription'+me.id+'"></div></div></div>';
		}
		
		Molpy.RepaintBoosts=function()
		{
			Molpy.boostRepaint=0;			
			var alist=[];
			for (var i in Molpy.Boosts)
			{
				var me=Molpy.Boosts[i];
				if (!me.bought)
				{
					if (me.unlocked) alist.push(me);
				}
			}
			alist.sort(PriceSort);
			Molpy.BoostsInShop=[];
			for (var i in alist)
			{
				Molpy.BoostsInShop.push(alist[i]);
			}
			
			var redactedIndex=-1;
			if(Molpy.redactedVisible==3)
			{
				if(Molpy.redactedViewIndex==-1)
				{
					Molpy.redactedViewIndex=Math.floor((Molpy.BoostsInShop.length+1)*Math.random());
				}
				redactedIndex=Molpy.redactedViewIndex;
			}
			var str='';
			var r = 0;
			for (var i in Molpy.BoostsInShop)
			{
				if(r==redactedIndex) str+= Molpy.RedactedHTML();
				var me=Molpy.BoostsInShop[i];
				str+=Molpy.BoostString(me,1);
				r++;
			}
			if(r==redactedIndex) str+= Molpy.RedactedHTML();
			g('boosts').innerHTML=str;
			
			var blist=[];
			for (var i in Molpy.Boosts)
			{
				var me=Molpy.Boosts[i];
				if (me.bought)
				{
					blist.push(me);
				}
			}
			blist.sort(PriceSort);
			redactedIndex=-1;
			if(Molpy.redactedVisible==4)
			{
				if(Molpy.redactedViewIndex==-1)
				{
					Molpy.redactedViewIndex=Math.floor((blist.length)*Math.random());
				}
				redactedIndex=Molpy.redactedViewIndex;
			}
			str='';			
			r=0;
			for (var i in blist)
			{
				var me=blist[i];
				str+=Molpy.BoostString(me,0,r==redactedIndex);
				r++;
			}
			
			Molpy.boostHTML=str;
			g('loot').innerHTML=Molpy.boostHTML+Molpy.badgeHTML;	
		}
		
		//f= force (show regardless of group visibility
		//r = redacted index
		Molpy.BadgeString=function(me,f,r)
		{
			var group=me.group
			if(r)
			{
				r=Molpy.RedactedHTML(1);
				Molpy.redactedGr=group;
			}
			else r='';
			
			if(!(Molpy.options.showhide[group]||f))return'';
			if(f&!me.bought&&group!='badges')return''; //this is for badgesav group
			var cn= me.className||'';		
			var heading= '<h1>['+Molpy.groupNames[group][0]+']</h1>';	
			if(cn&&me.earned)Molpy.UnlockBoost('Chromatic Heresy');
			cn+=' lootbox badge '+(me.earned?'loot':'shop');
			if(Molpy.Boosts['Expando'].power)me.hoverOnCounter=1;
			
			return r+'<div class="'+cn+'" onMouseOver="onhover(Molpy.BadgesById['+me.id+'],event)" onMouseOut="onunhover(Molpy.BadgesById['+me.id
				+'],event)">'+heading+'<div id="badge_'+(me.icon?me.icon:me.id)+'" class="icon"></div><h2>'
				+(me.earned||me.visibility<2?me.name:'????')+'</he><div id="BadgeDescription'+me.id+'"></div></div></div>';			
		}
		
		Molpy.RepaintBadges=function()
		{
			Molpy.badgeRepaint=0;
			var str='';			
			var blist=[];
			for (var i in Molpy.Badges)
			{
				var me=Molpy.Badges[i];
				if (me.earned)
				{
					blist.push(me);
				}
			}
			var redactedIndex=-1;
			if(Molpy.redactedVisible==5)
			{
				if(Molpy.redactedViewIndex==-1)
				{
					Molpy.redactedViewIndex=Math.floor((blist.length+1)*Math.random());
				}
				redactedIndex=Molpy.redactedViewIndex;
			}
			var r=0;
			//do some sorting here?
			for (var i in blist)
			{
				var me=blist[i];					
				str+=Molpy.BadgeString(me,0,r==redactedIndex);
				r++;
			}
			if(r==redactedIndex) str+= Molpy.RedactedHTML(1);
			
			Molpy.badgeHTML=str;
			str='';			
			if(Molpy.options.showhide.badgesav){
				var blist=[];
				for (var i in Molpy.Badges)
				{
					var me=Molpy.Badges[i];
					if (!me.earned&&me.group=='badges')
					{
						blist.push(me);
					}
				}
				
				var redactedIndex=-1;
				if(Molpy.redactedVisible==6)
				{
					if(Molpy.redactedViewIndex==-1)
					{
						Molpy.redactedViewIndex=Math.floor((blist.length+1)*Math.random());
					}
					redactedIndex=Molpy.redactedViewIndex;
				}			
				var r=0;
				//do some sorting here?
				for (var i in blist)
				{
					var me=blist[i];
					str+=Molpy.BadgeString(me,1,r==redactedIndex);
					r++;
				}
				if(r==redactedIndex) str+= Molpy.RedactedHTML(1);
			}
			Molpy.badgeHTML+=str;
			g('loot').innerHTML=Molpy.boostHTML+Molpy.badgeHTML;		
		}
		
		Molpy.RepaintTaggedLoot=function()
		{
			var str='';
			var blist=[];
			for (var i in Molpy.Boosts)
			{
				var me=Molpy.Boosts[i];
				if (me.bought&&me.className)
				{
					blist.push(me);
				}
			}		
			blist.sort(ClassNameSort);
			for (var i in blist)
			{
				var me=blist[i];					
				str+=Molpy.BoostString(me,1);
			}
			
			blist=[];
			for (var i in Molpy.Badges)
			{
				var me=Molpy.Badges[i];
				if (me.earned&&me.className)
				{
					blist.push(me);
				}
			}			
			for (var i in blist)
			{
				var me=blist[i];					
				str+=Molpy.BadgeString(me,1);
			}
			g('loot').innerHTML=str;
		}
		//the numbers that fly up when you click the pic for sand
		Molpy.sParticles=[];
		var str='';
		for (var i=0;i<20;i++)
		{
			Molpy.sParticles[i]={x:0,y:0,dx:0,life:-1,text:''};
			str+='<div id="sparticle'+i+'" class="notif"></div>';
		}
		g('sparticles').innerHTML=str;
		Molpy.sparticlesUpdate=function()
		{
			for (var i in Molpy.sParticles)
			{
				var me=Molpy.sParticles[i];
				if (me.life!=-1)
				{
					
					me.y-=300/Molpy.fps;;
					me.x+=me.dx/Molpy.fps;
					
					me.life++;
					var el=me.l;
					me.l.style.left=Math.floor(me.x)+'px';
					me.l.style.top=Math.floor(me.y)+'px';
					el.style.opacity=1-(me.life/(Molpy.fps*2));
					if (me.life>=Molpy.fps*2)
					{
						me.life=-1;
						el.style.opacity=0;
						el.style.display='none';
					}
				}
			}
		}
		Molpy.AddSandParticle=function(text)
		{
			//pick the first free (or the oldest) notification to replace it
			var highest=0;
			var highestI=0;
			for (var i in Molpy.sParticles)
			{
				if (Molpy.sParticles[i].life==-1) {highestI=i;break;}
				if (Molpy.sParticles[i].life>highest)
				{
					highest=Molpy.sParticles[i].life;
					highestI=i;
				}
			}
			var i=highestI;
			
			var rect=g('beach').getBoundingClientRect();
			var x=0;
			var y=Math.floor((rect.height)*.7);
			x+=(Math.random()-0.5)*180;
			y+=(Math.random()-0.5)*120;
			var dx = (Math.random()-0.5)*60;
			
			var me=Molpy.sParticles[i];
			if (!me.l) me.l=g('sparticle'+i);
			me.life=0;
			me.x=x;
			me.y=y;
			me.dx=dx;
			me.text=text;
			me.l.innerHTML=text;
			me.l.style.left=Math.floor(me.x)+'px';
			me.l.style.top=Math.floor(me.y)+'px';
			me.l.style.display='block';
		}
		
		//notifications.
		Molpy.notifs=[];
		Molpy.notifsY=0;
		var str='';
		for (var i=0;i<20;i++)
		{
			Molpy.notifs[i]={x:0,y:0,life:-1,text:''};
			str+='<div id="notif'+i+'" class="notif"></div>';
		}
		g('notifs').innerHTML=str;
		Molpy.notifsReceived=0;
		Molpy.notifsUpdate=function()
		{
			Molpy.notifsY=0;
			for (var i in Molpy.notifs)
			{
				var me=Molpy.notifs[i];
				if (me.life!=-1)
				{
					if (me.life<Molpy.fps*3)Molpy.notifsY+=me.l.clientHeight;
					
					var y=me.y;
					if(me.life<Molpy.fps/2)
					{
						y-=10;
					}else{
						y-=10*(1-(me.life-Molpy.fps/2)/(Molpy.fps*5));
					}
					me.y=y;
					me.life++;
					var el=me.l;
					el.style.left=Math.floor(-200+me.x)+'px';
					el.style.bottom=Math.floor(-y)+'px';
					el.style.opacity=1-Math.pow(me.life/(Molpy.fps*5),2);
					if (me.life>=Molpy.fps*5)
					{
						me.life=-1;
						el.style.opacity=0;
						el.style.display='none';
					}
				}
			}
		}
		
		Molpy.notifLog=[];
		Molpy.notifLogNext=0;
		Molpy.notifLogMax=39; //store 40 lines
		Molpy.notifLogPaint=0;
		Molpy.InMyPants=0;
		Molpy.Notify=function(text,log)
		{
			if(Molpy.InMyPants) text+= ' in my pants';
			//pick the first free (or the oldest) notification to replace it
			var highest=0;
			var highestI=0;
			for (var i in Molpy.notifs)
			{
				if (Molpy.notifs[i].life==-1) {highestI=i;break;}
				if (Molpy.notifs[i].life>highest)
				{
					highest=Molpy.notifs[i].life;
					highestI=i;
				}
			}
			var i=highestI;
			
			var rect=g('game').getBoundingClientRect();
			var x=Math.floor((rect.left+rect.right)/2);
			var y=Math.floor((rect.bottom));
			x+=(Math.random()-0.5)*40;
			
			var me=Molpy.notifs[i];
			if (!me.l) me.l=g('notif'+i);
			me.life=0;
			me.x=x;
			me.y=y+Molpy.notifsY;
			me.text=text;
			me.l.innerHTML=text;
			me.l.style.left=Math.floor(Molpy.notifs[i].x-200)+'px';
			me.l.style.bottom=Math.floor(-Molpy.notifs[i].y)+'px';
			me.l.style.display='block';
			Molpy.notifsY+=me.l.clientHeight;
			me.y+=me.l.clientHeight;
			
			Molpy.notifsReceived++;
			Molpy.EarnBadge('Notified');
			if(Molpy.notifsReceived>=2000)
			{
				Molpy.EarnBadge('Thousands of Them!');
			}		
			if(log)
			{
				Molpy.notifLog[Molpy.notifLogNext]=text;
				Molpy.notifLogNext++;
				if(Molpy.notifLogNext>Molpy.notifLogMax)Molpy.notifLogNext=0;
				Molpy.notifLogPaint=1;
			}
		}
		
		Molpy.PaintNotifLog=function()
		{
			Molpy.notifLogPaint=0;
			var str='';
			var i = Molpy.notifLogNext;
			while(i<=Molpy.notifLogMax)
			{
				var line = Molpy.notifLog[i];
				if(line){
					str+=line+'<br>';
				}
				i++;
			}
			i = 0;
			while(i<Molpy.notifLogNext)
			{
				var line = Molpy.notifLog[i];
				if(line){
					str+=line+'<br>';
				}
				i++;
			}
			g('notiflogitems').innerHTML=str;
		}
				

		Molpy.DefineSandTools();
		Molpy.DefineCastleTools();
		Molpy.DefineBoosts();
		Molpy.DefineBadges();		
		
		Molpy.UpdateBeach();
		Molpy.HandlePeriods();
		Molpy.startDate=parseInt(new Date().getTime()); //used for save
		
		/*In which we announce that initialisation is complete
		++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
		
		
		Molpy.LoadC_STARSTAR_kie(); //autoload saved game
		Molpy.molpish=1;
		Molpy.Loopist();		
	}
	
	Molpy.ActivateNewPixBots=function()
	{
		Molpy.buildNotifyFlag=0;
		var bots = Molpy.CastleTools['NewPixBot'];
		bots.BuildPhase();
		Molpy.buildNotifyFlag=1;
		Molpy.Build(0);
		Molpy.ActivateFactoryAutomation();
		Molpy.recalculateDig=1;
	}
	Molpy.ActivateFactoryAutomation=function()
	{
		if(Molpy.Got('Factory Automation'))
		{
			var i = Molpy.Boosts['Factory Automation'].power+1;
			var npb=Molpy.CastleTools['NewPixBot'];
			if(Math.floor(Math.random()*(20-i))==0)
			{
				if(npb.amount)
				{
					npb.amount--;
					npb.refresh();
					Molpy.Notify('Industrial Accident!');
				}
			}
			var t=0;
			var spent=0;
			while(i--)
			{
				var sand = 2000000*Math.pow(10000,i);
				if(Molpy.sand>=sand)
				{
					Molpy.SpendSand(sand,1);
					t++;
					spent+=sand;
				}
			}
			t=Math.min(t,Math.floor(npb.amount/20));
			Molpy.Notify('Activating Factory Automation '+t+' time'+(t==1?'':'s')+' at a cost of '+Molpify(spent,4)+' Sand',1);
			while(t--) 
			{
				if(Molpy.Got('CfB'))
				{
					Molpy.DoBlackprintConstruction();
				}else{
					if(!Molpy.FillGlassMouldWork())
					if(!Molpy.MakeGlassMouldWork())
					if(!Molpy.FillSandMouldWork())
					if(!Molpy.MakeSandMouldWork())
						Molpy.RewardRedacted(1,t);
				}
			}
		}
	}
	
	Molpy.Shutter=function()
	{
		if(Molpy.HasGlassChips(10))
		{
			Molpy.SpendGlassChips(10);
			var aka='discov'+Molpy.newpixNumber;
			if(!Molpy.Badges[aka])
			{
				Molpy.Notify('You don\'t notice anything especially notable.');
				return;
			}
			if(Molpy.Earned(aka))
			{
				Molpy.Notify('You already have this '+Molpy.Badges[aka].name);
			}else{
				Molpy.EarnBadge(aka);
			}
		}else
		{
			Molpy.Notify('Out of Glass Chips');
		}
	}
	
	/*In which we explain how to think
	should be called once per milliNewPix
	++++++++++++++++++++++++++++++++++*/
	Molpy.Think=function()
	{
		Molpy.SandToCastles();
		if(! (Molpy.ketchupTime || Molpy.Boosts['Coma Molpy Style'].power))
			Molpy.CheckONG();
		Molpy.CheckRedactedToggle();
		Molpy.RunToolFactory();
		
		for(var i in Molpy.Boosts)//count down any boosts with a countdown
		{
			var me = Molpy.Boosts[i];
			if(me.bought)
			{
				if(me.countdown)
				{
					me.countdown--;
					if(me.hovered)me.hovered=-2; //force redraw
					if(!me.countdown)
					{
						Molpy.LockBoost(i);
						me.power=0;
					}else
					{
						if(me.countdownFunction)me.countdownFunction();
						if(me.hovered<0)me.hover();
					}
				}
			}
			if(me.unlocked)
			{
				if(me.classChange)
				{
					if(me.classChange())
					{
						Molpy.boostRepaint=1;
					}
				}
			}
		}
		for(var i in Molpy.Badges)
		{
			var me = Molpy.Badges[i];
			if(me.earned)
			{
				if(me.classChange)
				{
					if(me.classChange())
					{
						Molpy.badgeRepaint=1;
					}
				}
			}
		}

		if(Molpy.recalculateDig) Molpy.CalculateDigSpeed();
		for(var i in Molpy.SandTools)
		{
			var me = Molpy.SandTools[i];
			me.totalSand+=me.storedTotalSpmNP;
			if(Molpy.showStats&&me.hovered<0)me.hover();
		}
		
		Molpy.Dig(Molpy.sandPermNP);
		if(Molpy.BadgesOwned==0) Molpy.EarnBadge('Redundant Redundancy');
		
		Molpy.Life++;
		Molpy.autosaveCountup++;
		if(Molpy.options.autosave){
			if(Molpy.autosaveCountup>=Molpy.options.autosave*5)
			{
				Molpy.SaveC_STARSTAR_kie(1);			
				Molpy.autosaveCountup=0;
			}
		}
		
		if(Molpy.judgeLevel>1 && Math.floor(Molpy.ONGelapsed/1000)%25==0)
		{
			var j = Molpy.JDestroyAmount();
			var dAmount = j*Molpy.CastleTools['NewPixBot'].amount*25;
			if(!Molpy.Boosts['Bacon'].unlocked)
			if(!isFinite(dAmount)&&Molpy.Got('Frenchbot')&&Molpy.Boosts['Logicat'].power>100)
			{
				Molpy.Boosts['Logicat'].power-=100;
				Molpy.UnlockBoost('Bacon');
			}
			dAmount = Math.ceil(Math.min(Molpy.castles*.9, dAmount));
			if(Molpy.castles)
			{
				var failed = Molpy.Destroy(dAmount,1);
				Molpy.CastleTools['NewPixBot'].totalCastlesDestroyed+=dAmount;
				if(!failed)
					Molpy.Notify('By the NewpixBots');
			}
		}
		Molpy.Donkey();
		
		if(Math.floor(Molpy.ONGelapsed/1000)%3==0)
			Molpy.flashes=0;
	}
	
	var clockDegrees=0;
	Molpy.CheckONG=function()
	{
		//if there's an ONG
		Molpy.ONGelapsed = new Date().getTime()-Molpy.ONGstart.getTime();
		if(Molpy.npbONG=='mustard')
		{
			Molpy.npbONG=(Molpy.ONGelapsed >= Molpy.ninjaTime);//whoops
		}
		var npPercent = Molpy.ONGelapsed/(Molpy.NPlength*1000);
		clockDegrees = (npPercent * 360) + 180; //rotation from top
		if(Molpy.ONGelapsed >= Molpy.NPlength*1000)//gotta convert to milliseconds
		{
			Molpy.ONG();
		}else
		if(Molpy.npbONG==0 && Molpy.ninjad==0)
		{
			if(Molpy.ONGelapsed >= Molpy.ninjaTime)//already in milliseconds
			{
				Molpy.npbONG=1;
				if(Molpy.newpixNumber>1) //obviously you can't have any active npb in first newpix
				{					
					Molpy.ActivateNewPixBots(); //wasn't ninja'd so we get some free sandcastles (neat!)
				}
			}
		}
	}
	Molpy.ONG=function()
	{
		Molpy.newpixNumber+=1;
		if(Molpy.newpixNumber > Molpy.highestNPvisited)
		{
			Molpy.highestNPvisited=Molpy.newpixNumber;
		}else //in the past
		{
			if(Molpy.newpixNumber > 2)
			{
				Molpy.UnlockBoost('Time Travel');
			}
		}
		Molpy.Boosts['Fractal Sandcastles'].power=0;
		Molpy.ONGstart = ONGsnip(new Date());
		Molpy.Notify('ONG!',1);	
		
		Molpy.HandlePeriods();
		Molpy.UpdateBeach();
		//various machines fire and do stuff
		
		if(Molpy.Boosts['Glass Furnace'].power)
		{
			Molpy.MakeChips();
		}
		if(Molpy.Boosts['Glass Blower'].power)
		{
			Molpy.MakeBlocks();
		}
		Molpy.lGlass = Molpy.Boosts['Glass Chiller'].power+1; //reset amount of glass available to Not Lucky
		
		var activateTimes=1+Molpy.Got('Doublepost');
		Molpy.buildNotifyFlag=0;
		Molpy.destroyNotifyFlag=0;
		while(activateTimes--)
		{
			var i = Molpy.CastleToolsN;
			while(i--)
			{
				var t = Molpy.CastleToolsById[i];
				t.DestroyPhase();
			}
			
			i = Molpy.CastleToolsN;
			while(i--)
			{
				var t = Molpy.CastleToolsById[i];
				if(t.name!='NewPixBot')
					t.BuildPhase();
			}
		}
		Molpy.destroyNotifyFlag=1;
		Molpy.Destroy(0);
		
		if(Molpy.nextCastleSand>1)
			Molpy.EarnBadge('Castle Price Rollback');
		Molpy.prevCastleSand=0; //sand cost of previous castle
		Molpy.nextCastleSand=1; //sand cost of next castle
		Molpy.SandToCastles();
		
		if(Molpy.ninjad==0)
		{
			var hadStealth = Molpy.ninjaStealth;
			if(Molpy.NinjaUnstealth())
				if(hadStealth)Molpy.EarnBadge('Ninja Holidip');
		}
		Molpy.ninjad=0;//reset ninja flag
		Molpy.npbONG=0;//reset newpixbot flag
		
		
		Molpy.Boosts['Temporal Rift'].department=0;
		if(Molpy.newpixNumber%
			(50-(Molpy.Got('Time Travel')+Molpy.Got('Flux Capacitor')+Molpy.Got('Flux Turbine'))*10)==0)
		{
			Molpy.Boosts['Temporal Rift'].department=(Math.random()*6>=5)*1;
		}
		if(Molpy.Got('SBTF'))
		{
		}
		if(Molpy.Got('Bag Burning')&& !Molpy.Boosts['NewPixBot Navigation Code'].power)
		{
			if(Molpy.SandTools['Bag'].amount>Molpy.npbDoubleThreshhold+1 && Math.floor(Math.random()*36)==0)
			{
				Molpy.BurnBags(1);
			}
		}
		if(Molpy.Got('BBC'))
		{
			var bbc =Molpy.Boosts['BBC'];
			if(bbc.power>=0)
			{
				if(Molpy.HasGlassBlocks(5))
				{
					Molpy.SpendGlassBlocks(5);
					bbc.power=1;
					var don = Molpy.Boosts['Double or Nothing'];
					if(don.unlocked&&don.power>20&&Math.floor(Math.random()*8)==0)
						Molpy.Boosts['Double or Nothing'].power--;
				}else{
					bbc.power=0;
				}
			}
		}
		if(isFinite(Molpy.castles))
		Molpy.Boosts['Double or Nothing'].department=1*(Math.floor(Math.random()*3)==0);
		if(Molpy.autosaveCountup>1000)
		{
			Molpy.Notify('You have not saved in over a NewPix!!',1);
		}
	}
	
	Molpy.BurnBags=function(n,e)
	{	
		if(e)
		{
			if(n>1000)
			{
				n*=2;
				e=1000;
			}else if(n>100)
			{
				n*=5;
				e=100;
			}else if(n>=10)
			{
				n*=10;
				e=10;
			}
		}else e=1;
		var o=n;
		n=Math.floor(Math.min(Molpy.SandTools['Bag'].amount,n));
		e=e*n/o;
		Molpy.SandTools['Bag'].amount-=n;
		Molpy.SandToolsOwned-=n;
		Molpy.SandTools['Bag'].refresh();
		if(n==1)
			Molpy.Notify('A Bag was burned!',1);
		else
			Molpy.Notify(n+' Bags were burned!',1);
		return e;
	}
		
	Molpy.HandlePeriods=function()
	{
		//check length of current newpic
		if(Molpy.newpixNumber <= 240)
		{
			Molpy.NPlength=1800; 
			Molpy.LockBoost('Overcompensating');
			Molpy.LockBoost('Doublepost');
			Molpy.LockBoost('Active Ninja');
			Molpy.LockBoost('Furnace Crossfeed');
			Molpy.Boosts['Doublepost'].department=0;	//prevent the department from unlocking these
			Molpy.Boosts['Active Ninja'].department=0;
			Molpy.Boosts['Furnace Crossfeed'].department=0;
			Molpy.Boosts['Furnace Multitasking'].department=0;
			var fa = Molpy.Boosts['Factory Automation'];
			if(fa.power>0)
			{
				fa.power=0;
				Molpy.Notify('Factory Automation Downgraded',1);
			}
		}else
		{		
			Molpy.NPlength=3600;
			Molpy.Boosts['Doublepost'].department=1;
			Molpy.Boosts['Active Ninja'].department=1;
			if(Molpy.Got('Glass Furnace'))
				Molpy.Boosts['Furnace Crossfeed'].department=1;
			if(Molpy.Got('Furnace Crossfeed'))
				Molpy.Boosts['Furnace Multitasking'].department=1;
		}
		if(Molpy.newpixNumber > 241)
		{
			Molpy.EarnBadge("Have you noticed it's slower?");
		}
		if(Molpy.newpixNumber >= 250)
		{
			Molpy.UnlockBoost('Overcompensating');
		}
		Molpy.TimePeriod=["Here be Dragons"];
		Molpy.TimeEra=["Here be Dragons"];
		Molpy.TimeEon=["Here be Dragons"];
		for(var i in Molpy.Periods)
		{
			var per = Molpy.Periods[i];
			if(Molpy.newpixNumber<=per[0])
			{
				Molpy.TimePeriod=per[1];
				break;
			}
		}
		for(var i in Molpy.Eras)
		{
			var era = Molpy.Eras[i];
			if(Molpy.newpixNumber<=era[0])
			{
				Molpy.TimeEra=era[1];
				break;
			}
		}
		for(var i in Molpy.Eons)
		{
			var eon = Molpy.Eons[i];
			if(Molpy.newpixNumber<=eon[0])
			{
				Molpy.TimeEon=eon[1];
				break;
			}
		}
	}
	Molpy.UpdateBeach=function()
	{
		if(Molpy.Boosts['Chromatic Heresy'].power&&Molpy.options.otcol)
		{	
			g('beach').style.background='url(http://178.79.159.24/Time/otcolorization/'+Molpy.newpixNumber+')';
			g('beach').style.backgroundSize='contain';	
		}else{
			g('beach').style.background='url(http://xkcd.mscha.org/frame/'+Molpy.newpixNumber+')';
			g('beach').style.backgroundSize='contain';	
		}
	}
	/* In which we figure out how to draw stuff
	+++++++++++++++++++++++++++++++++++++++++++*/
	Molpy.redactedClassNames=['hidden','floatbox sand tool shop','floatbox castle tool shop',
		'floatbox boost shop','lootbox boost loot','lootbox badge loot','lootbox badge shop'];
	Molpy.drawFrame=0;
	Molpy.Draw=function()
	{
		g('castlecount').innerHTML=Molpify(Molpy.castles,1) + ' castles';
		g('sandcount').innerHTML=Molpify(Molpy.sand,1) + ' sand of ' + Molpify(Molpy.nextCastleSand,1) + ' needed';
		g('sandrate').innerHTML=Molpify(Molpy.sandPermNP,1) + ' sand/mNP';
		g('newpixnum').innerHTML='Newpix '+Molpify(Molpy.newpixNumber,3);
		g('eon').innerHTML=Molpy.TimeEon;
		g('era').innerHTML=Molpy.TimeEra;
		g('period').innerHTML=Molpy.TimePeriod;
		g('version').innerHTML= '<br>Version: '+Molpy.version + (Molpy.version==1.21?' Gigawatts!':'');
		
		var repainted=Molpy.shopRepaint||Molpy.boostRepaint||Molpy.badgeRepaint;
		var tagRepaint=Molpy.boostRepaint||Molpy.badgeRepaint;
		
		if(Molpy.shopRepaint)
		{
			Molpy.RepaintShop();
		}
		if(Molpy.boostRepaint)
		{
			Molpy.RepaintBoosts();
		}
		if(Molpy.badgeRepaint)
		{
			Molpy.RepaintBadges();
		}
		if(tagRepaint&&Molpy.options.showhide.tagged)
		{
			Molpy.RepaintTaggedLoot();
		}
		if(tagRepaint) Molpy.RepaintLootSelection();
		if(Molpy.redactedVisible)
		{		
			var redacteditem=g('redacteditem');
			if(redacteditem)
			{
				Molpy.drawFrame++;
				if(Molpy.drawFrame>=Molpy.fps/3)Molpy.drawFrame=0;
				if(repainted || Molpy.drawFrame==0)
				{
					var className=Molpy.redactedClassNames[Molpy.redactedVisible];
					if(Molpy.Boosts['Chromatic Heresy'].power && Molpy.Got('Technicolour Dream Cat')
						&& Molpy.redactedDrawType[Molpy.redactedDrawType.length-1]!='hide2')
					{
						className+=' '+['alert','action','toggle','',''][Math.floor(Math.random()*4)];
					}
					redacteditem.className=className;
				}
			}
		}
		for(var i in Molpy.SandTools)
		{
			var me = Molpy.SandTools[i];
			Molpy.TickHover(me);
			
			if(me.amount)
			{
				var desc = g('SandToolProduction'+me.id);
				if(desc)
				{
					if(desc.innerHTML==''||desc.innerHTML.indexOf('Sand/mNP:')>-1)
					{
						desc.innerHTML='Sand/mNP: '+Molpify(me.storedTotalSpmNP,1);					
					}		
				}
			}
		}
		for(i in Molpy.CastleTools)
		{
			var me = Molpy.CastleTools[i];
			Molpy.TickHover(me);
			
			var desc = g('CastleToolProduction'+me.id);
			if(desc)
			{
				if(desc.innerHTML==''||desc.innerHTML.indexOf('Active:')>-1 ||desc.innerHTML.indexOf("Ninja'd")>-1 )
				{
					if(me.currentActive && Molpy.ninjaTime>Molpy.ONGelapsed)
					{
						if(Molpy.ninjad)
						{
							desc.innerHTML="Ninja'd!";
						}else
						{
							desc.innerHTML='Active: '+me.currentActive+'<br>Timer: '
							+Math.ceil((Molpy.ninjaTime-Molpy.ONGelapsed)/Molpy.NPlength);
						}
					}else{
						desc.innerHTML='';
					}
				}		
			}			
		}	
		for(i in Molpy.Boosts)
		{
			var me = Molpy.Boosts[i];
			if(me.unlocked)
			{
				Molpy.TickHover(me);
			}
		}
		for(i in Molpy.Badges)
		{
			var me = Molpy.Badges[i];
			//todo: skip badges which are hidden
			Molpy.TickHover(me);			
		}

		drawClockHand();
		if(Molpy.showStats) Molpy.PaintStats();
		Molpy.notifsUpdate();
		Molpy.sparticlesUpdate();
		
		if(Molpy.scrumptiousDonuts==1)
		{
			g('scrumptiousdonuts').innerHTML=BeanishToCuegish('JTI1M0NpZnJhbWUlMjUyMHNyYyUyNTNEJTI1MjJodHRwJTI1M0ElMjUyRiUyNTJGd3d3LnlvdXR1YmUuY29tJTI1MkZlbWJlZCUyNTJGR1U5Ukw2RDIzamslMjUzRmF1dG9wbGF5JTI1M0QxJTI1MjIlMjUyMHdpZHRoJTI1M0QlMjUyMjEwMCUyNTIyJTI1MjBoZWlnaHQlMjUzRCUyNTIyNjglMjUyMiUyNTIwZnJhbWVib3JkZXIlMjUzRCUyNTIyMCUyNTIyJTI1MjBhbGxvd2Z1bGxzY3JlZW4lMjUzRSUyNTNDJTI1MkZpZnJhbWUlMjUzRQ==');
			Molpy.Notify('Give you up,');
		}else if(Molpy.scrumptiousDonuts==-1){
			g('scrumptiousdonuts').innerHTML='';
		}
		if(Molpy.scrumptiousDonuts>0){
			Molpy.scrumptiousDonuts--;
		}
	}
	
	Molpy.TickHover=function(me)
	{
		if(Molpy.Boosts['Expando'].power)
		{
			me.hoverOffCounter=-1;//prevent hide
			if(me.hoverOnCounter!=0)
			{
				me.hoverOnCounter=1;//force show if not shown
			}
		}
		if(me.hoverOnCounter>0)
		{	
			me.hoverOnCounter--;
			if(me.hoverOnCounter<=0)
			{
				me.showdesc();
				Molpy.UnlockBoost('Expando');
			}
		}
		if(me.hoverOffCounter>0)
		{
			me.hoverOffCounter--;
			if(me.hoverOffCounter<=0)
			{
				me.hidedesc();
			}
		}
	}
		
	Molpy.PaintStats=function()
	{
		g('totalsandstat').innerHTML=Molpify(Molpy.sandDug,1);
		g('manualsandstat').innerHTML=Molpify(Molpy.sandManual);
		g('clicksstat').innerHTML=Molpify(Molpy.beachClicks);
		g('spclickstat').innerHTML=Molpify(Molpy.computedSandPerClick,1);
		g('sandspentstat').innerHTML=Molpify(Molpy.sandSpent);
		g('totalcastlesstat').innerHTML=Molpify(Molpy.castlesBuilt);
		g('destroyedcastlesstat').innerHTML=Molpify(Molpy.castlesDestroyed);
		g('spentcastlesstat').innerHTML=Molpify(Molpy.castlesSpent);
		
		g('ninjatimestat').innerHTML=Molpify(Molpy.ninjaTime/Molpy.NPlength,1)+'mNP';		
		g('ninjastealthstat').innerHTML=Molpify(Molpy.ninjaStealth)+'NP';	
		g('ninjaforgivestat').innerHTML=Molpify(Molpy.Boosts['Ninja Hope'].power*Molpy.Got('Ninja Hope')
			+Molpy.Boosts['Ninja Penance'].power*Molpy.Got('Ninja Penance'));		
		
		g('loadcountstat').innerHTML=Molpify(Molpy.loadCount);
		g('savecountstat').innerHTML=Molpify(Molpy.saveCount);	
		g('notifstat').innerHTML=Molpify(Molpy.notifsReceived);	
		g('autosavecountstat').innerHTML=Molpify(Molpy.autosaveCountup);	
		
		g('sandtoolsownedstat').innerHTML=Molpify(Molpy.SandToolsOwned);			
		g('castletoolsownedstat').innerHTML=Molpify(Molpy.CastleToolsOwned);			
		g('boostsownedstat').innerHTML=Molpify(Molpy.BoostsOwned);			
		g('badgesownedstat').innerHTML=Molpify(Molpy.BadgesOwned);		
		
		g('sandmultiplierstat').innerHTML=Molpify(Molpy.globalSpmNPMult*100,1)+'%';			
		g('redactedstat').innerHTML=Molpy.redactedWords + ": " + Molpify(Molpy.redactedClicks);		
		
		g('glasschipstat').innerHTML=Molpify(Molpy.Boosts['Glass Chip Storage'].power);
		g('glassblockstat').innerHTML=Molpify(Molpy.Boosts['Glass Block Storage'].power);
		g('sandusestat').innerHTML=Molpify(Molpy.CalcGlassUse(),3)+'%';
		g('blackstat').innerHTML='Collected '+Molpify(Molpy.Boosts['Blackprints'].power)+' of '+Molpify(Molpy.GetBlackprintPages());
		
		if(Molpy.notifLogPaint)Molpy.PaintNotifLog();
	}
	
	function createClockHand()
	{
		var clockSizeX = 40,
			clockSizeY = 40,
			handOriginX = clockSizeX / 2,
			handOriginY = clockSizeY / 2,
			handSize = 12;
		var hand = document.createElement("div");
		$(hand).css({ 
			position:"relative",
			left: handOriginX+"px",
			top: handOriginY+"px",
			width: "2px",
			height: handSize+"px",
			backgroundColor: "#222",
		});
		g("clockface").appendChild(hand);
    }
	function drawClockHand()
	{
		if(!g('game'))
		{
			return;
		}
		if(!Molpy.ONGelapsed){
			Molpy.ONGelapsed = new Date().getTime()-Molpy.ONGstart.getTime();
		}
		var npPercent = Molpy.ONGelapsed/(Molpy.NPlength*1000);
		clockDegrees = (npPercent * 360) + 180; //rotation from top		

		$("#clockface").children('div').css({ 
			transformOrigin: "0% 0%",
			transform: "rotate(" + clockDegrees + "deg)",
			'-ms-transform': "rotate(" + clockDegrees + "deg)",
			'-ms-transform-origin': "0% 0%",
			WebkitTransform: "rotate(" + clockDegrees + "deg)",
			'-webkit-transform-origin': "0% 0%"
        });
	}
	
	/* In which loopists do their thing
	+++++++++++++++++++++++++++++++++++*/
	Molpy.Loopist=function()
	{
		Molpy.ketchupTime=0;
		Molpy.lateness+=((new Date().getTime()-Molpy.time));
		Molpy.lateness=Math.min(Molpy.lateness, 7200);//don't ketchup up too much
		while(Molpy.lateness > Molpy.NPlength)
		{
			try{
				Molpy.Think();
			}catch(e)
			{
				alert('Something went wrong in Molpy.Think() '+(Molpy.ketchupTime?'while ketching up: ':': ')+e+'\n\n'+e.stack);
				throw e;
				return;
			}
			Molpy.ketchupTime=1;
			Molpy.lateness -= Molpy.NPlength;
		}
		Molpy.ketchupTime=0;
		try{
			Molpy.Draw();
		}catch(e)
		{
			alert('Something went wrong in Molpy.Draw(): '+e+'\n\n'+e.stack);
			throw e;
			return;
		}
		Molpy.time=new Date().getTime();
		setTimeout(Molpy.Loopist, 1000/Molpy.fps);
	}	
}



/* In which we make it go!
++++++++++++++++++++++++++*/
Molpy.Up();
window.onload=function()
{
	if(!Molpy.molpish) Molpy.Wake();
};
