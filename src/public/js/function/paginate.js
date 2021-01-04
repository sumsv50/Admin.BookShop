
window.onpopstate = function(event) {
    var path_product = window.location.pathname + window.location.search;
    console.log(path_product);
    if(window.location.pathname == "products") {
        replaceProducts("api" + path_product, true);
    } else {
        replaceAccounts("api" + path_product, true);
    }
    
}

function replaceView(url, itemsHtml, result, notPushState){
    $('#items-list').html(itemsHtml);
    
    totalPages = result.totalPages;
    currentPage = result.currentPage;
    hasPrevPage = result.hasPrevPage;
    hasNextPage = result.hasNextPage;

    paginationBtn(type, behavior, totalPages, currentPage, hasPrevPage, hasNextPage);
    if(!notPushState) {
        const newurl = url.replace('/api','');
        history.pushState({}, 'Product Admin - Dashboard', newurl);
    }
}

function replaceProducts(url, notPushState) {
    var template = Handlebars.compile($('#list-item-template').html());
    $.getJSON (url, function(result) {
        result.products.forEach(product => {
            if(product.createdAt) {
                var date = new Date(product.createdAt);
                product.createdAt = date.toLocaleString();
            }
        });
        var itemsHtml = template({products: result.products});
        replaceView(url, itemsHtml, result, notPushState);

    });
}
function replaceAccounts(url, notPushState) {
    var template = Handlebars.compile($('#list-item-template').html());
    $.getJSON(url,
        {
            accountType,
        }
        ,function(result) {
            result.docs.forEach(user => {
                if(user.createdAt){
                    var date = new Date(user.createdAt);
                    user.createdAt = date.toLocaleString();
                }
                if(user._id == meId) {
                    user.me = true;
                }
                user.active = user.status == "ACTIVE" ? true : false;

            });

            var itemsHtml = template({accounts: result.docs});

            //paginate;
            replaceView(url, itemsHtml, result, notPushState);

            setOnClickListener();
           
        } ) 
}

function paginationBtn(type, behavior, totalPages, currentPage, hasPrevPage, hasNextPage) {
    var template = Handlebars.compile($('#btnPaginate-item').html());
    var paginateHtml = template({type, behavior, totalPages, currentPage, hasPrevPage, hasNextPage});
    $('#pagination-wrapper').html(paginateHtml);
 }