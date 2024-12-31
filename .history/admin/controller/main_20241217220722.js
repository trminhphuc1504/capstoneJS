import {qlspServices_admin} from '../services/qlsp_admin.service.js'
import { SanPham } from '../model/SanPham.js'
import { Validation } from '../../customer/model/Validation.js'
import { load } from 'signal-exit'



const validation = new Validation()

const renderTable = (arr)=>{
    let htmlContent = ''
    arr.forEach((item,index)=>{
        htmlContent += `
        <tr>
            <td>
                ${index + 1}
            </td>
            <td>
                ${item.name}
            </td>
            <td>
                ${item.price}
            </td>
            <td>
                ${item.screen}
            </td>
            <td>
                ${item.backCamera}
            </td>
            <td>
                ${item.frontCamera}
            </td>
            <td>
                <img width="100" height="100" src="${item.img}"/>
            </td>
            <td>
                ${item.desc}
            </td>
            <td>
                ${item.type}
            </td>
            <td>
            <button 
            class="btn btn-warning" 
            data-toggle="modal" 
            data-target="#myModal"
            onclick="editProduct('${item.id}')"
        >
            Edit
        </button>
                <button class="btn btn-danger" onclick="deleteProduct('${item.id}')">Delete</button>
            </td>
        </tr>
        `
    })
    document.getElementById('tblDanhSachSP').innerHTML = htmlContent
}

const getProducts = async() =>{
    try{
        const result = await qlspServices_admin.getProductList()
        console.log("result: ", result.data);

        renderTable(result.data)

        
    }catch(err){
        console.log("err:",err)
    }
}

getProducts()


const layThongTinSanPham = () =>{
    const elements = document.querySelectorAll('#formSP input, #formSP select')
    let sp = {}
    elements.forEach((element)=>{
        const {id,value} = element
        sp[id] = value
    })
    console.log("sp: ", sp);

    return new SanPham(sp.name,sp.price,sp.screen,sp.backCamera,sp.frontCamera,sp.img,sp.desc,sp.type)
    
}




document.getElementById('formSP').onsubmit = async (ev)=>{
    try{
        ev.preventDefault()

        const formElement = document.getElementById('formSP')
        const action = formElement.getAttribute('data-action')

        const sp = layThongTinSanPham();

        let isValid = true
        isValid &= validation.required(sp.name,"Vui lòng nhập tên sản phẩm!",'invalidID')
        isValid &= validation.required(sp.price,"Vui lòng nhập giá sản phẩm",'invalidPrice') && validation.isNumber(sp.price,'Giá sản phẩm phải là số','invalidPrice')
        isValid &= validation.required(sp.screen,"Vui lòng nhập thông tin screen",'invalidScreen') 
        isValid &= validation.required(sp.backCamera,"Vui lòng nhập thông tin Back Camera",'invalidBackCamera')
        isValid &= validation.required(sp.frontCamera,"Vui lòng nhập thông tin Front Camera",'invalidFrontCamera')
        isValid &= validation.required(sp.img,"Vui lòng nhập thông tin hình ảnh",'invalidImg') && validation.isUrl(sp.img,'Thông tin hình ảnh phải là URL','invalidImg')
        isValid &= validation.required(sp.desc,"Vui lòng nhập thông tin",'invalidDesc')

        if(!isValid) return


        if(action !== 'edit'){
            await qlspServices_admin.addProduct(sp)
        }
        if(action === 'edit'){
            const productId = formElement.getAttribute('data-id')
            await qlspServices_admin.editProduct(productId,sp)
        }
        getProducts()

    }catch(err){
        console.log("err: ", err);
    }
}


document.getElementById('btnThemSP').onclick = ()=>{
    document.getElementById('formSP').reset()
    document.querySelector('.modal-footer').innerHTML = `
    <button type="submit" form="formSP" class="btn btn-success">Thêm SP</button>
    `
}




window.deleteProduct = async (productId) =>{
    try{
        await qlspServices_admin.deleteProduct(productId)

        getProducts()
    }catch(error){
        console.log("error: ", error);

    }
}



window.editProduct = async (productId) =>{
    try{
        const result = await qlspServices_admin.editProduct(productId);
        console.log("result: ", result);

        document.getElementById('formSP').reset()

        const elements = document.querySelectorAll('#formSP input, #formSP select')

        elements.forEach((element) =>{
            const {id} = element
            element.value = result.data[id]
        })

        document.getElementById('formSP').setAttribute('data-action', 'edit')
        document.getElementById('formSP').setAttribute('data-id',productId)

        document.querySelector('.modal-footer').innerHTML = `
        <button
        type = "submit"
        form = "formSP"
        class = "btn btn-success"
        >
        Cập nhật
        </button>
        `
        
    }catch(err){
        console.log("err:",err)
    }
}


const searchProducts = async (keyword) =>{
    try{
        const result = await qlspServices_admin.getProductList()
        const products = result.data


        const filteredProducts = products.filter((product)=>{
            return(
                product.name.toLowerCase().includes(keyword.toLowerCase())
            )
        })

        renderTable(filteredProducts)
    }catch(err){
        console.error("Error searching products: ", err)
    }
}

document.getElementById('searchKeyword').addEventListener('input',(event)=>{
    const keyword = event.target.value.trim();
    searchProducts(keyword)
})


let products = []

const sortProductsByPrice = (products,ascending = true) =>{
    return products.sort((a,b)=>{
        const priceA = paraseFloat(a.price)
        const priceB = paraseFloat(b.price)

        if(ascending){
            // Sắp xếp tăng dần (bé đến lớn)
            return priceA - priceB
        }else{
            // Sắp xếp giảm dần (lớn đến bé)
            return priceB - priceA
        }
    })
}

const loadProducts = async ()=>{
    try{
        const result = await qlspServices_admin.getProductById();
        products = result.data
        renderTable(products)
    }catch(err){
        console.error("Error loading products: ", err);
    }
}

document.getElementById('sortAsc').addEventListener('click',()=>{
    const sortedProducts = sortProductsByPrice(products,true);
    renderTable(sortedProducts);
})

document.getElementById('sortDesc').addEventListener('click',()=>{
    const sortProductsByPrice = sortProductsByPrice(products,false)
    renderTable(sortedProducts)
})