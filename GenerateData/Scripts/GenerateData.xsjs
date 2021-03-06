var mode = $.request.parameters.get('mode');

$.import("Pinaki.RandomDataGenerator.Scripts.Libs", "allocateWeightage");
var allocateWeightage = $.Pinaki.RandomDataGenerator.Scripts.Libs.allocateWeightage;

$.import("CIO.GenerateData.Scripts.Libs", "DataGenLogger");
var DataGenLogger = $.CIO.GenerateData.Scripts.Libs.DataGenLogger;

// $.import("Pinaki.RandomDataGenerator.Scripts.Libs", "costCenter");
// var costCenter = $.Pinaki.RandomDataGenerator.Scripts.Libs.costCenter;

// $.import("Pinaki.RandomDataGenerator.Scripts.Libs", "costPool");
// var costPool = $.Pinaki.RandomDataGenerator.Scripts.Libs.costPool;

// $.import("Pinaki.RandomDataGenerator.Scripts.Libs", "chartOfAccount");
// var chartOfAccount = $.Pinaki.RandomDataGenerator.Scripts.Libs.chartOfAccount;

$.import("CIO.GenerateData.Scripts.Libs", "ITVendor");
var ITVendor = $.CIO.GenerateData.Scripts.Libs.ITVendor;

$.import("CIO.GenerateData.Scripts.Libs", "GLCCBudget");
var GLCCBudget = $.CIO.GenerateData.Scripts.Libs.GLCCBudget;

$.import("CIO.GenerateData.Scripts.Libs", "CreditorAccount");
var CreditorAccount = $.CIO.GenerateData.Scripts.Libs.CreditorAccount;
 
$.import("CIO.GenerateData.Scripts.Libs", "PurchaseOrder");
var PurchaseOrder = $.CIO.GenerateData.Scripts.Libs.PurchaseOrder;

$.import("CIO.GenerateData.Scripts.Libs", "ReportingUnit");
var ReportingUnit = $.CIO.GenerateData.Scripts.Libs.ReportingUnit;

$.import("CIO.GenerateData.Scripts.Libs", "KPI");
var KPI = $.CIO.GenerateData.Scripts.Libs.KPI;

$.import("CIO.GenerateData.Scripts.Libs", "Initiative");
var Initiative = $.CIO.GenerateData.Scripts.Libs.Initiative;

$.import("CIO.GenerateData.Scripts.Libs", "Project");
var Project = $.CIO.GenerateData.Scripts.Libs.Project;
  
$.import("CIO.GenerateData.Scripts.Libs", "WBS");
var WBS = $.CIO.GenerateData.Scripts.Libs.WBS;

$.import("CIO.GenerateData.Scripts.Libs", "Invoice");
var Invoice = $.CIO.GenerateData.Scripts.Libs.Invoice;




$.import("CIO.GenerateData.Scripts.Libs", "ActualCostAccounting");
var ActualCostAccounting = $.CIO.GenerateData.Scripts.Libs.ActualCostAccounting;


