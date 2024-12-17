import {qlspServices_admin} from '../services/qlsp_admin.service.js'
import { SanPham } from '../model/SanPham.js'




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
        if(action !== 'edit'){
            await qlspServices_admin.addProduct(sp)
        }

        getProducts()
    }catch(err){
        console.log("err: ", err);
    }
}


document.getElementById('btnThemSP').onclick = ()=>{
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