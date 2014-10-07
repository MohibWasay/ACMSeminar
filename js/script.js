/**
 * Created by Shahnawaz on 8/18/14.
 */

var AppModule = {
    data:{},

    selectedItems:[],
    allItems: {},
    loadItems: function(){

        // load item only if its not already loaded
        if (!AppModule.allItems.hasOwnProperty("a1")){
            var keys = Object.keys(AppModule.data);
            keys.forEach(function(key,index){
                AppModule.data[key].forEach(function(item,index){
                    AppModule.allItems[item.id] = item;
                })
            });
        }

    },

    tabChange : function(id){
        // first remove the previous tab 'nav-active' class
        var previousTab = document.querySelectorAll('div.active1');
        if(previousTab.length>0){
            previousTab[0].className = "cart-div";
        }
        // now add 'nav-active' class to the clicked tab
        var tabClick = document.getElementById(id);
        tabClick.className += " active1";

        this.makeHTML(id);
    },
    displayOutput : function(item,name,price) {
        var myCart = document.getElementById('cart');
        myCart.innerHTML += "<div><img src='data/shopping_bag.jpg' width='40px' height='40px' /><span>" + name + "</span><span style='vertical-align:12px; font-size: 1.25em; color: #ccc;'>$" + price + "</span></div>";
    },
    makeHTML : function(id){
        var x;
        var myCart = document.getElementById('cart');
        var mainBody = document.getElementById("main-body");
        mainBody.innerHTML = "";
        var dataToAdd;
        switch (id){
            case "nav-appliances":
                dataToAdd = AppModule.data.appliances;
                break;
            case "nav-cell-phones":
                dataToAdd = AppModule.data.cellPhones;
                break;
            case "nav-cameras":
                dataToAdd = AppModule.data.cameras;
                break;
            case "nav-video-games":
                dataToAdd = AppModule.data.videoGames;
                break;
            case "nav-wearable-tech":
                dataToAdd = AppModule.data.wearableTech;
                break;
        }

        dataToAdd.forEach(function(item){
            x = document.getElementById('button' +item.id);
            mainBody.innerHTML += "<div id='"+ item.id + "'><img src='data/shopping_bag.jpg' /><div style='height: 20px;' >"+ item.name +"</div><button onclick='AppModule.displayOutput(" + item.id + "," + "\"" + item.name + "\""+ "," + item.price + ")' id='button"+ item.id + " ' class='add-to-cart'>Add to Cart</button></div>";
            /*x[i].onclick = function() {
                //x.onclick = this.displayOutput(item, myCart);
                myCart.innerHTML += "<div><img src='data/shopping_bag.jpg' width='40px' height='40px' /><span>" + item.name + "</span><span style='vertical-align:12px; font-size: 1.25em; color: #ccc;'>$" + item.price + "</span></div>";
            };
            */
            if(AppModule.selectedItems.indexOf(item.id)!=-1){
                document.getElementById(item.id).className+=" item-selected";
            }
        });

    },

    updatePrice : function(priceCartId){
        var totalPrice = 0;
        for(obj in AppModule.data){
            AppModule.data[obj].forEach(function(item){
                AppModule.selectedItems.forEach(function(id){
                    if(item.id == id){
                        totalPrice += item.price;
                    }
                })
            })
        }

        var cart = document.getElementById(priceCartId);
        cart.innerHTML = "<h3>Your Cart!</h3><strong>total items:</strong> "+this.selectedItems.length+"<br><strong>total price:</strong> "+totalPrice;
    }
};