var dataGenerator = function(e){
	this.connection = $.db.getConnection();
	this.outputBody = {
			text : "Successfully generated CIO data",
			messages : [] //format- {text : '',status:''}
	};
	this.readOnlyTables = ['"CIO"."CIO.GenerateData.DB.Tables::CostPool"','"CIO"."CIO.GenerateData.DB.Tables::CostCenter"',
							'"CIO"."CIO.GenerateData.DB.Tables::ChartOfAccounts"'
							];
	this.readOnlyTablesText = [
		"Cost Pool","Cost Center","Chart Of Accounts"
	];
	this.aBaseTables=[  '"CIO"."CIO.GenerateData.DB.Tables::KPI"','"CIO"."CIO.GenerateData.DB.Tables::ITVendors"',
						'"CIO"."CIO.GenerateData.DB.Tables::Initiative"','"CIO"."CIO.GenerateData.DB.Tables::GLCCBudget"',
	                    '"CIO"."CIO.GenerateData.DB.Tables::CreditorAccount"','"CIO"."CIO.GenerateData.DB.Tables::PurchaseOrder"',
	                    ' "CIO"."CIO.GenerateData.DB.Tables::ReportingUnit"','"CIO"."CIO.GenerateData.DB.Tables::Project"',
	                    '"CIO"."CIO.GenerateData.DB.Tables::WBS"','"CIO"."CIO.GenerateData.DB.Tables::InvoiceDocument"',
	                    '"CIO"."CIO.GenerateData.DB.Tables::ActualCostAccounting"']; 
	this.aBaseTablesText=[
		"KPI", "IT Vendors","Initiatives","GL and CC Budget","Creditor Account","Purchase Order","Reporting Unit","Project","WBS","Invoice Document",
		"Actual Cost Accounting"
	];
	/*U*/	this.distinctNames = ['Elane Regler','Ike Blindt','Ruggiero Loxston','Floria Carrier','Taryn Yeo','Annamarie Muspratt','Niki Dolman','Jasmin Greed','Claudius Spear','Shep Lebarree','Mufinella Adney','Blondell Dunniom','Myrilla Carbonell','Leann McQuillen','Rebecca Bault','Gretchen Formoy','Monro Skase','Kean Lile','Jefferson Towns','Nanci Priddey'];
	this.countries = ['France','France','France','Germany','United States','France','France','United States','France','France','France','France','France','United States','Germany','United States','France','United States','Germany','United States','France','France','United States','France','United States','United States','United States','United States','United States','France','Spain','United States','Germany','Spain','United States','United States','United States','United States','France','United States','Germany','United States','United States','United States','Spain','France','France','United States','United States','United States','United States','Spain','United States','Spain','Germany','United States','United States','United States','Germany','United States','France','France','United States','France','Germany','Germany','United States','Spain','United States','United States','United States','France','United States','United States','United States','Spain','Germany','Spain','United States','Germany','United States','Germany','Spain','United States','Spain'];
	this.states = ['Champagne-Ardenne','ÃŽle-de-France','Aquitaine','Nordrhein-Westfalen','Wisconsin','RhÃ´ne-Alpes','Centre','Kentucky','Nord-Pas-de-Calais','Midi-PyrÃ©nÃ©es','Alsace','Bretagne','Pays de la Loire','Connecticut','Bremen','Michigan','Auvergne','Oregon','Baden-WÃ¼rttemberg','Pennsylvania','Languedoc-Roussillon','Bourgogne','Texas','Provence-Alpes-CÃ´te dAzur','Florida','California','Maryland','North Dakota','North Carolina','Lorraine','Comunidad Valenciana','New York','Bayern','Galicia','Ohio','Tennessee','Indiana','Illinois','Haute-Normandie','Georgia','Hamburg','New Jersey','Massachusetts','Alabama','Andalucia','Poitou-Charentes','Picardie','South Carolina','District of Columbia','Virginia','Delaware','Castilla - Leon','Nevada','Canarias','Sachsen','Washington','West Virginia','Iowa','Mecklenburg-Vorpommern','Nebraska','Limousin','Corse','Arizona','Franche-ComtÃ©','Berlin','Hessen','Oklahoma','Cantabria','Kansas','Minnesota','Arkansas','Basse-Normandie','Louisiana','New Mexico','Missouri','Cataluna','Schleswig-Holstein','Madrid','Hawaii','Niedersachsen','Alaska','Rheinland-Pfalz','Castilla - La Mancha','Mississippi','Aragon'];
	/*U*/	this.productName = ['Glucose','Icecream Bar - Del Monte','Danishes - Mini Raspberry','Plasticspoonblack','Cake - Cake Sheet Macaroon','Rice Paper','Mix - Cocktail Ice Cream','Nescafe - Frothy French Vanilla','Cheese Cheddar Processed','Tamarind Paste','Goat - Whole Cut','Ginger - Fresh','Buffalo - Short Rib Fresh','Longos - Grilled Veg Sandwiches','Chicken - Livers','Lettuce - Mini Greens, Whole','Snapple Raspberry Tea','Initation Crab Meat','Cheese - Mix','Veal - Insides, Grains','Pork - Liver','Sugar - Icing','Wine - Acient Coast Caberne','Huck White Towels','Appetizer - Crab And Brie','Laundry - Bag Cloth','Bread - Focaccia Quarter','Wine - Jackson Triggs Okonagan','Pork Casing','Basil - Seedlings Cookstown','Nantucket Apple Juice','Lemon Grass','Lamb - Bones','Wine - Riesling Dr. Pauly','Coffee - Beans, Whole','Nut - Walnut, Chopped','Munchies Honey Sweet Trail Mix','Milk - Chocolate 500ml','Anchovy In Oil','Soup - French Can Pea','Swiss Chard','Pasta - Fusili Tri - Coloured','Versatainer Nc - 8288','Beer - Camerons Cream Ale','Tomatoes - Yellow Hot House','Beer - Sleemans Cream Ale','Crab Brie In Phyllo','Cup Translucent 9 Oz','Muffin - Bran Ind Wrpd','Oil - Olive, Extra Virgin','Pate Pans Yellow','Triple Sec - Mcguinness','Flower - Leather Leaf Fern','Ecolab Digiclean Mild Fm','Ham - Proscuitto','Flour - Strong Pizza','Pop Shoppe Cream Soda','Chips Potato Salt Vinegar 43g','Napkin - Beverage 1 Ply','V8 - Vegetable Cocktail','Extract - Rum','Pie Box - Cello Window 2.5','Chocolate - Pistoles, White','Appetizer - Spring Roll, Veg','Muffin - Mix - Mango Sour Cherry','Crush - Cream Soda','Pumpkin - Seed','Latex Rubber Gloves Size 9','Red Cod Fillets - 225g','Shallots','Wine - Beaujolais Villages','Food Colouring - Red','Bread - Malt','Soup Campbells Mexicali Tortilla','V8 - Berry Blend','Kellogs All Bran Bars','Wine - Red, Antinori Santa','Veal - Eye Of Round','Cheese - Cheddarsliced','Compound - Orange','Chocolate - Milk','Loaf Pan - 2 Lb, Foil','Table Cloth 91x91 Colour','Container - Hngd Cll Blk 7x7x3','Bread - Roll, Whole Wheat','Juice - Ocean Spray Kiwi','Yogurt - Banana, 175 Gr','Pork - Backfat','Oil - Safflower','Ice Cream Bar - Oreo Sandwich','Truffle Paste','Beef - Tender Tips','Vodka - Smirnoff','Carroway Seed','Jerusalem Artichoke','Basil - Fresh','Peas - Pigeon, Dry','Tomato - Peeled Italian Canned','Crush - Orange, 355ml','Pasta - Cheese / Spinach Bauletti','Mushroom - King Eryingii','Truffle Cups Green','Tomato - Plum With Basil','Snapple - Iced Tea Peach','Wine - White, Riesling, Semi - Dry','Wine - Casablanca Valley','Lid - 0090 Clear','Oil - Grapeseed Oil','Pasta - Gnocchi, Potato','Salmon - Fillets','Gelatine Leaves - Bulk','Beer - Original Organic Lager','Eggplant - Asian','Potatoes - Mini White 3 Oz','Teriyaki Sauce','Sandwich Wrap','Vaccum Bag - 14x20','Wine - Piper Heidsieck Brut','Syrup - Monin - Blue Curacao','Bread Base - Gold Formel','Potatoes - Idaho 100 Count','Lamb Shoulder Boneless Nz','Yogurt - French Vanilla','Beets - Pickled','Tomatoes - Diced, Canned','Pork - Tenderloin, Frozen','Spice - Pepper Portions','Pasta - Canelloni, Single Serve','Wine - Zinfandel California 2002','Muffin Chocolate Individual Wrap','Pasta - Rotini, Colour, Dry','Seaweed Green Sheets','Juice - Grapefruit, 341 Ml','Prunes - Pitted','Rum - Light, Captain Morgan','Hot Choc Vending','Eggplant Oriental','Lettuce - Green Leaf','Soap - Mr.clean Floor Soap','Trout - Rainbow, Frozen','Godiva White Chocolate','Muffin Hinge 117n','Ecolab - Mikroklene 4/4 L','Evaporated Milk - Skim','Vinegar - Raspberry','Flower - Commercial Bronze','Rum - Coconut, Malibu','Temperature Recording Station','Salmon - Whole, 4 - 6 Pounds','Table Cloth 144x90 White','Tea - Mint','Sprouts - Corn','Truffle Shells - White Chocolate','Pimento - Canned','Cloves - Whole','Iced Tea Concentrate','Puree - Blackcurrant','Eggs - Extra Large','Bagelers','Beef - Salted','Beef - Shank','Beef - Tenderloin Tails','Beer - Sleeman Fine Porter','Lentils - Red, Dry','Island Oasis - Sweet And Sour Mix','Muffin Orange Individual','Juice - Tomato, 10 Oz','Shrimp - 16/20, Peeled Deviened','Tomato Paste','Sauce - Black Current, Dry Mix','Beans - Long, Chinese','Cheese - Sheep Milk','Flower - Commercial Spider','Dehydrated Kelp Kombo','Fork - Plastic','Flour - Strong','Onions - Red Pearl','The Pop Shoppe - Cream Soda','Cheese - Shred Cheddar / Mozza','Bag - Bread, White, Plain','Lobster - Tail 6 Oz','Green Scrubbie Pad H.duty','Muffin Mix - Morning Glory','Plate Foam Laminated 9in Blk','Shrimp - Baby, Cold Water','Ecolab - Ster Bac','Tea - Decaf 1 Cup','Crab - Imitation Flakes','Wine - Penfolds Koonuga Hill','Soup Campbells Beef With Veg','Pear - Halves','Contreau','Bacardi Breezer - Tropical','Cheese - Pont Couvert','Food Colouring - Blue','Wine La Vielle Ferme Cote Du','Bar Mix - Lemon','Lobster - Tail, 3 - 4 Oz','Muffin - Blueberry Individual','Brocolinni - Gaylan, Chinese','Kiwi Gold Zespri','Butter Ripple - Phillips','Doilies - 10, Paper','Shrimp - Baby, Warm Water','Pork - Back, Long Cut, Boneless','Cup - Translucent 7 Oz Clear','Shrimp - 31/40','Wine - White Cab Sauv.on','Beans - Black Bean, Canned','Black Currants','Cheese - Camembert','Burger Veggie','Gloves - Goldtouch Disposable','Dried Figs','Schnappes Peppermint - Walker','Capers - Ox Eye Daisy','Ice Cream Bar - Drumstick','Cream - 10%','Sauerkraut','Lumpfish Black','Container Clear 8 Oz','Potatoes - Yukon Gold, 80 Ct','Plasticknivesblack','Poppy Seed','Rosemary - Primerba, Paste','Duck - Legs','Raisin - Golden','Tea - Jasmin Green','Bag - Clear 7 Lb','Lamb - Leg, Bone In','Cheese - Cottage Cheese','Beans - Black Bean, Dry','Easy Off Oven Cleaner','Lettuce - Frisee','Onions - Dried, Chopped','Bread - Hot Dog Buns','Potatoes - Pei 10 Oz','Chocolate - Mi - Amere Semi','Appetizer - Cheese Bites','Rum - Dark, Bacardi, Black','Gin - Gilbeys London, Dry','Bread - Italian Roll With Herbs','Canada Dry','Bread - French Baquette','Ham - Procutinni','Wine - Placido Pinot Grigo','Tomatoes - Cherry, Yellow','Vinegar - Tarragon','Cheese - Perron Cheddar','Apron','Juice - Apple Cider','Pepper - Paprika, Hungarian','Lid - Translucent, 3.5 And 6 Oz','Wine - Fontanafredda Barolo','Cheese - Blue','Chips Potato Swt Chilli Sour','Salt - Seasoned','Coffee - Flavoured','Beer - Heinekin','Appetizer - Southwestern','Dooleys Toffee','Wine - Clavet Saint Emilion','Calvados - Boulard','Chinese Foods - Chicken','Lobster - Baby, Boiled','Beef - Eye Of Round','Straws - Cocktale','The Pop Shoppe Pinapple','Beer - True North Lager','Beets - Golden','Wine - Valpolicella Masi','Lettuce - Lambs Mash','Bread - Raisin Walnut Pull','Bagel - 12 Grain Preslice','Lentils - Green, Dry','Veal - Leg','Apple - Royal Gala','Beef - Bones, Cut - Up','Pastry - Apple Large','Pasta - Lasagna Noodle, Frozen','Yokaline','Nantuket Peach Orange','Red Pepper Paste','Sour Cream','Crab - Meat','Soup - Campbells, Classic Chix','Sauce - Sesame Thai Dressing','Clams - Bay','Liners - Baking Cups','Wine - Gewurztraminer Pierre','Milk - Skim','Table Cloth 54x54 Colour','Bread Base - Toscano','Scallops - 20/30','Ice Cream - Vanilla','Fish - Bones','Savory','Apricots - Dried','Lentils - Green Le Puy','Gatorade - Fruit Punch','Chocolate - Unsweetened','Napkin Colour','Pernod','Schnappes - Peach, Walkers','Bread - English Muffin','Peach - Fresh','Filling - Mince Meat','Sterno - Chafing Dish Fuel','Bread - Raisin Walnut Oval','Beef - Diced','Wine - Semi Dry Riesling Vineland','Wine - Red, Harrow Estates, Cab','Bread - Rye','Wine - Ice Wine','Sping Loaded Cup Dispenser','Table Cloth 81x81 Colour','Straw - Regular','Wonton Wrappers','Crab - Soft Shell','Dc - Sakura Fu','Cheese Cloth No 100','Blue Curacao - Marie Brizard','Cake Sheet Combo Party Pack','Passion Fruit','Hinge W Undercut','Cassis','Towels - Paper / Kraft','Wine - White, Riesling, Henry Of','Mousse - Passion Fruit','Soap - Hand Soap','Garlic - Elephant','Tea - Decaf Lipton','Cookies - Oreo, 4 Pack','Wine - Taylors Reserve','Wine - Shiraz Wolf Blass Premium','Chickensplit Half','Filter - Coffee','Sobe - Tropical Energy','Bread - White Epi Baguette','Smoked Tongue','Wooden Mop Handle','Yoghurt Tubes','Dome Lid Clear P92008h','Vegetable - Base','Sugar - Palm','Appetizer - Sausage Rolls','Wine - Jafflin Bourgongone','Potatoes - Peeled','Pasta - Angel Hair','Chevril','Food Colouring - Pink','Beef - Inside Round','Soup - Campbells, Butternut','Cookies - Englishbay Wht','Corn Kernels - Frozen','Whmis - Spray Bottle Trigger','Pop - Club Soda Can','Cleaner - Lime Away','Cheese - Swiss','Puff Pastry - Slab','Yogurt - Assorted Pack','Glass Clear 7 Oz Xl','Wine - Chenin Blanc K.w.v.','Tart Shells - Sweet, 3','Cheese - Montery Jack','Basil - Primerba, Paste','Chicken - Leg / Back Attach','Pepper - Jalapeno','Juice - Ocean Spray Cranberry','Lettuce - Escarole','Bread - Olive Dinner Roll','Cheese - Provolone','Sauce - Cranberry','Appetiser - Bought','Wine - Saint Emilion Calvet','Cake - Miini Cheesecake Cherry','Cinnamon Rolls','Lamb - Sausage Casings','Pork Salted Bellies','Wine - Malbec Trapiche Reserve','Asparagus - Mexican','Bonito Flakes - Toku Katsuo','Oil - Sesame','Squid Ink','Wine - Vidal Icewine Magnotta','Bols Melon Liqueur','Sauce - Thousand Island','Squeeze Bottle','Wine - Chateau Bonnet','Pasta - Tortellini, Fresh','Liqueur - Melon','Soup - Campbellschix Stew','Coffee Cup 16oz Foam','Water - Mineral, Natural','Food Colouring - Orange','Banana','Soy Protein','Pecan Raisin - Tarts','Pasta - Fettuccine, Egg, Fresh','Stock - Chicken, White','Juice - Orange','Coconut - Shredded, Sweet','Chutney Sauce','Wine - Puligny Montrachet A.','Turkey Tenderloin Frozen','Chicken - Wieners','Goldschalger','Apple - Delicious, Golden','Mustard - Pommery','Baking Powder','Beer - Muskoka Cream Ale','Long Island Ice Tea','Appetizer - Smoked Salmon / Dill','Pastry - Key Limepoppy Seed Tea','Pasta - Fett Alfredo, Single Serve','Tequila Rose Cream Liquor','Towel - Roll White','Ice - Clear, 300 Lb For Carving','Bread Ww Cluster','Veal - Brisket, Provimi,bnls','Coffee Caramel Biscotti','Cheese - Grie Des Champ','Wine - Blue Nun Qualitatswein','Wine - Port Late Bottled Vintage','Wine - Red, Black Opal Shiraz','Buttons','V8 Pet','Wine - Mas Chicet Rose, Vintage','Cumin - Ground','Squash - Pattypan, Yellow','Oregano - Dry, Rubbed','Gelatine Powder','Pepsi, 355 Ml','Sauce - Mint','Bread - Petit Baguette','Octopus - Baby, Cleaned','Chocolate Bar - Smarties','Wine - Alicanca Vinho Verde','Dates','Pepper - Red Chili','Wine - Casillero Deldiablo','Salmon - Atlantic, Skin On','Beef - Prime Rib Aaa','Juice - Happy Planet','Nut - Macadamia','Fuji Apples','Coconut - Creamed, Pure','Pomello','Pie Pecan','Pork - Bacon Cooked Slcd','Bread - Frozen Basket Variety','Soup - Campbells, Minestrone','Cherries - Frozen','Wine - Pinot Grigio Collavini','Cake - Pancake','Hersey Shakes','Onions - Cippolini','Chips - Assorted','Olives - Kalamata','Soap - Pine Sol Floor Cleaner','Soup - Campbells Mac N Cheese','Sugar - Monocystal / Rock','Lettuce - Belgian Endive','Pepper - Red Bell','Cheese - Havarti, Roasted Garlic','Muffin Batt - Ban Dream Zero','Oil - Canola','Banana - Leaves','Noodles - Steamed Chow Mein','Lettuce - Red Leaf','Chicken Breast Halal','Coffee Decaf Colombian','Soup - French Onion, Dry','Sausage - Liver','Pie Shells 10','Appetizer - Tarragon Chicken','Appetizer - Escargot Puff','Wine - Magnotta - Cab Franc','Mushroom - Porcini, Dry','Soup - Campbells, Spinach Crm','Lid Coffee Cup 8oz Blk','Vodka - Hot, Lnferno','Mace Ground','Asparagus - White, Fresh','Sprouts - China Rose','Irish Cream - Butterscotch','Beans - Wax','Dikon','Gatorade - Xfactor Berry','Sauce - Plum','Tart Shells - Barquettes, Savory','Coffee - Ristretto Coffee Capsule','Bread - Kimel Stick Poly','Strawberries - California','Blueberries - Frozen','Mangoes','Crab Meat Claw Pasteurise','Beans - Butter Lrg Lima','Pie Shell - 9','Kahlua','Pastry - Carrot Muffin - Mini','Bread - Roll, Calabrese','Quail Eggs - Canned','Oats Large Flake','Sambuca - Ramazzotti','Sugar - Splenda Sweetener','Beer - Molson Excel','Napkin - Cocktail,beige 2 - Ply','7up Diet, 355 Ml','Table Cloth 62x120 Colour','Shrimp - Black Tiger 26/30','Cake Slab','Coffee Beans - Chocolate','Pears - Anjou','Wine - Two Oceans Cabernet','Wine - Red, Pelee Island Merlot','Mushroom - Crimini','Heavy Duty Dust Pan','Pail For Lid 1537','Pork - Belly Fresh','Beets - Candy Cane, Organic','Monkfish Fresh - Skin Off','Carbonated Water - White Grape','Pear - Prickly','Bag Stand','Soup - Tomato Mush. Florentine','Coffee Guatemala Dark','Icecream - Dstk Cml And Fdg','Wine - Red, Marechal Foch','Carbonated Water - Blackcherry','Mushroom - White Button','Wine - Red, Gallo, Merlot','Sausage - Meat','Pears - Bartlett','Steampan - Half Size Shallow','Wine - Prosecco Valdobienne','Crab - Back Fin Meat, Canned','Lotus Root','Persimmons','Basil - Thai','Rabbit - Legs','Spinach - Spinach Leaf','Longos - Chicken Wings','Carbonated Water - Peach','Sour Puss - Tangerine','Wine - Rhine Riesling Wolf Blass','Apple - Northern Spy','Spinach - Baby','Croissant, Raw - Mini','Nut - Pecan, Halves','Pie Filling - Cherry','Cabbage - Green','Cheese - Parmesan Grated','Pasta - Orzo, Dry','Lid Tray - 16in Dome','Soup - Campbells Chicken','Versatainer Nc - 888','Fish - Soup Base, Bouillon','Cardamon Ground','Raisin - Dark','Foam Espresso Cup Plain White','Cocktail Napkin Blue','Coke - Diet, 355 Ml','Shortbread - Cookie Crumbs','Pineapple - Regular','Bread - Pullman, Sliced','Calaloo','Cookies - Englishbay Oatmeal','Praline Paste','Chick Peas - Dried','Pepper - Cayenne','Squash - Sunburst','Sugar - Invert','Salt - Celery','Apple - Delicious, Red','Sauce - Apple, Unsweetened','Fish - Scallops, Cold Smoked','Hog / Sausage Casing - Pork','Venison - Liver','Quail - Eggs, Fresh','Chips - Miss Vickies','Cookie - Oreo 100x2','Tea - Darjeeling, Azzura','Puree - Pear','Mustard - Dijon','Lemon Balm - Fresh','Wine - Red, Mouton Cadet','Bread Country Roll','Ice Cream Bar - Hagen Daz','Snapple - Mango Maddness','Pickle - Dill','Ostrich - Prime Cut','Grenadine','Soup - Campbells Asian Noodle','Beer - Maudite','Ham - Cooked','Glass - Juice Clear 5oz 55005','Cake - Night And Day Choclate','Compound - Mocha','Wine - Red, Wolf Blass, Yellow','Edible Flower - Mixed','Parsnip','Truffle - Whole Black Peeled','Sprite - 355 Ml','Sauce - Ranch Dressing','Onion - Dried','Appetizer - Mushroom Tart','Hagen Daza - Dk Choocolate','Lobster - Base','Yukon Jack','Bandage - Finger Cots','Truffle - Peelings','Lemonade - Black Cherry, 591 Ml','Butter - Unsalted','Flour - Semolina','Soup - Campbells, Cream Of','Beer - Sleemans Honey Brown','Oil - Food, Lacquer Spray','Longos - Lasagna Veg','Lamb - Ground','Ham - Black Forest','Glycerine','Cheese - Gouda Smoked','Lamb - Loin Chops','Foam Dinner Plate','Pork - Smoked Back Bacon','Seedlings - Mix, Organic','Dill - Primerba, Paste','Mushroom - Enoki, Fresh','Rambutan','Flour - Teff','Salmon - Sockeye Raw','Cheese - Colby','Chervil - Fresh','Bread - White Mini Epi','Peach - Halves','Tortillas - Flour, 12','Bread - Roll, Soft White Round','Wine - Ej Gallo Sierra Valley','Soup - Campbells, Lentil','Juice - Orangina','Salmon Steak - Cohoe 8 Oz','Pepper Squash','Higashimaru Usukuchi Soy','Sardines','Bagel - Everything Presliced','Wine - Cabernet Sauvignon','Bagelers - Cinn / Brown','Table Cloth 62x120 White','Cookie Dough - Chocolate Chip','Zucchini - Green','Quiche Assorted','Island Oasis - Strawberry','Flower - Potmums','Spice - Onion Powder Granulated','Tea - Lemon Green Tea','Chips Potato Reg 43g','Bread - Roll, Italian','Wine - Alsace Gewurztraminer','Tahini Paste','Capicola - Hot','Beer - Corona','Stock - Beef, Brown','Snapple Lemon Tea','Lemons','Cheese - Brie, Cups 125g','Dip - Tapenade','Mushroom - Trumpet, Dry','Onion Powder','Pepper - Red, Finger Hot','Amarula Cream','Wine - Fume Blanc Fetzer','Sweet Pea Sprouts','Squid - Breaded','Beef - Baby, Liver','Danishes - Mini Cheese','Wine - Vineland Estate Semi - Dry','Potatoes - Idaho 80 Count','Pepsi - 600ml','Wine - Red, Lurton Merlot De','Coke - Classic, 355 Ml','Wine - Cave Springs Dry Riesling','Beef - Tenderloin','Pepper - Chillies, Crushed','Waffle Stix','Bulgar','Fish - Artic Char, Cold Smoked','Pate - Peppercorn','Appetizer - Asian Shrimp Roll','Egg - Salad Premix','Veal - Tenderloin, Untrimmed','Limes','Broom - Angled','Onions Granulated','Glass Clear 8 Oz','Pasta - Rotini, Dry','Chip - Potato Dill Pickle','Puree - Strawberry','Pasta - Linguini, Dry','Rice Wine - Aji Mirin','Milk - Buttermilk','Peppercorns - Green','Jello - Assorted','Oregano - Fresh','Chicken - Diced, Cooked','Lamb - Pieces, Diced','Roe - White Fish','Mudslide','Smoked Paprika','Tomatoes Tear Drop','Tuna - Fresh','Oranges','Beef - Ground Medium','Rice - Long Grain','Cheese - Marble','Flavouring Vanilla Artificial','Mushroom - Oyster, Fresh','Wiberg Super Cure','Tea Peppermint','Rice - Brown','Coffee - Almond Amaretto','Bread - Multigrain','Wine - Lou Black Shiraz','Cherries - Maraschino,jar','Shrimp - Black Tiger 16/20','Soup - Beef, Base Mix','Tendrils - Baby Pea, Organic','Pants Custom Dry Clean','Cranberries - Frozen','Soup - Campbells Beef Strogonoff','Amaretto','Hummus - Spread','The Pop Shoppe - Black Cherry','Bread - Ciabatta Buns','Water, Tap','Piping Jelly - All Colours','Mints - Striped Red','Lamb - Racks, Frenched','Cheese - Brie, Triple Creme','Pheasants - Whole','Table Cloth 62x114 White','Chocolate Bar - Reese Pieces','Cheese - St. Andre','Juice - V8, Tomato','Soup - Campbells - Tomato','Pasta - Ravioli','Rosemary - Dry','Fenngreek Seed','Cheese - Cheddar With Claret','Cornflakes','Turkey - Breast, Bone - In','Propel Sport Drink','Olives - Morracan Dired','Sauce - Bernaise, Mix','Pie Filling - Apple','Bread - Olive','Fudge - Cream Fudge','Veal - Liver','Nacho Chips','Soup - Cream Of Broccoli, Dry','Icecream - Dibs','Plaintain','Wine - Chardonnay South','Arctic Char - Fresh, Whole','Rum - White, Gg White','Bread - Pita','Ostrich - Fan Fillet','Eggroll','Pasta - Fettuccine, Dry','Steam Pan Full Lid','Star Anise, Whole','Cups 10oz Trans','Chambord Royal','Wine - Stoneliegh Sauvignon','Pate - Liver','Extract Vanilla Pure','Sauce - Caesar Dressing','Mackerel Whole Fresh','Mushroom - Chanterelle Frozen','Chicken - Tenderloin','Corn - On The Cob','Table Cloth 53x53 White','Fond - Chocolate','Table Cloth 81x81 White','Chicken - Bones','Crackers Cheez It','Bread - Bistro Sour','Tarts Assorted','Raspberries - Fresh','Apricots - Halves','Cup - 8oz Coffee Perforated','Pasta - Orecchiette','Tomato - Green','Wine - Black Tower Qr','Lettuce - Boston Bib','Wine - Cotes Du Rhone','Curry Powder Madras','Steel Wool','Lettuce - Lolla Rosa','Juice - Cranberry 284ml','Ecolab - Balanced Fusion','Daves Island Stinger','Fruit Mix - Light','Shrimp - 100 / 200 Cold Water','Tuna - Bluefin','Napkin White - Starched','Wine - Winzer Krems Gruner','Energy Drink Bawls','Eggplant - Regular','Wine - Magnotta - Cab Sauv','Lid - 3oz Med Rec','Pail With Metal Handle 16l White','Garbage Bag - Clear','Cheese - Cheddar, Old White','Yogurt - Strawberry, 175 Gr','Chilli Paste, Ginger Garlic','Bread - 10 Grain Parisian','Momiji Oroshi Chili Sauce','Mushroom - Shitake, Dry','Tortillas - Flour, 10','Wine - Domaine Boyar Royal','Carrots - Mini, Stem On','Sugar - Brown','Dill Weed - Fresh','Wine - Coteaux Du Tricastin Ac','Kolrabi','Lemonade - Pineapple Passion','Chicken Breast Wing On','Soup - Campbells Pasta Fagioli','Sage Ground Wiberg','Bacardi Mojito'];
	/*U*/	this.uom = ['KG','EA'];
	/*U*/	this.companyName = ['Schimmel-Hartmann','Bechtelar-Lang','Sipes, Aufderhar and Cummings','Swaniawski-Blanda','Jacobson-Greenholt','Kling-Collins','Senger LLC','Schulist-Goyette','Waelchi and Sons','Hand-Dickinson','Langosh, Kshlerin and Hoppe','Watsica-Klocko','Wiegand-Stoltenberg','Dare and Sons','Becker, Shanahan and Weissnat','Weber, Ritchie and Rippin','Weissnat, Senger and Wilkinson','Hermiston and Sons','Borer Inc','Roberts-Donnelly','Howell, Treutel and Huel','Swift-Nader','Tromp and Sons','Parker Group','Gibson-Torp','Hamill-Mills','Daniel and Sons','Renner-Heathcote','Legros, Bernier and Spinka','Little Group','Rath-Parker','Blanda, Hamill and Waters','Flatley, Gutmann and Franecki','Reichert, Kuphal and MacGyver','Ledner and Sons','Kshlerin, Mertz and Johnston','Feest-Mann','Green and Sons','Morar, Beatty and Williamson','Harber, Hayes and Haley','Kirlin-Renner','Mante LLC','Kuphal-Gislason','Wilkinson, Konopelski and Mann','Hane and Sons','Barrows-Larson','Sawayn LLC','Beer Group','Denesik, Lockman and Cole','Lowe LLC','Beier Group','Flatley-Dietrich','Bahringer-Monahan','Durgan', 'Connell and Runolfsson','Rath-Reynolds','Reilly Inc','Daniel', 'Mayer and Padberg','Streich, Sawayn and Hickle','Nienow-Schultz','Cormier LLC','Romaguera LLC','Stiedemann Inc','Bergnaum, Hegmann and Adams','Langosh and Sons','Abernathy and Sons','Kerluke-Schuppe','Reinger LLC','Simonis, Bernier and Beer','Abbott, Breitenberg and Koelpin','Kautzer LLC','Gerlach Group','Goldner Inc','EY','Kuvalis and Sons','Zieme, Dibbert and Swift','Grant, Sawayn and Wyman','Conroy LLC','Reichel-Von','Haag Group','Bartoletti, Brakus and Macejkovic'];
	/*U*/	this.projectName = ['Hagenes-Douglas','Torphy-Swaniawski','Flatley-Walker','Hackett-Ruecker','DuBuque Inc','Feeney, Dibbert and Hahn','Stanton-Toy','Senger Group','Renner, Runolfsdottir and Jerde','Feeney, Brekke and Frami','Ullrich, Effertz and Lockman','Block Group','Rutherford and Sons','Batz, Cruickshank and Goyette','Terry LLC','Hettinger and Sons','Pollich-Ziemann','Bartoletti-Littel','Lueilwitz-Boehm','Goldner, Lindgren and Schaefer','McGlynn, Schmidt and Walter','Schoen-Greenfelder','Goyette, Beatty and Gislason','Stoltenberg Inc','Fadel-Connelly','Bruen and Sons','Rolfson Group','Paucek, Jenkins and Reinger','Ruecker-Bechtelar','Pacocha-Gerhold','Bogan-Schmeler','Labadie, Runte and Kulas','Predovic, Koss and Toy','Herman and Sons','Kilback-Price','Langosh-Harris','Stokes-Keeling','Orn-Krajcik','Reichert-Towne','Kuhic-Robel','Krajcik Group','Runte-Yost','Lakin, Streich and Frami','Corwin, Emmerich and Pfannerstill','Macejkovic-Schoen','Vandervort-Batz','Toy-Bergstrom','Pollich LLC','Volkman Group','Nolan Inc','Schroeder, Schuster and Haag','Hilll Group','Howe Inc','Greenfelder LLC','Breitenberg, Quitzon and Nader','Berge-Ziemann','Rodriguez, Strosin and Zboncak','Howe, Gerlach and Goyette','Nikolaus LLC','Bechtelar, Jacobi and Padberg','Schuster Inc','Kilback, Paucek and Hodkiewicz','Johns-Dietrich','McCullough, Jones and Schimmel','Lindgren, Goodwin and Metz','Vandervort and Sons','Osinski Group','Hills, Friesen and Watsica','Hintz-Rowe','Hilll-OReilly','Hyatt and Sons','Renner Group','Cormier and Sons','Smith-Nicolas','Zemlak and Sons','Goodwin LLC','Dach-Pouros','Rice-Leannon','Heaney, Bashirian and Cassin','Johns, Hyatt and Beatty','Heaney LLC','DuBuque LLC','Heidenreich-OConner','Hintz, Rau and Hegmann','Stanton Inc','Reilly Group','Maggio, Wuckert and Thiel','Bechtelar and Sons','Smith Inc','Ratke, King and McKenzie','Kulas Group','Murazik Group','Stiedemann-OHara','Luettgen-Marquardt','Dooley Group','Johns and Sons','Schowalter, Predovic and Daugherty','Wyman LLC','Heaney-Langworth','Mueller-Pfannerstill','Bechtelar, McKenzie and Schoen','Stokes Group','Feest-Kohler','Cruickshank-Nader','Connelly, Weimann and Kertzmann','Mante-Sauer','Rosenbaum-Keeling','Labadie-Murazik','Quigley LLC','Cronin, Heathcote and Mante','Brakus, Sauer and Weimann','Yost-Kulas','Pouros-Mayert','Gislason, Dickens and Casper','Luettgen, Predovic and Bayer','Parisian-Balistreri','Kiehn-Dickens','Carroll-Heidenreich','Jacobson Group','Lang Group','Ebert-Littel','Berge and Sons','Greenfelder-Walsh','Grady Inc','Daugherty-Littel','Sipes, Pfannerstill and Gutkowski','Schulist-Dicki','Bogan-Stokes','Tromp and Sons','Denesik, Wilkinson and Stanton','Walsh LLC','Romaguera, Collins and Schamberger','Goldner LLC','Kutch Inc','Hammes, Bechtelar and Leuschke','Kemmer-Deckow','Grant Group','West, Shields and Frami','Sanford and Sons','Osinski-Yundt','Beahan, Rath and Herzog','Eichmann, Hessel and Monahan','Huel-Anderson','Wiza, Morissette and Hessel','Gusikowski-Wintheiser','Haag and Sons','Hayes Inc','Kshlerin-Bernier','Gibson Inc','Schowalter and Sons','Denesik-Goodwin','Marvin Group','Braun, Ritchie and Pacocha','Schuppe Inc','Walter LLC','Kuvalis-Roberts','Cruickshank Group','Ledner and Sons','Mayert, Wilkinson and Effertz','Homenick-Hegmann','Flatley, Kunze and Kihn','Smith, Pouros and Bergstrom','Bosco-Rempel','Bergstrom LLC','Prosacco-Brakus','Bernier-Hermiston','Douglas, Hahn and Daugherty','Rau and Sons','Jacobi LLC','Ziemann-Bruen','Collins Inc','Runolfsdottir, Deckow and Crooks','Kohler, Schinner and Collins','Murphy, Dare and Ziemann','Berge-Hintz','Cummings Group','Kerluke Group','Moore, Haag and Hessel','Mraz-Schulist','Franecki LLC','Nolan-Roberts','Adams, Tremblay and Pfannerstill','Torp, Deckow and Willms','Kutch-Hartmann','Farrell Group','Towne Inc','Ritchie, Conn and Lueilwitz','Heidenreich, Terry and Rosenbaum','Schuster, Feest and Mann','Kutch, Leannon and Senger','Deckow-Kessler','Gaylord LLC','Swift LLC','Breitenberg Group','Lindgren LLC','Beatty Inc','Schoen, Jacobson and Hoeger'];
	/*U*/	this.projectCategory = ['Protect','Run','Grow','Optimize'];
	/*U*/	this.projectFundType = ['Client','Internal','COE-Budget'];
	/*U*/	this.projBudgetCurrency = ['EUR'];
	/*U*/	this.wbs = ['INTRIS-Technical Setup','INTRIS-Roll-out','IT Transformation Program-Technical Setup','IT Transformation Program-Roll-out','SAP Business Intelligence-Technical Setup','SAP Business Intelligence-Roll-out','Wavespace-Technical Setup','Wavespace-Roll-out','Wavespace-Hypercare','Digital Boardroom-Technical Setup','Digital Boardroom-Roll-out','Digital Boardroom-Hypercare','Digital Boardroom-Support','Digital Boardroom-Backup','Internal Efficiency-Technical Setup','Internal Efficiency-Roll-out','Internal Efficiency-Hypercare','Internal Efficiency-Support','Bosch IT-Assessment-Technical Setup','Bosch IT-Assessment-Roll-out','Bosch IT-Assessment-Hypercare'];
	/*U*/	this.wbsProjName = ['INTRIS','IT Transformation Program','SAP Business Intelligence','Wavespace','Digital Boardroom','Internal Efficiency','Bosch IT-Assessment'];
	/*U*/	this.wbsExpenseType = ['CapEx','OpEx'];
	/*U*/	this.noOfRecords = 10;
			this.glAccountName = ['IT Hardware','IT Software','IT Personnel','Ext Contractor','Ext Services'];
			this.KPI = ['Revenue'];
			this.initiativesName = ['Growth in China','Digital Customer Experience','Next Generation IT','Controllin 4.0','Happy People','Social Media Awareness'];
};
dataGenerator.prototype = {
		generateRandDate : function(dateFrom,dateTo){
			dateFrom = new Date(dateFrom.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
			dateTo = new Date(dateTo.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
			dateFrom = dateFrom.getTime();
			dateTo = dateTo.getTime();
			var returnDate =  new Date(dateFrom + Math.random() * (dateTo - dateFrom));
			return returnDate.toISOString().substring(0, 10).replace(/-/g, "");
		},
		addDaysToDate : function(date,daysToAdd){
			var dateFrom = new Date(date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
 
			var returnDate =  dateFrom.setDate(dateFrom.getDate() + daysToAdd); 
			returnDate = new Date(returnDate);
			return returnDate.toISOString().substring(0, 10).replace(/-/g, "");
		},
		generateRandomDecimal : function(lowerNumber,upperNumber){
			return Math.floor(Math.random() * (upperNumber - lowerNumber + 1)) + lowerNumber;
		},
		generateRandomAlphaNum : function(length,options){ //@Input : aPossibilities,prefix
			var i = 0;
			var text = "";
			if(options){
				length = length - options.prefix.length;
			}
			if(options && options.aPossibilities.length > 0){
				for( i = 0 ; i < length; i++){
					text += options.aPossibilities[Math.floor(Math.random() * options.aPossibilities.length)];
				}
			}else{
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for ( i = 0; i < length; i++)
					text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			if(options){
				text = options.prefix + text;
			}
			return text;
		},
		getDistinctFromTableColumn : function(tableName,columnName,whereStatement){
			var connection = this.connection;
			var sql = 'select top 1 cast("'+columnName+'" as varchar(1000)) from '+tableName+' where '+whereStatement+' order by rand() ';
			var statement = connection.prepareStatement(sql);
			var resultSet = statement.executeQuery();
			while (resultSet.next()) {
				return resultSet.getString(1);
			}
		},
		getTableColumnAsDistinctArray : function(tableName,columnName,whereStatement){
			var connection = this.connection;
			var aColumnDistinctEntries = [];
			var sql = 'select distinct cast("'+columnName+'" as varchar(1000)) from '+tableName+' where '+whereStatement;
			var statement = connection.prepareStatement(sql);
			var resultSet = statement.executeQuery();
			while (resultSet.next()) {
				aColumnDistinctEntries.push(resultSet.getString(1))
			}
			return aColumnDistinctEntries;
		},
		getTableColumnAsArray : function(tableName,columnName,whereStatement){
			var connection = this.connection;
			var aColumnEntries = [];
			var sql = 'select  cast("'+columnName+'" as varchar(1000)) from '+tableName+' where '+whereStatement;
			var statement = connection.prepareStatement(sql);
			var resultSet = statement.executeQuery();
			while (resultSet.next()) {
				aColumnEntries.push(resultSet.getString(1))
			}
			return aColumnEntries;
		},
		getLeafNodesChild : function(tableName,child,parent){
			var connection = this.connection;
			var aChldNodesChild = [];
			var sql = 	'Select '+child+' from  '+ tableName +
			'where '+child+' not in '+
			'(Select Distinct '+parent+' From '+ tableName+')'; 
			
			var statement = connection.prepareStatement(sql);
			var resultSet = statement.executeQuery();
			while (resultSet.next()) {
				aChldNodesChild.push(resultSet.getString(1))
			}
			return aChldNodesChild;
		},
		generateBudgetData : function(){
//			var sql =	 'insert into  "PINAKIP"."analyticscloud.db.CIO::Budget" ' +
//					' SELECT  DISTINCT "CompanyCode", "FiscalYear", "CostCenterID", '+
//					'"PostingPeriod",  \'AutoGenUser\' as "User",  "GLAccountNumber",'+
//					' "ChartsofAccountID", '+
//					' SUM("AmountinLocalCurrency")*(select RAND()*(1.2-.8)+.8 from dummy) AS "Bugdet",'+
//					' "LocalCurrency"'+
//					'FROM "_SYS_BIC"."Pinaki.CIODashboard.model/CA_ACTUAL_COST_ACCOUNTING" '+
//					'GROUP BY "CompanyCode", "FiscalYear", "CostCenterID", "PostingPeriod", '+
//					' "LocalCurrency", "GLAccountNumber", "ChartsofAccountID"'+
//					'order by "PostingPeriod","CostCenterID" ,"GLAccountNumber"';
//			var connection = $.db.getConnection();
//			var statement = connection.prepareStatement(sql);
//			statement.executeQuery();
//			connection.commit();
//			connection.close();
		},
		deleteBaseTables : function(){
			this.aBaseTables.forEach(function(e){
				var connection = genObj.connection;
				var aColumnEntries = [];
				var sql = 'delete from '+ e;
				var statement = connection.prepareStatement(sql);
				var resultSet = statement.executeQuery();
				connection.commit();
			})
		},
		getStatus : function(){
			var aStatus = [];
			var allTables = this.aBaseTables.concat(this.readOnlyTables);
			var allTablesText = this.aBaseTablesText.concat(this.readOnlyTablesText);
			
			allTables.forEach(function(e,index){
				var connection = genObj.connection;
				var aColumnEntries = [];
				var sql = 'select count(*) from '+ e;
				var statement = connection.prepareStatement(sql);
				var resultSet = statement.executeQuery();
				while (resultSet.next()) {
					aStatus.push({
						count : resultSet.getString(1),
						tableName : e,
						tableNameText : allTablesText[index]
					})
				}
			});
			return aStatus;
		},
		addMessage : function(text,status){
			this.outputBody.messages.push({
				text : text,
				status : status
			})
		},
		closeConnection : function(){
			this.connection.close();
		},
		arrayToObj : function(aValues){
			var aObj = [];
			aValues.forEach(function(e){
				aObj.push({name:e})
			})
			return aObj;
		},
		objToArray : function(aObj){
			var aVal = [];
			aObj.forEach(function(e){
				aVal.push(e.name);
			})
			return aVal;
		},
		setBody : function(){ 
			$.response.setBody(JSON.stringify(this.outputBody));
		},
		generateData : function(){
//			costPool.loadData(dataGenerator);
//			chartOfAccount.loadData(dataGenerator); //Dependency Err - Trigger late//Hardcoded table  - Donot Update
//			costCenter.loadData(dataGenerator);  //Hardcoded table  - Donot Update
			
			ITVendor.loadData(dataGenerator);
			CreditorAccount.loadData(dataGenerator);
			PurchaseOrder.loadData(dataGenerator);
			ReportingUnit.loadData(dataGenerator); 
			KPI.loadData(dataGenerator); 
			Initiative.loadData(dataGenerator); 
			Project.loadData(dataGenerator);
 			WBS.loadData(dataGenerator);
			Invoice.loadData(dataGenerator);
 			ActualCostAccounting.loadData(dataGenerator);
 			GLCCBudget.loadData(dataGenerator);
 //			Close Connection
 			genObj.closeConnection();

			$.response.status = $.net.http.OK;
		}
};
if(mode == 'status'){ 
	var genObj =new dataGenerator();
	$.response.setBody(JSON.stringify(genObj.getStatus()));
}else if(mode == 'readMasterData'){
	var genObj =new dataGenerator();
	$.response.setBody(JSON.stringify({data : {
		userNames :genObj.arrayToObj(genObj.distinctNames),
		productName :genObj.arrayToObj(genObj.productName),
		uom :genObj.arrayToObj(genObj.uom),
		projectName :genObj.arrayToObj(genObj.projectName),
		companyName :genObj.arrayToObj(genObj.companyName),
		projectCategory :genObj.arrayToObj(genObj.projectCategory),
		projectFundType :genObj.arrayToObj(genObj.projectFundType),
		projBudgetCurrency :genObj.arrayToObj(genObj.projBudgetCurrency),
		wbs :genObj.arrayToObj(genObj.wbs),
		wbsProjName :genObj.arrayToObj(genObj.wbsProjName),
		wbsExpenseType :genObj.arrayToObj(genObj.wbsExpenseType),
		noOfRecords :genObj.noOfRecords,
		glAccountName : genObj.arrayToObj(genObj.glAccountName),
		kpi : genObj.arrayToObj(genObj.KPI),
		initiativesName : genObj.arrayToObj(genObj.initiativesName)
	}}));
}else if(mode == 'generateWithInput'){
	var genObj = new dataGenerator();
	
	var sData = $.request.body.asString().replace(/X*PERC*X/g, '%');
	var oData = JSON.parse(sData);
		
	if(oData.clearAndRegenerate){
		genObj.deleteBaseTables();
	}
	genObj.noOfRecords = oData.noOfRecords;
	
// 	genObj.distinctNames = genObj.objToArray(oData.advancedSettings.userNames);
	genObj.productName = genObj.objToArray(oData.advancedSettings.productName);
	genObj.uom = genObj.objToArray(oData.advancedSettings.uom);
	genObj.companyName = genObj.objToArray(oData.advancedSettings.companyName);
	genObj.projectName = genObj.objToArray(oData.advancedSettings.projectName);
	genObj.projectCategory = genObj.objToArray(oData.advancedSettings.projectCategory);
	genObj.projectFundType = genObj.objToArray(oData.advancedSettings.projectFundType);
	genObj.projBudgetCurrency = genObj.objToArray(oData.advancedSettings.projBudgetCurrency);
	genObj.wbs = genObj.objToArray(oData.advancedSettings.wbs);
	genObj.wbsProjName = genObj.objToArray(oData.advancedSettings.wbsProjName);
	genObj.wbsExpenseType = genObj.objToArray(oData.advancedSettings.wbsExpenseType);
	
	genObj.kpi = genObj.objToArray(oData.advancedSettings.kpi);
	genObj.initiativesName = genObj.objToArray(oData.advancedSettings.initiativesName);
	
	genObj.generateData();
	DataGenLogger.logData(oData.datasetName,oData.datasetDescription,sData);
	
	allocateWeightage.allocW(oData.weightage.costCentVglAccRes);
//	genObj.generateBudgetData();
//	Update Status
	genObj.setBody();
}
