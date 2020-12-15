
$(document).ready(function() {
    $('.toast').toast('show');
})
var productId;
var categoryId;
var btnDeleteProduct = document.getElementById('btnDeleteProduct');
var btnAddNewCategory = document.getElementById('btnAddNewCategory');
var deleteProductForm = document.forms['delete-product-form'];
var txtCategoryName = document.getElementById('nameCategory');
var txtCategoryName_retype = document.getElementById('nameCategory_retype');

var btnAddNewCategory = document.getElementById('btnAddNewCategory');

//When dialog confirm show
$('#delete-product-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    productId = button.data('id');
    categoryId = button.data('cate');

    var name = button.data('name');
    var modal = $(this)
    modal.find('.modal-body').text(`Are you sure delete this product? (${name})`);
})

//Listening
btnDeleteProduct.onclick = function () {
    deleteProductForm.action = '/products/' + productId + '/' + categoryId + '?_method=DELETE';
    deleteProductForm.submit();
}



// When type input
txtCategoryName.addEventListener('input', (event) => {
    if (txtCategoryName.value == '') {
        txtCategoryName.classList.add("is-invalid");
    } else {
        txtCategoryName.classList.remove("is-invalid");
    }

    if (txtCategoryName_retype.value == txtCategoryName.value) {
        txtCategoryName_retype.classList.remove("is-invalid");
    } else {
        txtCategoryName_retype.classList.add("is-invalid");
    }

    //Button
    if (txtCategoryName.value != '' && txtCategoryName_retype.value == txtCategoryName.value) {
        btnAddNewCategory.disabled = false;
    } else {
        btnAddNewCategory.disabled = true;
    }
});

txtCategoryName_retype.addEventListener('input', (event) => {
    if (txtCategoryName_retype.value == txtCategoryName.value) {
        txtCategoryName_retype.classList.remove("is-invalid");
    } else {
        txtCategoryName_retype.classList.add("is-invalid");
    }

    //Button
    if (txtCategoryName.value != '' && txtCategoryName_retype.value == txtCategoryName.value) {
        btnAddNewCategory.disabled = false;
    } else {
        btnAddNewCategory.disabled = true;
    }
});


//Paginate button
var totalPages = {{totalPages}};
var currentPage = {{currentPage}};
var pStart = 1;
var pEnd = totalPages;
var urlParams = new URLSearchParams(window.location.search);
var urlParamsString;

const wrapper = document.getElementById('pagination-wrapper');

urlParams.set('page', '1');
urlParamsString = urlParams.toString();

wrapper.innerHTML =`<li class="page-item {{#unless hasPrevPage}}disabled{{/unless}}">
                        <a class="page-link" href="products?${urlParams}" aria-label="First">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`;
if(currentPage > 4) {
    pStart = currentPage - 3;
    wrapper.innerHTML += `<li class="page-item"><a class="page-link">...</a></li>`;
}
    
pEnd = currentPage + 3 < totalPages ? currentPage + 3 : totalPages; 
    
for(var i = pStart; i <= pEnd; i++){
    if(i == currentPage){
        wrapper.innerHTML += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
    } else {
        urlParams.set('page', i);
        wrapper.innerHTML += `<li class="page-item"><a class="page-link" href="products?${urlParams}">${i}</a></li>`;
    }
}

if(pEnd < totalPages) {
    wrapper.innerHTML += `<li class="page-item"><a class="page-link">...</a></li>`;
}

urlParams.set('page', totalPages);
wrapper.innerHTML += `<li class="page-item {{#unless hasNextPage}}disabled{{/unless}}"">
                            <a class="page-link" href="/products?${urlParams}" aria-label="Last">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>`
                    
//---------------SEARCH--------------------//
var txtKey = document.getElementById('txtKey');

//set key user have been search
{{#if key}} txtKey.value = '{{key}}' {{/if}};

txtKey.addEventListener('keyup', ()=> {
    if (event.keyCode === 13) {
        document.getElementById("btnSearch").click();
    }
})

onClickSearch = () => {
    urlParams.delete('page');
    urlParams.set('key', txtKey.value);
    window.location = `/products?${urlParams}`;
}

//Tag search
onClickBtnCategory = () =>{
        urlParams.delete('category');
        window.location = `/products?${urlParams}`;
}
onClickBtnKey = () =>{
        urlParams.delete('key');
        window.location = `/products?${urlParams}`;
}
